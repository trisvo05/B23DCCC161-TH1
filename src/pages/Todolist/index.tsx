import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const categories = {
	React: 'border-blue-400',
	Python: 'border-yellow-400',
	Maths: 'border-green-400',
	Science: 'border-red-400',
	JS: 'border-orange-400',
	Dinner: 'border-purple-400',
	Project: 'border-pink-400',
	Cricket: 'border-yellow-500',
};

const Button = ({ children, className, onClick }) => {
	return (
		<button className={`px-4 py-2 rounded ${className}`} onClick={onClick}>
			{children}
		</button>
	);
};

const Input = ({ placeholder, value, onChange }) => {
	return (
		<input
			type='text'
			className='px-4 py-2 border rounded w-full'
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
};

const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
			<div className='bg-white p-6 rounded shadow-lg relative'>
				<button className='absolute top-0 right-0 m-4' onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};

const TodoList = () => {
	const [tasks, setTasks] = useState([
		{ id: 1, category: 'React', text: 'Learn all basic concepts of react' },
		{ id: 2, category: 'Python', text: 'Debugging in python project' },
		{ id: 3, category: 'Maths', text: 'Learn and practice some concepts of maths' },
		{ id: 4, category: 'Science', text: 'Science study' },
		{ id: 5, category: 'JS', text: 'Learn basic concepts of javascript' },
		{ id: 6, category: 'Dinner', text: 'Do dinner' },
		{ id: 7, category: 'Project', text: 'Make a small project of react' },
		{ id: 8, category: 'Cricket', text: 'Play cricket with friends' },
	]);

	const [newTask, setNewTask] = useState({ category: '', text: '' });
	const [isOpen, setIsOpen] = useState(false);

	const addTask = () => {
		if (newTask.text.trim() === '' || newTask.category.trim() === '') return;
		setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
		setNewTask({ category: '', text: '' });
		setIsOpen(false);
	};

	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	return (
		<div className='p-6 bg-gray-100 min-h-screen'>
			<h1 className='text-3xl font-bold text-center'>Todo List</h1>
			<div className='flex justify-center my-4'>
				<Button className='bg-blue-500 text-white' onClick={() => setIsOpen(true)}>
					Create Task
				</Button>
			</div>

			<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
				{tasks.map((task) => (
					<div key={task.id} className={`p-4 border-2 rounded-lg ${categories[task.category]}`}>
						<h2 className='font-semibold'>{task.category}</h2>
						<p>{task.text}</p>
						<div className='flex justify-end space-x-2 mt-2'>
							<FaEdit className='text-green-500 cursor-pointer' />
							<FaTrash className='text-red-500 cursor-pointer' onClick={() => deleteTask(task.id)} />
						</div>
					</div>
				))}
			</div>

			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<h2 className='text-xl font-bold mb-2'>Add New Task</h2>
				<Input
					placeholder='Category'
					value={newTask.category}
					onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
				/>
				<Input
					placeholder='Task Description'
					value={newTask.text}
					onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
				/>
				<Button className='mt-2 bg-blue-500 text-white' onClick={addTask}>
					Add Task
				</Button>
			</Modal>
		</div>
	);
};

export default TodoList;
