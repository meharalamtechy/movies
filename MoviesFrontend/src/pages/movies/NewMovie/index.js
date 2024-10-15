import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { useDropzone } from "react-dropzone";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import XCustomTextField from "../../../components/textinput";
import XButton from "../../../components/XButton";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ROUTES } from "../../../constants/api";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

const DropZone = styled(Box)(({ theme }) => ({
  border: "2px dashed #ccc",
  borderRadius: "8px",
  padding: theme.spacing(2),
  textAlign: "center",
  cursor: "pointer",
  minHeight: "504px",
  minWidth: "200px",
  backgroundColor: "#224957",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  year: Yup.number()
    .required("Publishing year is required")
    .min(1900, "Year must be greater than 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
});

const NewMovie = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedMovieData } = location.state || {};
  const [imageBase64, setImageBase64] = useState(selectedMovieData?.poster_url || "");
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: async (files) => {
      if (files.length > 0) {
        const base64Image = await convertToBase64(files[0]);
        setImageBase64(base64Image);
      }
    },
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const addNewMovie = async (value) => {
    try {
      const movieData = {
        ...value,
        base64Image: imageBase64,
      };
      const response = await axios.post('http://localhost:9000/add-movie', movieData);
      if(response.data.success) {
        navigate('/movies-list');
      }
    } catch(error){
      console.log(error)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#093545",
        padding: "70px",
        boxSizing: "border-box",
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: 16, left: 16, color: "#fff" }}
        onClick={handleGoBack}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#FFFFFF", marginBottom: "56px" }}
      >
        {selectedMovieData ? "Edit" : "Create a new movie" }
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <DropZone {...getRootProps()}>
            <input {...getInputProps()} />
            <FileDownloadIcon fontSize="large" sx={{ color: "#FFFFFF" }} />

            <Typography variant="h6" gutterBottom sx={{ color: "#FFFFFF" }}>
              Drag an image here
            </Typography>
          </DropZone>
          {imageBase64 && (
            <Card sx={{ marginTop: 2 }}>
              <CardMedia
                component="img"
                height="200"
                image={imageBase64}
                alt="Selected"
              />
              <CardContent>
                <Typography variant="subtitle1">
                  {acceptedFiles[0]?.name || "Selected image"}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
        <Grid item xs={false} md={1}></Grid>

        <Grid item xs={12} md={6}>
          <Formik
            initialValues={{ 
              title: selectedMovieData ? selectedMovieData.title : "", 
              year: selectedMovieData ? selectedMovieData.year : "" ,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              if (!selectedMovieData) {
                addNewMovie(values)
              } else {
                const payload = {...values, movieId: selectedMovieData.id}
                addNewMovie(payload)
              }
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Field
                      as={XCustomTextField}
                      name="title"
                      placeholder="Title"
                      width="342px"
                      backgroundColor="#224957"
                      textColor="#FFF"
                    />
                  </Box>
                  <Box>
                    <Field
                      as={XCustomTextField}
                      name="year"
                      placeholder="Publishing Year"
                      type="number"
                      width="241px"
                      backgroundColor="#224957"
                      textColor="#FFF"
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 2, marginTop: "40px" }}>
                    <XButton
                      type="button"
                      variant="outlined"
                      color="#fff"
                      border="1px solid #fff"
                      padding="8px 28px 8px 28px"
                      onClick={()=> navigate('/movies-list')}
                    >
                      Cancel
                    </XButton>
                    <XButton
                      type="submit"
                      variant="contained"
                      color="primary"
                      padding="8px 28px 8px 28px"
                      backgroundColor="#2BD17E"
                    >
                      Submit
                    </XButton>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewMovie;
