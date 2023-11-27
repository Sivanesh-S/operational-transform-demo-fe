import { useState } from "react";

import "./App.css";
import { AddUser } from "./components/AddUser";
import { User } from "./components/User";

function App() {
  const [users, setUsers] = useState(["Peter", "Lois", "Stewie"]);

  // Handlers
  const onCreateUser = (username) => {
    if (users.includes(username)) {
      alert(
        `There's already an user with name "${username}". Try a different name`
      );
      return;
    }

    setUsers((pre) => [username, ...pre]);
  };

  return (
    <>
      <div className="container">
        <h1 className="center">Operational Transform OT (Demo)</h1>
        <AddUser onCreateUser={onCreateUser} />
        <div className="users">
          {users.map((user) => (
            <User key={user} name={user} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
