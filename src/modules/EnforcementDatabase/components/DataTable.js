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

function extractDateToken(dateString) {
  if (!dateString) return "";
  const token = String(dateString).split("--")[0].trim();
  return token.replace(/[^0-9/.-]/g, "").trim();
}
function parseDate(dateString) {
  if (!dateString) return new Date(0); 
  const s = extractDateToken(dateString).trim();

  if (/^\d{4}$/.test(s)) return new Date(Number(s), 0, 1);
  if (/^\d{1,2}\/\d{4}$/.test(s)) {
    const [m, y] = s.split("/").map(Number);
    return new Date(y, m - 1, 1);
  }
  if (/^\d{1,2}\/\d{1,2}\/\d{2}$/.test(s)) {
    const [dd, mm, yy] = s.split("/").map(Number);
    return new Date(2000 + yy, mm - 1, dd);
  }
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) {
    const [m, d, y] = s.split("/").map(Number);
    const dt = new Date(y, m - 1, d);
    return Number.isNaN(dt.getTime()) ? new Date(0) : dt;
  }
  const dt = new Date(s);
  return Number.isNaN(dt.getTime()) ? new Date(0) : dt;
}

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
      return 1; // Treat "unknown" fines as 1
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

// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableFooter,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Button,
//   TextField,
//   Grid,
// } from "@mui/material";
// import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
// import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
// import { useState, useEffect } from "react";
// import data from "../Data/output.json";

// import TableItem from "./TableItem";

// function extractDateToken(dateString) {
//   if (!dateString) return "";
//   const token = String(dateString).split("--")[0].trim();
//   return token.replace(/[^0-9/.-]/g, "").trim();
// }

// function parseDate(dateString) {
//   if (!dateString) return new Date(0); 
//   const s = extractDateToken(dateString).trim();

//   if (/^\d{4}$/.test(s)) return new Date(Number(s), 0, 1);
//   if (/^\d{1,2}\/\d{4}$/.test(s)) {
//     const [m, y] = s.split("/").map(Number);
//     return new Date(y, m - 1, 1);
//   }
//   if (/^\d{1,2}\/\d{1,2}\/\d{2}$/.test(s)) {
//     const [dd, mm, yy] = s.split("/").map(Number);
//     return new Date(2000 + yy, mm - 1, dd);
//   }
//   if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) {
//     const [m, d, y] = s.split("/").map(Number);
//     const dt = new Date(y, m - 1, d);
//     return Number.isNaN(dt.getTime()) ? new Date(0) : dt;
//   }
//   const dt = new Date(s);
//   return Number.isNaN(dt.getTime()) ? new Date(0) : dt;
// }



// function getYearFromDate(dateString) {
//   if (!dateString) return NaN;
//   const s = String(dateString).trim();

//   if (/^\d{4}$/.test(s)) return Number(s);

//   if (/^\d{1,2}\/\d{4}$/.test(s)) return Number(s.split("/")[1]);

//   if (/^\d{1,2}\/\d{1,2}\/\d{2}$/.test(s)) return 2000 + Number(s.split("/")[2]);

//   if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) return Number(s.split("/")[2]);

//   return parseDate(dateString).getFullYear();

// }

// function parseYearFilter(input) {
//   const years = new Set();
//   const tokens = input
//     .split(/[\s,]+/)
//     .map((t) => t.trim())
//     .filter(Boolean);

//   tokens.forEach((tok) => {
//     const rangeMatch = tok.match(/^(\d{4})-(\d{4})$/);
//     if (rangeMatch) {
//       const start = Number(rangeMatch[1]);
//       const end = Number(rangeMatch[2]);
//       if (start <= end) {
//         for (let y = start; y <= end; y++) years.add(y);
//       } else {
//         for (let y = start; y >= end; y--) years.add(y);
//       }
//     } else if (/^\d{4}$/.test(tok)) {
//       years.add(Number(tok));
//     }
//   });
//   return years;
// }

// const DataTable = () => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [sortByDate, setSortByDate] = useState("desc");
//   const [sortByFine, setSortByFine] = useState("desc");
//   const [sortedData, setSortedData] = useState(data);
//   const [companyFilter, setCompanyFilter] = useState("");
//   const [countryFilter, setCountryFilter] = useState("");
//   const [articleFilter, setArticleFilter] = useState("");
//   const [decisionFilter, setDecisionFilter] = useState("");
//   const [yearFilter, setYearFilter] = useState("");
//   const [lastClickedSortOption, setLastClickedSortOption] = useState(null);

//   const handlePageChange = (_event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };


//   const handleSortByDecisionDate = () => {
//     setSortByDate((prev) => (prev === "asc" ? "desc" : "asc"));
//     setLastClickedSortOption("date");
//   };

//   const handleSortByFine = () => {
//     setSortByFine((prev) => (prev === "asc" ? "desc" : "asc"));
//     setLastClickedSortOption("fine");
//   };

//   function parseFine(fine) {
//     const match = fine?.match(/between (\d+) and (\d+)/i);
//     if (match) {
//       const lowerValue = parseInt(match[1]);
//       const upperValue = parseInt(match[2]);
//       return (lowerValue + upperValue) / 2;
//     } else if (String(fine).toLowerCase() === "unknown") {
//       return NaN;
//     } else if (fine === "0") {
//       return 0;
//     }
//     return parseFloat(String(fine).replace(/,/g, ""));
//   }

//   useEffect(() => {
//     let filteredData = data;

//     if (companyFilter.trim() !== "") {
//       filteredData = filteredData.filter((row) =>
//         row.company.toLowerCase().includes(companyFilter.toLowerCase())
//       );
//     }

//     if (countryFilter.trim() !== "") {
//       filteredData = filteredData.filter((row) =>
//         row.country.toLowerCase().includes(countryFilter.toLowerCase())
//       );
//     }

//     if (articleFilter.trim() !== "") {
//       const searchNumbers = articleFilter.trim().split(/\s+/);
//       filteredData = filteredData.filter((row) => {
//         const quotedArtNumbers = row.quotedArt.split(", ");
//         for (const number of searchNumbers) {
//           if (!quotedArtNumbers.includes(number)) {
//             return false;
//           }
//         }
//         return true;
//       });
//     }

//     if (decisionFilter.trim() !== "") {
//       filteredData = filteredData.filter((row) =>
//         row.decision.toLowerCase().includes(decisionFilter.toLowerCase())
//       );
//     }

//     if (yearFilter.trim() !== "") {
//       const wantedYears = parseYearFilter(yearFilter);
//       if (wantedYears.size > 0) {
//         filteredData = filteredData.filter((row) =>
//           wantedYears.has(getYearFromDate(row.date))
//         );
//       }
//     }

//     const sorted = [...filteredData].sort((a, b) => {
//       const dateA = parseDate(a.date);
//       const dateB = parseDate(b.date);
//       const numA = parseFine(a.fine);
//       const numB = parseFine(b.fine);

//       if (lastClickedSortOption === "fine") {
//         const isANumeric = !Number.isNaN(numA);
//         const isBNumeric = !Number.isNaN(numB);

//         if (isANumeric && isBNumeric) {
//           return sortByFine === "asc" ? numA - numB : numB - numA;
//         } else if (!isANumeric && !isBNumeric) {
//           return sortByFine === "asc"
//             ? String(a.fine).localeCompare(String(b.fine))
//             : String(b.fine).localeCompare(String(a.fine));
//         }
//       } else if (lastClickedSortOption === "date") {
//         return sortByDate === "asc"
//           ? dateA - dateB
//           : dateB - dateA;
//       }

//       return dateB - dateA;
//     });

//     setSortedData(sorted);
//   }, [
//     companyFilter,
//     countryFilter,
//     articleFilter,
//     sortByDate,
//     sortByFine,
//     lastClickedSortOption,
//     decisionFilter,
//     yearFilter,
//   ]);

//   return (
//     <>
//       <TableContainer component={Paper} sx={{ maxWidth: "95%", marginBottom: "45px" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ textAlign: "center" }}>
//                 <Grid container direction="row">
//                   <Grid item xs={12}>Country</Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       variant="outlined"
//                       size="small"
//                       onChange={(event) => setCountryFilter(event.target.value)}
//                     />
//                   </Grid>
//                 </Grid>
//               </TableCell>

//               <TableCell sx={{ textAlign: "center" , minWidth: 160}}>
//                 <Grid container direction="column" spacing={1}>
//                   <Grid item xs={12}>Decision Date</Grid>
//                   <Grid item xs={12}>
//                     <Grid container alignItems="center" justifyContent="center" spacing={1} wrap="nowrap">
//                       <Grid item>
//                         <Button onClick={handleSortByDecisionDate} sx={{ minWidth: "36px", padding: "1px" }}>
//                         {sortByDate === "asc" ? (
//                           <ArrowDownward sx={{ color: "#004494" }} />
//                         ) : (
//                           <ArrowUpward sx={{ color: "#004494" }} />
//                         )}
//                         </Button>
//                       </Grid>
//                       <Grid item>
//                         <TextField
//                           variant="outlined"
//                           size="small"
//                           value={yearFilter}
//                           onChange={(e) => setYearFilter(e.target.value)}
//                           placeholder=""
//                           sx={{ width: 90, "& .MuiInputBase-input": { padding: "2px 2px", fontSize: "1rem", textAlign: "center" }, "& .MuiOutlinedInput-root": { height: "30px" } }}
//                         />
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </TableCell>

//               <TableCell sx={{ textAlign: "center" }}>
//                 <Grid container direction="row">
//                   <Grid item xs={12}>Fine (in €)</Grid>
//                   <Grid item xs={12}>
//                     <Button onClick={handleSortByFine}>
//                       {sortByFine === "asc" ? (
//                         <ArrowDownward sx={{ color: "#004494" }} />
//                       ) : (
//                         <ArrowUpward sx={{ color: "#004494" }} />
//                       )}
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </TableCell>

//               <TableCell sx={{ textAlign: "center" }}>
//                 <Grid container direction="row">
//                   <Grid item xs={12}>Decision</Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       variant="outlined"
//                       size="small"
//                       onChange={(event) => setDecisionFilter(event.target.value)}
//                     />
//                   </Grid>
//                 </Grid>
//               </TableCell>

//               <TableCell sx={{ textAlign: "center" }}>
//                 <Grid container direction="row">
//                   <Grid item xs={12}>Company</Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       variant="outlined"
//                       size="small"
//                       onChange={(event) => setCompanyFilter(event.target.value)}
//                     />
//                   </Grid>
//                 </Grid>
//               </TableCell>

//               <TableCell sx={{ textAlign: "center" }}>
//                 <Grid container direction="row">
//                   <Grid item xs={12}>Quoted Article</Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       variant="outlined"
//                       size="small"
//                       onChange={(event) => setArticleFilter(event.target.value)}
//                     />
//                   </Grid>
//                 </Grid>
//               </TableCell>

//               <TableCell sx={{ textAlign: "center" }}>Source</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {sortedData
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row, index) => (
//                 <TableItem row={row} key={`${row.source}-${index}`} />
//               ))}
//           </TableBody>

//           <TableFooter>
//             <TableRow>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 50, 100]}
//                 page={page}
//                 count={sortedData.length}
//                 rowsPerPage={rowsPerPage}
//                 onPageChange={handlePageChange}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//                 ActionsComponent={TablePaginationActions}
//               />
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>
//     </>
//   );
// };

// export default DataTable;

// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableFooter,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Button,
//   TextField,
//   Grid,
// } from "@mui/material";
// import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
// import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
// import { useState, useEffect } from "react";
// import data from "../Data/output.json";

// import TableItem from "./TableItem";

// const DataTable = () => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [sortByDate, setSortByDate] = useState("desc");
//   const [sortByFine, setSortByFine] = useState("desc");
//   const [sortedData, setSortedData] = useState(data);
//   const [companyFilter, setCompanyFilter] = useState("");
//   const [countryFilter, setCountryFilter] = useState("");
//   const [articleFilter, setArticleFilter] = useState("");
//   const [decisionFilter, setDecisionFilter] = useState("");
//   const [lastClickedSortOption, setLastClickedSortOption] = useState(null);

//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   function parseDate(dateString) {
//     if (dateString.length === 4){
//       return new Date(dateString, 0, 0, 23, 60)
//     }
//     const [month, day, year] = dateString.split("/");
//     // Months are zero-based in JavaScript Date objects, so subtract 1 from the month
//     return new Date(year, month - 1, day);
//   }
//   const handleSortByDecisionDate = () => {
//     setSortByDate(sortByDate === "asc" ? "desc" : "asc");
//     setLastClickedSortOption("date");
//   };

//   const handleSortByFine = () => {
//     setSortByFine(sortByFine === "asc" ? "desc" : "asc");
//     setLastClickedSortOption("fine");
//   };

//   function parseFine(fine) {
//     const match = fine.match(/between (\d+) and (\d+)/i);
//     if (match) {
//       const lowerValue = parseInt(match[1]);
//       const upperValue = parseInt(match[2]);
//       return (lowerValue + upperValue) / 2; // Taking the average of the range
//     } else if (fine.toLowerCase() === "unknown") {
//       return 1; // Treat "unknown" fines as 1
//     } else if (fine === "0") {
//       return 0; // Treat explicit "0" as 0
//     }
//     return parseFloat(fine.replace(/,/g, ""));
//   }

//   useEffect(() => {
//     let filteredData = data;

//     if (companyFilter.trim() !== "") {
//       filteredData = filteredData.filter((row) => {
//         return row.company.toLowerCase().includes(companyFilter.toLowerCase());
//       });
//     }

//     if (countryFilter.trim() !== "") {
//       filteredData = filteredData.filter((row) => {
//         return row.country.toLowerCase().includes(countryFilter.toLowerCase());
//       });
//     }

//     if (articleFilter.trim() !== "") {
//       const searchNumbers = articleFilter.trim().split(" ");
//       filteredData = filteredData.filter((row) => {
//         const quotedArtNumbers = row.quotedArt.split(", ");
//         for (const number of searchNumbers) {
//           if (!quotedArtNumbers.includes(number)) {
//             return false;
//           }
//         }
//         return true;
//       });
//     }

//     if (decisionFilter.trim() !== "") {
//       filteredData = filteredData.filter((row) => {
//         return row.decision
//           .toLowerCase()
//           .includes(decisionFilter.toLowerCase());
//       });
//     }

//     let sorted = [...filteredData];
//     sorted.sort((a, b) => {
//       const dateA = parseDate(a.date);
//       const dateB = parseDate(b.date);
//       const numA = parseFine(a.fine);
//       const numB = parseFine(b.fine);
    
//       if (lastClickedSortOption === "fine") {
//         const isANumeric = !isNaN(numA);
//         const isBNumeric = !isNaN(numB);
    
//         if (isANumeric && isBNumeric) {
//           return sortByFine === "asc" ? numA - numB : numB - numA;
//         } else if (!isANumeric && !isBNumeric) {
//           if (a.fine === "unknown" && b.fine === "unknown") {
//             return sortByDate === "asc" ? dateA - dateB : dateB - dateA;
//           }
//           return sortByFine === "asc" ? a.fine.localeCompare(b.fine) : b.fine.localeCompare(a.fine);
//         } else if (!isANumeric) {
//           if (a.fine === "unknown") {
//             return -1;
//           } else if (a.fine === "0") {
//             return 1;
//           } else {
//             return 1; // Move other non-numeric fines after numeric fines
//           }
//         } else if (!isBNumeric) {
//           if (b.fine === "unknown") {
//             return 1;
//           } else if (b.fine === "0") {
//             return -1;
//           } else {
//             return -1; // Move other non-numeric fines after numeric fines
//           }
//         }
//       } else if (lastClickedSortOption === "date") {
//         if (dateA.getTime() === dateB.getTime()) {
//           const isANumeric = !isNaN(numA);
//           const isBNumeric = !isNaN(numB);
    
//           if (isANumeric && isBNumeric) {
//             return sortByFine === "asc" ? numA - numB : numB - numA;
//           } else if (!isANumeric && !isBNumeric) {
//             if (a.fine === "unknown" && b.fine === "unknown") {
//               return 0;
//             }
//             return sortByFine === "asc" ? a.fine.localeCompare(b.fine) : b.fine.localeCompare(a.fine);
//           } else if (!isANumeric) {
//             if (a.fine === "unknown") {
//               return -1;
//             } else if (a.fine === "0") {
//               return 1;
//             } else {
//               return 1; // Move other non-numeric fines after numeric fines
//             }
//          } else if (!isBNumeric) {
//             if (b.fine === "unknown") {
//               return 1;
//             } else if (b.fine === "0") {
//               return -1;
//             } else {
//               return -1; // Move other non-numeric fines after numeric fines
//             }
//           }
//         }
//         return sortByDate === "asc" ? dateA - dateB : dateB - dateA;
//       }
    
//       // Default sorting by date if no lastClickedSortOption is set
//       return dateB - dateA;
//     });
    
//     setSortedData(sorted)
    
//   }, [
//     companyFilter,
//     countryFilter,
//     articleFilter,
//     sortByDate,
//     sortByFine,
//     lastClickedSortOption,
//     decisionFilter,
//   ]);

//   return (
//     <>
//       <TableContainer
//         component={Paper}
//         sx={{ maxWidth: "95%", marginBottom: "45px" }}
//       >
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ textAlign: "center" }}>
//                 <Grid container direction="row">
//                   <Grid item xs={12}>
//                     Country
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       variant="outlined"
//                       size="small"
//                       onChange={(event) => setCountryFilter(event.target.value)}
//                     ></TextField>
//                   </Grid>
//                 </Grid>
//               </TableCell>
//               <TableCell sx={{ textAlign: "center" }}>
//                 <Grid container direction="row">
//                   <Grid item xs={12}>
//                     Decision Date
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button onClick={handleSortByDecisionDate}>
//                       {sortByDate === "asc" ? (
//                         <ArrowDownward color="#004494" />
//                       ) : (
//                         <ArrowUpward color="#004494" />
//                       )}
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </TableCell>
//               <TableCell sx={{ textAlign: "center" }}>
//                 <Grid container direction="row">
//                   <Grid item xs={12}>
//                     Fine (in €)
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button onClick={handleSortByFine}>
//                       {sortByFine === "asc" ? (
//                         <ArrowDownward color="#004494" />
//                       ) : (
//                         <ArrowUpward color="#004494" />
//                       )}
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </TableCell>
//               <TableCell sx={{ textAlign: "center" }}>
//                 <Grid container direction="row">
//                   <Grid item xs={12}>
//                     Decision
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       variant="outlined"
//                       size="small"
//                       onChange={(event) =>
//                         setDecisionFilter(event.target.value)
//                       }
//                     ></TextField>
//                   </Grid>
//                 </Grid>
//               </TableCell>
//               <TableCell sx={{ textAlign: "center" }}>
//                 <Grid container direction="row">
//                   <Grid item xs={12}>
//                     Company
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       variant="outlined"
//                       size="small"
//                       onChange={(event) => setCompanyFilter(event.target.value)}
//                     ></TextField>
//                   </Grid>
//                 </Grid>
//               </TableCell>
//               <TableCell sx={{ textAlign: "center" }}>
//                 <Grid container direction="row">
//                   <Grid item xs={12}>
//                     Quoted Article
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       variant="outlined"
//                       size="small"
//                       onChange={(event) => setArticleFilter(event.target.value)}
//                     ></TextField>
//                   </Grid>
//                 </Grid>
//               </TableCell>
//               <TableCell sx={{ textAlign: "center" }}>Source</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {sortedData
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row, index) => (
//                 <TableItem row={row} key={`${row.source}-${index}`} />
//               ))}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 50, 100]}
//                 page={page}
//                 count={sortedData.length}
//                 rowsPerPage={rowsPerPage}
//                 onPageChange={handlePageChange}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//                 ActionsComponent={TablePaginationActions}
//               />
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>
//     </>
//   );
// };

// export default DataTable;
