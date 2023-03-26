import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, IconButton, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const StyleFavoriteButton = styled(IconButton)({
    position: 'absolute',
    right: '10px',
})

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
    movie: PropTypes.object,
    onSelectedFavoriteMovie: PropTypes.func
};

export default function ShopProductCard({ movie , ...props}) {
  // const { name, cover, price, colors, status, priceSale } = movie;
  //   console.log({movie})
  const { title_en: name, poster_url: cover, release_date: date} = movie

    const handelClickFavoriteButton = (movie) => {
        console.log({movie})
        props.onSelectedFavoriteMovie(movie)
    }

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={name} src={cover} />
          <StyleFavoriteButton onClick={() => handelClickFavoriteButton(movie)}>
              <Iconify icon="ic:round-favorite-border" color="#e04d4f" width={30}  />
          </StyleFavoriteButton>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="caption">{date}</Typography>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
      </Stack>
    </Card>
  );
}
