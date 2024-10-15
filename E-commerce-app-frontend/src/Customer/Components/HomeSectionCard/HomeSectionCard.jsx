import React, { useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import '../Product/ProductCard.css'
import Aos from "aos";
import "aos/dist/aos.css";

const HomeSectionCard = ({product}) => {


  useEffect(()=>{
    Aos.init({once: true,});
  },[])

  const navigate = useNavigate();
  // console.log(product)

  function handleProductNavigate() {
    navigate(`/product/${product.id}`);
    // console.log("Yup, I am going from home page to Product Details Page..");
    localStorage.setItem("Category", product.category.name);
    // console.log("I have set the Product Category to localStorage ", localStorage.getItem("Category"));
  }

  return (
    <div 
     onClick={handleProductNavigate} className='hover:scale-110 transition-all ease-in flex flex-col w-[15rem] items-center rounded-lg overflow-hidden
     bg-white shadow-lg mx-3 border cursor-pointer '>
        <div className='h-[13rem] w-[10rem]'>
            <img className='object-top object-cover w-full h-full' src={product.imageUrl} alt="" />
        </div>

        <div className='p-4'>
            <h1 className='text-lg font-medium text-gray-900'>{product.brand}</h1>
            <p className='text-sm mt-2 text-gray-500'>{product.title}</p>
        </div>
    </div>
  )
}

export default HomeSectionCard