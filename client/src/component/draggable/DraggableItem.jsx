import React from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskItem from "../common/TaskItem";

const DraggableItem = ({ item, index, handleEdit, handleDelete, disableTask }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskItem
            item={item}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            disableTask={disableTask}
          />
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
