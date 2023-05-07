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
    <div className="mt-0 lg:mt-4 w-full flex justify-center">
      <div className="min-h-screen w-full lg:max-w-full px-0 xl:px-4 2xl:px-0 md:ml-6 lg:ml-20 xl:ml-52 2xl:ml-56">
        <div className="relative max-w-screen-2xl mx-auto">
          <Link href="/post" passHref>
            <button className="fixed bottom-20 right-0 lg:bottom-14 z-50 lg:right-5 btn-primary btn-with-icon mx-4 text-xl px-2 lg:pl-4 lg:pr-5 rounded-full shadow-xl font-semibold">
              <IoAdd className="h-8 w-8" />
              <span className="hidden lg:block">Create</span>
            </button>
          </Link>
          <div className="xl:py-0 mb-4 md:mb-10 space-y-4 md:space-y-6 mt-4 lg:mt-10">
            <div className="max-w-2xl mx-auto px-4 md:px-0">
              <div className="flex text-input rounded-lg w-full py-0 items-center">
                <IoSearchOutline className="h-6 w-6 sm:h-8 sm:w-8" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search showcase..."
                  className="text-input bg-transparent text-lg sm:text-xl rounded-lg px-2 py-2 sm:py-4 sm:px-4 m-0"
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
              <div className="flex flex-wrap justify-center max-w-4xl mx-auto px-4 md:px-0 gap-1">
                {stacks.map((stack, index) => (
                  <div
                    className="border border-tfsdark-600 hover:border-tfsdark-400 text-slate-400 whitespace-nowrap text-xs sm:text-sm py-2 px-4 rounded-full hover:bg-tfsdark-700 duration-200 cursor-pointer"
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
                <div className="px-4 md:px-0 flex items-center space-x-4 justify-between">
                  <h4 className="text-xl md:text-2xl text-slate-100 font-semibold capitalize">
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
