import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggableItem from "./DraggableItem";

const DraggableList = ({ items, handleEdit, handleDelete,disableTask }) => {
  return (
    <Droppable droppableId="items">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {items.map((item, index) => (
            <DraggableItem
              key={item.id}
              item={item}
              index={index}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              disableTask={disableTask}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DraggableList;
