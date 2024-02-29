import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthProvider/authProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError: setFormError, clearErrors } = useForm();
  const [errorState, setErrorState] = React.useState(null);
  const history = useHistory();
  const { setAuth } = React.useContext(AuthContext); 
  const [error, setError] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/users/login', data);
      if (response.data.rol !== "admin") {
        setMessage("user is not admin");
        setOpen(true);
      }
      
      if (response.data.rol === "admin") {
        const authData = {
          token: response.data.rol,
        };
        setAuth(authData);
        history.push("/admin");
      } else {
        setErrorState('Error: The response is not valid');
      }
    } catch (error) {
      setMessage("No sos Administrador");
      setOpen(true);
      setErrorState('Error al iniciar sesión: ' + error.message);
    }
  };

  const handleEmailChange = (e) => {
    clearErrors("email");
    const value = e.target.value;
    if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setFormError("email", {
        type: "manual",
        message: "Ingrese un correo electrónico válido",
      });
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>

      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        style={{
          marginLeft: "50px"
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handlePasswordChange = (e) => {
    clearErrors("password");
    const value = e.target.value;
    if (
      !value.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      setFormError("password", {
        type: "manual",
        message:
          "La contraseña debe contener al menos 8 caracteres, incluyendo al menos una mayúscula, una minúscula, un número y un carácter especial",
      });
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://cdn.wallpapersafari.com/20/62/8EyeZM.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             ADMIN Sign in
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <input
                margin="normal"
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                placeholder="Email ADMIN"
                
                style={{height: "50px",width: "720px", textAlign: "center", marginTop: "100px"}}
                {...register("email", { required: "El correo electrónico es requerido" })}
                onChange={handleEmailChange}
                error={errors.email ? true : false}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
              <input
              margin="normal"
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              placeholder="Password ADMIN"
              autoComplete="current-password"
              style={{height: "50px",width: "720px", textAlign: "center", marginTop: "100px"}}
              {...register("password", { required: "La contraseña es requerida" })}
              onChange={handlePasswordChange}
              error={errors.password ? true : false} // Corregido
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
              <FormControlLabel
              style={{color: "black", marginTop: "30px", marginLeft: "280px"}}
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                style={{
                  width: "720px",
                  marginTop: "60px"
                }}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
       
            </form>
            <Snackbar
              open={open}
              autoHideDuration={1500}
              onClose={handleClose}
              message={message}
              action={action}
              />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}