import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import TableHeadMenu from "./TableHeadMenu";
import { ethers } from "ethers";
import { shortenString, formatDateTime } from "./helpers/ops";
import Link from "next/link";

export default function DenseTable({ items }: { items: any[] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event?.target?.value, 10));
    setPage(0);
  };
  console.log("Items", items);
  if (items) {
    return (
      <Paper sx={{ width: "100%", marginTop: "5 vh", boxShadow: 5 }}>
        <TableContainer component={Paper} sx={{ height: "70vh" }}>
          <Table
            sx={{ minWidth: 400 }}
            size="medium"
            aria-label="contacts table"
          >
            <TableHeadMenu />

            <TableBody>
              {items?.map((row: any, index: number) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      height: "1vh",
                    }}
                  >
                    <TableCell align="center">{row.block}</TableCell>
                    <TableCell align="center">
                      <Link
                        href={`https://base-sepolia.blockscout.com/address/${row.from.hash}`}
                        passHref
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {shortenString(row.from.hash)}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      {formatDateTime(row.timestamp)}
                    </TableCell>
                    <TableCell align="center">
                      {ethers.formatEther(row.value)}
                    </TableCell>
                    <TableCell align="center">
                      <Link
                        href={`https://base-sepolia.blockscout.com/tx/${row.transaction_hash}`}
                        passHref
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {shortenString(row.transaction_hash)}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{row.type}</TableCell>
                    <TableCell align="center">
                      {row.success ? <DoneIcon /> : <ErrorIcon />}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={items?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}
