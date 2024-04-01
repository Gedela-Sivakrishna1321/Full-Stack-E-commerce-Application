import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { MainCarouselData } from './MainCarouselData';



const items = MainCarouselData.map((item) => <img src={item.image} className='cursor-pointer' />)

const MainCarousel = () => {
    return (
        <AliceCarousel
        disableButtonsControls
        items={items}
       autoPlay
       autoPlayInterval={1000}
       infinite
    />
    );
}

export default MainCarousel
    