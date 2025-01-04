import React, { useEffect, useState } from 'react';
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Announcements from './Announcements.jsx';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Outer_div = styled.div`
    // border:1px solid red; 
    padding:10px 10px 10px 10px; 
    display:flex; 
    justify-content:space-between;
`;

const Left_div = styled.div`
    flex:1; 
    // border:1px solid green; 
`;

const Left_text = styled.p`
    font-size:1.5rem; 
`;

const Center_div = styled.div`
    flex:1; 
    display:flex; 
    justify-content:center; 
`;

const Center_text = styled.ul`
    display:flex; 
    justify-content:space-between; 
    align-items:center; 
    list-style:none; 
`;

const Li = styled.li`
    padding:5px 10px; 
    text-decoration:none; 
    font-size:1.1rem; 
`;

const Right_div = styled.div`
    flex:1; 
    display:flex; 
    justify-content:flex-end; 
    align-items:center; 
    // border:1px solid yellow; 
`;

const Right_text = styled.input`
    outline:none; 
    font-size:1.1rem; 
    padding:5px 10px 5px 10px; 
    border:1px solid grey; 
    border-top-left-radius:5px; 
    border-bottom-left-radius:5px; 
`;

const Right_button = styled.button`
    font-size:1rem;  
    padding:5px 10px 5px 10px; 
`;

const Navbar = () => {

    const navigate = useNavigate();

    const [query, setquery] = useState("");

    const search_product_function = async () => {
        try {

            const { data } = await axios.get("https://e-commerce-backend-pii1.onrender.com/product/search", {
                params: { query }
            });

            if (data.success === true) {

                navigate(`/product/${data.products[0]._id}`);

                setquery("");
            }

            console.log(data);

        } catch (error) {
            alert(`Product with "${query}" name is not found`); 
        }
    }

    const handel_key_down = async (event) => {
        try {

            if (event.key === "Enter") {
                
                try {

                    const { data } = await axios.get("https://e-commerce-backend-pii1.onrender.com/product/search", {
                        params: { query }
                    });
        
                    if (data.success === true) {
        
                        navigate(`/product/${data.products[0]._id}`);
        
                        setquery("");
                    }
        
                    console.log(data);
        
                } catch (error) {
                    
                    alert(`Product with "${query}" name is not found`); 
                    setquery(""); 
                }

            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>

            <Announcements />

            <Outer_div>

                <Left_div>

                    <Left_text>E-Shop</Left_text>

                </Left_div>

                <Center_div>

                    <Center_text>

                        <Link style={{ textDecoration: "none", color: "inherit" }} to={"/"}><Li>Home</Li></Link>
                        <Link style={{ textDecoration: "none", color: "inherit" }} to={"/profile"}><Li>Profile</Li></Link>
                        <Link style={{ textDecoration: "none", color: "inherit" }} to={"/cart"}><Li>Cart</Li></Link>
                        <Link style={{ textDecoration: "none", color: "inherit" }} to={"/login"}><Li>Login</Li></Link>
                        <Link style={{ textDecoration: "none", color: "inherit" }} to={"/register"}><Li>Register</Li></Link>

                    </Center_text>

                </Center_div>

                <Right_div>

                    <Right_text placeholder='Search Product' value={query} onChange={(e) => { setquery(e.target.value) }} onKeyDown={handel_key_down} />
                    <Right_button onClick={search_product_function}>Search</Right_button>

                </Right_div>

            </Outer_div>

            <hr />

        </>
    )
}

export default Navbar