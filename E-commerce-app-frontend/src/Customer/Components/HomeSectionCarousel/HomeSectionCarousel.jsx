import React, { useState } from 'react'
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard'
import AliceCarousel from 'react-alice-carousel'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { Button } from '@mui/material'
import { mens_kurta } from '../../../Data/Mens_Kurta'
import 'react-alice-carousel/lib/alice-carousel.css';
import { EventObject } from 'react-alice-carousel';

const HomeSectionCarousel = ({data,sectionName}) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 4.5 }
    }

    const items = data.map((item) => <HomeSectionCard product={item} />)

    // const slidePrev = () => setActiveIndex(activeIndex - 1)
    // const slideNext = () => setActiveIndex(activeIndex + 1)

    const syncActiveIndex = (e) => {
        setActiveIndex(e.item);
        console.log("Current Active Index - ", activeIndex)
    };
    // const print = () => {
    //     console.log("onSlideChanged activated ..!")
    // }

    return (
        <div className='border'>
            <h1 className='font-extrabold text-2xl text-gray-800 px-4 py-5'>{sectionName}</h1>
            <div className='p-5 relative'>
                <AliceCarousel
                    // activeIndex={activeIndex}
                    items={items}
                    responsive={responsive}
                    renderNextButton={() => {
                        return (activeIndex !== items.length-4  && <Button  variant='contained' className='z-50 bg-white'
                                       sx={{ position: "absolute", top: '8rem', right: '0rem', bgcolor: 'white', transform: 'translateX(50%) rotate(90deg)' }}  >
                                        <KeyboardArrowLeft sx={{ color: 'black', transform: 'rotate(90deg)' }} />
                              </Button>)
                    }}
                    renderPrevButton={() => {
                        return (activeIndex !== 0 && <Button  variant='contained' sx={{ position: 'absolute', top: '8rem', left: '0', bgcolor: 'white', transform: 'translateX(-50%) rotate(-90deg)' }}>
                                       <KeyboardArrowRight sx={{ color: 'black', transform: 'rotate(-90deg)' }} />
                              </Button>)
                    }}
                    disableDotsControls
                    onSlideChanged={syncActiveIndex}

                />
                
                {/* { ------------ No Need to Render Buttons Seperately -------------
                    <Button onClick={slideNext} variant='contained' className='z-50 bg-white'
                        sx={{ position: "absolute", top: '8rem', right: '0rem', bgcolor: 'white', transform: 'translateX(50%) rotate(90deg)' }}  >
                        <KeyboardArrowLeft sx={{ color: 'black', transform: 'rotate(90deg)' }} />
                    </Button>
                }

                {
                    <Button onClick={slidePrev} variant='contained' sx={{ position: 'absolute', top: '8rem', left: '0', bgcolor: 'white', transform: 'translateX(-50%) rotate(-90deg)' }}>
                        <KeyboardArrowRight sx={{ color: 'black', transform: 'rotate(-90deg)' }} />
                    </Button>
                } */}
           
            </div>
        </div>
    )
}

export default HomeSectionCarousel