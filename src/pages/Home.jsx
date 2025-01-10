import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {

  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {

    const fetch_product_data = async (req, res) => {
      try {

        const { data } = await axios.get("https://e-commerce-backend-pii1.onrender.com/product/all");

        setdata(data.products);
        setloading(false);

      } catch (error) {
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

            <div className="text-center w-full h-screen flex justify-center items-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-112 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-gray-900"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>

          </>
          :
          <>

            <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">

              <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">

                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">

                  {
                    data.map((element, index, array) => (

                      <Link to={`/product/${element._id}`} key={index}>

                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">

                          {/* image  */}

                          <div className="h-36 w-full">
                            <img
                              className="mx-auto h-full dark:hidden"
                              src={element.image[0].url}
                              alt=""
                            />
                            <img
                              className="mx-auto hidden h-full dark:block"
                              src={element.image[0].url}
                              alt=""
                            />
                          </div>

                          <div className="pt-6">

                            {/* name  */}

                            <div className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
                              {element.name}
                            </div>

                            {/* Ratings   */}

                            <div className="mt-2 flex items-center gap-2">
                              <div className="flex items-center">
                                <svg
                                  className="h-4 w-4 text-yellow-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                </svg>
                                <svg
                                  className="h-4 w-4 text-yellow-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                </svg>
                                <svg
                                  className="h-4 w-4 text-yellow-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                </svg>
                                <svg
                                  className="h-4 w-4 text-yellow-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                </svg>
                                <svg
                                  className="h-4 w-4 text-yellow-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                </svg>
                              </div>

                            </div>

                            {/* Extra information  */}

                            <ul className="mt-2 flex items-center gap-4">
                              <li className="flex items-center gap-2">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                  {element.category}
                                </p>
                              </li>
                            </ul>

                            <div className="mt-4 flex items-center justify-between gap-4">

                              {/* price  */}

                              <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">

                                ₹ {element.price}

                              </p>

                            </div>
                          </div>

                        </div>

                      </Link>

                    ))
                  }

                </div>


              </div>

            </section>


          </>
      }
    </>
  )
}

export default Home