export default function ProductCard(props) {
  return (
    <div className="card">
      <img className="productImage" src={props.image} />
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <h2>Price : ${props.price}</h2>
      <button className="addToCart">Add to Cart</button>
      <button className="buyButton">Buy Now</button>
    </div>
  );
}
