import { useState } from "react";

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
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onProductAdd = (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.brand ||
      !product.price ||
      !product.quantity
    ) {
      return alert("All fields required");
    }

    setList((prev) => [...prev, { ...product, id: Date.now() }]);

    setProduct({
      name: "",
      brand: "",
      price: "",
      quantity: "",
    });
  };

  return (
    <div>
      <form onSubmit={onProductAdd}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={product.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
        />

        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
        />

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />

        <button type="submit" className="px-3 py-2 rounded bg-black text-white">
          Add
        </button>
      </form>

      {list.map((item, index) => (
        <p key={item.id}>
          {index + 1}. {item.name} ({item.brand}) — ₹{item.price} ×{" "}
          {item.quantity}
        </p>
      ))}
    </div>
  );
};

export default NewInvoice;
