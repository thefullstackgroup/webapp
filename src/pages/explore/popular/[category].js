import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useUserProfile from 'hooks/useUserProfile';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import {
  CategoriesFilter,
  RangeFilter,
  SortFilter,
} from 'components/modules/explore/constants';
import Filters from 'components/modules/explore/Filters';
import ProjectGallery from 'components/modules/explore/ProjectGallery';

const ExploreCategory = ({ cat }) => {
  const router = useRouter();
  const categorySelected = CategoriesFilter.find(
    (category) => category.value === cat
  );

  const [user, getUser] = useUserProfile();
  const [sort, setSort] = useState(SortFilter[0]);
  const [range, setRange] = useState(RangeFilter[2]);
  const [category, setCategory] = useState(categorySelected || null);
  const [stack, setStack] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (cat) setCategory(categorySelected);
  }, [cat]);

  return (
    <>
      <Meta
        title={`${process.env.brandName} | Showcase`}
        description="Explore the Developer Showcase and get inspiration for your next project"
        keywords=""
      />

      {user && (
        <Layout user={user}>
          <div className="min-h-screen">
            <div className="space-y-10 bg-gray-800 py-20">
              <div className="no-scrollbar mt-4 flex w-auto gap-2 overflow-hidden overflow-x-scroll px-4 md:px-0">
                {CategoriesFilter.map((category, index) => (
                  <button
                    className={
                      `whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium sm:px-4 sm:py-2 ` +
                      (category.value === categorySelected?.value
                        ? `bg-gray-100 text-gray-900`
                        : `bg-tfsdark-700/70 text-slate-400 hover:bg-tfsdark-700 hover:text-white`)
                    }
                    key={index}
                    onClick={() => {
                      setCategory(category);
                      router.push(
                        `/explore/popular/${category.value}`,
                        undefined,
                        {
                          shallow: true,
                        }
                      );
                    }}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              <div className="space-y-2 py-10 text-center">
                <h2 className="text-5xl font-bold tracking-tight">
                  {category.label} projects
                </h2>
                <h4 className="mx-auto max-w-2xl text-xl font-normal tracking-tight text-gray-400 dark:text-gray-400">
                  Discover awesome projects from the developer showcase
                </h4>
              </div>
            </div>
            <div className="relative space-y-8">
              <Filters
                range={range}
                setRange={setRange}
                stack={stack}
                setStack={setStack}
                sort={sort}
                setSort={setSort}
                category={category}
                setCategory={setCategory}
              />
              <ProjectGallery
                sort={sort.value}
                range={range.value}
                category={category.value}
                stack={stack}
              />
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default withAuthUser()(ExploreCategory);

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
      props: { cat: query.category },
    };
  }
);
