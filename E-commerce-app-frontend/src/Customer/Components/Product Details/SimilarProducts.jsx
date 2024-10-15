import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { findProductsByCategory } from '../../../Redux/Product/Action';
import Loader from '../../../Loader/Loader';
import ProductCard from '../Product/ProductCard';

const SimilarProducts = ({id}) => {

  var productsByCategory = useSelector(store => store.products.productsByCategory);
  const allProducts = useSelector(store => store.products.allProducts);
  var categoryProducts = allProducts.filter((product) => product.category.name === localStorage.getItem("Category"));
  categoryProducts = categoryProducts.filter((product) => product.id != id);
//   console.log("Category Products in similar ProductsPage = ", categoryProducts);
//   const dispatch = useDispatch();



        // useEffect(() => {
            
        //     const reqData = {
        //     category : localStorage.getItem("Category"),
        //     }
        //     console.log(reqData)
        //     dispatch(findProductsByCategory(reqData))

        // }, [])

  return (
    <div>
        <section className='pt-10'>
            <h1 className='text-xl font-bold py-5'>Similar Products</h1>

           {categoryProducts ? 
           
            <div className='flex flex-wrap space-y-5'>
                {categoryProducts.map((item) => <ProductCard product={item} />)}
           </div>
            
            :

              <Loader/>
            }
      
        </section>
    </div>
  )
}

export default SimilarProducts