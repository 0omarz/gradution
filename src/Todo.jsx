
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Todo.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    desc: '',
    dueDate: '',
    time: '',
    files: []
  });
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const userToken = localStorage.getItem("UserToken");
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [imageGalleryItems, setImageGalleryItems] = useState([]);
  const [currentTaskImages, setCurrentTaskImages] = useState([]); 
  const [doneTasks, setDoneTasks] = useState({});




  const openImageGallery = (task) => {
    const items = task.files.map(file => ({
      original: file.secure_url,
      thumbnail: file.secure_url,
    }));
    setCurrentTaskImages(items);
    setShowImageGallery(true);
  };


  const openUpdateModal = (task) => {
    setSelectedTask(task);
    setNewTask({
      title: task.title,
      desc: task.desc,
      dueDate: task.dueDate,
      time: task.time,
      files: task.files
    });
    setShowUpdateModal(true);
  };


  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://lessa-ochre.vercel.app/task/getTasks', {
        headers: {
          Authorization: `secretary__ ${userToken}`
        }
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleFileChange = (e) => {
    setNewTask({ ...newTask, files: [...e.target.files] });
  };

  const addTask = async (isEmergency = false) => {
    if (newTask.title && newTask.desc && newTask.dueDate && newTask.time) {
      const formattedTime = (time24) => {
        let [hours, minutes] = time24.split(':');
        let period = 'am';
        if (parseInt(hours) >= 12) {
          period = 'pm';
          if (parseInt(hours) > 12) {
            hours = (parseInt(hours) - 12).toString();
          }
        }
        if (hours === '00') {
          hours = '12';
        }
        return `${('0' + hours).slice(-2)}:${minutes}${period}`;
      };

      const formData = new FormData();
      formData.append('title', newTask.title);
      formData.append('desc', newTask.desc);
      formData.append('dueDate', newTask.dueDate);
      formData.append('time', formattedTime(newTask.time));
      newTask.files.forEach(file => formData.append('files', file));

      try {
        await axios.post('https://lessa-ochre.vercel.app/task/addTask', formData, {
          headers: {
            Authorization: `secretary__ ${userToken}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        await fetchTasks(); // Fetch the updated list of tasks
        setShowModal(false);
        setNewTask({
          title: '',
          desc: '',
          dueDate: '',
          time: '',
          files: []
        });
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };



  const removeTask = async (taskId) => {
    console.log(taskId);
    try {
      const response = await axios.delete(`https://lessa-ochre.vercel.app/task/deleteTask/${taskId}`, {
        headers: {
          Authorization: `secretary__ ${userToken}`
        }
      });
      if (response.data.message === 'Done') {
        fetchTasks();
      }
      else {
        console.log(response.data);
        fetchTasks();
      }
    } catch (error) {
      console.error('Error removing task:', error);
      fetchTasks();
    }
  };

  const toggleFavorite = async (taskId) => {
    console.log(taskId);
    try {
      const response = await axios.get(`https://lessa-ochre.vercel.app/task/addFavourite/${taskId}`, {
        headers: {
          Authorization: `secretary__ ${userToken}`
        }
      });
      if (response.data.message) {
        fetchTasks();
      }
      else {
        console.log(response.data);

      }
    } catch (error) {
      console.error('Error toggling favorite status:', error);

    }
  };
  const toggleEmergency = async (taskId) => {
    console.log(taskId);
    try {
      const response = await axios.get(`https://lessa-ochre.vercel.app/task/addEmergancy/${taskId}`, {
        headers: {
          Authorization: `secretary__ ${userToken}`
        }
      });
      if (response.data.message) {
        fetchTasks();
      }
      else {
        console.log(response.data);

      }
    } catch (error) {
      console.error('Error toggling favorite status:', error);

    }
  }; 

  const taskDone = async (taskId) => {
    console.log(taskId);
    try {
      const response = await axios.get(`https://lessa-ochre.vercel.app/task/done/${taskId}`, {
        headers: {
          Authorization: `secretary__ ${userToken}`
        }
      });
      if (response.data.message) {
        fetchTasks();
      }
      else {
        console.log(response.data);

      }
    } catch (error) {
      console.error('error in Task Done function  ', error);

    }
  };

  const updateTask = async () => {
    if (selectedTask && newTask.title && newTask.desc && newTask.dueDate && newTask.time) {
      const formData = new FormData();
      formData.append('title', newTask.title);
      formData.append('desc', newTask.desc);
      formData.append('dueDate', newTask.dueDate);
      formData.append('time', newTask.time);
      newTask.files.forEach(file => formData.append('files', file));

      try {
        await axios.patch(`https://lessa-ochre.vercel.app/task/editTask/${selectedTask._id}`, formData, {
          headers: {
            Authorization: `secretary__ ${userToken}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        await fetchTasks();
        setShowUpdateModal(false);
        setNewTask({
          title: '',
          desc: '',
          dueDate: '',
          time: '',
          files: []
        });
        setSelectedTask(null);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };


  const filteredTasks = tasks.filter(task =>
    (task.title && task.title.toLowerCase().includes(search.toLowerCase())) ||
    (task.desc && task.desc.toLowerCase().includes(search.toLowerCase()))
  );

  const emergencyTasks = filteredTasks.filter(task => task.emergancy && !task.favourite);
  const regularTasks = filteredTasks.filter(task => !task.emergancy && !task.favourite);
  const favoriteTasks = filteredTasks.filter(task => task.favourite);

  return (
    <>
      <Navbar />
      <div className="todo-container">
        <h3 className="todo-title">To-Do List</h3>
        <div className="todo-input-container">
          <button className="todo-add-button" onClick={() => setShowModal(true)}>Add Task</button>
        </div>
        <div className="todo-search-container">
          <input
            type="text"
            className="todo-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks"
          />
        </div>
        <h4 className="todo-section-title">Emergency Tasks</h4>
        <ul className="todo-list">
          {emergencyTasks.map((task) => (
            <li key={task._id} className={`todo-item emergency ${task.done ? 'done' : ''}`} onClick={() => taskDone(task._id)}>
              <span>
                <strong>Title:</strong> {task.title} <br />
                <strong>Description:</strong> {task.desc} <br />
                <strong>Due Date:</strong> {task.dueDate} <br />
                <strong>Time:</strong> {task.time} <br />
                
                {task.files.map((file, index) => (
                  <span key={index}>

                  </span>
                ))}

              </span>
              <button className="todo-favorite-button allButtons" onClick={() => toggleFavorite(task._id)}>
                {task.favourite ? '★' : '☆'}
              </button>
              <button className='allButtons' onClick={() => toggleEmergency(task._id)}>
                {task.emergancy ? <i class="fa-solid fa-bell"></i> : <i class="fa-regular fa-bell"></i>}
              </button>
              <button className="todo-update-button allButtons" onClick={() => openUpdateModal(task)}>
                <i className="fas fa-edit"></i>
              </button>
              <button className='allButtons' onClick={() => openImageGallery(task)}>
                <i className="fa fa-folder"></i>
              </button>
              <button className="todo-remove-button allButtons" onClick={() => removeTask(task._id)}>
                <i className="fas fa-trash"></i>
              </button> 
              {/* <button className='allButtons' onClick={() => taskDone(task._id)}>
                {task.done ? <i class="fa-regular fa-circle-check"></i> : <i class="fa-solid fa-circle-check"></i>}
              </button> */}
            </li>
          ))}
        </ul>
        <h4 className="todo-section-title">Regular Tasks</h4>
        <ul className="todo-list">
          {regularTasks.map((task) => (
            <li key={task._id} className={`todo-item ${task.done ? 'done' : ''}`} onClick={() => taskDone(task._id)}>
              <span>
                <strong>Title:</strong> {task.title} <br />
                <strong>Description:</strong> {task.desc} <br />
                <strong>Due Date:</strong> {task.dueDate} <br />
                <strong>Time:</strong> {task.time} <br />
          
                {task.files.map((file, index) => (
                  <span key={index}>

                  </span>
                ))}

              </span>
              <button className="todo-favorite-button allButtons" onClick={() => toggleFavorite(task._id)}>
                {task.favourite ? '★' : '☆'}
              </button>
              <button className='allButtons' onClick={() => toggleEmergency(task._id)}>
                {task.emergancy ? <i class="fa-solid fa-bell"></i> : <i class="fa-regular fa-bell"></i>}
              </button>
              <button className="todo-update-button allButtons" onClick={() => openUpdateModal(task)}>
                <i className="fas fa-edit"></i>
              </button>
              <button className='allButtons' onClick={() => openImageGallery(task)}>
                <i className="fa fa-folder"></i>
              </button>
              <button className="todo-remove-button allButtons" onClick={() => removeTask(task._id)}>
                <i className="fas fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
        <h4 className="todo-section-title">Favorite Tasks</h4>
        <ul className="todo-list">
          {favoriteTasks.map((task) => (
            <li key={task._id} className={`todo-item ${task.done ? 'done' : ''}`} onClick={() => taskDone(task._id)} >
              <span>
                <strong>Title:</strong> {task.title} <br />
                <strong>Description:</strong> {task.desc} <br />
                <strong>Due Date:</strong> {task.dueDate} <br />
                <strong>Time:</strong> {task.time} <br />
                
                {task.files.map((file, index) => (
                  <span key={index}>

                  </span>
                ))}

              </span>
              <button className="todo-favorite-button allButtons" onClick={() => toggleFavorite(task._id)}>
                {task.favourite ? '★' : '☆'}
              </button>
              <button  className='allButtons' onClick={() => toggleEmergency(task._id)}>
                {task.emergancy ? <i class="fa-solid fa-bell"></i> : <i class="fa-regular fa-bell"></i>}
              </button>
              <button className="todo-update-button allButtons" onClick={() => openUpdateModal(task)}>
                <i className="fas fa-edit"></i>
              </button>
              <button className='allButtons' onClick={() => openImageGallery(task)}>
                <i className="fa fa-folder "></i>
              </button>
              <button className="todo-remove-button allButtons" onClick={() => removeTask(task._id)}>
                <i className="fas fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newTask.desc}
              onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
            />
            <input
              type="date"
              placeholder="Due Date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <input
              type="time"
              placeholder="Time"
              value={newTask.time}
              onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
            />
            <input
              type="file"
              multiple
              onChange={handleFileChange}
            />
            <div className="modal-buttons">
              <button onClick={() => addTask(false)}>Add Regular Task</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newTask.desc}
              onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
            />
            <input
              type="date"
              placeholder="Due Date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <input
              type="time"
              placeholder="Time"
              value={newTask.time}
              onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
            />
            <input
              type="file"
              multiple
              onChange={handleFileChange}
            />
            <div className="modal-buttons">
              <button onClick={updateTask}>Update Task</button>
              <button onClick={() => setShowUpdateModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showImageGallery && (
        <div className="image-gallery-modal">
          <div className="image-gallery-content">
            <button className='allButtons' onClick={() => setShowImageGallery(false)}><i class="fa-regular fa-circle-xmark"></i></button>
            <ImageGallery items={currentTaskImages} />
          </div>
        </div>
      )}



    </>
  );
};

export default ToDo;
