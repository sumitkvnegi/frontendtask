import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { RiRotateLockLine } from "react-icons/ri";
import { login_api } from "../Api/apiRoutes";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, password } = values;
      const { data } = await axios.post(login_api, {
        email,
        password,
      });

      if (data.status === false) {
        alert(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      navigate("/");
    }
  };

  const handleValidation = () => {
    const { email, password } = values;
    return password.length !== 0 && email !== "";
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Heading>Login</Heading>
        <Input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>

        <Span>
          Create New Account?{" "}
          <Link
            to="/register"
            className="text-[#38BDF8] text-lg font-semibold hover:animate-pulse"
          >
            Register
          </Link>
        </Span>

        <RiRotateLockLine
          className="absolute text-gray-400 mix-blend-overlay opacity-50 top-[40%] translate-y-[-40%] z-[-1]"
          size={200}
        />
      </Form>
    </Wrapper>
  );
};

const Wrapper = tw.main`
  bg-[#0B1120] h-screen w-screen flex flex-col px-14 relative overflow-hidden backdrop-filter backdrop-blur-xl bg-opacity-95 justify-center items-center
`;

const Heading = tw.div`
  py-2 px-4 text-4xl font-mono font-thin text-[#38BDF8] rounded-sm w-full text-center my-4 flex justify-center flex-col-reverse items-center gap-2
`;

const Form = tw.form`
  px-8 py-6 bg-[#1e242c] rounded-sm backdrop-filter backdrop-blur-sm bg-opacity-80 shadow-xl flex flex-col gap-8 relative sm:w-[80%] sm:h-[90%] lg:w-[40%] lg:h-[90%] justify-start items-center z-50 border-2 border-gray-900
`;

const Input = tw.input`
  bg-transparent border-b-2 pr-4 py-2 w-full border-[#38BDF8] text-white tracking-wider focus:outline-none mb-4
`;

const Button = tw.button`
  w-full bg-[#38BDF8] text-[#1e242c] p-4 text-xl uppercase font-bold rounded-sm hover:animate-pulse
`;

const Span = tw.div`
  flex justify-between w-full text-gray-300 text-md items-center`;

export default Login;
