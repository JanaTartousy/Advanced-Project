import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../userContext";
import { toast } from "react-toastify";
import { Button, Dialog, DialogActions, DialogContent, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import "./editTeamPopup.css";
import PaginationContainer from "../../../components/table/tablePagination/pagination";
import PageHeader from "../../../components/pageHeader/pageHeader";

const EditTeamPopup = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/${props.type}s?page=${currentPage}&search=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const unassignedItems = response.data[`${props.type}s`].data.filter(
          (item) =>
            item.team_id === null || item.team_id === props.teamId
        );
        setItems(unassignedItems);
        setLastPage(response.data[`${props.type}s`].last_page);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching data from backend");
      }
    };
    token && fetchItems();
  }, [token, props.teamId, currentPage, searchQuery,props.type]);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleCheckboxChange = (event) => {
    const itemId = parseInt(event.target.value);
    const isChecked = event.target.checked;

    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          team_id: isChecked ? props.teamId : null,
        };
      }
      return item;
    });

    setSelectedItems((prevSelectedItems) => {
      if (isChecked) {
        return [...prevSelectedItems, itemId];
      } else {
        return prevSelectedItems.filter((id) => id !== itemId);
      }
    });

    setRemovedItems((prevRemovedItems) => {
      if (!isChecked) {
        return [...prevRemovedItems, itemId];
      } else {
        return prevRemovedItems.filter((id) => id !== itemId);
      }
    });

    setItems(updatedItems);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleAddItems = async () => {
    try {
      await axios.post(

        props.type==="employee"?`${process.env.REACT_APP_API_URL}/team/members`:`${process.env.REACT_APP_API_URL}/team/projects`,
        {
          team_id: props.teamId,
          item_ids: selectedItems,
          remove_item_ids: removedItems,
          _method: "PATCH",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Team members updated successfully");
      setSelectedItems([]);
      setRemovedItems([]);
      props.onClose();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <PageHeader
        pageName={props.type==="employee"?"Members":"Projects"}
        hideAdd={true}
        handleSearchChange={handleSearchChange}
        searchQuery={searchQuery}
      />
      <DialogContent>
        <div className="edit--team_members-container">
          {items.length === 0 ? (
            <p>No items found.</p>
          ) : (
            <Table style={{ borderCollapse: "collapse", width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      backgroundColor: "#f2f2f2",
                      fontWeight: "bold",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    ID
                  </TableCell>
                  {props.type==="employee"?<><TableCell
                    style={{
                      backgroundColor: "#f2f2f2",
                      fontWeight: "bold",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    First Name
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "#f2f2f2",
                      fontWeight: "bold",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Last Name
                  </TableCell></>:<TableCell
                    style={{
                      backgroundColor: "#f2f2f2",
                      fontWeight: "bold",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Name
                  </TableCell>}
                  <TableCell
                    style={{
                      backgroundColor: "#f2f2f2",
                      fontWeight: "bold",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Select
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow
                    key={item.id}
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    <TableCell>{item.id}</TableCell>

                    {props.type==="employee"?<>
                      <TableCell>{item.first_name}</TableCell>
                      <TableCell>{item.last_name}</TableCell>
                    </>:
                      <TableCell>{item.name}</TableCell>

                      }
                    <TableCell>
                      <input
                        type="checkbox"
                        value={item.id}
                        checked={item.team_id === props.teamId}
                        onChange={handleCheckboxChange}
                        style={{ transform: "scale(1.5)", marginRight: "8px" }}
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
          onClick={handleAddItems}
          variant="contained"
          color="primary"
          disabled={
            selectedItems.length === 0 && removedItems.length === 0
          }
        >
          {props.type==="employee"?"Update Members":"Update Projects"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTeamPopup;