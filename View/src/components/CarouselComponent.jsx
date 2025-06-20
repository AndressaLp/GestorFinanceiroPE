import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Navigation, Pagination } from "swiper/modules"

function CarouselComponent(){
    return(
        <div className="h-full w-full flex items-center">
            <Swiper modules={[Navigation, Pagination, Autoplay]} navigation={true} pagination={{clickable: true}} autoplay={{delay: 10000}} spaceBetween={10}>
                <SwiperSlide className="flex self-center">
                    <img className="max-md:w-60 max-lg:w-72 w-90 m-auto pb-10 max-lg:px-10" src="/slide-1.png" alt="foto" />
                </SwiperSlide>
                <SwiperSlide className="flex self-center">
                    <img className="max-md:w-60 max-lg:w-72 w-90 m-auto pb-10 max-lg:px-10" src="/slide-2.png" alt="" />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default CarouselComponent
