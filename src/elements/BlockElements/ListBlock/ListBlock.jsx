import Block from "@/components/Block/Block";
import { List } from "@mui/material";

const ListBlock = ({ ordered, innerBlocks }) => {
  return (
    <List sx={{ listStyle: ordered ? "decimal" : "none" }}>
      {innerBlocks.map((block, i) => (
        <Block key={i} block={block} /* size={size} */ />
      ))}
    </List>
  );
};

export default ListBlock;
