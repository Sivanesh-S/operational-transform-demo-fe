import { useEffect, useRef, useState } from "react";
import Delta from "quill-delta";

import { AddUser } from "./components/AddUser";
import { User } from "./components/User";
import { Footer } from "./components/Footer";

import "./App.css";

function App() {
  // Server state
  const [users, setUsers] = useState(["Peter", "Stewie"]);
  const [operations, setOperations] = useState([]);

  // Frequently updated and not depended for any state to update
  const contentRef = useRef(new Delta());

  // Effects
  // Update Server state
  useEffect(() => {
    if (operations.length) {
      const newcontent = operations.reduce((acc, curr) => {
        return acc.compose(curr.delta);
      }, contentRef.current);

      contentRef.current = newcontent;
      console.log("server updated...");
      setOperations([]);
    }
  }, [operations]);

  // API mock
  const getInitialState = () => {
    return contentRef.current;
  };

  // Handlers
  const onCreateUser = (username) => {
    if (users.includes(username)) {
      const message = `There's already an user with name "${username}". Try a different name`;
      alert(message);
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
            <User
              key={user}
              name={user}
              operations={operations}
              setOperations={setOperations}
              getInitialState={getInitialState}
            />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
