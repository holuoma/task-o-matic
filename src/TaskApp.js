import React, { Component } from "react";
import TaskList from "./TaskList";
import NewTask from "./NewTask";
import EditTask from "./EditTask";

class TaskApp extends Component {
  state = {
    count: 0,
    tasks: [],
    addNewTaskMode: false,
    editTaskMode: false,
    targetTaskToEdit: null,
    taskInput: ""
  };

  style = {
    logo: {
      fontFamily: "'Anton', sans-serif",
      fontSize: "6em"
    },
    title: {
      fontSize: "0.8em",
      fontWeight: "bold"
    }
  };

  numberOfTasks() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }

  getBadgeClasses() {
    const baseClasses = "badge m-2 badge-";
    return this.state.count === 0
      ? baseClasses + "warning"
      : baseClasses + "primary";
  }

  handleNewTask = () => {
    this.setState({
      addNewTaskMode: true
    });
  };

  handleUserInput = e => {
    this.setState({
      taskInput: e.target.value
    });
  };

  handleSaveTask = e => {
    e.preventDefault();
    if (!this.state.taskInput.length) {
      this.setState({
        addNewTaskMode: false
      });
    } else {
      this.setState({
        tasks: [
          ...this.state.tasks,
          { description: this.state.taskInput, completed: false }
        ],
        taskInput: "",
        addNewTaskMode: false,
        count: this.state.count + 1
      });
    }
  };

  handleSaveEditedTask = e => {
    e.preventDefault();
    if (!this.state.taskInput.length) {
      this.setState({
        editTaskMode: false
      });
    } else {
      this.setState({
        tasks: [
          ...this.state.tasks.filter(t => t !== this.state.targetTaskToEdit),
          { description: this.state.taskInput, completed: false }
        ],
        taskInput: "",
        editTaskMode: false
      });
    }
  };

  handleMarkAsDone = task => {
    const targetTask = this.state.tasks.filter(t => t === task)[0];
    targetTask.completed = !targetTask.completed;
    this.setState({
      tasks: [...this.state.tasks.filter(t => t !== task), targetTask]
    });
  };

  handleDelete = task => {
    this.setState({
      tasks: this.state.tasks.filter(t => t !== task),
      count: this.state.count - 1
    });
  };

  handleEditTask = task => {
    this.setState({
      editTaskMode: true,
      targetTaskToEdit: task
    });
  };

  render() {
    return (
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 text-center">
            <h1 style={this.style.logo}>Task'o'matic</h1>
            <h2>
              You have{" "}
              <span style={this.style.title} className={this.getBadgeClasses()}>
                {this.numberOfTasks()}
              </span>{" "}
              tasks pending
            </h2>
          </div>
          <div class="col-12 text-center m-2">
            <button
              disabled={this.state.editTaskMode}
              className="btn btn-secondary btn-lg"
              onClick={this.handleNewTask}
            >
              Add task
            </button>
          </div>
          {this.state.addNewTaskMode && (
            <NewTask
              onInput={this.handleUserInput}
              onSave={this.handleSaveTask}
            />
          )}
          {this.state.editTaskMode && (
            <EditTask
              onInput={this.handleUserInput}
              onSaveEdit={this.handleSaveEditedTask}
              targetTask={this.state.targetTaskToEdit}
            />
          )}
          {this.state.count > 0 &&
            !this.state.addNewTaskMode &&
            !this.state.editTaskMode && (
              <TaskList
                tasks={this.state.tasks}
                onMarkAsDone={this.handleMarkAsDone}
                onDelete={this.handleDelete}
                onEdit={this.handleEditTask}
              />
            )}
        </div>
      </div>
    );
  }
}

export default TaskApp;
