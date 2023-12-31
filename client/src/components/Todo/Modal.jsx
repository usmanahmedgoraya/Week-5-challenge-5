/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Dropdown from "../Dropdown"
import CategoryModal from "../CategoryModal";
import UpdatedCategory from "../UpdatedCategory";

export default function Modal({ handleEdit, todo }) {
    const [showModal, setShowModal] = React.useState(false);
    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()
    const [priority, setPriority] = useState()
    const [category, setCategory] = useState([])

    useEffect(() => {
      setTitle(todo.title)
      setDesc(todo.description)
      setPriority(todo.priority)
      const cat = todo.categories.map(e =>{
        return e.name
      })
      setCategory(cat)
    }, [])
    

    // Handle Input function
    const handleInput = (e) => {
        if (e.target.name === "title") {
            setTitle(e.target.value)
        }
        else if (e.target.name === "desc") {
            setDesc(e.target.value)
        }
    }

    // Handle save changes
    const hanleSaveChanges = () => {
        setShowModal(false);
        handleEdit(title, desc,priority,category)
    }
    return (
        <>
            <FaEdit className="cursor-pointer hover:text-green-700 dark:hover:text-green-500 dark:text-white " onClick={() => setShowModal(true)} />
            {showModal ? (
                <>
                    <div
                        className="  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none filter mt-4 "
                    >
                        <div className=" relative w-auto my-6 mx-auto max-w-5xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t dark:bg-gray-700 dark:text-white">
                                    <h3 className="text-3xl font-semibold">
                                        Update Todo
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"

                                    >
                                        <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none" onClick={() => setShowModal(false)}>
                                            <IoCloseSharp />
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto dark:bg-gray-700 dark:text-white">
                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                        <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={title} required onChange={handleInput} />
                                    </div>
                                    <div className="my-4">
                                        <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <input type="text" name="desc" id="desc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={desc} onChange={handleInput} required />
                                    </div>
                                    <Dropdown priority={priority} setPriority={setPriority} />
                                    <UpdatedCategory category={category} setCategory={setCategory}/>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b dark:bg-gray-700 dark:text-white">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={hanleSaveChanges}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}