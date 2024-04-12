import React, {useEffect} from 'react'
import MainCarousel from '../../Components/MainCarousel/MainCarousel'
import HomeSectionCarousel from '../../Components/HomeSectionCarousel/HomeSectionCarousel'
import { useSelector, useDispatch } from 'react-redux'
import { findAllProducts, findProductsByCategory } from '../../../Redux/Product/Action'

const HomePage = () => {

  const dispatch = useDispatch();
  const allProducts = useSelector(store => store?.products?.allProducts);
  console.log("ALL PRODUCTS - ", allProducts);
  const createdProduct = useSelector(store => store?.products?.createdProduct);

  useEffect(() => {
    dispatch(findAllProducts());
  },[createdProduct])

  const women_dresses = allProducts.filter((item) => item.category.name === "women_dress");
  const women_tops = allProducts.filter((item) => item.category.name === "top");
  const women_jeans = allProducts.filter((item) => item.category.name === "women_jeans");
  const women_sarees = allProducts.filter((item) => item.category.name === "sarees");
  const men_jeans = allProducts.filter((item) => item.category.name === "men_jeans");
  const men_kurtas = allProducts.filter((item) => item.category.name === "mens_kurta");
  const men_shirts = allProducts.filter((item) => item.category.name === "shirt");

  
  return (
    <div>
        <MainCarousel/>

        <div className='py-20 space-y-10 flex flex-col lg:px-10 px-5'>
            <HomeSectionCarousel sectionName={"Men's Kurta"} data={men_kurtas}  />
            <HomeSectionCarousel  sectionName={"Men's Shirts"} data={men_shirts} />
            {/* <HomeSectionCarousel data={mensShoesPage1} sectionName={"Men's Shoes"} Category={""} /> */}
            <HomeSectionCarousel  sectionName={"Women's Dresses"} data={women_dresses}/>
            <HomeSectionCarousel  sectionName={"Women's Tops"} data={women_tops} />
            <HomeSectionCarousel  sectionName={"Women's Sarees"} data={women_sarees} />
            {/* <HomeSectionCarousel  sectionName={"Women's Tops"} data={"top"} /> */}
        </div>

        

    </div>
  )
}

export default HomePage