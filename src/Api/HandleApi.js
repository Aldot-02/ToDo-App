import axios from 'axios';

const baseUrl = 'https://todo-app-apis.onrender.com';

const getAllTasks = (setTask) => {
    axios.get(baseUrl).then(({data}) => {
        console.log(data)
        setTask(data)
    }).catch((error) => console.log(error))
}

const addTask = (text, setText, setTask) =>{
    axios
    .post(`${baseUrl}/save`, {text})
    .then((data) => {
        console.log(data);
        setText("");
        getAllTasks(setTask)
    }).catch((error) => console.log(error))
}

const updateTask = (taskId, text, setTask, setText, setIsUpdating) =>{
    axios
    .put(`${baseUrl}/update`, {_id: taskId, text})
    .then((data) => {
        console.log(data)
        setText("")
        setIsUpdating(false)
        getAllTasks(setTask)
    }).catch((error) => console.log(error))
}

const deleteTask = (_id, setTask) =>{
    axios
    .delete(`${baseUrl}/delete`, { data: { _id } })
    .then((data) => {
        console.log(data);
        getAllTasks(setTask);
    }).catch((error) => console.log(error));
}

const markTaskAsComplete = (_id, setTask) => {
    axios
    .put(`${baseUrl}/complete`, { _id })
    .then((data) => {
        console.log(data);
        getAllTasks(setTask);
    }).catch((error) => console.log(error));
}

export {getAllTasks, addTask, updateTask, deleteTask, markTaskAsComplete}