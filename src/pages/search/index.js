import { withAuthUserTokenSSR } from 'next-firebase-auth';
import { getUserProfile } from 'pages/api/auth/userProfile';
import { useState } from 'react';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/Layout';
import Filters from 'components/modules/explore/Filters';
import ProjectGallery from 'components/modules/explore/ProjectGallery';
import { RangeFilter, SortFilter } from 'components/modules/explore/constants';
import { useRouter } from 'next/router';
import Icon from 'components/common/elements/Icon';

const Search = ({ user }) => {
  const router = useRouter();
  const q = router.query.q !== '' ? router.query.q : '';
  const [sort, setSort] = useState(SortFilter[1]);
  const [range, setRange] = useState(RangeFilter[3]);
  const [stack, setStack] = useState(null);
  const [category, setCategory] = useState({
    title: 'Search',
    slug: 'search',
    filter: 'search',
    sort: 'mostpopular',
    range: 900,
  });
  const [term, setTerm] = useState(q || '');
  const [query, setQuery] = useState(q || '');

  const handleSearch = (term) => {
    setQuery(term);
    router.replace({
      query: { ...router.query, q: term },
    });
  };

  // const [user, getUser] = useUserProfile();

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <>
      <Meta
        title={`${process.env.brandName} | Search showcase`}
        description="Search the Developer Showcase and get inspiration for your next project"
        keywords=""
      />

      <Layout user={user} fullWidth={true}>
        <div className="mt-10 min-h-screen space-y-10 px-8">
          <div className="mx-auto max-w-2xl px-4 md:px-0">
            <div className="flex w-full items-center rounded-lg border border-base-300 py-0 px-4 dark:border-base-700">
              <Icon name="FiSearch" className="h-6 w-6 sm:h-8 sm:w-8" />
              <input
                type="text"
                name="q"
                placeholder="Search showcase..."
                className="text-input m-0 rounded-lg border-0 bg-transparent px-2 py-2 text-lg sm:py-4 sm:px-4 sm:text-xl"
                value={term || ''}
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(term);
                  }
                }}
              />
            </div>
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
            query={query}
          />
        </div>
      </Layout>
    </>
  );
};

export default Search;

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, res, query }) => {
    const accessToken = await AuthUser.getIdToken();
    const userProfile = await getUserProfile(accessToken, AuthUser, req, res);

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
