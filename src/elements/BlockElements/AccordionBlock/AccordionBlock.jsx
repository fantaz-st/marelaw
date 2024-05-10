import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Block from "@/components/Block/Block";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const AccordionBlock = (props) => {
  const CustomExpandIcon = () => {
    return (
      <Box
        sx={{
          ".Mui-expanded & > .collapsIconWrapper": {
            display: "none",
          },
          ".expandIconWrapper": {
            display: "none",
          },
          ".Mui-expanded & > .expandIconWrapper": {
            display: "block",
          },
        }}
      >
        <div className='expandIconWrapper'>
          <HighlightOffIcon />
        </div>
        <div className='collapsIconWrapper'>
          <AddCircleOutlineIcon />
        </div>
      </Box>
    );
  };
  return (
    <Accordion square={true} sx={{ backgroundColor: "background.lighter" }}>
      <AccordionSummary expandIcon={<CustomExpandIcon />} aria-controls='panel1bh-content' id='panel1bh-header'>
        <Typography variant='h5'>{props.components[0].attributes.content}</Typography>
        {/* <Block block={props.components[0]} /> */}
      </AccordionSummary>
      <AccordionDetails>
        {props.components.slice(1).map((comp, i) => (
          <Block block={comp} key={i} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionBlock;
