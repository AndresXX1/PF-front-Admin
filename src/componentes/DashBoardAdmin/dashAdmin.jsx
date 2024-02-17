import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import NewService from "../CreateProduct/createProduct";
import SampleStatisticsChart from "../estadisticas/estadisticas";
import ReviewsComponent from "../reviews/reviews";
import ProductsComponent from "../products/products";
import UsersComponent from "../Usuarios/usuarios";
import ConfiguracionesDashboard from "../presentacion/presentacion"
import { createTheme } from "@mui/material/styles";
import styles from "./dashAdmin.module.css";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";

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
    marginTop: "470px",
  },
}));

const DashboardUsuario = () => {
  const classes = useStyles();
  const [activeComponent, setActiveComponent] = useState("ConfiguracionesDashboard"); // Cambiado aquí
  const history = useHistory();

  const logOut = () => {
    // Log out logic
    history.push("/");
  };

  const handleGoToHome = () => {
    history.push("/admin");
  };

  const renderComponent = (component) => {
    setActiveComponent(component);
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
          <div className={classes.header}>

          </div>
          <List>
            <ListItem button onClick={() => renderComponent("ConfiguracionesDashboard")}> {/* Cambiado aquí */}
              <SettingsIcon style={{marginLeft: "30px"}} />
              <ListItemText primary="Configuraciones" style={{marginLeft: "20px"}} />
            </ListItem>
          <div className={classes.divider}></div>
            <ListItem button onClick={() => renderComponent("NewService")}>
              <ListItemText style={{marginLeft: "30px"}} primary="Nuevo Servicio" />
            </ListItem>
            <ListItem button onClick={() => renderComponent("StatsComponent")}>
              <ListItemText style={{marginLeft: "30px"}} primary="Estadísticas" />
            </ListItem>
            <ListItem button onClick={() => renderComponent("ReviewsComponent")}>
              <ListItemText style={{marginLeft: "30px"}} primary="Reseñas" />
            </ListItem>
            <ListItem button onClick={() => renderComponent("ProductsComponent")}>
              <ListItemText style={{marginLeft: "30px"}} primary="Productos" />
            </ListItem>
            <ListItem button onClick={() => renderComponent("UsersComponent")}>
              <ListItemText style={{marginLeft: "30px"}} primary="Usuarios" />
            </ListItem>
            <div className={classes.divider1}></div>
            <ListItem button onClick={logOut}>
              <ExitToAppIcon style={{ marginLeft: "30px", marginTop: "10px" }} />
              <ListItemText primary="Cerrar sesión" style={{ marginLeft: "20px", marginTop: "10px" }} />
            </ListItem>
          </List>
        </Drawer>
        <main className={`${styles.content}`}>
          {activeComponent === "ConfiguracionesDashboard" && <ConfiguracionesDashboard />} {/* Cambiado aquí */}
          {activeComponent === "NewService" && <NewService />}
          {activeComponent === "StatsComponent" && <SampleStatisticsChart />}
          {activeComponent === "ReviewsComponent" && <ReviewsComponent />}
          {activeComponent === "ProductsComponent" && <ProductsComponent />}
          {activeComponent === "UsersComponent" && <UsersComponent />}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default DashboardUsuario;