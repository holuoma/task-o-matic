import React from "react";

const NewTask = ({ onInput, onSave }) => {
  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <div className="form-group m-2">
        <label htmlFor="taskInput">Please input your new task below</label>
        <input
          type="text"
          className="form-control"
          id="taskInput"
          aria-describedby="newTaskInput"
          onChange={e => onInput(e)}
        />
        <small id="newTaskInput" className="form-text text-muted text-center">
          What are you up to?
        </small>
      </div>
      <button type="submit" className="btn btn-primary" onClick={onSave}>
        Save task
      </button>
    </form>
  );
};

export default NewTask;
