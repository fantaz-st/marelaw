import { Box } from "@mui/material";

const PaddingGlobal = ({ children }) => {
  return <Box sx={{ maxWidth: { xs: "100%", md: "80%" }, margin: "0 auto", padding: { xs: "0 5%", md: 0 } }}>{children}</Box>;
};

export default PaddingGlobal;
