import React, { useState, useEffect,useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import NewService from "../CreateProduct/createProduct";
import Dashboardeng from "../presentacion de estadisticas/estadistic";
import ReviewsComponent from "../reviews/reviews";
import ProductsComponent from "../products/products";
import UsersComponent from "../Usuarios/usuarios";
import ReservasTableComponent from "../reservas/tablaReservas";
import { createTheme } from "@mui/material/styles";
import styles from "./dashAdmin.module.css";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Assessment } from '@mui/icons-material';
import NewServiceIcon from '@mui/icons-material/AddBoxOutlined';
import ReviewsIcon from '@mui/icons-material/RateReviewOutlined';
import ProductsIcon from '@mui/icons-material/ShoppingCartOutlined';
import UsersIcon from '@mui/icons-material/PeopleAltOutlined';
import ReservasIcon from '@mui/icons-material/EventNoteOutlined';
import {AuthContext} from "../AuthProvider/authProvider";
import { dispatch } from "react";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    
  },
  sidebar: {
    width: 240,
    flexShrink: 0,
    
  },
  drawerPaper: {
    width: 240,
    
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderBottom: "1px solid #ddd",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    cursor: "pointer",
  },
  divider: {
    borderTop: "1px solid #ddd",
    marginBottom: "20px",
  },

  divider1: {
    borderTop: "1px solid #ddd",
    marginBottom: "10px",
    marginTop: "450px",
  },
}));

const DashboardUsuario = () => {
  const classes = useStyles();
  const { auth, setAuth } = useContext(AuthContext);
  const [activeComponent, setActiveComponent] = useState(() => {
    const storedComponent = localStorage.getItem("activeComponent");
    return storedComponent || "ConfiguracionesDashboard"; 
  });
  const history = useHistory();

  const logOut = () => {
    if (window.gapi && window.gapi.auth2) {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.disconnect().then(function () {
        console.log("User disconnected.");
      });
    }

    setAuth(null);
    localStorage.removeItem("auth");
    history.push("/");
  };



  const renderComponent = (component) => {
    setActiveComponent(component);
    localStorage.setItem("activeComponent", component); 
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Drawer
          className={`${classes.sidebar} ${styles.content}`}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.header}></div>
          <List>
            <ListItem
              button
              onClick={() => renderComponent("ConfiguracionesDashboard")}
            >
              <Assessment style={{ marginLeft: "30px" }} />
              <ListItemText primary="Estadisticas" style={{ marginLeft: "20px" }} />
            </ListItem>
            <div className={classes.divider}></div>
            <ListItem button onClick={() => renderComponent("NewService")}>
        <ListItemIcon>
          <NewServiceIcon style={{ marginLeft: "20px" }}/>
        </ListItemIcon>
        <ListItemText primary="Nuevo Servicio" />
      </ListItem>

      <ListItem button onClick={() => renderComponent("ReviewsComponent")}>
        <ListItemIcon>
          <ReviewsIcon  style={{ marginLeft: "20px" }}/>
        </ListItemIcon>
        <ListItemText primary="Reseñas" />
      </ListItem>

      <ListItem button onClick={() => renderComponent("ProductsComponent")}>
        <ListItemIcon>
          <ProductsIcon style={{ marginLeft: "20px" }} />
        </ListItemIcon>
        <ListItemText primary="Productos" />
      </ListItem>

      <ListItem button onClick={() => renderComponent("UsersComponent")}>
        <ListItemIcon>
          <UsersIcon style={{ marginLeft: "20px" }} />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItem>

      <ListItem button onClick={() => renderComponent("ReservasComponent")}>
        <ListItemIcon>
          <ReservasIcon  style={{ marginLeft: "20px" }}/>
        </ListItemIcon>
        <ListItemText primary="Reservas" />
      </ListItem>
            <div className={classes.divider1}></div>
            <ListItem button onClick={logOut}>
              <ExitToAppIcon style={{ marginLeft: "30px", marginTop: "10px" }} />
              <ListItemText primary="Cerrar sesión" style={{ marginLeft: "20px", marginTop: "10px" }} />
            </ListItem>
          </List>
        </Drawer>
        <main className={`${styles.content}`}>
          {activeComponent === "ConfiguracionesDashboard" && <Dashboardeng />}
          {activeComponent === "NewService" && <NewService />}
          {activeComponent === "StatsComponent" && <Dashboardeng />}
          {activeComponent === "ReviewsComponent" && <ReviewsComponent />}
          {activeComponent === "ProductsComponent" && <ProductsComponent />}
          {activeComponent === "UsersComponent" && <UsersComponent />}
          {activeComponent === "ReservasComponent" && <ReservasTableComponent />}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default DashboardUsuario;