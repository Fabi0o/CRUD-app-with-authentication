import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [usersList, setUsersList] = useState([]);
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
              <Dashboard
                setIsLoggedIn={setIsLoggedIn}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                usersList={usersList}
                setUsersList={setUsersList}
              />
            ) : (
              <Login
                setIsLoggedIn={setIsLoggedIn}
                currentTime={currentTime}
                setCurrentUser={setCurrentUser}
                setUsersList={setUsersList}
              />
            )}
          </Route>
        </Switch>
        <Switch>
          <Route path="/register">
            {isLoggedIn ? (
              <Dashboard
                setIsLoggedIn={setIsLoggedIn}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                usersList={usersList}
                setUsersList={setUsersList}
              />
            ) : (
              <Register currentTime={currentTime} />
            )}
          </Route>
        </Switch>
        <Switch>
          <Route path="/dashboard">
            {isLoggedIn ? (
              <Dashboard
                setIsLoggedIn={setIsLoggedIn}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                usersList={usersList}
                setUsersList={setUsersList}
              />
            ) : (
              <Login
                setIsLoggedIn={setIsLoggedIn}
                currentTime={currentTime}
                setCurrentUser={setCurrentUser}
                setUsersList={setUsersList}
              />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
