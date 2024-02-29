import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./src/componentes/AuthProvider/authProvider"; // Importa el contexto de autenticación

// Componente de ruta protegida
function ProtectedRoute({ component: Component, ...rest }) {
  const { auth } = React.useContext(AuthContext);

  // Agregamos manejo de errores para el caso en que auth sea null
  if (auth === null) {
    // Podrías redirigir al usuario a una página de inicio de sesión o mostrar un mensaje de error
    return <Redirect to="/" />;
  }

  console.log("Estado de autenticación:", auth); // Agregamos este console.log para verificar el estado de autenticación

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;