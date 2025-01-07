import { useEffect, useState } from "react";

const ImgComponent = ({ node, ...props }) => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 }); // Default dimensions

  const fetchImageDimensions = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = reject;
      img.src = src;
    });
  };

  useEffect(() => {
    fetchImageDimensions(props.src)
      .then(({ width, height }) => {
        setDimensions({ width, height });
      })
      .catch((err) => {
        console.error("Error fetching image dimensions:", err);
      });
  }, [props.src]);

  return (
    <a
      className='pspw'
      href={props.src} // Full-size image URL
      data-pswp-width={dimensions.width}
      data-pswp-height={dimensions.height}
      data-lightbox-image
    >
      <img {...props} style={{ maxWidth: "100%", height: "auto", cursor: "pointer" }} alt={props.alt || "Image"} />
    </a>
  );
};

export default ImgComponent;
