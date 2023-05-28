import axios from 'axios';
import { FaHeart, FaRegSadTear } from 'react-icons/fa';
import Meta from 'components/common/partials/Metadata';
import Profile from 'components/modules/profile/public/Main';
import Link from 'next/link';
import LayoutLoggedOut from 'components/common/layout/LayoutLoggedOut';

const UserNotFound = () => {
  return (
    <div className="w-full pb-20">
      <div className="mb-28 flex w-auto flex-col space-y-4 px-8 text-center">
        <h2 className="mt-40 text-2xl font-bold tracking-tight lg:text-5xl">
          Oops! User not found.
        </h2>
        <p className="text-base text-slate-400 lg:text-lg">
          Sorry, this user may have moved their profile under a different name.
        </p>
        <FaRegSadTear className="my-20 h-28 w-auto text-slate-400" />
        <p className="text-lg text-slate-400">
          <Link href="/">
            <button className="btn-primary mt-10">Back to home</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

const UserProfile = ({ userProfile, projects }) => {
  return (
    <>
      {!userProfile && (
        <LayoutLoggedOut>
          <UserNotFound />
        </LayoutLoggedOut>
      )}

      {userProfile && (
        <>
          <Meta
            title={`${userProfile.name} | ${userProfile.currentTitle} | ${process.env.brandName}`}
            description={`${userProfile.name} | ${userProfile.currentTitle} | ${process.env.brandName} on thefullstack`}
            keywords=""
          />
          <main className="w-full bg-base-700">
            <div className="relative mx-auto mt-36 flex w-full max-w-screen-lg md:mt-48">
              <Profile profile={userProfile} projects={projects} />
            </div>
          </main>
          <div className="my-10 flex flex-col items-center justify-center space-x-1 px-4 text-center text-xs text-slate-400 md:flex-row">
            <span>
              {userProfile.name}&apos;s profile made with{' '}
              <FaHeart className="inline-flex h-4 w-auto text-red-500" /> on{' '}
              <a
                href={process.env.BASEURL}
                className="hover:text-primary-500 font-semibold text-white"
              >
                thefullstack
              </a>
              .
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;

export async function getServerSideProps(context) {
  const userProfile = await axios
    .get(
      `${process.env.API_PROFILE_URL}/profile/user/${encodeURIComponent(
        context.params.userId
      )}`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error?.response.status;
    });

  if (userProfile.data != undefined) {
    const posts = await axios.get(
      `${
        process.env.API_PROJECTS_URL
      }/projects/user?displayName=${encodeURIComponent(
        context.params.userId
      )}&projectType=PROJECT&page=0&size=10`
    );

    if (userProfile?.data != undefined) {
      return {
        props: {
          userProfile: userProfile.data,
          projects: posts.data.content,
        },
      };
    }
  }

  return {
    props: {
      userProfile: null,
      projects: null,
    },
  };
}
