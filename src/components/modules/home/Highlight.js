import Image from 'next/future/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const slides = [
  {
    title: 'Spotify Starfield',
    thumb:
      'https://image.mux.com/TJ8PUmvhBpkGCHWs1fZnRnLm9GbPHMqNft4VxZprJPM/animated.gif?width=640',
    author: 'BenjaminGwynn',
    slug: 'spotify-starfield',
  },
  {
    title: 'GitHub Data Explorer',
    thumb:
      'https://image.mux.com/1l3DnE01iWic00BmEPgqS2daXNAnD3SQ8c8O2SLdkowFg/animated.gif?width=640',
    author: 'OSSInsight',
    slug: 'data-explorer-use-gpt-generated-sql-to-explore-5-billion-github-data',
  },
  {
    title: 'vicflix',
    thumb:
      'https://terrabyte.fra1.digitaloceanspaces.com/galleries/users/3yFHm3h5X1W72A7Alqokz42aOdh2/profile-3yFHm3h5X1W72A7Alqokz42aOdh2-vicflix..jpeg',
    author: 'VictorGarcia',
    slug: 'vicflix',
  },
  {
    title: 'Ultimate-Web-Development-Resources',
    thumb:
      'https://terrabyte.fra1.digitaloceanspaces.com/galleries/users/Ijmu9smm2RaLwEsxXbr3ezwcMmQ2/profile-Ijmu9smm2RaLwEsxXbr3ezwcMmQ2-cover..png',
    author: 'DhanushN',
    slug: 'ultimate-web-development-resources',
  },
  {
    title: 'ChatGPT Messenger',
    thumb:
      'https://terrabyte.fra1.digitaloceanspaces.com/galleries/users/uhGQ8FwyfpQ3O9s8OomNveLS8B13/profile-uhGQ8FwyfpQ3O9s8OomNveLS8B13-Screenshot%202023-03-15%20at%2021.45.20..png',
    animated:
      'https://terrabyte.fra1.digitaloceanspaces.com/galleries/users/uhGQ8FwyfpQ3O9s8OomNveLS8B13/profile-uhGQ8FwyfpQ3O9s8OomNveLS8B13-Screenshot%202023-03-15%20at%2021.45.20..png',
    author: 'Robin',
    slug: 'chatgpt-messenger-2',
  },
  {
    title: 'Spotify Starfield',
    thumb:
      'https://image.mux.com/TJ8PUmvhBpkGCHWs1fZnRnLm9GbPHMqNft4VxZprJPM/animated.gif?width=640',
    author: 'BenjaminGwynn',
    slug: 'spotify-starfield',
  },
  {
    title: 'GitHub Data Explorer',
    thumb:
      'https://image.mux.com/1l3DnE01iWic00BmEPgqS2daXNAnD3SQ8c8O2SLdkowFg/animated.gif?width=640',
    author: 'OSSInsight',
    slug: 'data-explorer-use-gpt-generated-sql-to-explore-5-billion-github-data',
  },
  {
    title: 'vicflix',
    thumb:
      'https://terrabyte.fra1.digitaloceanspaces.com/galleries/users/3yFHm3h5X1W72A7Alqokz42aOdh2/profile-3yFHm3h5X1W72A7Alqokz42aOdh2-vicflix..jpeg',
    author: 'VictorGarcia',
    slug: 'vicflix',
  },
  {
    title: 'Ultimate-Web-Development-Resources',
    thumb:
      'https://terrabyte.fra1.digitaloceanspaces.com/galleries/users/Ijmu9smm2RaLwEsxXbr3ezwcMmQ2/profile-Ijmu9smm2RaLwEsxXbr3ezwcMmQ2-cover..png',
    author: 'DhanushN',
    slug: 'ultimate-web-development-resources',
  },
  {
    title: 'ChatGPT Messenger',
    thumb:
      'https://terrabyte.fra1.digitaloceanspaces.com/galleries/users/uhGQ8FwyfpQ3O9s8OomNveLS8B13/profile-uhGQ8FwyfpQ3O9s8OomNveLS8B13-Screenshot%202023-03-15%20at%2021.45.20..png',
    animated:
      'https://terrabyte.fra1.digitaloceanspaces.com/galleries/users/uhGQ8FwyfpQ3O9s8OomNveLS8B13/profile-uhGQ8FwyfpQ3O9s8OomNveLS8B13-Screenshot%202023-03-15%20at%2021.45.20..png',
    author: 'Robin',
    slug: 'chatgpt-messenger-2',
  },
];

const Slide = ({ data }) => {
  const { thumb, animated, title, author, slug } = data;

  return (
    <>
      <div className="flex w-80 flex-1 grow overflow-hidden rounded-2xl bg-base-800">
        <div className="group relative" />
        <div className="h-[400px] w-full bg-base-900">
          <Image
            src={thumb}
            className="h-full w-full object-cover"
            alt={title}
            width={400}
            height={400}
            layout="fill"
          />
        </div>
      </div>
    </>
  );
};

const Highlight = ({ user }) => {
  const ref = useRef();

  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={50}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <Slide data={slide} />
        </SwiperSlide>
      ))}
    </Swiper>

    // <div className="relative mt-10 hidden lg:block">
    //   <ResponsiveContainer
    //     carouselRef={ref}
    //     render={(width, carouselRef) => {
    //       return (
    //         <StackedCarousel
    //           ref={carouselRef}
    //           slideComponent={Slide}
    //           slideWidth={750}
    //           carouselWidth={width}
    //           height={330}
    //           data={data}
    //           maxVisibleSlide={5}
    //           disableSwipe
    //           customScales={[1, 0.85, 0.7, 0.55]}
    //           transitionTime={450}
    //         />
    //       );
    //     }}
    //   />
    //   <button
    //     className="absolute top-28 left-0"
    //     onClick={() => ref.current?.goBack()}
    //   >
    //     <IoChevronBack className="h-10 w-auto" />
    //   </button>
    //   <button
    //     className="absolute top-28 right-0"
    //     onClick={() => ref.current?.goNext()}
    //   >
    //     <IoChevronForward className="h-10 w-auto" />
    //   </button>
    // </div>
  );
};

export default Highlight;
