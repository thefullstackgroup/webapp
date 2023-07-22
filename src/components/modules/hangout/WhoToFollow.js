import Link from 'next/link';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { useMemo } from 'react';
import Avatar from 'components/common/elements/Avatar';
import Icon from 'components/common/elements/Icon';

const WhoToFollow = ({ user }) => {
  let url = `${process.env.BASEURL}/api/projects/get?page=1&size=12&sort=mostpopular&projectType=PROJECT&range=60`;

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
    <div className="rounded-md px-6">
      <ul className="w-full space-y-5 border-0 border-base-200 pt-4 dark:border-base-700 dark:bg-transparent xl:pl-7">
        <li className="flex items-end space-x-2">
          <span className="font-mono text-lg font-medium">Who to follow</span>
          <Icon name="FiCornerRightDown" />
        </li>
        {suggestedUsers &&
          suggestedUsers?.map(
            (project, index) =>
              user?.userId !== project.userId && (
                <li
                  className="grid grid-cols-5 items-center justify-between gap-4"
                  key={index}
                >
                  <div className="group col-span-4 flex cursor-pointer items-center gap-2">
                    {project.projectCreator.profilePicUrl && (
                      <Avatar
                        userId={project.userId}
                        href={`/${project.projectCreator.displayName}`}
                        image={project.projectCreator.profilePicUrl}
                        dimensions="h-10 w-10 opacity-100 duration-200 group-hover:ring-4 group-hover:ring-purple-500"
                        name={`${project.projectCreator.displayName}`}
                      />
                    )}

                    <Link href={`/${project.projectCreator.displayName}`}>
                      <div className="">
                        <p className="truncate text-sm font-medium">
                          {project.projectCreator.name}
                        </p>
                        <p className="truncate text-xs font-normal text-base-500 dark:text-base-400">
                          @{project.projectCreator.displayName}
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="col-span-1 hidden 2xl:block">
                    <Link href={`/${project.projectCreator.displayName}`}>
                      <button className="btn btn-secondary btn-sm rounded-full">
                        Follow
                      </button>
                    </Link>
                  </div>
                </li>
              )
          )}
      </ul>
    </div>
  );
};

export default WhoToFollow;
