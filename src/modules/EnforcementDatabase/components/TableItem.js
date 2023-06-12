import { TableRow, TableCell } from "@mui/material";

const TableItem = ({ row }) => {
  return (
    <TableRow key={row.id}>
      <TableCell sx={{ textAlign: "center" }}>{row.country}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{row.date}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{row.fine}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{row.decision}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{row.company}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{row.quotedArt}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        {" "}
        <a
          href={row.source}
          style={{ textDecoration: "none", color: "#004494" }}
          target="_blank"
          rel="noreferrer"
        >
          Link
        </a>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
