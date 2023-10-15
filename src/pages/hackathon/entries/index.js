import { withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import { useState } from 'react';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import { RangeFilter, SortFilter } from 'components/modules/explore/constants';
import HackathonProjectGallery from 'components/modules/explore/HackathonProjectGallery';
import Link from 'next/link';

const ExplorePopular = ({ user }) => {
  const [sort, setSort] = useState(SortFilter[1]);
  const [range, setRange] = useState(RangeFilter[2]);
  const [stack, setStack] = useState(null);
  const [category, setCategory] = useState(null);

  return (
    <>
      <Meta
        title={`${process.env.brandName} | Showcase`}
        description="Explore the Developer Showcase and get inspiration for your next project"
        keywords=""
      />

      <Layout user={user} fullWidth={true} headerAutoHide={true}>
        <div className="min-h-screen space-y-10 px-4 xl:px-8">
          {/* <Categories
            category={category}
            setCategory={setCategory}
            enableState={false}
          /> */}
          <div className="mt-10 space-y-2 text-center">
            <h2 className="font-manrope text-4xl font-bold tracking-tight xl:text-5xl">
              The Full Stack Hackathon
            </h2>
            <h4 className="mx-auto max-w-4xl text-base font-normal tracking-tight text-gray-400 dark:text-gray-400 xl:text-xl">
              The project with the highest number of votes will be the winner.
              And the projects with second and third highest votes will be
              deemed the runners up.{' '}
              <Link href="/hackathon/competition1" passHref>
                <a href="#" className="text-link">
                  Click here to view prizes and more &rarr;
                </a>
              </Link>
            </h4>
          </div>

          <HackathonProjectGallery />
        </div>
      </Layout>
    </>
  );
};

export default ExplorePopular;

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res, query }) => {
    const accessToken = await AuthUser.getIdToken();

    // Careful - this gets a profile BUT will add a profile if does not already exist.
    const userProfile = await getUserProfile(
      accessToken,
      AuthUser,
      req,
      res,
      false //TRUE only used on this page
    );

    if (userProfile?.redirect) {
      return {
        redirect: {
          destination: userProfile.redirect,
          permanent: false,
        },
      };
    }

    return {
      props: { user: userProfile || null },
    };
  }
);
