import React, { useEffect, useState } from 'react';
import axios from "axios";
import { styled } from "styled-components";
import { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const Outer_container = styled.div`
  display:flex; 
  justify-content:center; 
  flex-wrap:wrap; 
  height:100vh; 
  gap:20px; 
  // border:1px solid red; 
`;

const Image = styled.img`
  height:50%; 
  overflow:hidden; 
`;

const Container = styled.div`
  display:flex; 
  flex-direction:column; 
  justify-content:center; 
  align-items:center; 
  margin-top:5px; 
  // border:1px solid green; 
`;

const Prefix = styled.p`
  font-size:1.1rem; 
  font-weight:bold; 
  margin:10px; 
`;

const Text = styled.p`
  font-size:1.1rem; 
  // margin-top:10px; 
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

const Styled_link = styled(Link)`
  text-decoration:none; 
  color:black; 
  display:flex; 
  flex-direction:column; 
  justify-content:center; 
  align-items:center; 
  width:25%; 
  height:50%; 
  margin-top:100px; 
  border:1px solid lightgrey; 
  border-radius:10px; 
`

const Home = () => {

  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {

    const fetch_product_data = async (req, res) => {
      try {

        const { data } = await axios.get("https://e-commerce-backend-pii1.onrender.com/product/all");

        setdata(data.products);
        setloading(false);

        console.log(data.products);

      } catch (error) {
        console.log(error);
        setloading(false);
      }
    }

    fetch_product_data();

  }, []);

  return (
    <>
      {
        loading
          ?
          <>
            <Loader_container>
              <Loader></Loader>
            </Loader_container>
          </>
          :
          <>
            <Outer_container>
              {
                data.map((element, index, array) => (

                  <Styled_link to={`/product/${element._id}`}>

                    <Image src={`${element.image[0].url}`} />

                    <Container>

                      <Prefix>{element.name}</Prefix>

                      <Text>₹ {element.price}</Text>

                    </Container>

                  </Styled_link>
                ))
              }
          </Outer_container>
    </>
      }
    </>
  )
}

export default Home