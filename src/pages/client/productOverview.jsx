import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";

export default function ProductOverviewPage() {
  const params = useParams();
  const productId = params.id;
  const [status, setStatus] = useState("loading"); //loading, success, error
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setStatus("success");
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
        toast.error("Error fetching product details");
      });
  }, []);

  return (
    <>
      {status == "success" && (
        <div className="w-full h-full flex">
          <div className="w-[50%] h-full ">
            <ImageSlider images={product.images} />
          </div>
          <div className="w-[50%] h-full bg-blue-900"></div>
        </div>
      )}
      {status == "loading" && <Loading />}
    </>
  );
}
