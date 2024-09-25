
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules

const ButtonSlider: React.FC = ({ uniqueData }) => {
    // console.log(uniqueData)
    return (
        <div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                className="mySwiper"
            >
                {
                    uniqueData?.map((button, index) => (
                        <SwiperSlide key={index}>
                            <div className="text-center bg-gray-600 text-white font-bold py-2 px-4 rounded-xl" >
                                {button.subcategory}
                            </div>
                        </SwiperSlide>
                    ))
                }
                
            </Swiper>
        </div>
    )
}

export default ButtonSlider
