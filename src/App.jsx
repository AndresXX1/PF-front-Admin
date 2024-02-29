import React from "react";
import Login from "../src/componentes/Login/login";
import createTheme from "./componentes/DashBoardAdmin/dashAdmin";
import ProtectedRoute from "../protectRoute";
import { AuthProvider } from "./componentes/AuthProvider/authProvider";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Switch>
            <ProtectedRoute exact path="/admin" component={createTheme} />
            <Route exact path="/" component={Login} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;