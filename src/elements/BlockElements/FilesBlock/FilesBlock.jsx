import DownloadIcon from "@mui/icons-material/Download";
import { Box, Tooltip } from "@mui/material";
import classes from "./FilesBlock.module.css";

const PdfIcon = () => {
  return (
    <svg version='1.1' x='0px' y='0px' viewBox='0 0 31.9 40' style={{ height: "30px" }}>
      <path
        className='st0'
        d='M25.7,26.1c-0.5,0.1-1.2,0.2-2,0c-0.8-0.1-1.7-0.4-2.5-0.7c1.5-0.2,2.6-0.1,3.6,0.2
	C25,25.7,25.4,25.9,25.7,26.1z M17.5,24.7c-0.1,0-0.1,0-0.2,0c-0.4,0.1-0.8,0.2-1.2,0.3l-0.5,0.1c-1,0.3-2,0.5-3.1,0.8
	c0.4-0.9,0.7-1.9,1.1-2.8c0.3-0.7,0.5-1.4,0.8-2.1c0.1,0.2,0.3,0.5,0.4,0.7C15.6,22.9,16.5,23.9,17.5,24.7z M14.9,14.2
	c0.1,1.2-0.2,2.3-0.5,3.3c-0.4-1.3-0.7-2.8-0.1-3.9c0.1-0.3,0.3-0.5,0.3-0.5C14.7,13.3,14.9,13.7,14.9,14.2z M9.6,28.8
	c-0.3,0.5-0.5,0.9-0.8,1.3c-0.6,1-1.7,2-2.2,2c-0.1,0-0.1,0-0.2-0.1c-0.1-0.1-0.1-0.1-0.1-0.2c0-0.4,0.5-1,1.2-1.6
	C8.1,29.7,8.8,29.2,9.6,28.8z M27.4,26.1c-0.1-1.2-2.1-1.9-2.1-1.9c-0.8-0.3-1.6-0.4-2.5-0.4c-1,0-2.1,0.1-3.5,0.5
	c-1.2-0.9-2.3-2-3.1-3.2c-0.4-0.5-0.7-1.1-1-1.6c0.7-1.6,1.3-3.4,1.2-5.3c-0.1-1.6-0.8-2.6-1.8-2.6c-0.7,0-1.2,0.5-1.7,1.5
	c-0.8,1.7-0.6,3.9,0.6,6.5c-0.4,1.1-0.9,2.2-1.3,3.2c-0.5,1.3-1,2.7-1.6,4c-1.6,0.6-3,1.4-4.1,2.4c-0.7,0.6-1.6,1.6-1.7,2.6
	c0,0.5,0.1,0.9,0.5,1.3c0.4,0.4,0.8,0.6,1.3,0.6c1.6,0,3.1-2.2,3.4-2.6c0.6-0.9,1.1-1.9,1.7-3c1.4-0.5,2.8-0.9,4.2-1.2l0.5-0.1
	c0.4-0.1,0.8-0.2,1.2-0.3c0.4-0.1,0.9-0.2,1.3-0.3c1.4,0.9,3,1.5,4.5,1.7c1.3,0.2,2.4,0.1,3.2-0.3C27.3,26.9,27.4,26.4,27.4,26.1z
	 M30.5,36.2c0,2.2-1.9,2.3-2.3,2.3H3.7c-2.1,0-2.3-1.9-2.3-2.3l0-32.5c0-2.2,1.9-2.3,2.3-2.3h16.5l0,0v6.4c0,1.3,0.8,3.7,3.7,3.7
	h6.4l0.1,0.1L30.5,36.2z M29,10.2H24c-2.1,0-2.3-1.9-2.3-2.3V3L29,10.2z M31.9,36.2V11.1L21.7,0.9v0h0L20.9,0H3.7C2.4,0,0,0.8,0,3.8
	v32.5C0,37.5,0.8,40,3.7,40h24.5C29.5,40,31.9,39.2,31.9,36.2z'
      />
    </svg>
  );
};
const FilesBlock = (props) => {
  const cleanContent = props.dynamicContent ? props.dynamicContent.trim() : "<h1>some error</h1>";
  console.log(props);
  return (
    <Box className={classes.div} sx={{ borderBottom: "1px solid", borderBottomColor: { xs: "text.secondary", md: "transparent" }, padding: "0.5rem 0" }}>
      <PdfIcon />
      <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
      <Box className={classes.icons}>
        <a download href={props.attributes.href} style={{ textDecoration: "none" }} target='_blank' rel='noopener noreferrer' alt='Download file'>
          <Tooltip title='Download file' arrow>
            <DownloadIcon className={classes.arrow} />
          </Tooltip>
        </a>
      </Box>
    </Box>
  );
};

export default FilesBlock;
