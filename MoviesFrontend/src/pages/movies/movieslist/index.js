import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  Stack,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IMAGES } from "../../../constants/imagespath";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const movieData = [
  { id: 1, image: IMAGES.image1, title: "Movie 1", description: "2021" },
  { id: 2, image: IMAGES.image2, title: "Movie 2", description: "2022" },
  { id: 3, image: IMAGES.image2, title: "Movie 3", description: "2023" },
  { id: 4, image: IMAGES.image3, title: "Movie 4", description: "2021" },
  { id: 5, image: IMAGES.image1, title: "Movie 5", description: "2022" },
  { id: 6, image: IMAGES.image2, title: "Movie 6", description: "2023" },
  { id: 7, image: IMAGES.image2, title: "Movie 7", description: "2022" },
  { id: 8, image: IMAGES.image3, title: "Movie 8", description: "2023" },
  { id: 9, image: IMAGES.image1, title: "Movie 9", description: "2022" },
  { id: 10, image: IMAGES.image3, title: "Movie 10", description: "2023" },
];

const MovieList = () => {
  const navigate = useNavigate();
  const [moviesList, setMoviesList] = useState([])
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(()=>{
    getAllMovieList();
  },[queryParams])

  const getAllMovieList = async () => {
    try {
      const { page, limit } = queryParams;
      let query = `http://localhost:9000/getAllMovies?page=${page}&limit=${limit}`;
      const response = await axios.post(query);
      setMoviesList(response?.data?.moviesList);
      const totalNoOfPages = Math.ceil(response?.data?.totalCount / queryParams.limit);
      setTotalPages(totalNoOfPages);
    } catch(error){
      console.log(error)
    }
  }

  const handlePageChange = (event, newPage) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  };

  const editMovie = async (movieId) => {
    try {
      const response = await axios.post('http://localhost:9000/edit-movie', {movieId});
      const selectedMovieData = response?.data?.movieData[0]
      navigate('/new_movie', {
        state: { selectedMovieData },
      });
    } catch(error){
      console.log(error)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#093545",
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: 16, left: 16, color: "#fff" }}
        onClick={handleGoBack}
      >
        <ArrowBackIcon />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "70px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{
              marginRight: 1,
              fontSize: "40px",
              fontWeight: "400",
              color: "#FFFFFF",
            }}
          >
            My movies
          </Typography>
          <IconButton sx={{ color: "#FFFFFF", textAlign: "center" }}>
            <AddCircleOutlineIcon onClick={() => navigate('/new_movie')}/>
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{
              marginRight: 1,
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            Logout
          </Typography>
          <IconButton sx={{ color: "#FFFFFF" }}>
            <LogoutIcon onClick={()=>navigate('/')}/>
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ paddingX: "70px" }}>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(5, 1fr)",
            mb: 2,
          }}
        >
          {moviesList.length > 0 && moviesList?.map((movie) => (
            <Card
              key={movie.id}
              sx={{
                maxWidth: 345,
                backgroundColor: "#092C39",
                color: "#fff",
                borderRadius: "16px",
                padding: "8px 8px 16px 8px",
              }}
            >
              <CardMedia
                component="img"
                height="400"
                image={movie.poster_url}
                alt={movie.title}
                sx={{ borderRadius: "12px" }}
                onClick={()=>editMovie(movie.id)}
              />
              <CardContent>
                <Typography sx={{ fontSize: "20px", fontWeight: "500px" }}>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="#fff">
                  {movie.year}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Stack spacing={2} alignItems="center" sx={{ marginY: "40px" }}>
          <Pagination
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#2BD17E",
                color: "#fff",
              },
            }}
            count={totalPages}
            shape="rounded"
            showFirstButton
            showLastButton
            page={queryParams.page}
            onChange={handlePageChange}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default MovieList;
