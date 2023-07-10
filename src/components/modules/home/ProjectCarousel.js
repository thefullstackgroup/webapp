import { useRef } from 'react';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import ProjectCard from 'components/common/cards/ProjectCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import Icon from 'components/common/elements/Icon';
import ToolTip from 'components/common/elements/ToolTip';
import Link from 'next/link';

const ProjectCarousel = ({
  user,
  title = '',
  category = false,
  sort,
  range,
  count = 20,
  showMore = '/explore/popular',
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  let url = `${process.env.BASEURL}/api/projects/get?size=${count}&sort=${sort}&projectType=PROJECT&range=${range}`;

  if (category) {
    if (category?.slug === 'opentocollab') {
      url = `${process.env.BASEURL}/api/projects/get?size=${count}&sort=${sort}&projectType=PROJECT&lookingForCollabs=true`;
    } else {
      url = `${process.env.BASEURL}/api/projects/find?size=${count}&sort=${sort}&userId=&projectType=PROJECT&range=${range}&category=${category.term}`;
    }
  }

  const { data } = useSWR(url, fetcher);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-end space-x-2">
          <h3 className="font-mono text-base font-medium text-base-700 dark:text-base-200">
            {title}
          </h3>
          <Icon name="FiCornerRightDown" className="h-5 w-5" />
        </div>
        <div className="flex items-center space-x-2">
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
          <Link href={showMore} passHref>
            <a href="#" className="btn btn-secondary group relative flex px-2">
              <ToolTip message="Show more" />
              <Icon name="FiChevronsRight" className="mx-auto h-4 w-4" />
            </a>
          </Link>
        </div>
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        modules={[Navigation]}
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
          1800: {
            slidesPerView: 5,
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
              <div className="w-80 animate-pulse space-y-2 sm:h-[300px] xl:h-[334px]">
                <div className="w-80 animate-pulse rounded-md bg-base-300 sm:h-[200px] xl:h-[240px]"></div>
                <div className="w-64 animate-pulse rounded-md bg-base-300 sm:h-10 xl:h-4"></div>
                <div className="w-48 animate-pulse rounded-md bg-base-300 sm:h-10 xl:h-4"></div>
              </div>
            </SwiperSlide>
          ))}
        {data?.map((project, index) => (
          <SwiperSlide key={index}>
            <ProjectCard project={project} user={user} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <DividerShowMore label="Show more" href={showMore} /> */}
    </div>
  );
};

export default ProjectCarousel;
