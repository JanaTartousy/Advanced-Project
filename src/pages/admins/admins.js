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
import { toast } from "react-toastify";
import EditAdminPopup from "./editAdminPopup/editAdminPopup";
import AddAdminPopup from "./addAdminPopup/addAdminPopup";
import DeleteAdminPopup from "./deleteAdminPopup/deleteAdminPopup";

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [addAdminOpen, setAddAdminOpen] = useState(false);
  const [editAdminOpen, setEditAdminOpen] = useState(false);
  const [deleteAdminOpen, setDeleteAdminOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { token } = useContext(UserContext);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
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
  }, [token, refresh]);
  const handleAddAdminClose = () => {
    setAddAdminOpen(false);
  };
  const handleEditAdminClose = () => {
    setEditAdminOpen(false);
  };
  const handleDeleteAdminClose = () => {
    setDeleteAdminOpen(false);
  };
  const handleAddAdmin = (obj) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/register`, obj, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success("Admin Added Successfully");
        setRefresh(!refresh);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };
  const handleEditAdmin = (id, obj) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/${id}`, obj, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success("Admin Edited Successfully");
        setEditAdmin("");
        setRefresh(!refresh);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };
  const handleDeleteAdmin = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.error("Admin Deleted successfully");
        setEditAdmin("")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <PageHeader
        pageName={"Admins"}
        onAddClick={() => {
          setAddAdminOpen(true);
        }}
      />

      <TableContainer sx={{ width: "100%" }} component={Paper} >
        {admins && (
          <Table aria-label="admins table">
            <TableHead
              sx={{ backgroundColor: "var(--accent)", color: "var(--main)!important" }}
            >
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
            <TableBody sx={{backgroundColor: "#f4f9fc"}}>
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
                      onClick={(event) => {
                        setEditAdminOpen(true);
                        setEditAdmin(admin);
                      }}
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
                      onClick=
                      {(event) => {
                        setDeleteAdminOpen(true);
                        setEditAdmin(admin);
                      }}
                    >
                     
                      {<Delete />}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <AddAdminPopup
        open={addAdminOpen}
        onClose={handleAddAdminClose}
        onAddAdmin={handleAddAdmin}
      />
      <EditAdminPopup
        admin={editAdmin}
        open={editAdminOpen}
        onClose={handleEditAdminClose}
        onEditAdmin={handleEditAdmin}
      />
      <DeleteAdminPopup
        id={editAdmin.id}
        open={deleteAdminOpen}
        onClose={handleDeleteAdminClose}
        onDelete={handleDeleteAdmin}
      />
    </div>
  );
}

export default Admins;
