import Loader from 'components/common/elements/Loader';
import Avatar from 'components/common/elements/Avatar';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const Followers = ({ user }) => {
  const followersUrl = `${process.env.BASEURL}/api/profile/social/followers`;
  const { data: followers } = useSWR(followersUrl, fetcher);
  const followersIds = followers?.map(({ userId }) => userId).join(',') || null;

  const followersProfilesUrl = `${process.env.BASEURL}/api/profile/getUsers?userIds=${followersIds}`;
  const { data: followersProfiles } = useSWR(followersProfilesUrl, fetcher);

  if (!followersProfiles) {
    return (
      <div className="mt-4 flex w-full flex-1 justify-center py-40">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {followersProfiles && followersProfiles?.length > 0 && (
        <div className="mt-4 w-full divide-y divide-base-600 rounded-md border border-base-600">
          {followersProfiles?.map((profile, index) => (
            <div className="w-full p-4 hover:bg-base-700/50" key={index}>
              <div className="flex items-center space-x-4">
                <Avatar
                  href={`/${profile.displayName}`}
                  image={profile.profilePicUrl}
                />
                <Link href={`/${profile.displayName}`}>
                  <div className="flex cursor-pointer flex-col truncate">
                    <p className="whitespace-nowrap font-semibold">
                      {profile.name}
                      <span className="ml-2 font-normal text-base-400">
                        @{profile.displayName}
                      </span>
                    </p>
                    <p className="text-sm text-base-400">
                      {profile.currentTitle}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      {followersProfiles && followersProfiles?.length == 0 && (
        <div className="mt-4 flex w-full flex-1 justify-center rounded-md border border-base-600 py-20">
          You have no followers yet.
        </div>
      )}
    </>
  );
};

export default Followers;
