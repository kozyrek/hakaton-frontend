import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from "./slider.module.css";

export default function Slider({ 
    items,
    Component,
    action,
    swiperParams = {}, 
    className 
 }) {
    return (            
        <div className={className || styles.slider}>
            <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={4}
                navigation
                breakpoints={{
                    360: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1400: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                        },
                    }}
                {...swiperParams}
            >
                {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Component item={item} action={action} index={item.id}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}