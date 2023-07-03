import dateFormat from "dateformat";
import { MdEditSquare } from "react-icons/md";
import { BiSort } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { motion } from "framer-motion";
import axios from "axios";
import { api } from "../Api/apiRoutes";
import { FaLaughBeam, FaSmile, FaFlushed, FaSkull } from "react-icons/fa";

const TaskList = ({
  heading,
  dragged,
  setDragged,
  tasks,
  posX,
  posY,
  setRefresh,
  refresh,
  num,
  handleDragPos,
  setIsDragging,
  handleDragEnd,
}) => {
  const [toggle, setToggle] = useState(false);
  const [changed, setChanged] = useState("");
  const [taskReceive, setTaskReceive] = useState([...tasks]);
  const [randomColor, setRandomColor] = useState([]);

  const handleDrag = (id) => {
    setDragged(id);
    setIsDragging(true);
  };

  const generateRandomColor = () => {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);

    const color = `rgb(${randomR}, ${randomG}, ${randomB})`;
    setRandomColor([...randomColor, color]);
  };

  const updateTask = async (e, id, state, level = 0) => {
    if (changed && e.code === "Enter") {
      const { data } = await axios.patch(`${api}${id}`, {
        input: changed,
        state: state,
        level: level,
      });
      console.log(data);
      setToggle(!toggle);
      setRefresh(!refresh);
    }
  };

  const update = async (e, id, level = 0) => {
    const { data } = await axios.patch(`${api}${id}`, {
      level: level,
    });
    console.log(data);
    setToggle(!toggle);
    setRefresh(!refresh);
  };

  const changeState = async (e, n) => {
    await axios.patch(`${api}${dragged}`, {
      state: n,
    });
    console.log(dragged);
    setDragged(0);
    setRefresh(!refresh);
  };
  
  useEffect(() => {
    generateRandomColor();
    setTaskReceive([...tasks]);
  }, [tasks])
  

  return (
    <TaskWrapper
      initial={{
        x: posX,
        y: posY,
        opacity: 0,
      }}
      animate={{
        x: 0,
        y: 1,
        opacity: 1,
      }}
      transition={{
        duration: 1,
        delay: 1.2,
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => changeState(e, num)}
    >
      <Heading>
        {heading}
        <Sort>
          <BiSort onClick={() => {
            const t = tasks;
            t.reverse();
            setTaskReceive([...t])
          }} />
        </Sort>
      </Heading>
      <TaskContainer>
        {taskReceive
          .map((task, index) => (
            <List
              key={task._id}
              draggable={true}
              onDragStart={() => handleDrag(task._id)}
              onDrag={(e)=>handleDragPos(e)}
              onDragEnd={handleDragEnd}
            >
              <MdEditSquare
                className="absolute bottom-2 cursor-pointer"
                onClick={() => {
                  setChanged(task.input);
                  setToggle(!toggle);
                }}
                />
                <div className="flex justify-between items-center">
                <Name style={{background: randomColor[index]}}>{task.user.slice(0,1)}</Name>
              <DateTime>
                {dateFormat(task.createdAt, "dddd, mmmm dS, yyyy, h:MM TT")}
              </DateTime>
                </div>
              <div className="flex absolute bottom-2 right-2 justify-end gap-1">
                <Icon
                  className={`${task.level == 0 ? "text-green-400" : ""}`}
                  onClick={(e) => update(e, task._id, 0)}
                >
                  <FaLaughBeam />
                </Icon>
                <Icon
                  className={`${task.level == 1 ? "text-yellow-400" : ""}`}
                  onClick={(e) => update(e, task._id, 1)}
                >
                  <FaSmile />
                </Icon>
                <Icon
                  className={`${task.level == 2 ? "text-orange-400" : ""}`}
                  onClick={(e) => update(e, task._id, 2)}
                >
                  <FaFlushed />
                </Icon>
                <Icon
                  className={`${task.level == 3 ? "text-red-400" : ""}`}
                  onClick={(e) => update(e, task._id, 3)}
                >
                  <FaSkull />
                </Icon>
              </div>
              <TaskMessage
                value={toggle ? changed : task.input}
                onChange={(e) => setChanged(e.target.value)}
                disabled={!toggle}
                className={toggle ? "text-yellow-300 blur-[1px]" : ""}
                onKeyDown={(e) => updateTask(e, task._id, task.state)}
              />
            </List>
          ))}
      </TaskContainer>
    </TaskWrapper>
  );
};

export default TaskList;

const TaskWrapper = tw(
  motion.div
)`bg-[#1E293B] w-full h-[90%] rounded-sm text-white backdrop-filter backdrop-blur-sm h-full bg-opacity-60 shadow-xl border-[1px] border-gray-900`;
const Heading = tw.div`flex justify-between items-center py-2 px-4 text-md font-semibold bg-[#38BDF8] rounded-sm backdrop-filter backdrop-blur-sm bg-opacity-80`;

const TaskContainer = tw.div`overflow-scroll py-4 bg-transparent overflow-y-scroll overflow-x-hidden flex flex-col gap-2 justify-start`;

const List = tw.div`p-2 pb-6 bg-[#475569] mx-4 my-2 rounded-sm backdrop-filter backdrop-blur-sm bg-opacity-80 cursor-grab active:cursor-grabbing text-xs font-thin shadow-xl hover:bg-[#89caff3a] flex flex-col gap-4 relative`;

const TaskMessage = tw.textarea`text-sm capitalize font-semi tracking-widest bg-transparent focus:outline-none resize-none`;

const DateTime = tw.p`text-sky-300 text-[0.6rem] tracking-widest`;

const Icon = tw.div`text-xs transition-colors duration-300 hover:text-[#00b7ff]`;

const Sort = tw.div`
  text-md text-white bg-transparent p-3
`;

const Name = tw.p`text-white rounded-full px-2 py-1 border-2 aspect-square text-[0.8rem] uppercase tracking-widest`;