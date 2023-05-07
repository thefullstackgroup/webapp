import React, { useMemo } from 'react';
import Link from 'next/link';
import Avatar from 'components/common/elements/Avatar';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const SuggestedUserCard = (props) => {
  return (
    <>
      <Link href={`/${props.project.projectCreator.displayName}`}>
        <div className="relative w-full h-32 sm:h-36 group cursor-pointer">
          <div className="mx-auto w-20 h-24 sm:w-24 sm:h-28 pt-2">
            {props.project.projectCreator.profilePicUrl && (
              <Avatar
                userId={props.project.userId}
                href={`/${props.project.projectCreator.displayName}`}
                image={props.project.projectCreator.profilePicUrl}
                dimensions="h-20 w-20 sm:h-24 sm:w-24 rounded-full opacity-100 sm:group-hover:ring-4 group-hover:ring-primary-500 duration-200"
              />
            )}
          </div>
          <div className="font-normal sm:font-semibold text-base text-center">
            <p className="truncate text-xs">
              {props.project.projectCreator.displayName}
            </p>
            <p className="hidden sm:block truncate text-slate-400 font-normal text-xs">
              {props.project.projectCreator.currentTitle}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

const Discover = ({ user, count, search }) => {
  const myTechStack =
    user?.userSkills?.skills
      .map(({ languageName }) => languageName)
      .join(',') || null;

  let url = `${process.env.BASEURL}/api/projects/get?page=0&size=60&sort=mostpopular&projectType=PROJECT&range=40`;
  if (search) {
    url = `${process.env.BASEURL}/api/search/showcase?size=60&sort=mostpopular&projectType=PROJECT&tech=${myTechStack}&range=90`;
  }
  const { data } = useSWR(url, fetcher);
  const uniqueIds = [];

  const suggestedUsers = useMemo(() => {
    const userList =
      data &&
      data?.filter((element) => {
        const isDuplicate = uniqueIds.includes(element.userId);

        if (!isDuplicate) {
          uniqueIds.push(element.userId);

          return true;
        }
        return false;
      });
    return userList;
  });

  return (
    <>
      <div className="lg:w-full max-w-screen-2xl md:mt-2">
        {/* <div className="hidden lg:block mb-4 px-4 md:px-0">
          <h4 className="text-xl md:text-2xl text-slate-100 font-semibold">
            Discover and follow
          </h4>
        </div> */}

        {!data && (
          <div className="flex items-center overflow-x-scroll no-scrollbar px-4 md:px-0 gap-4 md:gap-6">
            {[...Array(15)].map((elementInArray, index) => (
              <div className="mx-auto w-24 h-32 sm:w-24 sm:h-36" key={index}>
                <div className="h-20 w-20 sm:h-24 sm:w-24 bg-tfsdark-700 rounded-full animate-pulse">
                  <span className="hidden">Loading</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {suggestedUsers && (
          <div className="flex items-center overflow-x-scroll no-scrollbar px-4 md:px-1 gap-4 md:gap-6">
            {suggestedUsers?.map(
              (project, index) =>
                user.userId !== project.userId && (
                  <div
                    className="w-24 h-32 sm:w-24 sm:h-36 overflow-visible"
                    key={index}
                  >
                    <SuggestedUserCard project={project} user={user} />
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Discover;
