import { withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import { useState } from 'react';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import { RangeFilter, SortFilter } from 'components/modules/explore/constants';
import Filters from 'components/modules/explore/Filters';
import ProjectGallery from 'components/modules/explore/ProjectGallery';
import Categories from 'components/modules/explore/Categories';

const ExploreNew = ({ user }) => {
  const [sort, setSort] = useState(SortFilter[0]);
  const [range, setRange] = useState(RangeFilter[1]);
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
        <div className="min-h-screen space-y-10 px-8">
          <Categories
            category={category}
            setCategory={setCategory}
            enableState={false}
          />
          <div className="mt-10 space-y-2 text-center">
            <h2 className="font-manrope text-5xl font-bold tracking-tight">
              Latest projects
            </h2>
            <h4 className="mx-auto max-w-2xl text-xl font-normal tracking-tight text-gray-400 dark:text-gray-400">
              Discover awesome projects from the developer showcase
            </h4>
          </div>

          <Filters
            range={range}
            setRange={setRange}
            stack={stack}
            setStack={setStack}
            sort={sort}
            setSort={setSort}
          />
          <ProjectGallery
            sort={sort.orderBy}
            range={range.days}
            stack={stack}
            category={category}
            setCategory={setCategory}
          />
        </div>
      </Layout>
    </>
  );
};

export default ExploreNew;

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
