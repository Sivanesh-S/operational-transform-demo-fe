import Avatar from "boring-avatars";
import { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Delta from "quill-delta";
import { debounce } from "../utils/debounce";

export function User(props) {
  const { name, operations, setOperations, getInitialState } = props;

  // State
  const [content, setContent] = useState(new Delta(getInitialState()));
  const [newOps, setNewOps] = useState(new Delta());

  // Effects
  useEffect(() => {
    if (!operations.length) return;

    const indices = [];

    operations.forEach((operation, index) => {
      // To make it as a broadcast event.
      if (operation.name === name) {
        // As return in forEach just breaks the current execution
        return;
      }

      indices.push(index);

      // As compose is done on the `value` prop of `<ReactQuill />`
      const transformedDelta = new Delta().transform(operation.delta, true);
      const composedDelta = content.compose(transformedDelta);
      setNewOps(new Delta());
      setContent(composedDelta);
    });

    if (!indices.length) return;

    const newOperations = operations.filter(
      (_, index) => !indices.includes(index)
    );

    setOperations(newOperations);
  }, [operations]);

  // Handlers
  const handleDebounceChange = (delta, currentDelta, oldDelta) => {
    const diff = oldDelta.diff(currentDelta);

    setContent((pre) => pre.compose(diff));
    setNewOps(new Delta());
    setOperations((pre) => [...pre, { delta: diff, name }]);
    console.log("Operations pushed---");
  };

  const debouncedHandleChange = useCallback(
    debounce(handleDebounceChange, 2000),
    []
  );

  const onChange = (_, delta, source, editor) => {
    // If the change is not caused due to user input ignore...
    if (source === "api") return;

    const deltaContents = editor.getContents();

    const diff = content.diff(deltaContents);
    setNewOps(diff);

    debouncedHandleChange(delta, deltaContents, content);
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
        <h3>{`${name}'s machine`}</h3>
      </div>
      <div className="editor">
        <ReactQuill value={content.compose(newOps)} onChange={onChange} />
      </div>
    </div>
  );
}
