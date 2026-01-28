
const Product = ({name,brand,price,quantity}) => {
  return (
    <div className="border flex flex-col gap-2">
      <h2>{name}</h2>
      <p>{brand}</p>
      <p>{price}</p>
      <p>{quantity}</p>
    </div>
  )
}

export default Product
