/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const CategoryModal = ({ category, setCategory }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
            >
                Select Category
            </button>
            <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} category={category} setCategory={setCategory} />
        </>
    );
};

const SpringModal = ({ isOpen, setIsOpen, category, setCategory }) => {

    const [input, setInput] = useState()
    const handleChangeInput = (e) => {
        e.preventDefault();
        setInput(e.target.value)
    }

    const handleAddCategory = () => {
        if (input.length != 0) {
            setCategory([...category, input])
            setInput("")
        }
    }

    const handleDelete = (indexToRemove) => {
        const newArray = category.filter((_, index) => index !== indexToRemove);
        setCategory(newArray)

    }
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                    >
                        <div className="mb-5 flex flex-col space-y-5">
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-bold text-white dark:text-white">Categories</label>
                                <input type="text" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChangeInput} required value={input} />
                            </div>
                            <button className="py-2 px-4 bg-indigo-400 w-40 text-white rounded-md" onClick={handleAddCategory}>Add Category</button>
                        </div>
                        <div className="flex items-center flex-wrap relative gap-y-4 md:gap-y-3 space-x-2">
                            {category?.map((el, index) => {
                                return (<div className="flex items-center p-1" key={index}>
                                    <span className="bg-[#ecf7f2] text-[#87ada6] p-1 px-3 select-none">{el}</span>
                                    <span className="bg-[#68a5ab] text-white p-2 cursor-pointer hover:bg-[#2e3938]" onClick={() => handleDelete(index)}><RxCross1 /></span>
                                </div>)
                            })}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                            >
                                Nah, go back
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                            >
                                Continue
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CategoryModal;