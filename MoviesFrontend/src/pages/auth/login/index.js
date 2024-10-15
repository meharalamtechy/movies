import React from "react";
import {
  Container,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import XCustomTextField from "../../../components/textinput";
import XButton from "../../../components/XButton";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/api";
import axios from "axios";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is Required"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:9000/auth/login', values);
      if(response.data.success && response.data.totalMoviesCount > 0) {
        navigate('/movies-list');
      } 
      else {
        navigate('/AddNewMovie');
      }
    } catch(error){
      console.log(error)
    }
  };

  return (
    <Box sx={{ backgroundColor: "#093545" }}>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            gutterBottom
            sx={{ color: "#fff", fontSize: "64px", fontWeight: "500" }}
          >
            Sign In
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange }) => (
              <Form>
                <XCustomTextField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  margin="normal"
                  fullWidth
                  backgroundColor="#224957"
                  textColor="#FFF"
                />
                <XCustomTextField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  margin="normal"
                  fullWidth
                  backgroundColor="#224957"
                  textColor="#FFF"
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="rememberMe"
                        color="primary"
                        checked={values.rememberMe}
                        onChange={handleChange}
                        sx={{
                          "& .MuiSvgIcon-root": {
                            color: "#224957",
                          },
                          "&.Mui-checked .MuiSvgIcon-root": {
                            color: "#224957",
                          },
                        }}
                      />
                    }
                    label="Remember Me"
                    sx={{ color: "#fff" }}
                  />
                </Box>

                <XButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  padding="12px 126px 12px 126px"
                  backgroundColor="#2BD17E"
                >
                  Login
                </XButton>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
