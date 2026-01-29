import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import html2pdf from "html2pdf.js";

const NewInvoice = () => {
  const [list, setList] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const onProductAdd = (e) => {
    e.preventDefault();

    const { name, brand, price, quantity } = product;
    if (!name || !brand || !price || !quantity) {
      alert("All fields required");
      return;
    }

    setList((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        brand,
        price: Number(price),
        quantity: Number(quantity),
      },
    ]);

    setProduct({
      name: "",
      brand: "",
      price: "",
      quantity: "",
    });
  };

  const removeItem = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const finalAmount = list.reduce((sum, item) => {
    const rate = item.price * 0.9;
    const taxable = rate * item.quantity;
    const gst = taxable * 0.05;
    return sum + taxable + gst;
  }, 0);

  const exportPDF = () => {
    const element = document.getElementById("invoice-pdf");

    html2pdf()
      .set({
        margin: 8,
        filename: `invoice-${Date.now()}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* ================= INVOICE ================= */}
      <div id="invoice-pdf" className="invoice-container mx-auto p-6">
        {/* HEADER */}
        <div className="text-center border-b pb-3 mb-4">
          <h1 className="text-2xl font-bold">INVOICE</h1>
          <p className="text-sm">Billing System</p>
        </div>

        {/* CUSTOMER DETAILS */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm">Customer Name</label>
            <input className="invoice-input" />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <input className="invoice-input" />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <input className="invoice-input" />
          </div>
        </div>

        {/* ADD ITEM FORM (NO PDF) */}
        <form
          onSubmit={onProductAdd}
          className="grid grid-cols-5 gap-3 mb-4 no-print"
        >
          <input
            name="name"
            placeholder="Item"
            value={product.name}
            onChange={handleChange}
            className="invoice-input"
          />
          <input
            name="brand"
            placeholder="Brand"
            value={product.brand}
            onChange={handleChange}
            className="invoice-input"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Qty"
            value={product.quantity}
            onChange={handleChange}
            className="invoice-input"
          />
          <input
            type="number"
            name="price"
            placeholder="Rate"
            value={product.price}
            onChange={handleChange}
            className="invoice-input"
          />
          <button className="bg-black text-white rounded">Add</button>
        </form>

        {/* TABLE HEADER */}
        <div className="invoice-table-header grid grid-cols-11 p-2 font-semibold">
          <p>#</p>
          <p>Item</p>
          <p>Brand</p>
          <p>Qty</p>
          <p>MRP</p>
          <p>Rate</p>
          <p>Taxable</p>
          <p>GST %</p>
          <p>GST Amt</p>
          <p>Total</p>
          <p className="no-print">❌</p>
        </div>

        {/* ITEMS */}
        {list.map((item, index) => {
          const rate = item.price * 0.9;
          const taxable = rate * item.quantity;
          const gst = taxable * 0.05;
          const total = taxable + gst;

          return (
            <div
              key={item.id}
              className="grid grid-cols-11 p-2 border-b items-center text-sm"
            >
              <p>{index + 1}</p>
              <p>{item.name}</p>
              <p>{item.brand}</p>
              <p>{item.quantity}</p>
              <p>₹{item.price}</p>
              <p>₹{rate.toFixed(2)}</p>
              <p>₹{taxable.toFixed(2)}</p>
              <p>5%</p>
              <p>₹{gst.toFixed(2)}</p>
              <p className="font-semibold">₹{total.toFixed(2)}</p>
              <RxCross2
                onClick={() => removeItem(item.id)}
                className="text-red-600 cursor-pointer no-print"
              />
            </div>
          );
        })}

        {/* TOTAL */}
        <div className="text-right font-bold text-lg mt-4">
          Final Amount: ₹{finalAmount.toFixed(2)}
        </div>
      </div>

      {/* EXPORT BUTTON */}
      <div className="mt-4 text-center">
        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-6 py-2 rounded"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default NewInvoice;
