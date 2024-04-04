import React, { useState, useEffect, ChangeEvent } from 'react';
import DeleteIcon from '../assets/icons8-delete.svg';
import CheckIcon from '../assets/icons8-check.png';

const url = 'http://localhost:3000/todo_tasks';

interface Task {
  id: number;
  task: string;
  completed: boolean;
}

const AppTask: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchtasks();
  }, []);

  const fetchtasks = async () => {
    const response = await fetch(`${url}`);
    setTasks(await response.json());
  };

  const handleAddTask = async () => {
    if (task.trim().length === 0) {
      setError('You must add a task!');
    } else {
      const newTask = { task, completed: false };
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newTask),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setTasks([...tasks, data]);
      setTask('');
      setError(null);
    }
  };

  const handleDeleteTask = async (id: number) => {
    fetch(`${url}/${id}`, { method: 'DELETE' }).then(() => fetchtasks());
  };

  const handleToggleCompleted = async (id: number) => {
    const taskToToggle = tasks.find((task) => task.id === id);
    const updatedTask = {
      ...taskToToggle,
      completed: !taskToToggle?.completed,
    };
    const options = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(updatedTask),
    };
    const response = await fetch(`${url}/${id}`, options);
    const data = await response.json();
    const updatedTasks = tasks.map((task) => (task.id === id ? data : task));
    setTasks(updatedTasks);
  };

  const handleDeleteAllTasks = async (tasks: Array<Task>) => {
    for (const task of tasks) fetch(`${url}/${task.id}`, { method: 'DELETE' });
    setTasks([]);
  };

  return (
    <div>
      <h1 style={{ fontSize: '40px' }}>Todo List</h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px',
        }}
      >
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{
            height: '30px',
            width: '90%',
            marginRight: '2px',
            padding: '0 5px',
            fontSize: '15px',
          }}
          placeholder="Add a new todo"
        />
        <button
          onClick={() => handleAddTask()}
          style={{
            backgroundColor: '#9066ee',
            fontSize: '25px',
            padding: '0px 6px 2px 6px',
            color: 'white',
            borderRadius: '4px',
          }}
        >
          +
        </button>
        <div
          role="alert"
          style={{
            color: '#dc3545',
            position: 'absolute',
            margin: '36px 5px',
            fontStyle: 'italic',
            fontSize: '15px',
          }}
        >
          {error}
        </div>
      </form>
      <table
        style={{ width: '100%', margin: '30px 0', borderCollapse: 'collapse' }}
      >
        <thead style={{}}></thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <div
                style={{
                  margin: '3px 0px',
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginBottom: '5px',
                  backgroundColor: '#f1f0f5',
                }}
              >
                <td
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    width: '70%',
                    textAlign: 'start',
                    fontSize: '18px',
                    cursor: 'pointer',
                    padding: '0.8rem',
                    fontFamily: 'Helvetica',
                  }}
                >
                  {task.task}
                </td>
                <td>
                  <button
                    onClick={() => handleToggleCompleted(task.id)}
                    style={{
                      backgroundColor: 'transparent',
                      padding: '0.5rem',
                      outline: 'none',
                    }}
                  >
                    <img src={CheckIcon} alt="check" width="20px" />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    style={{
                      backgroundColor: 'transparent',
                      padding: '0.5rem',
                    }}
                  >
                    <img src={DeleteIcon} alt="delete" />
                  </button>
                </td>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {tasks.length <= 0 && (
          <p style={{ fontStyle: 'italic' }}>
            No task pending. Feel free to add one ! 📝
          </p>
        )}
        {tasks.length == 1 && (
          <p style={{ fontStyle: 'italic' }}>
            You have {tasks.length} task pending.
          </p>
        )}
        {tasks.length > 1 && (
          <p style={{ fontStyle: 'italic' }}>
            You have {tasks.length} tasks pending.
          </p>
        )}
        {tasks.length > 0 && (
          <button onClick={() => handleDeleteAllTasks(tasks)}>
            Clear all tasks
          </button>
        )}
      </div>
    </div>
  );
};

export default AppTask;
