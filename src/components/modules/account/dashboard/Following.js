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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {followingProfiles?.map((profile, index) => (
            <Link href={`/${profile.displayName}`} key={index}>
              <div className="box box-link">
                <div className="flex items-start space-x-3">
                  <Avatar
                    href={`/${profile.displayName}`}
                    image={profile.profilePicUrl}
                  />

                  <div className="flex cursor-pointer flex-col whitespace-normal">
                    <p className="whitespace-nowrap font-semibold">
                      {profile.name}
                    </p>
                    <p className="text-sm text-base-300 dark:text-base-400">
                      @{profile.displayName}
                    </p>
                    <p className="text-sm text-base-300 dark:text-base-400">
                      {profile.currentTitle}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
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
