import { TableHead, TableRow, TableCell } from "@mui/material";

const TableHeadMenu = () => {
  return (
    <TableHead>
      <TableRow
        sx={{
          background: "#1A76D2",
        }}
      >
        <TableCell
          sx={{
            fontWeight: "550",
            width: "15%",
            color: "white",
          }}
          align="center"
        >
          Block
        </TableCell>
        <TableCell
          sx={{
            fontWeight: "550",
            width: "15%",
            color: "white",
          }}
          align="center"
        >
          From
        </TableCell>
        <TableCell
          sx={{
            fontWeight: "550",
            width: "15%",
            color: "white",
          }}
          align="center"
        >
          Timestamp
        </TableCell>
        <TableCell
          sx={{
            fontWeight: "550",
            width: "15%",
            color: "white",
          }}
          align="center"
        >
          Value Ξ
        </TableCell>
        <TableCell
          sx={{
            fontWeight: "550",
            width: "15%",
            color: "white",
          }}
          align="center"
        >
          Transaction Hash
        </TableCell>
        <TableCell
          sx={{
            fontWeight: "550",
            width: "15%",
            color: "white",
          }}
          align="center"
        >
          Type
        </TableCell>
        <TableCell
          sx={{
            fontWeight: "550",
            width: "15%",
            color: "white",
          }}
          align="center"
        >
          Status
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeadMenu;
