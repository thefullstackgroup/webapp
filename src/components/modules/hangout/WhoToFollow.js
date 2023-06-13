import Link from 'next/link';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { useMemo } from 'react';
import Avatar from 'components/common/elements/Avatar';
import ButtonFollow from 'components/common/buttons/Follow';

const WhoToFollow = ({ user }) => {
  let url = `${process.env.BASEURL}/api/projects/get?page=1&size=12&sort=mostpopular&projectType=PROJECT&range=40`;

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
    <div className="rounded-md px-6 pt-4">
      <ul className="w-full space-y-5 rounded-lg border border-base-200 bg-base-50 px-4 py-4 dark:border-base-700 dark:bg-transparent">
        <li>
          <span className="text-lg font-semibold">Discover and follow</span>
        </li>
        {suggestedUsers &&
          suggestedUsers?.map(
            (project, index) =>
              user?.userId !== project.userId && (
                <li
                  className="flex items-center justify-between gap-8"
                  key={index}
                >
                  <div className="group flex cursor-pointer items-center gap-3">
                    {project.projectCreator.profilePicUrl && (
                      <Avatar
                        userId={project.userId}
                        href={`/${project.projectCreator.displayName}`}
                        image={project.projectCreator.profilePicUrl}
                        dimensions="h-10 w-10 opacity-100 duration-200 group-hover:ring-4 group-hover:ring-purple-500"
                      />
                    )}

                    <Link href={`/${project.projectCreator.displayName}`}>
                      <div className="">
                        <p className="text-sm font-medium">
                          {project.projectCreator.name}
                        </p>
                        <p className="truncate text-xs font-normal text-base-500 dark:text-base-400">
                          @{project.projectCreator.displayName}
                        </p>
                      </div>
                    </Link>
                  </div>
                  <ButtonFollow
                    followToUser={project?.projectCreator?.userId}
                    followFromUser={user?.userId}
                    followToName={project?.projectCreator?.displayName}
                    size={'btn-sm rounded-full'}
                  />
                </li>
              )
          )}
      </ul>
    </div>
  );
};

export default WhoToFollow;
