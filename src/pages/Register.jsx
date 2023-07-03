import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { MdOutlineAccountTree } from "react-icons/md";
import { registeration_api } from "../Api/apiRoutes";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { name, email, password } = values;
      const { data } = await axios.post(registeration_api, {
        name,
        email,
        password,
      });

      if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      navigate("/");
    }
  };

  const handleValidation = () => {
    const { name, email, password, confirmPassword } = values;
    if (password !== confirmPassword) return false;
    else if (name.length < 4) return false;
    else if (password.length < 8) return false;
    else if (email === "") return false;
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Heading>Register</Heading>
        <Input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          onChange={handleChange}
        />
        <div className="relative w-full">
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter Your Password"
          onChange={handleChange}
        />
        <ToggleButton onClick={togglePasswordVisibility}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </ToggleButton>
        </div>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
        <Span>
          Already Have An Account?{" "}
          <Link
            to="/login"
            className="text-[#38BDF8] text-lg font-semibold hover:animate-pulse"
          >
            Login
          </Link>
        </Span>

        <MdOutlineAccountTree
          className="absolute text-gray-400 mix-blend-overlay opacity-50 top-[50%] translate-y-[-50%] z-[-1]"
          size={200}
        />
      </Form>
    </Wrapper>
  );
}

const ToggleButton = tw.button`absolute text-[#464e58] top-3 right-0`

const Wrapper = tw.main`
  bg-[#0B1120] h-screen w-screen flex flex-col px-14 relative overflow-hidden backdrop-filter backdrop-blur-xl bg-opacity-95 justify-center items-center
`;

const Heading = tw.div`
  py-2 px-4 text-4xl font-mono font-thin text-[#38BDF8] rounded-sm w-full text-center my-2 flex justify-center flex-col-reverse items-center gap-2
`;

const Form = tw.form`
  px-8 py-6 bg-[#1e242c] rounded-sm shadow-xl flex flex-col gap-6 relative sm:w-[80%] sm:h-[90%] lg:w-[40%] lg:h-[90%] justify-start items-center border-2 border-gray-900 overflow-hidden
  backdrop-filter backdrop-blur-sm bg-opacity-80 
`;

const Input = tw.input`bg-transparent border-b-2 pr-4 py-2 w-full border-[#38BDF8] text-white tracking-wider focus:outline-none mb-2`;

const Button = tw.button`w-full bg-[#38BDF8] text-[#1e242c] p-4 text-xl uppercase font-bold rounded-sm hover:animate-pulse`;

const Span = tw.div`flex justify-between w-full text-gray-300 text-md items-center`;

export default Register;
