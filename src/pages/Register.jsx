import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate("/login");

  const [user, setuser] = useState(false);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [is_disabled, setis_disabled] = useState(false);

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

  const register_user = async (e) => {

    e.preventDefault();

    setis_disabled(true);
    try {

      const response = await axios.post("https://e-commerce-backend-pii1.onrender.com/user/register", { username, email, password });

      if (response.data.success === true) {
        alert(response.data.message);

        navigate("/login");

        setis_disabled(false);
      }

    } catch (error) {

      if (error.response.data.success === false) {
        alert(error.response.data.message);

        navigate("/register");

        setusername("");

        setemail("");

        setpassword("");
        
        setis_disabled(false);
      }

      else {
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

            <div className='w-full h-screen flex items-start justify-center mt-20 '>

              <div className='flex justify-center items-center p-3'>

                <p className='font-bold'>Already Logged in</p>

              </div>
            </div>

          </>
          :
          <>
            <section className="bg-gray-50 dark:bg-gray-900 mt-5">
              <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Register account
                    </h1>

                    <form className="space-y-4 md:space-y-6" onSubmit={register_user}>

                      <div>
                        <label
                          htmlFor="username"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your username
                        </label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
                          placeholder="Enter your username here"
                          required=""
                          value={username}
                          onChange={(e) => { setusername(e.target.value) }}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none"
                          placeholder="Enter your email here"
                          required=""
                          value={email}
                          onChange={(e) => { setemail(e.target.value) }}
                        />
                      </div>

                      <div>

                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter your password here"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 outline-none"
                          required=""
                          value={password}
                          onChange={(e) => { setpassword(e.target.value) }}
                        />
                      </div>

                      <button type='submit' disabled={is_disabled} className={is_disabled ? "cursor-not-allowed opacity-50 w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700" : "w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"}>
                        Register
                      </button>

                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account{" "}
                        <Link to={"/login"}
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                          Login
                        </Link>
                      </p>

                    </form>

                  </div>
                </div>
              </div>
            </section>

          </>
      }

    </>
  )
}

export default Register