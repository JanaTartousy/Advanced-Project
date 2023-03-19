import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../userContext";
import "./viewProject.css";

function ViewProject() {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const { token } = useContext(UserContext);
  const { projectId } = useParams();
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    token &&
      axios
        .get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, config)
        .then((response) => {
          setEmployees(response.data.project.employees);
          setRoles(response.data.roles);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
  }, [projectId, token]);
  const tableHeaderStyle = {
    backgroundColor: "var(--accent)",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.2rem",
  };

  const editIconStyle = {
    curser:"pointer",
    fontSize: "2.5rem",
  };

  const tableContainerStyle = {
    width: "50%",
    margin: "0 auto",
  };

  return (
    <TableContainer style={tableContainerStyle}>
      <Table>
        <TableHead>
          <TableRow style={tableHeaderStyle}>
            <TableCell style={{ fontSize: "1.4rem"}}>
              First Name
            </TableCell>
            <TableCell style={{ fontSize: "1.4rem", }}>
              Last Name
            </TableCell>
            <TableCell style={{ fontSize: "1.4rem",  }}>
              Role
            </TableCell>
            <TableCell
              style={{ display: "flex", justifyContent: "right",  }}
            >
              <FontAwesomeIcon
                icon={faEdit}
                style={editIconStyle}
                className="edit--employee_role"
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell style={{ fontSize: "1.2rem" }}>
                {employee.first_name}
              </TableCell>
              <TableCell style={{ fontSize: "1.2rem" }}>
                {employee.last_name}
              </TableCell>
              <TableCell style={{ fontSize: "1.2rem" }}>
                <select style={{ fontSize: "1.2rem" }}>
                  {roles.map((role, index) => {
                    return <option key={index}>{role.name}</option>;
                  })}
                </select>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ViewProject;
