import { useState, useMemo, useRef } from "react";
import { RxCross2, RxPlus } from "react-icons/rx";
import { FiPrinter, FiRefreshCw } from "react-icons/fi";
import Invoice from "../components/Invoice";
import { toast } from "react-toastify";

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

const NewInvoice = () => {
  const nameInputRef = useRef(null);
  const [items, setItems] = useState([]);
  const [client, setClient] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    quantity: "",
  });

  const totals = useMemo(() => {
    return items.reduce(
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
  }, [items]);

  const handleClientChange = (e) => {
    setClient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProductChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addItem = (e) => {
    e.preventDefault();
    const { name, brand, price, quantity } = product;

    if (!name || !price || !quantity) {
      alert("Please fill in Item Name, Price, and Quantity.");
      return;
    }

    if (parseFloat(price) <= 0 || parseFloat(quantity) <= 0) {
      alert("Price and Quantity must be greater than 0");
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        name,
        brand: brand || "-",
        price: parseFloat(price),
        quantity: parseFloat(quantity),
      },
    ]);
    setProduct({ name: "", brand: "", price: "", quantity: "" });
    nameInputRef.current?.focus();
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handlePrint = () => {
    if (!client.name || !client.phone || !client.address) {
      return toast.error("Client Details Required");
    }
    window.print();
  };

  const handleReset = () => {
    if (window.confirm("Clear all invoice data?")) {
      setItems([]);
      setClient({ name: "", phone: "", address: "" });
      setProduct({ name: "", brand: "", price: "", quantity: "" });
    }
  };

  return (
    <>
      <div className="bg-white border rounded-xl shadow-sm md:p-6 p-4 m-3 md:m-8 print:hidden max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Create Invoice</h2>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
          >
            <FiRefreshCw /> Reset Form
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
          <Input
            name="name"
            value={client.name}
            onChange={handleClientChange}
            placeholder="Client Name"
            label="Client Name"
          />
          <Input
            name="phone"
            value={client.phone}
            onChange={handleClientChange}
            placeholder="Phone Number"
            label="Phone"
          />
          <div className="md:col-span-2">
            <Input
              name="address"
              value={client.address}
              onChange={handleClientChange}
              placeholder="Billing Address"
              label="Address"
            />
          </div>
        </div>
        <form
          onSubmit={addItem}
          className="grid grid-cols-2 md:grid-cols-12 gap-3 mb-6 items-end"
        >
          <div className="md:col-span-4">
            <Input
              ref={nameInputRef}
              name="name"
              placeholder="Item Name"
              value={product.name}
              onChange={handleProductChange}
              label="Item"
            />
          </div>
          <div className="md:col-span-3">
            <Input
              name="brand"
              placeholder="Brand"
              value={product.brand}
              onChange={handleProductChange}
              label="Brand"
            />
          </div>
          <div className="md:col-span-2">
            <Input
              name="quantity"
              type="number"
              placeholder="0"
              value={product.quantity}
              onChange={handleProductChange}
              label="Qty"
            />
          </div>
          <div className="md:col-span-2">
            <Input
              name="price"
              type="number"
              placeholder="0.00"
              value={product.price}
              onChange={handleProductChange}
              label="Price (Inc. Tax)"
            />
          </div>
          <div className="md:col-span-1">
            <button className="w-full h-10.5 flex items-center justify-center bg-gray-900 text-white rounded-lg hover:bg-black transition-colors">
              <RxPlus size={20} />
            </button>
          </div>
        </form>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
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
                  <td onClick={removeItem} className="font-bold text-2xl">
                    <RxCross2 />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <button
            onClick={handlePrint}
            disabled={items.length === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow-sm transition-all
                ${
                  items.length === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                }`}
          >
            <FiPrinter size={18} />
            Print Invoice
          </button>
          <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Taxable Amount:</span>
              <span>{formatCurrency(totals.taxable)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total GST:</span>
              <span>{formatCurrency(totals.gst)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-2 mt-2">
              <span>Grand Total:</span>
              <span>{formatCurrency(totals.grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden print:block">
        <Invoice list={items} client={client} totals={totals} />
      </div>
    </>
  );
};
const Input = ({ className = "", label, ref, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        {...props}
        required
        className={`w-full outline-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 ${className}`}
      />
    </div>
  );
};

export default NewInvoice;
