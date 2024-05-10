import Block from "@/components/Block/Block";
import { Grid } from "@mui/material";

const calculateGridItem = (sirina) => {
  switch (sirina) {
    case "20%":
      return 2;
    case "33.33%":
      return 4;
    case "50%":
      return 6;
    case "66.66%":
      return 8;
    case "80%":
      return 10;
    default:
      return 12;
  }
};

const ColumnsBlock = ({ innerBlocks }) => {
  return (
    <Grid container spacing={3}>
      {innerBlocks.map((block, i) => (
        <Grid item xs={12} xl={calculateGridItem(block.attributes.width)} key={i} sx={{ margin: "1rem 0" }}>
          {block.innerBlocks.map((innerBlock, j) => (
            <Block block={innerBlock} key={j} />
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default ColumnsBlock;
