import * as React from "react" ;
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthProvider/authProvider";
import styles from "./login.module.css";
import Button from '@mui/material/Button';
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
      const response = await axios.post('https://back-admin-hostel.onrender.com/users/login', data);
      if (response.data.rol !== "admin") {
        setMessage("user is not admin");

        setOpen(true)
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
      setMessage("Disculpe los inconvenientes");
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
      <Button color="secondary" size="small" onClick={handleClose}>
       
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
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
    <div className={styles.container}>
      <div className={styles.borde}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "El correo electrónico es requerido" })}
              onChange={handleEmailChange}
              className={errors.email ? `${styles.input} ${styles.error}` : styles.input}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>
          <div className={styles.passwordInputContainer}>
            <label htmlFor="password">Contraseña:</label>
            <div className={styles.passwordInput}>
              <input
                type="password"
                id="password"
                {...register("password", { required: "La contraseña es requerida" })}
                onChange={handlePasswordChange}
                className={errors.password ? `${styles.input} ${styles.error}` : styles.input}
              />
            </div>
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>
          <button type="submit" className={styles.button}>
            Ingresar
          </button>
        </form>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        message= {message}
        action={action}
      />

      </div>
    </div>
  );
}