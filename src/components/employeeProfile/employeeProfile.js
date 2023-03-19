import "./employeeProfile.css";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext";
import { useContext } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import EmployeeChart from "./../../components/employeeChart/employeeChart";
import TextField from '@mui/material/TextField';
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

export default function EmployeeProfile(props) {
  const fullName = `${props.firstName} ${props.lastName}`;
  const [imageUrl, setImageUrl] = React.useState("");
  const history = useNavigate();
  const { token } = useContext(UserContext);

  const [employee, setEmployee] = React.useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    team: "",
    dob: "",
    latestKpiEvaluation: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveButtonClick = () => {
    // TODO: Save changes
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  const handleBackButtonClick = () => {
    history("/employees");
  };

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/employees/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmployee(response.data);
        toast.error("Can't found employee!");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);});
  }, [token, props.id]);

  // React.useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_PICTURE_URL}/storage/employee_pictures/${employee.picture.split("/").pop()}`)
  //     .then((response) => setImageUrl(response.data.imageUrl))
  //     .catch((error) => console.log(error));
  // }, [props.employee, employee.picture]);

  return (
    <>
      <div className="back-container">
        <Button
          className="back-button"
          onClick={handleBackButtonClick}
          variant="contained"
          sx={{ backgroundColor: "#369fff", color: "#F6F8FA" }}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </Button>
      </div>
      <div className="employee-profile-page">
        <Box
          sx={{ backgroundColor: "#F6F8FA", minHeight: "100vh", margin: "5%" }}
        >
          <Box className="header-employee-fullname"  sx={{ backgroundColor: "#369fff", py: 3 }}>
            <Typography
            className="editicon-and-fullname"
              variant="h5"
              align="center"
              color="white"
              sx={{ fontSize: "2rem", fontWeight: "600" }}
            >
              {fullName}
              <FaEdit sx={{color: "#F6F8FA"}}></FaEdit>
            </Typography>
          
          </Box>
          <Box className="textfield" sx={{ py: 3,  '& .MuiTextField-root': { m: 1 }, }}  component="form"
     
      noValidate
      autoComplete="off">
            <Card
              className="card"
              sx={{ maxWidth: 345, backgroundColor: "white" }}
            >
              <label htmlFor="file-input">
                <CardMedia
                  component="img"
                  height="150"
                  image={imageUrl}
                  alt="Profile Image"
                />
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    endIcon={<PhotoCamera />}
                    variant="contained"
                    size="small"
                    sx={{
                      mt: "9%",
                      backgroundColor: "#4caf50",
                      color: "#F6F8FA",
                      "&:hover": {
                        transform: "scale(1.05)",
                        transition: "0.3s ease-out",
                        backgroundColor: "#388e3c",
                      },
                    }}
                    onClick={handleImageChange}
                  >
                    Change
                  </Button>
                </CardContent>
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </Card>
            <div className="right-section-1">
        <TextField
          id="employeeId"
          label="ID"
          value={props.id}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="firstName"
          label="First Name"
          value={employee.firstName}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          value={employee.email}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          id="phoneNumber"
          label="Phone Number"
          type="tel"
          value={employee.phoneNumber}
          onChange={handleInputChange}
          variant="outlined"
        />
      </div>
      <div className="right-section-2">
        <TextField
          id="team"
          label="Team"
          value={employee.team}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          id="lastName"
          label="Last Name"
          value={employee.lastName}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          id="dob"
          type="date"
          value={employee.dob}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          id="latestKpiEvaluation"
          label="Latest KPI Evaluation"
          type="number"
          value={employee.latestKpiEvaluation}
          onChange={handleInputChange}
          variant="outlined"
        />
      </div>
            <Button
              className="save-button"
              variant="contained"
              onClick={handleSaveButtonClick}
              sx={{
                color: "#F6F8FA",
                backgroundColor: "#4caf50",
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "0.2s ease-out",
                  color: "#F6F8FA",
                  backgroundColor: " #388e3c",
                },
              }}
            >
              Save
            </Button>
          </Box>
          <EmployeeChart />
        </Box>
      </div>
    </>
  );
}
