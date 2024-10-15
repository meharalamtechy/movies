import React from "react";
import { Container, Typography, Box, Button, IconButton } from "@mui/material";
import XButton from "../../../components/XButton";
import { ROUTES } from "../../../constants/api";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddNewMovie = () => {
  const navigate = useNavigate();

  const handleAddNewMovie = () => {
    navigate(ROUTES.NEW_MOVIE);
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Box sx={{ backgroundColor: "#093545" }}>
      <IconButton
        sx={{ position: "absolute", top: 16, left: 16, color: "#fff" }}
        onClick={handleGoBack}
      >
        <ArrowBackIcon />
      </IconButton>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Box
          sx={{
            mb: 2,
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              color: "#fff",
              fontSize: "40px",
              fontWeight: "500",
              textAlign: "center",
              maxWidth: "500px",
              whiteSpace: "nowrap",
            }}
          >
            Your movie list is empty
          </Typography>
        </Box>
        <XButton
          onClick={handleAddNewMovie}
          variant="contained"
          color="primary"
          padding="12px 28px 12px 28px"
          backgroundColor="#2BD17E"
        >
          Add a New Movie
        </XButton>
      </Container>
    </Box>
  );
};

export default AddNewMovie;
