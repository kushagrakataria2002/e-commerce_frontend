import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Announcements from './Announcements.jsx';


const Navbar = () => {

    const navigate = useNavigate();

    const [query, setquery] = useState("");
    const [is_disabled, setis_disabled] = useState(false);

    const search_product_function = async () => {
        setis_disabled(true);
        try {

            const { data } = await axios.get("https://e-commerce-backend-pii1.onrender.com/product/search", {
                params: { query }
            });

            if (data.success === true) {

                navigate(`/product/${data.products[0]._id}`);

                setquery("");

                setis_disabled(false)

            }

        } catch (error) {
            alert(`Product with "${query}" name is not found`);
            setis_disabled(false);
        }
    }

    const handel_key_down = async (event) => {

        try {

            if (event.key === "Enter") {

                setis_disabled(true);

                try {

                    const { data } = await axios.get("https://e-commerce-backend-pii1.onrender.com/product/search", {
                        params: { query }
                    });

                    if (data.success === true) {

                        navigate(`/product/${data.products[0]._id}`);

                        setquery("");

                        setis_disabled(false);

                    }

                } catch (error) {

                    alert(`Product with "${query}" name is not found`);

                    setquery("");

                    setis_disabled(false);

                }

            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Announcements />

            <header className="text-gray-600 body-font">

                <div className="container mx-auto flex flex-wrap p-5 flex-col justify-start md:flex-row md:items-center md:justify-center ">


                    {/* heading  */}

                    <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 flex-1 justify-start">
                        <span className="ml-3 text-xl">E-Shop</span>
                    </Link>

                    {/* nav links  */}

                    <nav className="md:ml-auto md:mr-auto flex flex-wrap md:items-center text-base md:justify-center flex-1 justify-start ml-3">

                        <Link to={"/"} className='text-black mr-5 hover:text-gray-700 transition' >Home</Link>
                        <Link to={"/profile"} className='text-black mr-5 hover:text-gray-700 transition'>Profile</Link>
                        <Link to={"/cart"} className='text-black mr-5 hover:text-gray-700 transition'>Cart</Link>
                        <Link to={"/login"} className='text-black mr-5 hover:text-gray-700 transition'>Login</Link>
                        <Link to={"/register"} className='text-black mr-5 hover:text-gray-700 transition'>Register</Link>

                    </nav>


                    {/* search input and search button and hamburger */}

                    <div className="relative flex md:flex-row flex-col justify-start md:items-center md:justify-end gap-2 flex-1 mt-4 md:mt-0 ">

                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={is_disabled ? " opacity-50 cursor-not-allowed py-1 w-70% bg-white rounded border border-gray-300 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out border-gray-500" : "py-1 w-70% bg-white rounded border border-gray-300 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out border-gray-500"}
                            disabled={is_disabled}
                            placeholder='Search Products'
                            value={query}
                            onChange={(e) => { setquery(e.target.value) }}
                            onKeyDown={handel_key_down}
                        />


                        <button onClick={search_product_function} disabled={is_disabled} className={is_disabled ? "cursor-not-allowed opacity-50 md:w-[25%] w-[100%] bg-gray-900 dark:bg-gray-600 text-white py-2 rounded-md text-center font-bold hover:bg-gray-800 dark:hover:bg-gray-700" : "md:w-[25%] w-[100%] bg-gray-900 dark:bg-gray-600 text-white py-2 px-2 rounded-md text-center font-bold hover:bg-gray-800 dark:hover:bg-gray-700"}>
                            Search
                        </button>

                    </div>

                </div>

            </header>

            <hr />

        </>
    )
}

export default Navbar