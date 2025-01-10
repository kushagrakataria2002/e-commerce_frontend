import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Announcements from './Announcements.jsx';

const Navbar = () => {
    const navigate = useNavigate();
    const [query, setquery] = useState("");
    const [is_disabled, setis_disabled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const search_product_function = async () => {
        
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
            setis_disabled(false);
        }
    };

    const handel_key_down = async (event) => {
        if (event.key === "Enter") {
            search_product_function();
        }
    };

    return (
        <>
            <Announcements />

            {isMenuOpen && (
                <div className="xl:hidden fixed top-0 left-0 z-20 w-full h-full bg-white">
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute top-5 right-5 bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-md font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        Close
                    </button>
                    <div className="mt-16 ml-10 flex flex-col items-start space-y-4">
                        <Link to={"/"} onClick={() =>{setIsMenuOpen(false)}} className='text-black text-lg hover:text-gray-700 transition'>Home</Link>
                        <Link to={"/profile"} onClick={() =>{setIsMenuOpen(false)}} className='text-black text-lg hover:text-gray-700 transition'>Profile</Link>
                        <Link to={"/cart"} onClick={() =>{setIsMenuOpen(false)}} className='text-black text-lg hover:text-gray-700 transition'>Cart</Link>
                        <Link to={"/login"} onClick={() =>{setIsMenuOpen(false)}} className='text-black text-lg hover:text-gray-700 transition'>Login</Link>
                        <Link to={"/register"} onClick={() =>{setIsMenuOpen(false)}} className='text-black text-lg hover:text-gray-700 transition'>Register</Link>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            className={is_disabled
                                ? "opacity-50 cursor-not-allowed py-2 px-4 w-3/4 bg-gray-200 rounded border border-gray-400 text-gray-700 outline-none"
                                : "py-2 px-4 w-3/4 bg-white rounded border border-gray-400 text-gray-700 outline-none"}
                            disabled={is_disabled}
                            placeholder='Search Products'
                            value={query}
                            onChange={(e) => setquery(e.target.value)}
                            onKeyDown={handel_key_down}
                        />
                        <button
                            onClick={search_product_function}
                            disabled={is_disabled}
                            className={is_disabled
                                ? "cursor-not-allowed opacity-50 bg-gray-900 text-white py-2 px-4 rounded-md"
                                : "bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"}
                        >
                            Search
                        </button>
                    </div>
                </div>
            )}



            <header className="relative z-10 text-gray-600 body-font">

                <div className="container mx-auto flex flex-wrap p-5 justify-between items-center">

                    {/* Heading */}
                    <Link className="flex flex-1 title-font font-medium items-center text-gray-900">
                        <span className="ml-3 text-xl">E-Shop</span>
                    </Link>

                    {/* Hamburger menu */}
                    <div
                        onClick={() => setIsMenuOpen(true)}
                        className="xl:hidden bg-gray-900 w-[38px] h-[38px] rounded flex flex-col justify-center items-center gap-[5px] cursor-pointer"
                    >
                        <div className="w-[20px] h-[3px] bg-white"></div>
                        <div className="w-[20px] h-[3px] bg-white"></div>
                        <div className="w-[20px] h-[3px] bg-white"></div>
                    </div>

                    {/* Navigation Links (hidden on smaller screens) */}

                    <nav className="hidden xl:flex flex-1 md:ml-auto md:mr-auto flex-wrap items-center text-base justify-center">

                        <Link to={"/"} className='text-black mr-5 hover:text-gray-700 transition'>Home</Link>
                        <Link to={"/profile"} className='text-black mr-5 hover:text-gray-700 transition'>Profile</Link>
                        <Link to={"/cart"} className='text-black mr-5 hover:text-gray-700 transition'>Cart</Link>
                        <Link to={"/login"} className='text-black mr-5 hover:text-gray-700 transition'>Login</Link>
                        <Link to={"/register"} className='text-black mr-5 hover:text-gray-700 transition'>Register</Link>

                    </nav>

                    <div className='flex-1 max-xl:hidden flex justify-end gap-2'>

                        <input
                            type="text"
                            id="search"
                            name="search"
                            className={is_disabled
                                ? "opacity-50 cursor-not-allowed py-2 px-4 w-3/4 bg-gray-200 rounded border border-gray-400 text-gray-700 outline-none"
                                : "py-2 px-4 w-3/4 bg-white rounded border border-gray-400 text-gray-700 outline-none"}
                            disabled={is_disabled}
                            placeholder='Search Products'
                            value={query}
                            onChange={(e) => setquery(e.target.value)}
                            onKeyDown={handel_key_down}
                        />
                        <button
                            onClick={search_product_function}
                            disabled={is_disabled}
                            className={is_disabled
                                ? "cursor-not-allowed opacity-50 bg-gray-900 text-white py-2 px-4 rounded-md"
                                : "bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800"}
                        >
                            Search
                        </button>

                    </div>

                </div>

            </header>
            <hr />
        </>
    );
};

export default Navbar;
