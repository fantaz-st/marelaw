import { Box } from "@mui/material";
import classes from "./ArticleFeaturedImage.module.css";
import Image from "next/image";

const ArticleFeaturedImage = ({ src, alt, placeholder }) => {
  /* const [imageLoaded, setImageLoaded] = useState(null);

  const removePlaceholder = () => {
    setImageLoaded(true);
  }; */
  return (
    <Box className={classes.container}>
      <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} /* onLoad={removePlaceholder}  */ placeholder='blur' blurDataURL={placeholder} />
      {/* <Box className={imageLoaded ? `${classes.backdrop} ${classes.loaded}` : classes.backdrop} /> */}
    </Box>
  );
};

export default ArticleFeaturedImage;
