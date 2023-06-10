import Link from 'next/link';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { useMemo } from 'react';
import Avatar from 'components/common/elements/Avatar';
import ButtonFollow from 'components/common/buttons/Follow';
import Image from 'next/future/image';

const TrendingProjects = ({ user }) => {
  let url = `${process.env.BASEURL}/api/projects/get?page=0&size=5&sort=mostpopular&projectType=PROJECT&range=30`;
  const { data } = useSWR(url, fetcher);

  return (
    <div className="rounded-md px-6 pt-4">
      <ul className="w-full space-y-5 rounded-lg border border-base-200 bg-base-50 px-4 py-4 dark:border-base-700 dark:bg-transparent">
        <li>
          <span className="text-lg font-semibold">Discover and follow</span>
        </li>
        {data &&
          data?.map((project, index) => (
            <li className="flex items-center justify-between gap-8" key={index}>
              <div className="group flex cursor-pointer items-center gap-3">
                <div
                  className={
                    'h-28 w-40 cursor-pointer overflow-hidden rounded bg-base-200 dark:bg-base-800 '
                  }
                >
                  <Image
                    src={project.projectImgURI}
                    className="h-full w-full object-cover object-top duration-200 hover:opacity-100 group-hover:scale-105 group-hover:shadow-xl dark:opacity-90"
                    alt={project.title}
                    width={300}
                    height={200}
                    layout="fill"
                  />
                </div>

                {/* <Link href={`/${project.projectCreator.displayName}`}>
                  <div className="">
                    <p className="text-sm font-medium">
                      {project.projectCreator.name}
                    </p>
                    <p className="truncate text-xs font-normal text-base-500 dark:text-base-400">
                      @{project.projectCreator.displayName}
                    </p>
                  </div>
                </Link> */}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TrendingProjects;
