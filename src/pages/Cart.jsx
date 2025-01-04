import React, { useEffect, useState } from 'react';
import axios from "axios";
import { styled } from "styled-components";
import { keyframes } from "styled-components";

// css starts from here 

const Random_text = styled.p`
  text-align:center; 
  margin-top:100px; 
  font-size:1.1rem; 
`;

const Outer_div = styled.div`
  display:flex;
  justify-content:flex-start; 
  align-items:center; 
  margin:20px 10px; 
  // border:1px solid red; 
`;

const Left_div = styled.div`
  height:30vh; 
  width:30vw; 
  display:flex; 
  flex-direction:column; 
  justify-content:center; 
  align-items:center; 
  border-right:1px solid grey; 
  // border:1px solid green; 
`;

const Image = styled.img`

  width:35%; 
  // border:2px solid red; 
`;

const Right_div = styled.div`
  height:30vh; 
  width:100vw; 
  // border:1px solid blue; 
`;

const Container = styled.div` 
  display:flex; 
  flex-direction:column; 
  justify-content:center; 
  padding:5px;
  // border:1px solid red; 
`;

const Prefix = styled.p`
  font-size:1.1rem; 
  font-weight:bold; 
  padding:5px 10px; 
`;

const Name = styled.p`
  font-size: 1.1rem; 
  padding:5px 10px; 
`;

const Button = styled.button`
  font-size:1rem;  
  padding:5px 10px 5px 10px;
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

// css ends here 



const Cart = () => {

  const [data, setdata] = useState();
  const [user, setuser] = useState(false);
  const [loading, setloading] = useState(true);
  const [cart_item, setcart_item] = useState(false);

  useEffect(() => {

    const fetch_cart_data = async () => {

      try {

        const token = localStorage.getItem("token");

        if (token && token.trim !== "") {

          const response = await axios.get("https://e-commerce-backend-pii1.onrender.com/cart/all", {
            headers: {
              token: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });

          setdata(response.data.products);
          setloading(false);
          setuser(true);
          console.log(data);
        }

        else {
          setdata("Please Login to see your cart items");
          setloading(false);
          setuser(false);
        }

      } catch (error) {
        setuser(false);
      }
    }

    fetch_cart_data();

  }, [cart_item]);

  const remove_product = async ({ id }) => {
    try {

      const token = localStorage.getItem("token");

      if (token && token.trim() !== "") {

        setloading(true);

        const response = await axios.delete(`https://e-commerce-backend-pii1.onrender.com/cart/delete/${id}`, {
          headers: {
            token: `Bearer ${token}`
          }
        });

        setcart_item(!cart_item);

        setloading(false);

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
            <Loader_container><Loader></Loader></Loader_container>
          </>
          :
          <>

            {
              user
                ?
                <>

                  {data.length === 0 ? <Random_text>No Items in your cart</Random_text> :

                    <>
                      {
                        data.map((element, index, array) => (
                        <>

                        <hr />

                          <Outer_div>

                            <Left_div>

                              <Image src={`${element.image}`} />

                            </Left_div>

                            <Right_div>

                              <Container>

                                <Prefix>{element.name}</Prefix>

                                <Name>₹{element.price}</Name>

                              </Container>

                              <Button onClick={() =>{remove_product({id: element._id})}} style={{margin:"0px 15px"}}>Remove</Button>

                            </Right_div>

                          </Outer_div>

                          <hr />

                        </>
                        ))
                      }

                      <Outer_div>

                        <Left_div style={{borderRight:"0px"}}>

                          <Prefix>Total amount: </Prefix>
                          <Name>₹{data.reduce((total, item) => total + item.price * item.quantity, 0)}</Name>

                          <Button style={{marginTop:"10px"}}>Check out</Button>

                        </Left_div>

                        <Right_div>

                        </Right_div>

                      </Outer_div>

                    </>
                  }
                </>
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

export default Cart