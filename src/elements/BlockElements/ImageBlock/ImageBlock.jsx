import Image from "next/image";
// import classes from "./ImageBlock.module.css";
import { Box, Typography } from "@mui/material";

const ImageBlock = ({ url, alt, caption, className, height, width, aspectRatio }) => {
  if (aspectRatio) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ aspectRatio: aspectRatio, position: "relative" }}>
          <Image src={url} alt={caption || alt || ""} data-lightboxjs='lightbox1' fill style={{ objectFit: "cover" }} sizes='(max-width: 360px) 100vw,(max-width: 1024px) 66vw,33vw' quality={100} />
        </Box>
        {caption && <Typography variant='body3'>{caption}</Typography>}
      </Box>
    );
  } else if (height && width) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ height: height, width: width, position: "relative" }}>
          <Image src={url} alt={caption || alt || ""} data-lightboxjs='lightbox1' fill style={{ objectFit: "cover" }} sizes='(max-width: 360px) 100vw,(max-width: 1024px) 66vw,33vw' quality={100} />
        </Box>
        {caption && <Typography variant='body3'>{caption}</Typography>}
      </Box>
    );
  }
};

export default ImageBlock;
