import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  movies: PropTypes.array.isRequired,
  onSelectedFavoriteMovie: PropTypes.func
};

export default function ProductList({ movies, ...props }) {
  return (
    <Grid container spacing={3} {...props}>
      {movies.map((movie) => (
        <Grid key={movie.id} item xs={12} sm={6} md={3}>
          <ShopProductCard onSelectedFavoriteMovie={props.onSelectedFavoriteMovie} movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}
