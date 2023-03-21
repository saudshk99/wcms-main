import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";


const List = () => {
  const [PageNumber,setPageNumber]=useState(1)

  const { data , isLoading , isError , error } = useQuery(['Get_warrenty_claim',PageNumber], (PageNumber) => {
    return(axios.get(`http://127.0.0.1:8000/api/warrenty-get/?limit=2&page=${PageNumber}`))

  });
  
  if (isLoading) {

    return (<div>
      <h1>Loading</h1>
    </div>)
  }
  if (isError) {
    return (<div>
      <h1>'Problem Getting Data':{error}</h1>
    </div>)
  }
  
  return (
    <>
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell className="tableCell">Ticket No</TableCell>
            <TableCell className="tableCell">Full Name</TableCell>
            <TableCell className="tableCell">Contact No</TableCell>
            <TableCell className="tableCell">Battery Brand</TableCell>
            <TableCell className="tableCell">Battery Type</TableCell>
            <TableCell className="tableCell">Battery Sr.No</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
    {data?.data.map((row,index) => {
          return(
          <TableBody>
            <TableRow key={row.Ticket_no}>
              
              <TableCell className="tableCell">{row.Ticket_no}</TableCell>
              <TableCell className="tableCell">{row.Name} {row.Last_Name}</TableCell>
              <TableCell className="tableCell">{row.contact_no}</TableCell>
              <TableCell className="tableCell">{row.Battery_brand}</TableCell>
              <TableCell className="tableCell">{row.Battery_type}</TableCell>
              <TableCell className="tableCell">{row.Battery_SerialNumber}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.Status}`}>{row.Status}</span>
              </TableCell>
            </TableRow>
          </TableBody>
          )
          
        })}
      </Table>
    </TableContainer>
    <div>
      <button onClick={()=>setPageNumber(page=>page-1)} disabled={PageNumber===1}>Previous</button>
      <button onClick={()=>setPageNumber(page=>page+1)} disabled={PageNumber===5} className="float-end">Next</button>
    </div>
  </>
  );
};


export default List;
