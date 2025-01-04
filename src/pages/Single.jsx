import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import { keyframes } from "styled-components";

const Outer_div = styled.div`
  width:100%; 
  height:100vh; 
  display:flex; 
  justify-content:center; 
  align-items:center; 
  margin-top:50px; 
  // border:1px solid red; 
`;

const Left_div = styled.div`
  flex:0.5; 
  height:100vh; 
  display:flex; 
  justify-content:center; 
  align-items:flex-start;
  // border:1px solid green; 
`;

const Image = styled.img`
  width:70%; 
  padding-top:20px; 
`;

const Right_div = styled.div`
  flex:1; 
  height:100vh; 
  // border:1px solid blue; 
`;

const Ul = styled.ul`
  padding-left:20px; 
`;

const Li = styled.li`

`; 

const Text = styled.p`
  font-weight:bold; 
  font-size:1.5rem; 
  // border:1px solid yellow; 
`;

const Button = styled.button`
    font-size:1rem;  
    padding:5px 10px 5px 10px; 
    margin:20px; 
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

const Single = () => {

  const param = useParams();

  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [description, setdescription] = useState([]);

  useEffect(() => {

    const fetch_product_details = async () => {
      try {

        const { data } = await axios.get(`https://e-commerce-backend-pii1.onrender.com/product/${param.id}`);

        const splitted_description = data.product.description.split(".");

        setdata(data);
        setdescription(splitted_description);
        setloading(false);

        console.log(data);

      } catch (error) {
        console.log(error);
        setloading(true);
      }
    }

    fetch_product_details();

  }, []);

  const add_to_cart = async() =>{
    try {

      const token = localStorage.getItem("token"); 

      if(token && token.trim() !== ""){

        const response = await axios.post(`https://e-commerce-backend-pii1.onrender.com/cart/add/${param.id}`,{},{
          headers:{
            token: `Bearer ${token}`,
            "Content-Type":"application/json"
          }
        }); 

        console.log(response); 

        if(response.data.success === true){
          alert(response.data.message); 
        }

      }

      else{

        alert("Login to add product to cart"); 

      }

    } catch (error) {

      console.log(error); 

    }
  }

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

            <Outer_div>

              <Left_div>

                <Image src={`${data.product.image[0].url}`} />

              </Left_div>

              <Right_div>

                <Text style={{paddingTop:"15px", paddingBottom:"5px"}}>{data.product.name}</Text>

                <Text style={{ fontWeight:"normal", textTransform:"capitalize", fontSize:"16px", paddingBottom:"15px"}}>Category: {data.product.category}</Text>

                <Text style={{ fontWeight: "normal", padding:"10px 0px" }}> ₹{data.product.price}</Text>

                <Text style={{ fontWeight: "normal", padding:"10px 0px" }}>Description </Text>

                <Ul>

                  {
                    description.map((element, index, array) => (

                      <Li>
                        <Text style={{ fontWeight: "normal", fontSize:"16px", paddingLeft:"0px", paddingTop:"5px", paddingBottom:"5px" }}>
                          {element}
                        </Text>
                      </Li>

                    ))
                  }

                </Ul>


                  <Button onClick={add_to_cart}>Add to Cart</Button>

              </Right_div>

            </Outer_div>

          </>
      }
    </>
  )
}

export default Single