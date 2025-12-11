import { useState } from "react";

export default function ImageSlider(props) {
  const images = props.images;
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      {/* Main Image */}
      <div className="w-full h-[320px] md:h-[360px] rounded-3xl overflow-hidden bg-gray-100 shadow-md">
        <img
          src={images[currentIndex]}
          alt={`Product image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="w-full mt-4 flex justify-center items-center gap-2 flex-wrap">
        {images.map((image, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              type="button"
              key={index}
              className={`w-[70px] h-[70px] rounded-2xl overflow-hidden border-2 transition-all duration-200 
                          ${
                            isActive
                              ? "border-accent shadow-md scale-105"
                              : "border-transparent hover:border-accent/60"
                          }`}
              onClick={() => {
                setCurrentIndex(index);
              }}
            >
              <img
                className="w-full h-full object-cover"
                src={image}
                alt={`Thumbnail ${index + 1}`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
