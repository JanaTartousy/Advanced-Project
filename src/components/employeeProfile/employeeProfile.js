import "./employeeProfile.css";
import * as React from "react";
import { useNavigate } from "react-router-dom";
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
// import axios from "axios";

export default function EmployeeProfile(props) {
  const fullName = `${props.firstName} ${props.lastName}`;
  const [imageUrl, setImageUrl] = React.useState("");
  const history = useNavigate();

  const [firstName, setFirstName] = React.useState(props.firstName);
  const [lastName, setLastName] = React.useState(props.lastName);
  const [email, setEmail] = React.useState(props.email);
  const [phoneNumber, setPhoneNumber] = React.useState(props.phoneNumber);
  const [team, setTeam] = React.useState(props.team);
  const [dateOfBirth, setDateOfBirth] = React.useState(props.dateOfBirth);
  const [latestKpiEvaluation, setLatestKpiEvaluation] = React.useState(
    props.latestKpiEvaluation
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "team":
        setTeam(value);
        break;
      case "dateOfBirth":
        setDateOfBirth(value);
        break;
      case "latestKpiEvaluation":
        setLatestKpiEvaluation(value);
        break;
      default:
        break;
    }
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
          sx={{ backgroundColor: "#369fff", minHeight: "100vh", margin: "5%" }}
        >
          <Box sx={{ backgroundColor: "#369fff", py: 3 }}>
            <Typography
              variant="h5"
              align="center"
              color="white"
              sx={{ fontSize: "2rem", fontWeight: "600" }}
            >
              {fullName}
            </Typography>
          </Box>
          <Box className="input" sx={{ py: 3 }}>
            <Card
              className="card"
              sx={{ maxWidth: 345, backgroundColor: "#F6F8FA" }}
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
              <label htmlFor="employeeId" className="form-label">
                ID:
              </label>
              <input type="text" id="employeeId" value={props.id} readOnly />
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={handleInputChange}
              />
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleInputChange}
              />
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number:
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="right-section-2">
              <label htmlFor="team" className="form-label">
                Team:
              </label>
              <input
                type="text"
                id="team"
                value={team}
                onChange={handleInputChange}
              />
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={handleInputChange}
              />
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth:
              </label>
              <input
                type="date"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={handleInputChange}
              />
              <label htmlFor="latestKpiEvaluation" className="form-label">
                Latest KPI Evaluation:
              </label>
              <input
                type="number"
                id="latestKpiEvaluation"
                value={latestKpiEvaluation}
                onChange={handleInputChange}
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
        </Box>
      </div>
    </>
  );
}
