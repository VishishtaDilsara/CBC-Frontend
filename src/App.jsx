import "./App.css";
import Header from "./components/header";
import ProductCard from "./components/productCard";

function App() {
  return (
    <>
      <Header />
      <ProductCard
        name="Gaming Laptop"
        description="High performance gaming laptop"
        price={1200}
        image="https://picsum.photos/id/1/200/300"
      />
      <ProductCard
        name="Uni Laptop"
        description="High performance laptop for PS"
        price={1500}
        image="https://picsum.photos/id/2/200/300"
      />
    </>
  );
}

export default App;
