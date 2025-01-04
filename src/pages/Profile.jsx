import React, { useEffect, useState } from 'react';
import { styled } from "styled-components";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { keyframes } from "styled-components";

const Outer_box = styled.div`
  margin-top:100px; 
  display:flex; 
  flex-direction:column; 
  justify-content:space-between; 
  padding:10px 10px 10px 10px; 
  // border:1px solid red; 
`;

const Left_div = styled.div`
  flex:1; 
  display:flex; 
  justify-content:center; 
  align-items:center;
  // border:1px solid green;
`;

const Left_text = styled.p`
  font-size:1.1rem; 
  padding:10px 0px 10px 0px; 
`;

const Center_div = styled.div`
  flex:1; 
  display:flex; 
  justify-content:center; 
  align-items:center; 
  // border:1px solid blue; 
`;

const Center_text = styled.p`
  font-size:1.1rem; 
  padding:10px 0px 10px 0px; 
`;

const Right_div = styled.div`
  flex:1; 
  display:flex; 
  justify-content:center; 
  align-items:center; 
  // border:1px solid yellow; 
`;

const Right_text = styled.button`
  font-size:1rem; 
  padding:5px 10px 5px 10px;   
  margin-top:10px; 
`;

const Random_text = styled.p`
  text-align:center; 
  font-size:1.1rem; 
  margin-top:100px; 
`;

const Loader_container = styled.div`
  display:flex; 
  justify-content:center; 
  align-items:center; 
  height:100vh; 
  // border:1px solid red; 
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  width:50px; 
  height:50px;
  border-radius:50%;  
  animation: ${spin} 0.5s linear infinite; 
  border:5px solid lightgrey; 
  border-top:5px solid black; 
`;

const Dialouge_container = styled.div`
  display:flex; 
  justify-content:center; 
  align-items:center; 
`;

const Dialouge = styled.div`
  width:50%; 
  height:50vh; 
  border-radius:10px; 
  display:flex; 
  flex-direction:column; 
  justify-content:center; 
  align-items:cnter; 
  border:1px solid grey; 
`;

const Input_container = styled.div`
  display:flex; 
  flex-direction:column; 
  justify-content:center; 
  align-items:center; 
`;

const Input = styled.input`
  border:1px solid grey; 
  margin:10px 0px 10px 0px; 
  padding:5px 10px 5px 10px; 
  width:50%; 
  font-size:1.1rem;  
  border-radius:4px; 
  outline:none; 
`;

const Button = styled.button`
  font-size:1rem; 
  padding:5px 10px 5px 10px;   
  margin-top:10px; 
`;

const Button_container = styled.div`
  display:flex; 
  justify-content:center; 
  align-items:center; 
  gap:10px; 
`;

const Profile = () => {

  const [data, setdata] = useState("");
  const [user, setuser] = useState(false);
  const [loading, setloading] = useState(true);
  const [dialouge, setdialouge] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const fetch_user_data = async () => {
      try {

        const token = localStorage.getItem("token");

        if (token && token.trim() !== "") {

          const { data } = await axios.get("https://e-commerce-backend-pii1.onrender.com/user/profile", {
            headers: {
              token: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });

          setdata(data.user);
          setloading(false);
          setuser(true);

          console.log(data);

        } else {

          setdata("Please Login to see your profile");
          setloading(false);
          setuser(false);

        }

      } catch (error) {

        console.log(error);

      }
    }

    fetch_user_data();

  }, []);

  const logout_user = () => {
    localStorage.removeItem("token");
    navigate("/");
    setloading(false);

  }

  return (
    <>
      {
        loading
          ?
          <>
            <Loader_container><Loader></Loader></Loader_container>
          </>
          :
          <>

            {
              user
                ?
                <Outer_box>

                  {
                    dialouge
                      ?
                      <>

                        <Dialouge_container>

                          <Dialouge>

                            <Input_container>

                              <Input placeholder='Enter your New Username Here' />
                              <Input placeholder='Enter your New Email Here' />
                              <Input placeholder='Enter your New Password Here' />

                              <Button_container>

                                <Button>Save Changes</Button>
                                <Button onClick={() =>{setdialouge(false)}} >Close Dialouge</Button>

                              </Button_container>

                            </Input_container>

                          </Dialouge>

                        </Dialouge_container>
                      </>
                      :
                      <>
                        <Left_div>

                          <Left_text>User name : {data.username}</Left_text>

                        </Left_div>

                        <Center_div>

                          <Center_text>Email : {data.email}</Center_text>

                        </Center_div>

                        <Right_div>

                          <Right_text onClick={() =>{setdialouge(true)}} >Update Profile</Right_text>
                          <Right_text style={{ marginLeft: "10px" }} onClick={logout_user} >Logout</Right_text>

                        </Right_div>
                      </>
                  }

                </Outer_box>
                :
                <>
                  <Random_text>{data}</Random_text>
                </>
            }

          </>

      }
    </>
  )
}

export default Profile