import React, { useEffect } from 'react'
import './ProductCard.css'
import { useNavigate } from 'react-router-dom'
import Aos from "aos";
import "aos/dist/aos.css";

const ProductCard = ({product}) => {

  
  useEffect(()=>{
    Aos.init({once: true,
              duration: 1000,
    });
  },[])

  const navigate = useNavigate();

  function handleProductNavigate() {
    // console.log("Yey, I am navigating to Product Details Page")
    navigate(`/product/${product.id}`);
    localStorage.setItem("Category", product.category.name);
  }
  return (
    <div data-aos="zoom-in" 
        onClick={handleProductNavigate} 
          className='productCard w-[15rem] m-3 transition-all cursor-pointer border hover:border-none hover:'>
        <div className='h-[20rem]'>
            <img  className='h-full w-full object-cover object-left-top'
            src={product.imageUrl} alt="" />
        </div>

        <div className='textPart bg-white p-3'>
            <div>
                 <h1 className='font-bold opacity-60'>{product.brand}</h1>
                 <p>{product.title}</p>
            </div>

            <div className='flex items-center space-x-2'>
                <p className='font-semibold'>₹{product.discountedPrice}</p>
                <p className='line-through opacity-50'>₹{product.price}</p>
                <p className='text-green-600 font-semibold'>{product.discountPercent}% off</p>
            </div>
        </div>
    </div>
  )
}

export default ProductCard