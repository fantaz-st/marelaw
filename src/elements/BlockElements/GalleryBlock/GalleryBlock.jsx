import { Navigation, Pagination, Autoplay, Parallax } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Block from "../../../Components/Block/Block";
import { Box, Typography } from "@mui/material";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GalleryBlock = (props) => {
  return (
    <Box>
      <Typography variant='h4'>Galerija</Typography>
      <Swiper
        spaceBetween={15}
        centeredSlides={false}
        loop={false}
        parallax={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        navigation={true}
        modules={[Parallax, Autoplay, Navigation, Pagination]}
        className='fntz-swiper-2'
        breakpoints={{
          // when window width is >= 640px
          1024: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 1,
          },
        }}
      >
        {props.slike.map((slika, i) => (
          <SwiperSlide key={i}>
            <Block block={slika} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default GalleryBlock;
