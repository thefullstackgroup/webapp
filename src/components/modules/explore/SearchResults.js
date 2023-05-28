import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import useSWR from 'swr';
import Link from 'next/link';
import Filters from 'components/modules/explore/Filters';
import Feed from 'components/modules/explore/Feed';
import { categories } from 'components/modules/explore/constants';
import { IoAdd, IoSearchOutline } from 'react-icons/io5';
import fetcher from 'utils/fetcher';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';

const SearchResults = ({ user }) => {
  const router = useRouter();
  const myTechStack =
    user?.userSkills?.skills
      .map(({ languageName }) => languageName)
      .join(',') || null;
  const stacks = myTechStack.split(',');
  const q = router.query.q !== '' ? router.query.q : '';
  const slug = router.query.cat !== '' ? router.query.cat : '';
  const [viewType, setViewType] = useState(isMobile ? 'list' : 'grid');
  let selectedTab = categories.find((category) => category.slug === slug);
  const [term, setTerm] = useState(q || '');
  const [query, setQuery] = useState(q || '');
  const [selectedCategory, setSelectedCategory] = useState(
    selectedTab || {
      title: 'Search',
      slug: 'search',
      filter: '',
      sort: 'mostpopular',
      range: 900,
    }
  );
  const [range, setRange] = useState(900);
  const [sort, setSort] = useState('mostpopular');

  const url = `${process.env.BASEURL}/api/profile/social/following?userId=${user.userId}`;
  const { data } = useSWR(url, fetcher);
  const following =
    (data?.length && data?.map(({ followUserId }) => followUserId).join(',')) ||
    null;

  const handleSearch = (term) => {
    setSelectedCategory({
      title: 'Search',
      slug: 'search',
      filter: 'search',
      sort: 'mostpopular',
      range: 900,
    });
    setQuery(term);
    sendSlackMessage(`Ran a showcase search with the term '${term}'`);
  };

  useEffect(() => {
    if (router.query.cat !== '') {
      setTerm('');
    }
    if (router.query.q !== '') {
      setSelectedCategory({
        title: 'Search',
        slug: 'search',
        filter: 'search',
        sort: 'mostpopular',
        range: 900,
      });
      setTerm(q);
      setQuery(q);
    }
  }, [router.query.cat, router.query.q]);

  return (
    <div className="mt-0 flex w-full justify-center lg:mt-4">
      <div className="min-h-screen w-full px-0 md:ml-6 lg:ml-20 lg:max-w-full xl:ml-52 xl:px-4 2xl:ml-56 2xl:px-0">
        <div className="relative mx-auto max-w-screen-2xl">
          <Link href="/post" passHref>
            <button className="btn-primary btn-with-icon fixed bottom-20 right-0 z-50 mx-4 rounded-full px-2 text-xl font-semibold shadow-xl lg:bottom-14 lg:right-5 lg:pl-4 lg:pr-5">
              <IoAdd className="h-8 w-8" />
              <span className="hidden lg:block">Create</span>
            </button>
          </Link>
          <div className="mb-4 mt-4 space-y-4 md:mb-10 md:space-y-6 lg:mt-10 xl:py-0">
            <div className="mx-auto max-w-2xl px-4 md:px-0">
              <div className="text-input flex w-full items-center rounded-lg py-0">
                <IoSearchOutline className="h-6 w-6 sm:h-8 sm:w-8" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search showcase..."
                  className="text-input m-0 rounded-lg bg-transparent px-2 py-2 text-lg sm:py-4 sm:px-4 sm:text-xl"
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
            <div className="space-y-2 overflow-visible">
              <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-1 px-4 md:px-0">
                {stacks.map((stack, index) => (
                  <div
                    className="cursor-pointer whitespace-nowrap rounded-full border border-base-600 py-2 px-4 text-xs text-base-400 duration-200 hover:border-base-400 hover:bg-base-700 sm:text-sm"
                    onClick={() => {
                      setTerm(stack);
                      handleSearch(stack);
                    }}
                    key={index}
                  >
                    {stack}
                  </div>
                ))}
              </div>
              {/* <DiscoverFeed user={user} sort="newest" range="" search={true} /> */}

              <div className="grid grid-cols-1">
                <div className="flex items-center justify-between space-x-4 px-4 md:px-0">
                  <h4 className="text-xl font-semibold capitalize text-base-100 md:text-2xl">
                    {selectedCategory.filter === 'search' &&
                      query !== '' &&
                      query}
                    {selectedCategory.filter !== 'search' &&
                      selectedCategory.title}
                  </h4>
                </div>

                <Filters
                  range={range}
                  setRange={setRange}
                  sort={sort}
                  setSort={setSort}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  viewType={viewType}
                  setViewType={setViewType}
                  hideCategories={true}
                />
              </div>
            </div>
            {selectedCategory && range && (
              <Feed
                user={user}
                range={range || 30}
                sort={sort || 'mostpopular'}
                category={selectedCategory}
                following={following}
                viewType={viewType}
                query={query}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
