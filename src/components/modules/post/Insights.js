import { useState } from 'react';
import { IoHeart } from 'react-icons/io5';
import Link from 'next/link';
import Avatar from 'components/common/elements/Avatar';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import ModalAlert from 'components/common/modals/ModalAlert';

const ProfilePic = ({ profile }) => {
  return (
    <Avatar
      image={profile?.profilePicUrl}
      name={profile?.displayName}
      dimensions="h-7 w-7 border-2 border-base-50 dark:border-base-900"
    />
  );
};

const Insights = ({ projectId, showAvatars = true }) => {
  const [displayVoteInsights, setDisplayVoteInsights] = useState(false);
  const url = `${process.env.BASEURL}/api/projects/project/insights/getVotes?id=${projectId}`;
  const { data } = useSWR(url, fetcher);
  const votes = data ? data.content : null;

  if (!votes) return null;

  return (
    <>
      {votes.length > 0 && (
        <div className="flex items-center text-xs dark:text-base-300 sm:mx-0 sm:text-base">
          {showAvatars ? (
            <div
              className="mr-1 flex -space-x-2.5"
              onClick={() => setDisplayVoteInsights(!displayVoteInsights)}
            >
              {votes.length > 0 && (
                <ProfilePic profile={votes[0]?.userProfile} />
              )}
              {votes.length > 1 && (
                <ProfilePic profile={votes[1]?.userProfile} />
              )}
              {votes.length > 2 && (
                <ProfilePic profile={votes[2]?.userProfile} />
              )}
              {votes.length > 3 && (
                <ProfilePic profile={votes[3]?.userProfile} />
              )}
            </div>
          ) : (
            <IoHeart className="mr-1 h-4 w-4 text-base-500" />
          )}
          <button
            className="flex flex-nowrap items-start text-left text-sm leading-4 line-clamp-1"
            onClick={() => setDisplayVoteInsights(!displayVoteInsights)}
          >
            <span className="hover:text-base-500 dark:hover:text-white">
              {votes[0]?.userProfile?.displayName}
            </span>

            {votes.length > 1 && (
              <>
                <span className="ml-1">and</span>
                <span className="ml-1 inline-flex font-semibold hover:text-base-500 dark:hover:text-white">
                  {votes.length - 1} {votes.length > 2 ? 'others' : 'other'}
                </span>
              </>
            )}
            <span className="">&nbsp;liked</span>
          </button>
        </div>
      )}

      <ModalAlert
        show={displayVoteInsights}
        setShow={setDisplayVoteInsights}
        title="Liked by"
      >
        <div className="no-scrollbar h-4/5 w-full overflow-x-visible overflow-y-scroll overscroll-contain sm:h-96 sm:py-4">
          {votes?.map((profile, index) => (
            <div key={index} className="mb-6 flex items-center space-x-4">
              <Avatar
                href={`/${profile?.userProfile?.displayName}`}
                image={profile?.userProfile?.profilePicUrl}
                name={profile?.userProfile?.displayName}
                userId={profile?.userProfile?.userId}
                dimensions="w-11 h-11"
              />

              <div className="flex w-full items-center justify-between">
                <div className="flex w-36 flex-col sm:w-auto">
                  <Link href={`/${profile?.userProfile?.displayName}`}>
                    <span
                      className="cursor-pointer text-sm font-medium sm:text-base"
                      onClick={() => setDisplayVoteInsights(false)}
                    >
                      {profile?.userProfile?.name}
                    </span>
                  </Link>
                  <span className="truncate text-xs text-base-400">
                    {profile?.userProfile?.currentTitle}
                  </span>
                </div>
                <div className="">
                  <Link href={`/${profile?.userProfile?.displayName}`}>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => setDisplayVoteInsights(false)}
                    >
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ModalAlert>
    </>
  );
};

export default Insights;
