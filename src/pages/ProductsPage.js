import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import MovieDetailModal from "../components/modal";
// mock
// import PRODUCTS from '../_mock/products';

import { useGetMovies } from "../hooks/useGetMovies";
// import logo from "../components/logo";
import {handleFavoriteMovie, saveMovies} from "../features/movies/movieSlice";

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const dispatch = useDispatch()
  const [openFilter, setOpenFilter] = useState(false);
  const [isRender, setIsRender] = useState(false)
  const movieList = useSelector(state => state.movie.movies)
  const [movieDetail, setMovieDetail] = useState(undefined)
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  useEffect( (movieList) => {
    console.log('LOOK! 1')
    const fetchData = async () => {
      await fetchMovies()
    }

    if (!movieList || movieList.length === 0) {
      console.log(2)
      fetchData()
    }
  }, [])

  const fetchMovies = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useGetMovies({
        onSuccess: (res) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          dispatch(saveMovies(res.movies))
          setIsRender(true)
        },
        onError: () => console.log('err')
      })
  }

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleSelectedFavorite = (movie) => {
    dispatch(handleFavoriteMovie(movie))
  }

  const handleShowMovieDetail = (movie) => {
    setMovieDetail(movie)
    setIsOpenDialog(!isOpenDialog)
  }

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Movies
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        {isRender && movieList ?
            <ProductList
                movies={movieList}
                selectedFavoriteMovie={handleSelectedFavorite}
                handleShowMovieDetail={handleShowMovieDetail}
            /> : <h2>Loading...</h2>
        }

        <ProductCartWidget />
      </Container>
      {movieDetail &&
          <MovieDetailModal
              movie={movieDetail}
              isOpenDialog={isOpenDialog}
              onCloseDialog={() => setIsOpenDialog(false)}
          />
      }
    </>
  );
}
