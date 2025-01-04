import React, { useState } from 'react';
import { styled } from "styled-components";

const Outer_div = styled.div`
    background-color:black; 
    display:flex; 
    justify-content:center; 
    align-items:center; 
    padding:9px; 
`;

const Left_container = styled.div`
    flex:1; 
`;

const Text = styled.p`
    flex:1; 
    display:flex; 
    justify-content:center; 
    font-size:1.1rem; 
    color:white;
`;

const Right_container = styled.div`
    display:flex; 
    justify-content:flex-end; 
    flex:1; 
`;

const Button = styled.button`
    padding:5px 10px 5px 10px; 
    font-size:1.1rem; 
`;

const Announcements = () => {

    const [toggle, settoggle] = useState(true);

    return (
        <>

            {
                toggle
                    ?
                    <>
                        <Outer_div>

                            <Left_container></Left_container>

                            <Text>Free Delivery On All Products</Text>

                            <Right_container>

                                <Button onClick={() =>{settoggle(false)}} >Close</Button>

                            </Right_container>

                        </Outer_div>
                    </>
                    :
                    <>

                    </>
    }
        </>
    )
}

export default Announcements