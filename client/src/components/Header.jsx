/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";
import { motion } from "framer-motion";

const Header = () => {
    const [token, setToken] = useState();

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, [localStorage.getItem("token")])

    // handle Logout
    const handleLogout = () => {
        localStorage.removeItem("token")
    }


    return (
        <div>
            <header className="text-gray-400 bg-gray-900 body-font flex items-center">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
                    <Link to={"/"} className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <Link to={"/"} className="ml-3 text-xl">Upnote</Link>
                    </Link>
                    <motion.div
                    initial={{x:1600}}
                    animate={{x:0}}
                     className="flex space-x-5 items-center mt-4">

                        {
                            token ? <Link to={"/login"} className="inline-flex items-center bg-gray-800 border-0 py-2 px-3 focus:outline-none hover:bg-gray-700 rounded text-base md:mt-0" onClick={handleLogout}>
                                Logout
                            </Link> : <div className="flex space-x-2">
                                <Link to={"/login"} className="inline-flex items-center bg-gray-800 border-0 py-2 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
                                    Login
                                </Link>
                                <Link to={"/sign-up"} className="inline-flex items-center bg-gray-800 border-0 py-2 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
                                    Signup
                                </Link>
                            </div>
                        }
                        <DarkMode />
                    </motion.div>
                </div>
            </header>
        </div>
    )
}

export default Header