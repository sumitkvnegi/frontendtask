import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "./components/Header.jsx";
import {
  FaTrashAlt,
} from "react-icons/fa";
import { api } from "./Api/apiRoutes.js";
import { useNavigate } from "react-router-dom";
import TaskList from "./components/TaskList.jsx";
import User from "./pages/User.jsx";
import Slider from './components/Slider.jsx';
import DraggableElement from "./components/DraggableElement.jsx";

const Home = () => {
  const [task, setTask] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [dragged, setDragged] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  function handleDragDelete() {
    deleteTask(dragged);
  }

  function handleDragPos(event){
    console.log(event)
    if (isDragging) {
      const newPosition = {
        x: event.screenX,
        y: event.screenY,
      };
      setPosition(newPosition);
      console.log(position)
    }
  }

  const deleteTask = async (id) => {
    await axios.delete(`${api}${id}`);
    setRefresh(!refresh);
    setDragged(0);
  };

  const getAllTasks = async () => {
    const { data } = await axios.get(api);
    // console.log(data);
    setTask(data);
  };

  const filterApply = async (e , clean) => {
    await getAllTasks();
    if(clean!="clean"){
      setTask((task)=>task.filter((i)=>i.level==e));
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false);

    const { x, y } = position;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // console.log(-200)
    // console.log(x)

    if ( x >= (screenWidth - 200) || x == 0 || y >= (screenHeight - 200) || y == 0 ) {
      handleDragDelete();
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [refresh]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);

  const taskStates = [
    { state: 1, heading: "Not Started", posX: -200, posY: 200, num: 1 },
    { state: 2, heading: "In Progress", posX: -400, posY: 400, num: 2 },
    { state: 3, heading: "In Review", posX: -600, posY: 600, num: 3 },
    { state: 4, heading: "Completed", posX: -800, posY: 800, num: 4 },
  ];

  return (
    <Wrapper>
      <Header setRefresh={setRefresh} refresh={refresh} filterApply={filterApply} />
      <Container>
        {taskStates.map((state, index) => (
          <TaskList
            key={index}
            tasks={task.filter((i) => i.state === state.state)}
            setDragged={setDragged}
            dragged={dragged}
            heading={state.heading}
            posX={state.posX}
            posY={state.posY}
            setRefresh={setRefresh}
            refresh={refresh}
            num={state.num}
            handleDragPos={handleDragPos}
            setIsDragging={setIsDragging}
            handleDragEnd={handleDragEnd}
          />
        ))}
      </Container>
      {/* <DeleteContainer
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
          delay: 2.5,
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDragDelete(e)}
      >
        <FaTrashAlt />
      </DeleteContainer> */}
    </Wrapper>
  );
};

export default Home;



const Wrapper = tw.main`
  bg-[#0B1120] min-h-screen flex flex-col px-4 lg:px-24 sm:px-14 relative overflow-hidden backdrop-filter backdrop-blur-xl bg-opacity-95
`;

const Container = tw.section`
  justify-between h-[85%] gap-12 sm:grid sm:grid-cols-2 lg:flex lg:flex-row overflow-y-scroll sm:py-8 lg:py-0 scroll-smooth
  sm:h-[75%] lg:h-[85%]
`;

const DeleteContainer = tw(
  motion.div
)`text-white text-lg bg-[#EC4899] p-8 right-[50%] hover:p-6 hover:text-xl z-50 duration-300 rounded-full absolute -bottom-2 cursor-pointer`;


