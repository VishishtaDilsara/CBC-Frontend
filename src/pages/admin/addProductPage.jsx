import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function AddProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImage] = useState([]);
  const [labelledPrice, setLabelledPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();

  async function AddProduct() {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please Login first");
      return;
    }
    if (images.length <= 0) {
      toast.error("Please select at least one image");
      return;
    }
    const promisesArray = [];

    for (let i = 0; i < images.length; i++) {
      promisesArray[i] = mediaUpload(images[i]);
    }

    try {
      const imageUrls = await Promise.all(promisesArray);
      console.log(imageUrls);

      const altNamesArray = altNames.split(",");
      const product = {
        productId: productId,
        name: name,
        altNames: altNamesArray,
        description: description,
        images: imageUrls,
        labelledPrice: labelledPrice,
        price: price,
        stock: stock,
      };
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/products", product, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          toast.success("Product Added successfully");
          navigate("/admin/products");
        })
        .catch((e) => {
          toast.error(e.response.data.message);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-primary">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-secondary">Add New Product</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details below to create a new product.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-secondary">
              Product ID
            </label>
            <input
              type="text"
              placeholder="Product ID"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-secondary">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-secondary">
              Alternative Names
            </label>
            <input
              type="text"
              placeholder="Alternative Names"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              value={altNames}
              onChange={(e) => setAltNames(e.target.value)}
            />
            <span className="text-xs text-gray-400">
              Separate multiple names with commas.
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-secondary">
              Description
            </label>
            <textarea
              placeholder="Description"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-secondary">
              Images
            </label>
            <input
              type="file"
              placeholder="Images"
              multiple
              className="w-full rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-primary/60"
              onChange={(e) => setImage(e.target.files)}
            />
            <span className="text-xs text-gray-400">
              You can select multiple images.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-secondary">
                Labelled Price
              </label>
              <input
                type="number"
                placeholder="Labelled Price"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                onChange={(e) => setLabelledPrice(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-secondary">
                Price
              </label>
              <input
                type="number"
                placeholder="Price"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-secondary">
                Stock
              </label>
              <input
                type="number"
                placeholder="Stock"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex justify-end items-center mt-6 gap-3">
          <Link
            to="/admin/products"
            className="px-4 py-2 rounded-full border border-gray-300 text-sm font-semibold text-secondary hover:bg-gray-100 transition"
          >
            Cancel
          </Link>
          <button
            className="px-5 py-2 rounded-full bg-accent text-white text-sm font-semibold hover:bg-accent/90 shadow-md hover:shadow-lg transition cursor-pointer"
            onClick={AddProduct}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
