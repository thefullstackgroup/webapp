import Image from 'next/future/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import {
  StackedCarousel,
  ResponsiveContainer,
} from 'react-stacked-center-carousel';

const data = [
  {
    title: 'Spotify Starfield',
    thumb:
      'https://image.mux.com/TJ8PUmvhBpkGCHWs1fZnRnLm9GbPHMqNft4VxZprJPM/thumbnail.jpg?width=640',
    animated:
      'https://image.mux.com/TJ8PUmvhBpkGCHWs1fZnRnLm9GbPHMqNft4VxZprJPM/animated.gif?width=640',
    author: 'BenjaminGwynn',
    slug: 'spotify-starfield',
  },
  {
    title: 'GitHub Data Explorer',
    thumb:
      'https://image.mux.com/1l3DnE01iWic00BmEPgqS2daXNAnD3SQ8c8O2SLdkowFg/thumbnail.jpg?width=640',
    animated:
      'https://image.mux.com/1l3DnE01iWic00BmEPgqS2daXNAnD3SQ8c8O2SLdkowFg/animated.gif?width=640',
    author: 'OSSInsight',
    slug: 'data-explorer-use-gpt-generated-sql-to-explore-5-billion-github-data',
  },
  {
    title: 'vicflix',
    thumb:
      'https://terrabyte.fra1.digitaloceanspaces.com/galleries/users/3yFHm3h5X1W72A7Alqokz42aOdh2/profile-3yFHm3h5X1W72A7Alqokz42aOdh2-vicflix..jpeg',
    animated:
      'https://terrabyte.fra1.digitaloceanspaces.com/galleries/users/3yFHm3h5X1W72A7Alqokz42aOdh2/profile-3yFHm3h5X1W72A7Alqokz42aOdh2-vicflix..jpeg',
    author: 'VictorGarcia',
    slug: 'vicflix',
  },
  {
    title: 'Ultimate-Web-Development-Resources',
    thumb:
      'https://terrabyte.fra1.digitaloceanspaces.com/galleries/users/Ijmu9smm2RaLwEsxXbr3ezwcMmQ2/profile-Ijmu9smm2RaLwEsxXbr3ezwcMmQ2-cover..png',
    animated:
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

const Slide = (props) => {
  const { data, dataIndex, isCenterSlide, swipeTo, slideIndex } = props;
  const { thumb, animated, title, author, slug } = data[dataIndex];
  const [loadDelay, setLoadDelay] = useState();
  const [removeDelay, setRemoveDelay] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isCenterSlide) {
      clearTimeout(removeDelay);
      setLoadDelay(setTimeout(() => setLoaded(true), 100));
    } else {
      clearTimeout(loadDelay);
      if (loaded) setRemoveDelay(setTimeout(() => setLoaded(false), 10));
    }
  }, [isCenterSlide]);

  useEffect(() => () => {
    clearTimeout(removeDelay);
    clearTimeout(loadDelay);
  });

  return (
    <>
      <div
        className="w-full overflow-hidden rounded-md bg-base-800"
        draggable={true}
      >
        <div
          className="group relative"
          onClick={() => {
            if (!isCenterSlide) swipeTo(slideIndex);
          }}
        />
        {isCenterSlide ? (
          <Link href={`/${author}/project/${slug}`}>
            <div className="relative cursor-pointer">
              <div className="h-80 w-full bg-base-900">
                <Image
                  src={animated}
                  className="h-full w-full object-cover"
                  alt={title}
                  width={900}
                  height={900}
                  layout="fill"
                  priority={true}
                />
              </div>

              <div className="absolute bottom-0 left-0 flex w-full flex-col space-y-2 bg-gradient-to-b from-transparent to-base-700 px-4 py-4">
                <div className="bg-primary-600 w-min rounded-md px-2 py-0.5 text-xs font-medium">
                  Highlight
                </div>
                <div className="w-3/4">
                  <span className="text-3xl font-semibold tracking-tight">
                    {title}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className="h-80 w-full bg-base-900">
            <Image
              src={thumb}
              className="h-full w-full object-cover opacity-70"
              alt={title}
              width={400}
              height={400}
              layout="fill"
            />
          </div>
        )}
      </div>
    </>
  );
};

const Highlight = ({ user }) => {
  const ref = useRef();

  return (
    <div className="relative mt-10 hidden lg:block">
      <ResponsiveContainer
        carouselRef={ref}
        render={(width, carouselRef) => {
          return (
            <StackedCarousel
              ref={carouselRef}
              slideComponent={Slide}
              slideWidth={750}
              carouselWidth={width}
              height={330}
              data={data}
              maxVisibleSlide={5}
              disableSwipe
              customScales={[1, 0.85, 0.7, 0.55]}
              transitionTime={450}
            />
          );
        }}
      />
      <button
        className="absolute top-28 left-0"
        onClick={() => ref.current?.goBack()}
      >
        <IoChevronBack className="h-10 w-auto" />
      </button>
      <button
        className="absolute top-28 right-0"
        onClick={() => ref.current?.goNext()}
      >
        <IoChevronForward className="h-10 w-auto" />
      </button>
    </div>
  );
};

export default Highlight;
