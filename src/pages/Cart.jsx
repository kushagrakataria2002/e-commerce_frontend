import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {

  const [data, setdata] = useState();
  const [user, setuser] = useState(false);
  const [loading, setloading] = useState(true);
  const [cart_item, setcart_item] = useState(false);
  const [is_disabled, setis_disabled] = useState(false); 

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

      setis_disabled(true); 

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

        setis_disabled(false); 

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

            {
              user
                ?
                <>

                  {

                    data.length === 0
                      ?
                      <p>No items in your cart </p>
                      :
                      <>
                        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 w-full h-screen mt-20">
                          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">

                            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">

                              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">

                                <div className="space-y-6">

                                  {
                                    data.map((element, index, array) => (

                                      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">

                                        <div className="space-y-4 md:flex md:items-center md:justify-evenly md:gap-6 md:space-y-0">

                                          {/* image  */}

                                          <Link className="flex justify-center items-center shrink-0 md:order-1">
                                            <img
                                              className="h-20 dark:hidden"
                                              src={element.image}
                                            />
                                            <img
                                              className="hidden h-20 w-20 dark:block"
                                              src={element.image}
                                              alt="imac image"
                                            />
                                          </Link>


                                          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">

                                            {/* name  */}

                                            <Link
                                              className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                                            >
                                              {element.name}
                                            </Link>

                                            <div className="flex items-center gap-4">

                                              {/* price  */}

                                              <p
                                                type="button"
                                                className="inline-flex items-center text-sm font-medium text-gray-500  dark:text-gray-400 "
                                              >
                                                ₹ {element.price}
                                              </p>

                                              {/* remove button  */}

                                              <button
                                                type="button"
                                                disabled={is_disabled}
                                                className={ is_disabled ?  "cursor-not-allowed opacity-50 inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500" : " inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"}
                                                onClick={(e) => { remove_product({ id: element._id }) }}
                                              >
                                                Remove
                                              </button>

                                            </div>

                                          </div>

                                        </div>

                                      </div>

                                    ))
                                  }

                                </div>

                              </div>

                              {/* order summary  */}

                              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">

                                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Order summary
                                  </p>

                                  <div className="space-y-4">

                                    <div className="space-y-2">

                                      <dl className="flex items-center justify-between gap-4">

                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                          Original price
                                        </dt>

                                        <dd className="text-base font-medium text-gray-900 dark:text-white">

                                          <p>₹{data.reduce((total, item) => total + item.price * item.quantity, 0)}</p>

                                        </dd>

                                      </dl>

                                      <dl className="flex items-center justify-between gap-4">

                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                          Delivery Charges
                                        </dt>

                                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                                          ₹ 0
                                        </dd>

                                      </dl>

                                    </div>

                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">

                                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                                        Total
                                      </dt>

                                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                                        <p>₹{data.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                                      </dd>

                                    </dl>

                                  </div>

                                  <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                                    Proceed to checkout
                                  </button>

                                </div>

                              </div>

                            </div>
                          </div>
                        </section>

                      </>
                  }
                </>
                :
                <>
                  <div className='w-full h-screen flex items-start justify-center mt-20'>

                    <div className='flex justify-center items-center p-3'>

                      <p className='font-bold'>Login to see your cart items</p>

                    </div>
                  </div>
                </>
            }
          </>
      }


    </>

  )
}

export default Cart