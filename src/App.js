import { useEffect, useState } from 'react';
import TaskComponent from './components/taskComponent';
import { addTask, deleteTask, getAllTasks, updateTask, markTaskAsComplete } from './Api/HandleApi';

function App() {

  const [task, setTask] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    getAllTasks(setTask)
  }, []);

  const updateTaskMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setTaskId(_id)
  }

  const sortedTasks = [...task].sort((a, b) => {
    if (a.isComplete && !b.isComplete) return 1;
    if (!a.isComplete && b.isComplete) return -1;
    return 0;
  });

  return (
    <div className="App">
      <div className="container">
        <h1>ATLP TODO APP</h1>
        <div className="top">
          <input type="text" placeholder="Add your task here" value={text} onChange={(e) => setText(e.target.value)} />
          <div
            className="add"
            onClick={isUpdating ?
              () => updateTask(taskId, text, setTask, setText, setIsUpdating)
              : () => addTask(text, setText, setTask)}>
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {sortedTasks.map((item) =>
            <TaskComponent
              key={item._id}
              text={item.text}
              isComplete={item.isComplete}
              updateTaskMode={() => updateTaskMode(item._id, item.text)}
              deleteTask={() => deleteTask(item._id, setTask)}
              completeTask={() => markTaskAsComplete(item._id, setTask)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;