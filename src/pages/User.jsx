import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import tw from "tailwind-styled-components";
import {FaUsers} from 'react-icons/fa';

const User = ({users, name}) => {
    const [showList, setShowList] = useState(false);

    const toggleList = () => {
      setShowList(!showList);
    };
  
  return (
    <Container>
      <Button
        onClick={toggleList}
      >
        <FaUsers/>
      </Button>
      <AnimatePresence>
        {showList && (
          <motion.ul
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="absolute top-16 lg:top-14  z-50 bg-[#1E293B] text-white backdrop-filter backdrop-blur-sm h-screen bg-opacity-60 shadow-xl uppercase "
          >
            {users.map(user => (
              <motion.li
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${user.name == name ? "bg-red-700" : ""} p-2 w-[20vw] text-sm font-medium`}
              >
                {user.name}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </Container>
  )
}

export default User

const Container = tw.div`flex flex-col items-center`

const Button = tw.button`hover:text-[#65d1ff] text-white text-lg`
