import parseHtml from "@/functions/parser";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const TableBlock = (props) => {
  return (
    <Table>
      {props.head[0] && (
        <TableHead>
          <TableRow>
            {props.head[0].cells.map((cell, i) => (
              <TableCell key={i}>{parseHtml(cell.content)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
      )}
      <TableBody>
        {props.body.map((row, i) => (
          <TableRow key={i}>
            {row.cells.map((bodyCell, i) => (
              <TableCell key={i}>{parseHtml(bodyCell.content)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableBlock;
