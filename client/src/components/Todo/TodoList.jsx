/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import Modal from "./Modal";
import { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoList = ({ todo, setEditData, handleEditTodo, handleDeleteTodo, setStateManage }) => {
    const checkboxRef = useRef(null);

    const handleEdit = (title, desc, priority, category) => {
        handleEditTodo(todo._id, title, desc, priority, category);
    };

    const handleDelete = () => {
        console.log(todo._id)
        handleDeleteTodo(todo._id);
    };

    const handleCompletedTodo = async () => {
        try {
            if (!todo) {
                // Handle the case where todo is undefined
                console.error("Todo is undefined");
                return;
            }

            // Update the local state immediately for a responsive UI
            const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
            setEditData(updatedTodo);

            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Not Authorized");
                return;
            }

            // Make the API call in the background
            const res = await fetch(`https://week-5-challenge-5-backend.vercel.app/api/notes/complete-todo/${todo._id}`, {
                method: "put",
                headers: {
                    "token": token,
                },
            });

            const data = await res.json();
            console.log(data.notes?.isCompleted);
            setStateManage((prev) => !prev);
            if (data.notes?.isCompleted === true) {
                toast.success('Todo Uncompleted Successfully', {
                    position: "top-right",
                    autoClose: 1300,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                toast.success('Todo Complete Successfully', {
                    position: "top-right",
                    autoClose: 1300,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1300}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {todo && (
                <div className="block max-w-[20rem] p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer">
                    <div className="grid grid-cols-6 place-items-center">
                        {todo.isCompleted !== undefined && (
                            <div className="checkbox-wrapper dark:text-white mb-8" >
                                <label>
                                    <input
                                        checked={todo.isCompleted}
                                        type="checkbox"
                                        className="dark:text-white"
                                        onChange={() => handleCompletedTodo(todo._id, !todo.isCompleted)}
                                    />
                                    <span className="checkbox dark:text-white border-red-600" ></span>
                                </label>
                            </div>
                        )}

                        <div className="col-span-4 p-2">
                            <h5 className="text-xl break-normal font-bold tracking-tight text-gray-900 dark:text-white">{todo.title}</h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{todo.description}</p>
                        </div>
                        <div>
                            <div className="bg-cyan-600 text-white text-center py-0.5 px-2 rounded-md">
                                {todo.priority}
                            </div>
                            <div className="flex space-x-2 text-xl mt-2">
                                <Modal handleEdit={handleEdit} todo={todo} />
                                <MdDelete className="cursor-pointer dark:text-white hover:text-red-700 dark:hover:text-red-500" onClick={handleDelete} />
                            </div>
                        </div>
                    </div>
                    <div className="my-3 flex">
                        {todo.categories?.map(cat => {
                            return <div key={todo._id} >
                                <span className="bg-cyan-700 text-white px-2 py-1 m-1 rounded-md">
                                    {cat.name}
                                </span>
                            </div>
                        })}
                    </div>
                </div>
            )}
        </>

    );
};

export default TodoList;
