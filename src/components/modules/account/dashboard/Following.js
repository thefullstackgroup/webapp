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
      <div className="mt-4 w-full flex flex-1 justify-center py-40">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {followingProfiles?.length > 0 && (
        <div className="mt-4 w-full divide-y divide-tfsdark-600 rounded-md border border-tfsdark-600">
          {followingProfiles?.map((profile, index) => (
            <div className="w-full p-4 hover:bg-tfsdark-600/50" key={index}>
              <div className="flex items-center space-x-4">
                <Avatar
                  href={`/${profile.displayName}`}
                  image={profile.profilePicUrl}
                />
                <Link href={`/${profile.displayName}`}>
                  <div className="flex flex-col cursor-pointer truncate">
                    <p className="font-semibold whitespace-nowrap">
                      {profile.name}
                      <span className="text-slate-400 ml-2 font-normal">
                        @{profile.displayName}
                      </span>
                    </p>
                    <p className="text-slate-400 text-sm">
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
        <div className="mt-4 w-full rounded-md border border-tfsdark-600 flex flex-1 justify-center py-20">
          You are not following anyone.
        </div>
      )}
    </>
  );
};

export default Following;
