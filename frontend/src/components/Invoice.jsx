import { useContext, useState, useMemo } from "react";
import AppContext from "../context/AppContext";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};

const calculateRowDetails = (price, quantity, gstPercent = 5) => {
  const totalRaw = price * quantity;
  const netAmount = (price * 100) / (100 + gstPercent);
  const taxableAmount = (totalRaw * 100) / (100 + gstPercent);
  const gstAmount = totalRaw - taxableAmount;

  return { netAmount, taxableAmount, gstAmount, totalRaw };
};

const Invoice = ({ list = [], client = {}, totals: propTotals }) => {
  const { profile } = useContext(AppContext) || {};

  const [invoiceMeta] = useState(() => {
    const now = new Date();
    return {
      number: Math.floor(1000 + Math.random() * 9000),
      date: now.toLocaleDateString("en-IN"),
    };
  });

  const totals = useMemo(() => {
    if (propTotals) return propTotals;
    return list.reduce(
      (acc, item) => {
        const { taxableAmount, gstAmount, totalRaw } = calculateRowDetails(
          item.price,
          item.quantity,
        );
        return {
          taxable: acc.taxable + taxableAmount,
          gst: acc.gst + gstAmount,
          grandTotal: acc.grandTotal + totalRaw,
        };
      },
      { taxable: 0, gst: 0, grandTotal: 0 },
    );
  }, [list, propTotals]);

  return (
    <div id="invoice-pdf">
      <div className="flex justify-between items-start mb-8 pb-4 border-b border-gray-900">
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-wide">
            Invoice
          </h1>
          <p className="mt-1 font-medium text-lg">#{invoiceMeta.number}</p>

          <div className="flex gap-1">
            <span className="font-bold text-sm">Date:</span>
            <span className="text-sm">{invoiceMeta.date}</span>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold uppercase">
            {profile?.business || "Your Business"}
          </h2>
          <div className="text-sm mt-1 leading-tight">
            <p>{profile?.address || "Street Address"}</p>
            <p>
              <span>{profile?.city}</span>, <span>{profile?.state}</span>,{" "}
              <span>{profile?.pin}</span>
            </p>
            <p>Phone: {profile?.phone || "000-000-0000"}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mb-8">
        <div className="w-1/2">
          <p className="font-bold uppercase text-xs text-gray-500 mb-1">
            Bill To:
          </p>
          <div className="text-gray-900">
            <p className="font-bold text-lg">{client.name || "Client Name"}</p>
            <p className="text-sm">{client.phone}</p>
            <p className="text-sm whitespace-pre-line">{client.address}</p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item Description</th>
              <th>Brand</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Net</th>
              <th>Taxable</th>
              <th>GST</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => {
              const { netAmount, taxableAmount, gstAmount, totalRaw } =
                calculateRowDetails(item.price, item.quantity);
              return (
                <tr key={item.id || index}>
                  <td>{index + 1}</td>
                  <td className="font-bold">{item.name}</td>
                  <td className="font-bold">{item.brand}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>{formatCurrency(netAmount)}</td>
                  <td>{formatCurrency(taxableAmount)}</td>
                  <td>{formatCurrency(gstAmount)}</td>
                  <td className="font-bold">{formatCurrency(totalRaw)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-start pt-4 border-t-2 border-gray-900">
        <div className="w-1/2 text-sm">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Bank Details
            </h3>
            <hr className="mb-2" />
            <div className="grid grid-cols-[80px_1fr] gap-y-1 text-sm text-gray-700">
              <span className="font-medium text-gray-500">Bank:</span>
              <span className="font-semibold">{profile?.bank || "-"}</span>
              <span className="font-medium text-gray-500">Account:</span>
              <span className="font-semibold">{profile?.account || "-"}</span>
              <span className="font-medium text-gray-500">IFSC:</span>
              <span className="font-semibold">{profile?.ifsc || "-"}</span>
              <span className="font-medium text-gray-500">Branch:</span>
              <span className="font-semibold">{profile?.branch || "-"}</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-bold uppercase text-xs mb-1">
              Terms & Conditions
            </p>
            <ul className="list-disc list-inside text-xs text-gray-500">
              {profile.tnc.map((item) => (
                <li key={item._id}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-5/12">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Taxable Amount:</span>
              <span className="font-medium">
                {formatCurrency(totals.taxable)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total GST:</span>
              <span className="font-medium">{formatCurrency(totals.gst)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl mt-3 pt-3 border-t border-gray-400">
              <span>Grand Total:</span>
              <span>{formatCurrency(totals.grandTotal)}</span>
            </div>
          </div>
          <div className="mt-16 text-right">
            <div className="inline-block border-t border-black w-32 text-center pt-2 text-xs font-bold uppercase">
              Authorized Signatory
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
