/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
    FiEdit,
    FiChevronDown,
    FiTrash,
    FiShare,
    FiPlusSquare,
} from "react-icons/fi";
import { PiCellSignalHighBold,PiCellSignalMediumDuotone,PiCellSignalLowDuotone } from "react-icons/pi";

import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

const Dropdown = ({priority,setPriority}) => {
    const [open, setOpen] = useState(false);

    return (
            <motion.div animate={open ? "open" : "closed"} className="relative my-5">
                <button
                    onClick={() => setOpen((pv) => !pv)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors"
                >
                     {priority?
                        <span className="font-medium text-sm">{priority}</span>
                        :<span className="font-medium text-sm">Priority</span>
                    }
                    
                    <motion.span variants={iconVariants}>
                        <FiChevronDown />
                    </motion.span>
                </button>

                <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{ originY: "top", translateX: "-50%" }}
                    className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
                >
                    <Option setOpen={setOpen} Icon={PiCellSignalHighBold} text="High" priority={priority} setPriority={setPriority} />
                    <Option setOpen={setOpen} Icon={PiCellSignalMediumDuotone} text="Medium" priority={priority} setPriority={setPriority} />
                    <Option setOpen={setOpen} Icon={PiCellSignalLowDuotone} text="Low" priority={priority} setPriority={setPriority} />
                </motion.ul>
            </motion.div>
    );
};

const Option = ({ text, Icon, setOpen,priority,setPriority }) => {
    const handleOption = () =>{
        setPriority(text)
        console.log(text)
        setOpen(false)
    }
    return (
        <motion.li
            variants={itemVariants}
            onClick={handleOption}
            className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
        >
            <motion.span variants={actionIconVariants}>
                <Icon />
            </motion.span>
            <span>{text}</span>
        </motion.li>
    );
};

export default Dropdown;

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};

const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};