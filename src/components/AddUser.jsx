import { useState } from "react";

export function AddUser(props) {
  const { onCreateUser } = props;

  const [name, setName] = useState("");

  // Handlers
  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    onCreateUser(name);
    setName("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="create-user">
        <input
          className="create-user-input"
          placeholder="Add User"
          value={name}
          onChange={onNameChange}
        />
        <button type="submit" className="create-user-button">
          Create User
        </button>
      </div>
    </form>
  );
}
