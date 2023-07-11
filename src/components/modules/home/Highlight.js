import Image from 'next/future/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import fetcher from 'utils/fetcher';
import useSWR from 'swr';
import ToolTip from 'components/common/elements/ToolTip';
import Icon from 'components/common/elements/Icon';
import Avatar from 'components/common/elements/Avatar';

const Slide = ({ data }) => {
  return (
    <>
      <Link
        href={`/${data?.projectCreator.displayName}/project/${data?.projectSlug}`}
      >
        <div className="group relative flex w-full flex-1 grow cursor-pointer overflow-hidden rounded-lg border border-transparent duration-200 dark:border-base-700 dark:hover:border-base-300">
          <div className="group relative" />
          <div className="h-[440px] w-full">
            <Image
              src={data?.projectImgURI}
              className="h-full w-full object-cover"
              alt={data?.projectName}
              width={800}
              height={800}
              layout="fill"
            />
          </div>
          <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-b from-transparent to-base-900/80 duration-200 group-hover:to-base-900/80 dark:to-base-900/90">
            <div className="w-12/12 absolute bottom-4 px-4 text-base-100 duration-200 group-hover:bottom-6">
              <h3 className="font-manrope text-2xl font-semibold">
                {data.projectName}
              </h3>
              <div className="mt-2 flex items-center space-x-2">
                <Avatar
                  image={data.projectCreator?.profilePicUrl}
                  name={data.projectCreator?.displayName}
                  dimensions="h-5 w-5"
                />
                <span className="text-sm dark:text-base-200">
                  {data?.projectCreator.name}
                </span>
              </div>
            </div>
            <div className="absolute bottom-2 right-8 h-10 w-10 duration-200 group-hover:right-4">
              <Icon
                name="FiArrowRight"
                className="h-6 w-6 text-white opacity-0 duration-200 group-hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

const Highlight = ({ user }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  let url = `${process.env.BASEURL}/api/projects/get?size=14&sort=mostpopular&projectType=PROJECT&range=100`;
  const { data } = useSWR(url, fetcher);

  return (
    <div>
      <div className="flex items-center justify-end space-x-2 pb-4">
        <button
          ref={prevRef}
          className="btn btn-secondary group relative flex px-2 disabled:border-base-200 disabled:bg-transparent disabled:text-base-300 disabled:dark:border-base-700 dark:disabled:text-base-500"
        >
          <ToolTip message="Previous" />
          <Icon name="FiChevronLeft" className="mx-auto h-4 w-4" />
        </button>
        <button
          ref={nextRef}
          className="btn btn-secondary group relative flex px-2 disabled:border-base-200 disabled:bg-transparent disabled:text-base-300 disabled:dark:border-base-700 dark:disabled:text-base-500"
        >
          <ToolTip message="Next" />
          <Icon name="FiChevronRight" className="mx-auto h-4 w-4" />
        </button>
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        modules={[Navigation]}
        className="pb-10"
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1700: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          2200: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
          2600: {
            slidesPerView: 7,
            spaceBetween: 30,
          },
          3200: {
            slidesPerView: 8,
            spaceBetween: 30,
          },
        }}
      >
        {!data &&
          [...Array(15)].map((elementInArray, index) => (
            <SwiperSlide key={index}>
              <div className="w-full animate-pulse space-y-2 sm:h-[300px] xl:h-[440px]">
                <div className="animate-pulse rounded-md bg-base-300/20 dark:bg-base-700/50 sm:h-[200px] xl:h-full"></div>
              </div>
            </SwiperSlide>
          ))}
        {data?.map((project, index) => (
          <SwiperSlide key={index}>
            <Slide data={project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Highlight;
