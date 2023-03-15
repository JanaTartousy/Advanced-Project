import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../userContext";
import { toast } from "react-toastify";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import "./editTeamMemberPopup.css";
import PaginationContainer from "../../../components/table/tablePagination/pagination";
import PageHeader from "../../../components/pageHeader/pageHeader";

const EditTeamMemberPopup = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useContext(UserContext);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [removedEmployees, setRemovedEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/employees?page=${currentPage}&search=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const unassignedEmployees = response.data.employees.data.filter(
          (employee) =>
            employee.team_id === null || employee.team_id === props.teamId
        );
        setEmployees(unassignedEmployees);
        setLastPage(response.data.employees.last_page);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching data from backend");
      }
    };
    token && fetchEmployees();
  }, [token, props.teamId, currentPage,searchQuery]);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleCheckboxChange = (event) => {
    const employeeId = parseInt(event.target.value);
    const isChecked = event.target.checked;

    const updatedEmployees = employees.map((employee) => {
      if (employee.id === employeeId) {
        return {
          ...employee,
          team_id: isChecked ? props.teamId : null,
        };
      }
      return employee;
    });

    setSelectedEmployees((prevSelectedEmployees) => {
      if (isChecked) {
        return [...prevSelectedEmployees, employeeId];
      } else {
        return prevSelectedEmployees.filter((id) => id !== employeeId);
      }
    });

    setRemovedEmployees((prevRemovedEmployees) => {
      if (!isChecked) {
        return [...prevRemovedEmployees, employeeId];
      } else {
        return prevRemovedEmployees.filter((id) => id !== employeeId);
      }
    });

    setEmployees(updatedEmployees);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleAddMembers = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/team/members`,
        {
          team_id: props.teamId,
          employee_ids: selectedEmployees,
          remove_employee_ids: removedEmployees,
          _method: "PATCH",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Team members updated successfully");
      setSelectedEmployees([]);
      setRemovedEmployees([]);
      props.onClose();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <PageHeader pageName={"Members"} hideAdd={true}         handleSearchChange={handleSearchChange}
        searchQuery={searchQuery} />
      <DialogContent>
        <div className="add--team_members-container">
          {employees.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Select</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>{employee.first_name}</TableCell>
                    <TableCell>{employee.last_name}</TableCell>
                    <TableCell>
                      <input
                        type="checkbox"
                        value={employee.id}
                        checked={employee.team_id === props.teamId}
                        onChange={handleCheckboxChange}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <PaginationContainer
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={handlePageChange}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button
          onClick={handleAddMembers}
          variant="contained"
          color="primary"
          disabled={
            selectedEmployees.length === 0 && removedEmployees.length === 0
          }
        >
          Update Members
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTeamMemberPopup;
