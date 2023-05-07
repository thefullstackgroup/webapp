import { useState } from 'react';
import { IoHeart } from 'react-icons/io5';
import Link from 'next/link';
import Avatar from 'components/common/elements/Avatar';
import useSWR from 'swr';
import ModalDialog from 'components/common/modals/ModalDialog';
import fetcher from 'utils/fetcher';

const ProfilePic = ({ profile }) => {
  return (
    <Avatar
      image={profile.profilePicUrl}
      name={profile.displayName}
      dimensions="h-6 w-6 border-2 border-tfsdark-800"
    />
  );
};

const Insights = ({ projectId, showViews = true, showAvatars = true }) => {
  const [displayVoteInsights, setDisplayVoteInsights] = useState(false);
  const url = `${process.env.BASEURL}/api/projects/project/insights/getVotes?id=${projectId}`;
  const { data } = useSWR(url, fetcher);
  const votes = data ? data.content : null;

  if (!votes) return null;

  return (
    <>
      <div className="sm:flex sm:justify-between">
        {votes.length > 0 && (
          <div className="sm:mx-0 flex text-xs sm:text-base items-center text-slate-400 ">
            {showAvatars ? (
              <div
                className="mr-2 flex -space-x-2"
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
              <IoHeart className="h-4 w-4 text-tfsdark-500 mr-1" />
            )}
            <button
              className="flex flex-nowrap items-start line-clamp-1 text-left text-sm leading-4"
              onClick={() => setDisplayVoteInsights(!displayVoteInsights)}
            >
              <span className="hover:text-white">
                {votes[0]?.userProfile?.displayName}
              </span>

              {votes.length > 1 && (
                <>
                  <span className="ml-1">and</span>
                  <span className="inline-flex ml-1 font-semibold hover:text-white">
                    {votes.length - 1} {votes.length > 2 ? 'others' : 'other'}
                  </span>
                </>
              )}
              <span className="">&nbsp;liked</span>
            </button>
          </div>
        )}
      </div>

      {displayVoteInsights && (
        <ModalDialog
          show={displayVoteInsights}
          setShow={setDisplayVoteInsights}
          title="Liked by"
        >
          <div className="py-4 no-scrollbar overflow-y-scroll overflow-visible overscroll-contain h-4/5 pb-20 sm:pb-4 sm:h-96 w-full">
            {votes?.map((profile, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 mb-6 px-2"
              >
                <Avatar
                  href={`/${profile?.userProfile?.displayName}`}
                  image={profile?.userProfile?.profilePicUrl}
                  name={profile?.userProfile?.displayName}
                  userId={profile?.userProfile?.userId}
                  dimensions="w-11 h-11"
                />

                <div className="flex w-full justify-between items-center">
                  <div className="flex flex-col w-36 sm:w-auto">
                    <Link href={`/${profile?.userProfile?.displayName}`}>
                      <span
                        className="cursor-pointer text-sm sm:text-base font-semibold text-slate-200"
                        onClick={() => setDisplayVoteInsights(false)}
                      >
                        {profile?.userProfile?.displayName}
                      </span>
                    </Link>
                    <span className="text-xs text-slate-400 truncate">
                      {profile?.userProfile?.currentTitle}
                    </span>
                  </div>
                  <div className="">
                    <Link href={`/${profile?.userProfile?.displayName}`}>
                      <button
                        className="btn-secondary text-sm"
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
        </ModalDialog>
      )}
    </>
  );
};

export default Insights;
