import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
// import PRODUCTS from '../_mock/products';

// import logo from "../components/logo";
import {handleFavoriteMovie} from "../features/movies/movieSlice";
import MovieDetailModal from "../components/modal";

// ----------------------------------------------------------------------

export default function FavoriteMoviesPage() {
  const dispatch = useDispatch()
  const [openFilter, setOpenFilter] = useState(false);
  const [isRender, setIsRender] = useState(false)
  const [ favoriteList, setFavoriteList ] = useState([])

  const movieList = useSelector(state => state.movie.movies)
  const [movieDetail, setMovieDetail] = useState(undefined)
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  const filterFavoriteMovies = () => {
    setFavoriteList(movieList.filter((movie) => movie.isFavorite === true))
    setIsRender(true)
  }

  useEffect( () => {
    if (movieList.length > 0) {
      filterFavoriteMovies()
    }
  }, [movieList])

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleSelectedFavorite = (id) => {
    dispatch(handleFavoriteMovie(id))
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

        {isRender && favoriteList ?
            <ProductList
                movies={favoriteList}
                selectedFavoriteMovie={handleSelectedFavorite}
                handleShowMovieDetail={handleShowMovieDetail}
            /> : <h2>Loading...</h2>
        }

        {isRender && favoriteList.length === 0 && <h2>No Favorite List</h2>}

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
