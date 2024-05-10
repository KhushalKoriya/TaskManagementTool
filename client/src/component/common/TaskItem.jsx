import React from "react";
import Button from "../common/Button";
import "./Taskitem.css";

const TaskItem = ({
  item,
  handleEdit,
  handleDelete,
  disableTask,
}) => {
  const isDeleteButtonDisabled = disableTask === item.id;
  const buttonColorClass = isDeleteButtonDisabled
    ? "danger disabled-button"
    : "danger";
  return (
    <div className="row border rounded shadow p-3 mb-3 bg-white rounded p-2">
      <div className="col-12 d-flex justify-content-between align-items-center">
        <div>
          <h4>{item.name}</h4>
          <p>{item.desc}</p>
        </div>
        <div>
          <Button
            onClick={() => handleEdit(item.id)}
            text="Edit"
            color="primary"
          />
          <Button
            onClick={() => handleDelete(item.id)}
            text="Delete"
            color={buttonColorClass}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
