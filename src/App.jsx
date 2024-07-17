import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('not completed');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTodo = () => {
    if (title && description) {
      if (editIndex !== null) {
        // Update existing todo
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = { title, description, status };
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        // Add new todo
        setTodos([...todos, { title, description, status }]);
      }
      setTitle('');
      setDescription('');
    }
  };

  const handleEditClick = (index) => {
    const todoToEdit = todos[index];
    setTitle(todoToEdit.title);
    setDescription(todoToEdit.description);
    setStatus(todoToEdit.status);
    setEditIndex(index);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-item">
      <h1 className='title'>Todo List</h1>
      <div className='todo-input'>
        <input
          type="text"
          placeholder="Todo Title"
          value={title}
          className="todo-title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Todo Description"
          value={description}
          className="todo-description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className='btnAdd' onClick={handleAddTodo}>
          {editIndex !== null ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>
      <div className="todo-op">
        {todos.map((todo, index) => (
          <div key={index} className="todo-card">
            <h3 className='task-t'> Task </h3>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <select
              className="todo-status"
              value={todo.status}
              onChange={(e) =>
                handleEditTodo(index, { ...todo, status: e.target.value })
              }
            >
              <option value="not completed">Not Completed</option>
              <option value="completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
            <button className="todo-delete" onClick={() => handleEditClick(index)}>
              Edit
            </button>
            <button className="todo-delete" onClick={() => handleDeleteTodo(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
