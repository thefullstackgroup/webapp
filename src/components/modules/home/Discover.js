import React, { useMemo } from 'react';
import Link from 'next/link';
import Avatar from 'components/common/elements/Avatar';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import Icon from 'components/common/elements/Icon';

const SuggestedUserCard = (props) => {
  return (
    <>
      <div className="mx-auto sm:h-28 sm:w-24">
        {props.project.projectCreator.profilePicUrl && (
          <Avatar
            userId={props.project.userId}
            name={props.project.projectCreator.name}
            href={`/${props.project.projectCreator.displayName}`}
            image={props.project.projectCreator.profilePicUrl}
            dimensions="h-20 w-20 sm:h-24 sm:w-24 opacity-100 sm:group-hover:ring-4 group-hover:ring-primary-500 duration-200"
          />
        )}
      </div>
      <Link href={`/${props.project.projectCreator.displayName}`}>
        <div className="text-center text-base font-normal sm:font-semibold">
          <p className="truncate text-sm">
            {props.project.projectCreator.displayName}
          </p>
          <p className="hidden truncate text-xs font-normal text-base-400 dark:text-base-400 sm:block">
            {props.project.projectCreator.currentTitle}
          </p>
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
      <div className="w-full space-y-3">
        <div className="flex items-end space-x-2">
          <h3 className="font-mono text-base font-medium text-base-700 dark:text-base-200">
            Follow trending builders
          </h3>
          <Icon name="FiCornerRightDown" className="h-5 w-5" />
        </div>

        {!data && (
          <div className="no-scrollbar flex items-center gap-4 overflow-y-visible overflow-x-scroll px-4 md:gap-8 md:px-0">
            {[...Array(15)].map((elementInArray, index) => (
              <div className="mx-auto h-32 w-24 sm:h-36 sm:w-24" key={index}>
                <div className="h-20 w-20 animate-pulse rounded-full bg-base-700 sm:h-24 sm:w-24">
                  <span className="hidden">Loading</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {suggestedUsers && (
          <div className="no-scrollbar flex items-center gap-4 overflow-y-visible overflow-x-scroll px-4 pt-2 md:gap-8 md:px-1">
            {suggestedUsers?.map(
              (project, index) =>
                user?.userId !== project.userId && (
                  <div className="h-32 w-24 sm:h-auto sm:w-24" key={index}>
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
