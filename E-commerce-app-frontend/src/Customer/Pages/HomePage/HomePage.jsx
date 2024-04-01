import React from 'react'
import MainCarousel from '../../Components/MainCarousel/MainCarousel'
import HomeSectionCarousel from '../../Components/HomeSectionCarousel/HomeSectionCarousel'
import { mens_kurta } from '../../../Data/Mens_Kurta'
import { mens_shirts } from '../../../Data/Mens_Shirts'
import { mensShoesPage1 } from '../../../Data/Mens_Shoes'
import { sareePage1 } from '../../../Data/Womens_Sarees'
import { women_dress } from '../../../Data/Womens_Dresses'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const {products} = useSelector(store => store);
  
  return (
    <div>
        <MainCarousel/>

        <div className='py-20 space-y-10 flex flex-col lg:px-10 px-5'>
            <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Kurta"}/>
            <HomeSectionCarousel data={mens_shirts} sectionName={"Men's Shirts"} />
            <HomeSectionCarousel data={mensShoesPage1} sectionName={"Men's Shoes"} />
            <HomeSectionCarousel data={sareePage1} sectionName={"Women's Sarees"} />
            <HomeSectionCarousel data={women_dress} sectionName={"Women's Dresses"} />
        </div>

        

    </div>
  )
}

export default HomePage