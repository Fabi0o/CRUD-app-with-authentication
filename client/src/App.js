import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
