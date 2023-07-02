import { useRef } from 'react';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import ProjectCard from 'components/common/cards/ProjectCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import DividerShowMore from 'components/common/elements/DividerShowMore';
import Icon from 'components/common/elements/Icon';

const ProjectCarousel = ({
  user,
  title = '',
  icon = 'FiX',
  iconPack = 'Fi',
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center space-x-2 text-xl">
          {/* <Icon name={icon} pack={iconPack} className="h-6 w-6" /> */}
          <span>{title}</span>
        </h3>

        <div className="flex items-center space-x-2">
          <button
            ref={prevRef}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-base-200 duration-200 disabled:text-base-300 dark:bg-base-700 dark:disabled:text-base-500"
          >
            <Icon name="FiChevronLeft" className="mx-auto h-6 w-6" />
          </button>
          <button
            ref={nextRef}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-base-200 duration-200 disabled:text-base-300 dark:bg-base-700 dark:disabled:text-base-500"
          >
            <Icon name="FiChevronRight" className="mx-auto h-6 w-6" />
          </button>
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
      >
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
