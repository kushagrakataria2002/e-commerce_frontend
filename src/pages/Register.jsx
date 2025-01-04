import React, { useEffect, useState } from 'react';
import { styled } from "styled-components";
import { Link } from 'react-router-dom';
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
  margin-top:100px; 
  text-align:center; 
  font-size:1.1rem; 
`;

const Register = () => {

  const navigate = useNavigate("/login"); 

  const [user, setuser] = useState(false);
  const [username, setusername] = useState(""); 
  const [email, setemail] = useState(""); 
  const [password, setpassword] = useState(""); 

  useEffect(() =>{

    try {
      
      const token = localStorage.getItem("token"); 

      if(token && token.trim() !== ""){
        setuser(true); 
      }

      else{
        setuser(false); 
      }

    } catch (error) {
      console.log(error); 
    }

  },[]); 

  const register_user = async(e) =>{

    e.preventDefault(); 

    try {
      
      const response = await axios.post("https://e-commerce-backend-pii1.onrender.com/user/register",{username, email, password}); 

      if(response.data.success === true){
        alert(response.data.message); 
        navigate("/login"); 
      }

      console.log(response); 

    } catch (error) {
      
      if(error.response.data.success === false){
        alert(error.response.data.message); 
        navigate("/register"); 
        setusername("");
        setemail(""); 
        setpassword(""); 
      }

      else{
        alert("Internal servwer error"); 
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

            <Form onSubmit={register_user} >

              <Input type='text' required placeholder='Enter Your Username' value={username} onChange={(e) => setusername(e.target.value)} />
              <Input type='email' required placeholder='Enter your Email' value={email} onChange={(e) =>{setemail(e.target.value)}} />
              <Input type='password' required placeholder='Password' value={password} onChange={(e) =>{ setpassword(e.target.value) }} />

              <Text>Already have an account {" "} <Link to={"/login"}>Login</Link> </Text>

              <Button type='sumbit' >Register</Button>

            </Form>

          </>
      }

    </>
  )
}

export default Register