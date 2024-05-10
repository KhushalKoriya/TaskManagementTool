import express from "express";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";

const PORT = 3002;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let taskManagerData = [
  {
    id: "001",
    name: "Default Task",
    desc: "Default Description",
  },
];


/* io Connection setup */
io.on("connection", (socket) => {

  socket.emit("taskManagerData", taskManagerData);


  /* Add Task */
  socket.on("AddTask", (task) => taskManagerData.push(task));


  /* Edit Task */
  socket.on("EditTask", (taskId) => {
    const editData = taskManagerData.find((item) => item.id === taskId);
    socket.emit("editTaskDetails", editData);
  });
  socket.on("updateTaskData", (updatedData) => {
    const index = taskManagerData.findIndex(
      (item) => item.id === updatedData.id
    );
    if (index !== -1) {
      taskManagerData[index] = { ...taskManagerData[index], ...updatedData };
    }
  });


  /* Delete Task */
  socket.on("DeleteTask", (taskId) => {
    const index = taskManagerData.findIndex((item) => item.id === taskId);
    taskManagerData.splice(index, 1);
  });


  /* socket disconnect */
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

try {
  server.listen(PORT, () => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error) {
  console.error(`Error occurred: ${error.message}`);
}
