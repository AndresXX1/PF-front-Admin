
import "./App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Login from "../src/componentes/Login/login";
import createTheme from "./componentes/DashBoardAdmin/dashAdmin"
import Productos from "./componentes/products/products";

// import ProtectedRoute from './GeneralLogin';

import { AuthProvider } from "./componentes/AuthProvider/authProvider";


function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
    
  <Switch>

 <Route exact path="/admin" component={createTheme} />
 <Route exact path="/" component={Login} />
 <Route exact path="/products" component={Productos} />
</Switch> 
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;