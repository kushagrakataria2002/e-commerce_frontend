import React, { useEffect, useState } from 'react';
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Form = styled.form`
  // border:2px solid red; 
  margin-top:100px; 
  display:flex; 
  flex-direction:column; 
  justify-content:center; 
  align-items:center; 
`;

const Input = styled.input`
  border:1px solid lightgrey; 
  margin:10px 0px 10px 0px; 
  padding:5px 10px 5px 10px; 
  width:50%; 
  font-size:1.1rem;  
  border-radius:4px; 
  outline:none; 
`;

const Button = styled.button`
  margin:0px 0px 10px 0px; 
  font-size:1rem;  
  padding:5px 10px 5px 10px; 
  width:10%; 
`;

const Text = styled.p`
  text-decoration:none; 
  font-size:1.1rem; 
  margin-bottom:10px; 
`;

const Random_text = styled.p`
  font-size:1.1rem; 
  margin-top:100px; 
  text-align:center; 
`; 

const Login = () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [user, setuser] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    try {

      const token = localStorage.getItem("token");

      if (token && token.trim() !== "") {
        setuser(true);
      }

      else {
        setuser(false);
      }

    } catch (error) {
      console.log(error);
    }

  }, []);

  const login_user = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post("https://e-commerce-backend-pii1.onrender.com/user/login", { email, password });

      console.log(response);

      if (response.data.success === true) {
        alert(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }

    } catch (error) {

      if (error.response.data.success === false) {
        alert(error.response.data.message);
        setemail(""); 
        setpassword(""); 
      }

      else {
        alert("Internal server error");
      }

    }

  }

  return (
    <>

      {
        user
          ?
          <>
            <Random_text>Already Logged In</Random_text>
          </>
          :
          <>
            <Form onSubmit={login_user}>

              <Input type='email' required placeholder='Enter your Email' value={email} onChange={(e) => setemail(e.target.value)} />
              <Input type='password' required placeholder='Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />

              <Text>Dont have an account yet {" "} <Link to={"/register"}>Create One</Link> </Text>

              <Button type='sumbit'>Login</Button>

            </Form>
          </>
      }

    </>
  )
}

export default Login