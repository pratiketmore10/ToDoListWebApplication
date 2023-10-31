// src/components/TaskList.js

import React, { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        throw new Error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask) {
      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task: newTask }),
        });

        if (response.ok) {
          setNewTask('');
          fetchTasks();
        } else {
          throw new Error('Failed to add task');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const markTaskAsComplete = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        fetchTasks();
      } else {
        throw new Error('Failed to mark task as complete');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        placeholder="Add a task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.completed ? (
              <del>{task.task}</del>
            ) : (
              task.task
            )}
            {!task.completed && (
              <button onClick={() => markTaskAsComplete(task.id)}>
                Mark as Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
