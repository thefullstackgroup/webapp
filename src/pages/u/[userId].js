import axios from 'axios';
import { FaHeart, FaRegSadTear } from 'react-icons/fa';
import Meta from 'components/common/partials/Metadata';
import Profile from 'components/modules/profile/public/Main';
import Link from 'next/link';
import LayoutLoggedOut from 'components/common/layout/LayoutLoggedOut';

const UserNotFound = () => {
  return (
    <div className="w-full pb-20">
      <div className="flex flex-col w-auto text-center space-y-4 mb-28 px-8">
        <h2 className="text-2xl lg:text-5xl font-bold tracking-tight mt-40">
          Oops! User not found.
        </h2>
        <p className="text-base lg:text-lg text-slate-400">
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
          <main className="w-full bg-tfsdark-700">
            <div className="w-full max-w-screen-lg mx-auto relative mt-36 md:mt-48 flex">
              <Profile profile={userProfile} projects={projects} />
            </div>
          </main>
          <div className="flex flex-col md:flex-row justify-center text-center items-center space-x-1 text-xs my-10 text-slate-400 px-4">
            <span>
              {userProfile.name}&apos;s profile made with{' '}
              <FaHeart className="inline-flex h-4 w-auto text-red-500" /> on{' '}
              <a
                href={process.env.BASEURL}
                className="font-semibold text-white hover:text-primary-500"
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
