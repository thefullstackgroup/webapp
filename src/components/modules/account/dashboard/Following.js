import Loader from 'components/common/elements/Loader';
import Avatar from 'components/common/elements/Avatar';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const Following = ({ user }) => {
  const followingUrl = `${process.env.BASEURL}/api/profile/social/following`;
  const { data: following } = useSWR(followingUrl, fetcher);
  const followingIds =
    following?.map(({ followUserId }) => followUserId).join(',') || null;

  const followingProfilesUrl = `${process.env.BASEURL}/api/profile/getUsers?userIds=${followingIds}`;
  const { data: followingProfiles } = useSWR(followingProfilesUrl, fetcher);

  if (!followingProfiles) {
    return (
      <div className="mt-4 flex w-full flex-1 justify-center py-40">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {followingProfiles?.length > 0 && (
        <div className="mt-4 w-full divide-y divide-base-600 rounded-md border border-base-600">
          {followingProfiles?.map((profile, index) => (
            <div className="w-full p-4 hover:bg-base-600/50" key={index}>
              <div className="flex items-center space-x-4">
                <Avatar
                  href={`/${profile.displayName}`}
                  image={profile.profilePicUrl}
                />
                <Link href={`/${profile.displayName}`}>
                  <div className="flex cursor-pointer flex-col truncate">
                    <p className="whitespace-nowrap font-semibold">
                      {profile.name}
                      <span className="ml-2 font-normal text-slate-400">
                        @{profile.displayName}
                      </span>
                    </p>
                    <p className="text-sm text-slate-400">
                      {profile.currentTitle}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      {followingProfiles?.length == 0 && (
        <div className="mt-4 flex w-full flex-1 justify-center rounded-md border border-base-600 py-20">
          You are not following anyone.
        </div>
      )}
    </>
  );
};

export default Following;
