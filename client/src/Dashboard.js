import Axios from "axios";
import { useHistory } from "react-router-dom";
const Dashboard = (props) => {
  const history = useHistory();
  const getUsers = () => {
    Axios.get("http://localhost:3001/users").then((response) => {
      props.setUsersList(response.data);
    });
  };
  const selectAll = (e) => {
    let checkboxes = document.querySelectorAll(".userCheck");
    let checkStatus = e.target.checked;
    Array.from(checkboxes).map((checkbox) => {
      checkbox.checked = checkStatus;
      return checkbox;
    });
  };
  const changeUserStatus = async () => {
    const checkedBoxes = document.querySelectorAll(".userCheck:checked");
    let status = "";
    let promises = [];
    let isCurrentUser = false;
    checkedBoxes.forEach((checkbox) => {
      let user = props.usersList.find((item) => item.id == checkbox.id);
      if (user.user == props.currentUser) isCurrentUser = true;
      if (user.status == "active") {
        status = "blocked";
      } else status = "active";
      const result = Axios.post("http://localhost:3001/update", {
        value: status,
        email: user.user,
        column: "status",
      });
      promises.push(result);
    });
    await Promise.all(promises)
      .then(() => {
        getUsers();
      })
      .then(() => {
        if (isCurrentUser === true) {
          logout();
        }
      });
  };
  const deleteUser = async () => {
    const checkedBoxes = document.querySelectorAll(".userCheck:checked");
    let promises = [];
    let isCurrentUser = false;
    checkedBoxes.forEach((checkbox) => {
      let user = props.usersList.find((item) => item.id == checkbox.id);
      if (user.user == props.currentUser) isCurrentUser = true;
      const result = Axios.post("http://localhost:3001/delete", {
        id: user.id,
      });
      promises.push(result);
    });
    await Promise.all(promises)
      .then(() => {
        getUsers();
      })
      .then(() => {
        if (isCurrentUser === true) {
          logout();
        }
      });
  };
  const logout = () => {
    props.setIsLoggedIn(false);
    history.push("/");
  };

  return (
    <div className="userTable">
      <button onClick={deleteUser}>Delete</button>
      <button onClick={changeUserStatus}>Block/Unblock</button>
      <button onClick={logout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" className="type" onClick={selectAll} />
            </th>
            <th>Id</th>
            <th>Email</th>
            <th>Name</th>
            <th>Status</th>
            <th>Registration Time</th>
            <th>Last Login Time</th>
          </tr>
        </thead>
        <tbody>
          {props.usersList.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <input type="checkbox" className="userCheck" id={user.id} />
                </td>
                <td>{user.id}</td>
                <td>{user.user}</td>
                <td>{user.name}</td>
                <td>{user.status}</td>
                <td>{user.registerTime.slice(0, 19).replace("T", " ")}</td>
                <td>{user.lastLoginTime.slice(0, 19).replace("T", " ")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
