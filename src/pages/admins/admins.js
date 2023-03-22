import "./admins.css";
import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import axios from "axios";
import { UserContext } from "../../userContext";
import PageHeader from "../../components/pageHeader/pageHeader";

function Admins() {
  const [admins, setAdmins] = useState([]);
  const { token } = useContext(UserContext);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response)
        const data = response.data;
        setAdmins(
          data.message.map((admin) => {
            return {
              id: admin.id,
              name: admin.name,
              email: admin.email,

            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
  return (
    <div className="container">
        <PageHeader pageName={"Admins"}/>

      <TableContainer sx={{width:"100%"}}component={Paper}>

        {admins&&<Table  aria-label="admins table">
          <TableHead sx={{backgroundColor:"var(--accent)",color:"var(--main)"}}>
            <TableRow>
              <TableCell className="MuiTableCell-head">Admins Name</TableCell>
              <TableCell align="center" className="MuiTableCell-head">
                email
              </TableCell>

              <TableCell align="center" className="MuiTableCell-head">
                Edit
              </TableCell>
              <TableCell align="center" className="MuiTableCell-head">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id} className="MuiTableRow-root">
                <TableCell
                  component="th"
                  scope="row"
                  className="MuiTableCell-root"
                >
                  {admin.name}
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  {admin.email}
                </TableCell>

                <TableCell align="center" className="MuiTableCell-root">
                  <Button
                    sx={{
                      color: "#1976d2",
                    }}
                  >
                    {<Edit />}
                  </Button>
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  <Button
                    sx={{
                      color: "red",
                    }}
                  >
                    {<Delete />}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>}
      </TableContainer>
    </div>
  );
}

export default Admins;
