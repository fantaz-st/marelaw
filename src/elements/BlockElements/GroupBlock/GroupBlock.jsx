import Block from "@/components/Block/Block";
import { Box } from "@mui/material";

const GroupBlock = ({ innerBlocks }) => {
  return (
    <Box spacing={3}>
      {innerBlocks.map((block, i) => (
        <Block block={block} key={i} />
      ))}
    </Box>
  );
};

export default GroupBlock;
