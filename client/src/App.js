import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const currentTime = () => {
    return new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  };
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? (
              <Dashboard />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} currentTime={currentTime} />
            )}
          </Route>
        </Switch>
        <Switch>
          <Route path="/register">
            {isLoggedIn ? (
              <Dashboard />
            ) : (
              <Register currentTime={currentTime} />
            )}
          </Route>
        </Switch>
        <Switch>
          <Route path="/dashboard">
            {isLoggedIn ? (
              <Dashboard />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} currentTime={currentTime} />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
