import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Button from "../common/Button";
import UpdateForm from "../updateTask/UpdateTask";
import DeleteMessage from "../deleteTask/DeleteMessage";
import DeleteConfirmationDialog from "../deleteTask/DeleteConfirmationDialog";
import { io } from "socket.io-client";
import DraggableList from "../draggable/DraggableList";
import "./TaskManager.css";

const TaskManager = () => {
  const [showForm, setShowForm] = useState(true);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [disableTask, setDisableTask] = useState("");
  const [isEditItem, setIsEditItem] = useState(null);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [items, setItems] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);
  const socket = io("localhost:3002");

  function getTaskData() {
    socket.on("taskManagerData", (data) => {
      setItems(data);
    });
  }

  useEffect(() => {
    getTaskData();
  }, [isDataUpdated, deleteMessage]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "Title") setInputTitle(value);
    else if (name === "Description") setInputDesc(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputTitle || !inputDesc) {
      alert("Please fill in both title and description.");
      return;
    }

    if (isEditItem !== null) {
      socket.emit("updateTaskData", {
        id: isEditItem,
        name: inputTitle,
        desc: inputDesc,
      });
      getTaskData();
      setIsDataUpdated(true);
      setIsEditItem(null);
      setDisableTask("")
    } else {
      const newTask = {
        id: new Date().getTime().toString(),
        name: inputTitle,
        desc: inputDesc,
      };
      socket.emit("AddTask", newTask);
      setItems((prevItem) => [...prevItem, newTask]);
    }

    setInputTitle("");
    setInputDesc("");
    setShowForm(false);
  };
  const handleCancel = () => {
    setShowForm(false);
    setInputTitle("");
    setInputDesc("");
    setIsEditItem(null);
    setDisableTask("")
  };

  const handleEdit = (id) => {
    setDisableTask(id);
    setIsDataUpdated(false);
    socket.emit("EditTask", id);
    socket.on("editTaskDetails", (editTaskDetails) => {
      setIsEditItem(editTaskDetails.id);
      setInputTitle(editTaskDetails.name);
      setInputDesc(editTaskDetails.desc);
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setShowDeleteConfirmation(true);
    setTaskToDeleteId(id);
  };

  const handleConfirmDelete = () => {
    socket.emit("DeleteTask", taskToDeleteId);
    setDeleteMessage(true);
    setShowDeleteConfirmation(false);
    setTimeout(() => {
      setDeleteMessage(false);
    }, 2000);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  return (
    <>{showDeleteConfirmation && (
      <DeleteConfirmationDialog
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    )}
      <div className="container">
        <div className="col-12 text-end">
          <Button onClick={handleAdd} text="New" color="primary" />
        </div>

        {showForm && (
          <div className="container border rounded d-flex justify-content-center shadow p-3">
            <div className="row">
              <div className="text-center">
                <h2>{isEditItem ? "Edit Task" : "Add Task"}</h2>
              </div>
              <UpdateForm
                inputTitle={inputTitle}
                inputDesc={inputDesc}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
                buttonText={isEditItem ? "Update" : "Save"}
                handleCancel={handleCancel}
                cancelText="Cancel"
              />
            </div>
          </div>
        )}

        <div className="container py-2">
          {deleteMessage && <DeleteMessage />}

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <DraggableList
              items={items}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              disableTask={disableTask}
            />
          </DragDropContext>
        </div>
      </div></>
  );
};

export default TaskManager;
