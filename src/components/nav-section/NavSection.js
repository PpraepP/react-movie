import { useEffect } from "react";
import PropTypes from 'prop-types';
import { useNavigate, useLocation, NavLink as RouterLink } from 'react-router-dom';
import { useDispatch} from "react-redux";
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import SvgColor from '../svg-color';
import {clearFavoriteMovies} from "../../features/movies/movieSlice";
import { handleRemoveCookie, handleGetCookie } from "../../helper/cookie";

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const isAuth = handleGetCookie('is-auth')

    useEffect(() => {
        if(!isAuth) {
            navigate('/login', { replace: true })
        }
    }, [location])

    const handleLogout = () => {
        dispatch(clearFavoriteMovies())
        handleRemoveCookie('is-auth')
        navigate('/login', { replace: true })
    }

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
          <StyledNavItem item={{title: 'logout', icon: icon('ic_lock'), path: '/login'}} >
              <StyledNavItemIcon>{icon('ic_lock')}</StyledNavItemIcon>
              <ListItemText disableTypography primary={`logout`} onClick={handleLogout} />
          </StyledNavItem>
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
