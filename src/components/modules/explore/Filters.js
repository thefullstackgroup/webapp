import { useRouter } from 'next/router';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import { IoGridOutline, IoListOutline } from 'react-icons/io5';
import { categories, rangeFilter, sortFilter } from './constants';

const Filters = ({
  range,
  setRange,
  sort,
  setSort,
  selectedCategory,
  setSelectedCategory,
  viewType,
  setViewType,
  hideCategories = false,
  hideFilters = false,
}) => {
  const router = useRouter();

  const setFilter = () => {
    setSelectedCategory({
      title: selectedCategory.title,
      slug: selectedCategory.slug,
      filter: selectedCategory.filter,
      sort: sort,
      range: range,
    });
  };
  return (
    <div className="mb-4">
      {!hideCategories && (
        <div className="mt-4 flex overflow-hidden overflow-x-scroll no-scrollbar w-auto gap-2 px-4 md:px-0">
          {categories.map((category, index) => (
            <button
              className={
                `text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg whitespace-nowrap font-medium ` +
                (category.slug === selectedCategory?.slug
                  ? `bg-tfsdark-500/70 text-white`
                  : `bg-tfsdark-700/70 text-slate-400 hover:text-white hover:bg-tfsdark-700`)
              }
              key={index}
              onClick={() => {
                setSelectedCategory(category);
                setSort(category.sort);
                setRange(category.range);
                router.push(
                  `${router.pathname}?cat=${category.slug}`,
                  undefined,
                  {
                    shallow: true,
                  }
                );
                sendSlackMessage(
                  `Selected the category '${category.title}' on the showcase`
                );
              }}
            >
              {category.title}
            </button>
          ))}
        </div>
      )}

      {!hideFilters && (
        <div className="mt-4 flex items-center sm:justify-between space-x-4 text-tfsdark-300 px-4 sm:px-0 mb-2 sm:mb-0">
          <div className="flex items-center space-x-4">
            <div className="text-xs text-slate-200">Filter by:</div>
            <div className="flex items-center justify-between space-x-4 text-tfsdark-300 w-full sm:w-auto">
              <select
                className="text-input bg-transparent ring-2 focus:ring-2 ring-tfsdark-700 focus:ring-tfsdark-700 text-sm py-1.5 w-1/2 sm:w-40"
                onChange={(e) => {
                  setRange(e.target.value);
                  setFilter(e.target.value);
                  sendSlackMessage(
                    `Set a filter on showcase with a timeframe range of ${e.target.value} days`
                  );
                }}
              >
                {rangeFilter.map((filter, index) =>
                  filter.value == range ? (
                    <option value={filter.value} key={index} selected>
                      {filter.label}
                    </option>
                  ) : (
                    <option value={filter.value} key={index}>
                      {filter.label}
                    </option>
                  )
                )}
              </select>

              <select
                className="text-input bg-transparent ring-2 focus:ring-2 ring-tfsdark-700 focus:ring-tfsdark-700 text-sm py-1.5 w-1/2 sm:w-32"
                onChange={(e) => {
                  setSort(e.target.value);
                  setFilter(e.target.value);
                  sendSlackMessage(
                    `Set a filter on showcase with a sort order of ${e.target.value}`
                  );
                }}
              >
                {sortFilter.map((filter, index) =>
                  filter.value == sort ? (
                    <option value={filter.value} key={index} selected>
                      {filter.label}
                    </option>
                  ) : (
                    <option value={filter.value} key={index}>
                      {filter.label}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <span className="hidden sm:block text-xs text-slate-200 whitespace-nowrap">
              Change layout
            </span>
            <button
              onClick={() => {
                setViewType('grid');
                sendSlackMessage('Changed showcase layout to grid view');
              }}
            >
              <IoGridOutline
                className={'w-5 h-5 ' + (viewType === 'grid' && 'text-white')}
              />
            </button>
            <button
              onClick={() => {
                setViewType('list');
                sendSlackMessage('Changed showcase layout to list view');
              }}
            >
              <IoListOutline
                className={'w-7 h-7 ' + (viewType === 'list' && 'text-white')}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
