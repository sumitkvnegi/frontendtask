import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { FiFilter } from "react-icons/fi";
import { CgAdd } from "react-icons/cg";
import { motion } from "framer-motion";
import axios from "axios";
import { api } from "../Api/apiRoutes.js";
import { allUsers } from '../Api/apiRoutes';
import User from "../pages/User.jsx";
import Slider from "./Slider.jsx";

const Header = ({setRefresh, refresh, filterApply}) => {
  const [input, setInput] = useState("");
  const [showSlider, setShowSlider] = useState(false);
  const [users, setUsers] = useState();
  const [name, setName] = useState("");



  const getAllUsers = async () => {
      const { data } = await axios.get(allUsers);
      console.log(data);
      setUsers(data);
    };

  const createNewTask = async () => {
    const { data } = await axios.post(api, {
      input: input,
      state: 1,
      level: 0,
      user: name
    });
    console.log(data);
    setInput("");
    setRefresh(!refresh);
  };

  useEffect(()=>{
    getAllUsers();
    if (localStorage.getItem("user")){
        setName(JSON.parse(localStorage.getItem("user")).name);
        console.log(JSON.parse(localStorage.getItem("user")).name);
    }
  },[]);

  return (
    <HeaderContainer
      initial={{
        scale: 0,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
      }}
    >
      <Logo>TaskList</Logo>
      <AddNew createNewTask={createNewTask} input={input} setInput={setInput}/>
      <ActionContainer>
        <User users={users} name={name} />
        <Filter>
          <FiFilter onClick={()=>setShowSlider(!showSlider)} />
          {showSlider && <Slider filterApply={filterApply} />}
        </Filter>
      </ActionContainer>
    </HeaderContainer>
  );
};

export default Header;

const AddNew = ({ createNewTask, input, setInput }) => {
  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="Add New Task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <CgAdd size={20} color="#ddd" onClick={createNewTask} />
    </Wrapper>
  );
};

const HeaderContainer = tw(motion.div)`
  h-[20%] py-4 flex justify-between items-center gap-16
`;

const Logo = tw.div`
  font-semibold text-lg font-[Poppins] text-white tracking-wide
`;

const ActionContainer = tw.div`
  flex gap-4 items-center justify-center relative
`;

const Filter = tw.div`
  text-md text-white bg-transparent p-3 relative
`;

const Wrapper = tw.div`
  w-full flex justify-center px-2 py-1.5 bg-[#334155] items-center backdrop-filter backdrop-blur-sm bg-opacity-60 rounded-sm
  shadow-xl border-[1px] border-gray-900
`;

const Input = tw.input`
  px-2 py-1 rounded-sm bg-transparent border-[0px] border-[#47556950] w-[90%] focus:outline-none text-sm text-white mr-4
`;

const Icon = tw.div`text-xs transition-colors duration-300 hover:text-[#00b7ff]`;

