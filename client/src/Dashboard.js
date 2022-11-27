import Axios from "axios";
import { useState } from "react";
const Dashboard = () => {
  const getUsers = async () => {
    await Axios.get("http://localhost:3001/users").then((response) => {
      setUsersList(response.data);
    });
  };
  const [usersList, setUsersList] = useState([]);
  const selectAll = (e) => {
    let checkboxes = document.querySelectorAll(".userCheck");
    let checkStatus = e.target.checked;
    Array.from(checkboxes).map((checkbox) => {
      checkbox.checked = checkStatus;
    });
  };

  return (
    <div className="userTable">
      <button onClick={getUsers}>Show Users</button>
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
          {usersList.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <input type="checkbox" className="userCheck" />
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
