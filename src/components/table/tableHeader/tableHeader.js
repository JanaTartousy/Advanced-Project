import { TableCell, TableHead, TableRow } from "@mui/material";
import "./tableHeader.css"
function TableHeader({columns}) {
  return (
    <TableHead className="table--header">
      <TableRow>
        {columns.map((column,index)=>{
          return <TableCell key={index}>{column}</TableCell>
        })}
        <TableCell>Action</TableCell>
        
      </TableRow>
    </TableHead>
  );
}
export default TableHeader