import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

const Single = () => {

  const param = useParams();

  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [description, setdescription] = useState([]);
  const [is_disabled, setis_disabled] = useState(false); 

  useEffect(() => {

    const fetch_product_details = async () => {
      try {

        const { data } = await axios.get(`https://e-commerce-backend-pii1.onrender.com/product/${param.id}`);

        const splitted_description = data.product.description.split(".");

        setdata(data);
        setdescription(splitted_description);
        setloading(false);

      } catch (error) {
        console.log(error);
        setloading(true);
      }
    }

    fetch_product_details();

  }, []);

  const add_to_cart = async () => {

    setis_disabled(true); 
    try {

      const token = localStorage.getItem("token");

      if (token && token.trim() !== "") {

        const response = await axios.post(`https://e-commerce-backend-pii1.onrender.com/cart/add/${param.id}`, {}, {
          headers: {
            token: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        console.log(response);

        if (response.data.success === true) {
          alert(response.data.message);
          setis_disabled(false); 
        }

      }

      else {

        alert("Login to add product to cart");
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

            <div className="bg-gray-100 dark:bg-gray-800 py-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                  <div className="md:flex-1 px-4">

                    {/* product image  */}

                    <div className="h-[460px] flex justify-center items-center rounded-lg mb-4">
                      <img
                        className="w-1/2"
                        src={data.product.image[0].url}
                        alt="Product Image"
                      />
                    </div>

                    {/* add to cart button  */}

                    <div className="flex -mx-2 mb-4">
                      <div className="w-full px-2">
                        <button disabled={is_disabled} onClick={add_to_cart} className={ is_disabled ?  "cursor-not-allowed opacity-50 w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700": "w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"}>
                          Add to Cart
                        </button>
                      </div>
                    </div>

                  </div>

                  <div className="md:flex-1 px-4">

                    {/* product name  */}

                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {data.product.name}
                    </h2>

                    <div className="flex mb-4">


                      {/* product price  */}

                      <div className="mr-4">
                        <span className="font-bold text-gray-800 dark:text-gray-300">
                          Price:
                        </span>   
                        <span className="text-gray-600 dark:text-gray-300"> ₹{data.product.price}</span>
                      </div>

                  </div>


                    {/* product description  */}

                    <div>

                      <span className=" text-normal font-bold text-gray-800 dark:text-gray-300">
                        Product Description:
                      </span>

                        <ol className='mt-5'>

                          {
                            description.map((element, index, array) =>(

                              <>
                              <li className='text-sm' >{element}</li>
                              <br />
                              </>
                            ))
                          }

                        </ol>

                    </div>

                  </div>
                </div>
              </div>
            </div>


          </>
      }
    </>
  )
}

export default Single