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
import data from "../Data/output.json";

import TableItem from "./TableItem";

const DataTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortByDate, setSortByDate] = useState("desc");
  const [sortByFine, setSortByFine] = useState("desc");
  const [sortedData, setSortedData] = useState(data);
  const [companyFilter, setCompanyFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [articleFilter, setArticleFilter] = useState("");
  const [decisionFilter, setDecisionFilter] = useState("");
  const [lastClickedSortOption, setLastClickedSortOption] = useState(null);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function parseDate(dateString) {
    if (dateString.length === 4){
      return new Date(dateString, 0, 0, 23, 60)
    }
    const [month, day, year] = dateString.split("/");
    // Months are zero-based in JavaScript Date objects, so subtract 1 from the month
    return new Date(year, month - 1, day);
  }
  const handleSortByDecisionDate = () => {
    setSortByDate(sortByDate === "asc" ? "desc" : "asc");
    setLastClickedSortOption("date");
  };

  const handleSortByFine = () => {
    setSortByFine(sortByFine === "asc" ? "desc" : "asc");
    setLastClickedSortOption("fine");
  };

  function parseFine(fine) {
    const match = fine.match(/between (\d+) and (\d+)/i);
    if (match) {
      const lowerValue = parseInt(match[1]);
      const upperValue = parseInt(match[2]);
      return (lowerValue + upperValue) / 2; // Taking the average of the range
    } else if (fine.toLowerCase() === "unknown") {
      return 1; // Treat "unknown" fines as -1
    } else if (fine === "0") {
      return 0; // Treat explicit "0" as 0
    }
    return parseFloat(fine.replace(/,/g, ""));
  }

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

    if (decisionFilter.trim() !== "") {
      filteredData = filteredData.filter((row) => {
        return row.decision
          .toLowerCase()
          .includes(decisionFilter.toLowerCase());
      });
    }

    let sorted = [...filteredData];
    sorted.sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      const numA = parseFine(a.fine);
      const numB = parseFine(b.fine);
    
      if (lastClickedSortOption === "fine") {
        const isANumeric = !isNaN(numA);
        const isBNumeric = !isNaN(numB);
    
        if (isANumeric && isBNumeric) {
          return sortByFine === "asc" ? numA - numB : numB - numA;
        } else if (!isANumeric && !isBNumeric) {
          if (a.fine === "unknown" && b.fine === "unknown") {
            return sortByDate === "asc" ? dateA - dateB : dateB - dateA;
          }
          return sortByFine === "asc" ? a.fine.localeCompare(b.fine) : b.fine.localeCompare(a.fine);
        } else if (!isANumeric) {
          if (a.fine === "unknown") {
            return -1;
          } else if (a.fine === "0") {
            return 1;
          } else {
            return 1; // Move other non-numeric fines after numeric fines
          }
        } else if (!isBNumeric) {
          if (b.fine === "unknown") {
            return 1;
          } else if (b.fine === "0") {
            return -1;
          } else {
            return -1; // Move other non-numeric fines after numeric fines
          }
        }
      } else if (lastClickedSortOption === "date") {
        if (dateA.getTime() === dateB.getTime()) {
          const isANumeric = !isNaN(numA);
          const isBNumeric = !isNaN(numB);
    
          if (isANumeric && isBNumeric) {
            return sortByFine === "asc" ? numA - numB : numB - numA;
          } else if (!isANumeric && !isBNumeric) {
            if (a.fine === "unknown" && b.fine === "unknown") {
              return 0;
            }
            return sortByFine === "asc" ? a.fine.localeCompare(b.fine) : b.fine.localeCompare(a.fine);
          } else if (!isANumeric) {
            if (a.fine === "unknown") {
              return -1;
            } else if (a.fine === "0") {
              return 1;
            } else {
              return 1; // Move other non-numeric fines after numeric fines
            }
         } else if (!isBNumeric) {
            if (b.fine === "unknown") {
              return 1;
            } else if (b.fine === "0") {
              return -1;
            } else {
              return -1; // Move other non-numeric fines after numeric fines
            }
          }
        }
        return sortByDate === "asc" ? dateA - dateB : dateB - dateA;
      }
    
      // Default sorting by date if no lastClickedSortOption is set
      return dateB - dateA;
    });
    
    setSortedData(sorted)
    
  }, [
    companyFilter,
    countryFilter,
    articleFilter,
    sortByDate,
    sortByFine,
    lastClickedSortOption,
    decisionFilter,
  ]);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "95%", marginBottom: "45px" }}
      >
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
                    Fine (in €)
                  </Grid>
                  <Grid item xs={12}>
                    <Button onClick={handleSortByFine}>
                      {sortByFine === "asc" ? (
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
                    Decision
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      size="small"
                      onChange={(event) =>
                        setDecisionFilter(event.target.value)
                      }
                    ></TextField>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    Company
                  </Grid>
                  <Grid item xs={12}>
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
              .map((row, index) => (
                <TableItem row={row} key={`${row.source}-${index}`} />
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 50, 100]}
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
