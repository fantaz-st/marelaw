import parseHtml from "@/functions/parser";
import { ListItem, Typography } from "@mui/material";

const ListItemBlock = (props) => {
  return (
    <ListItem sx={{ fontSize: `${props.size * 0.5}rem`, paddingBottom: "0" }}>
      <Typography className='list-item' variant='body' component='p'>
        {parseHtml(props.content)}
      </Typography>
    </ListItem>
  );
};

export default ListItemBlock;
