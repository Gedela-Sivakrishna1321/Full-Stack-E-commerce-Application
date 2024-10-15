import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { MainCarouselData } from './MainCarouselData';
import { useNavigate } from 'react-router-dom';




const MainCarousel = () => {

    const navigate = useNavigate();
    
    const items = MainCarouselData.map((item) => 
                                            <img src={item.image} alt='Carousel Images'
                                                className='cursor-pointer'
                                                 onClick={() => handleCarouselClick(item.path)}
                                                />)

    function handleCarouselClick(path) {
        navigate(`${path}`)
    }

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
    