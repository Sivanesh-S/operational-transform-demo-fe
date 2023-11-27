import Avatar from "boring-avatars";
import { useState } from "react";
import ReactQuill from "react-quill";

export function User(props) {
  const { name } = props;

  // State
  const [content, setContent] = useState("");

  // Handlers
  const onChange = (value) => {
    setContent(value);
  };

  return (
    <div className="user">
      <div className="user-info">
        <Avatar
          size={40}
          name={name}
          variant="beam"
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
        <h2>{name}</h2>
      </div>
      <div className="editor">
        <ReactQuill value={content} onChange={onChange} />
      </div>
    </div>
  );
}
