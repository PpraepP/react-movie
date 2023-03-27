import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import {accounts} from "../../../_mock/account";
import {handleSetCookie} from "../../../helper/cookie";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [dataForm, setDataForm] = useState({
      email: '',
      password: ''
  })

    const handleChangeEmail = (event) => {
        setDataForm((form) => {
            return {...form, email: event.target.value}
        })
    }

    const handleChangePassword = (event) => {
        setDataForm((form) => {
            return {...form, password: event.target.value}
        })
    }

  const handleClick = () => {
      const isAuth = checkAccount()
      if (isAuth) {
          handleSetCookie({name: 'is-auth', value: isAuth})
          navigate('/movies', { replace: true });
      }

  };

  const checkAccount = () => {
    const account = accounts.find((account) => account.email === dataForm.email)

      if(account) {
          return account.password === dataForm.password
      }
          return false

  }

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={handleChangeEmail}/>
          <p>{dataForm.email}</p>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handleChangePassword}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
