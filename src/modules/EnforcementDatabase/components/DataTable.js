import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { useState, useEffect } from "react";
import data from '../Data/output.json'

import TableItem from "./TableItem";


const DataTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortByDate, setSortByDate] = useState("desc");
  // const [sortByFine, setSortByFine] = useState("desc");
  const [sortedData, setSortedData] = useState(data);
  const [companyFilter, setCompanyFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [articleFilter, setArticleFilter] = useState("");


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function parseDate(dateString) {
    const [day, month, year] = dateString.split("/");
    // Months are zero-based in JavaScript Date objects, so subtract 1 from the month
    return new Date(year, month - 1, day);
  }

  useEffect(() => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);

      if (sortByDate === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    setSortedData(sorted);
  }, [sortByDate]);

  const handleSortByDecisionDate = () => {
    setSortByDate(sortByDate === "asc" ? "desc" : "asc");
  };

  // function convertToNumericValue(fine) {
  //   // Check if the fine is a string with comma-separated values
  //   if (typeof fine === "string" && fine.includes(",")) {
  //     // Remove commas and convert the string to a number
  //     return parseInt(fine.replace(/,/g, ""), 10);
  //   }

  //   // Handle other formats or already numeric values
  //   return Number(fine);
  // }

  // useEffect(() => {
  //   const sorted = [...data];
  //   sorted.sort((a, b) => {
  //     const fineA = convertToNumericValue(a.fine);
  //     const fineB = convertToNumericValue(b.fine);

  //     if (sortByFine === "asc") {
  //       return fineA - fineB;
  //     } else {
  //       return fineB - fineA;
  //     }
  //   });
  //   setSortedData(sorted);
  // }, [sortByFine]);

  // const handleSortByFine = () => {
  //   setSortByFine(sortByFine === "asc" ? "desc" : "asc");
  // };

  useEffect(() => {
    let filteredData = data;

    if (companyFilter.trim() !== "") {
      filteredData = filteredData.filter((row) => {
        return row.company.toLowerCase().includes(companyFilter.toLowerCase());
      });
    }

    if (countryFilter.trim() !== "") {
      filteredData = filteredData.filter((row) => {
        return row.country.toLowerCase().includes(countryFilter.toLowerCase());
      });
    }

    if (articleFilter.trim() !== "") {
      const searchNumbers = articleFilter.trim().split(" ");
      filteredData = filteredData.filter((row) => {
        const quotedArtNumbers = row.quotedArt.split(", ");
        for (const number of searchNumbers) {
          if (!quotedArtNumbers.includes(number)) {
            return false;
          }
        }
        return true;
      });
    }

    setSortedData(filteredData);
  }, [companyFilter, countryFilter, articleFilter]);

  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: "95%", marginBottom: '45px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    Country
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      size="small"
                      onChange={(event) => setCountryFilter(event.target.value)}
                    ></TextField>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    Decision Date
                  </Grid>
                  <Grid item xs={12}>
                    <Button onClick={handleSortByDecisionDate}>
                      {sortByDate === "asc" ? (
                        <ArrowDownward color="#004494" />
                      ) : (
                        <ArrowUpward color="#004494" />
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    Fine
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Button onClick={handleSortByFine}>
                      {sortByFine === "asc" ? (
                        <ArrowDownward color="#004494" />
                      ) : (
                        <ArrowUpward color="#004494" />
                      )}
                    </Button>
                  </Grid> */}
                </Grid>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>Decision</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    Company
                  </Grid>
                  <Grid item xs={12}>
                    {" "}
                    <TextField
                      variant="outlined"
                      size="small"
                      onChange={(event) => setCompanyFilter(event.target.value)}
                    ></TextField>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    Quoted Article
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      size="small"
                      onChange={(event) => setArticleFilter(event.target.value)}
                    ></TextField>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableItem row={row} key={row.id} />
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 50]}
                page={page}
                count={sortedData.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default DataTable;
