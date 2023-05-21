import { useRouter } from 'next/router';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import { StackFilter, RangeFilter, SortFilter } from './constants';
import StackPopoverPanel from 'components/modules/explore/StackPopoverPanel';
import FilterPopoverPanel from './FilterPopoverPanel';

const Filters = ({ range, setRange, stack, setStack, sort, setSort }) => {
  return (
    <div className="">
      {/* <div className="no-scrollbar mt-4 flex w-auto gap-2 overflow-hidden overflow-x-scroll px-4 md:px-0">
          {categories.map((category, index) => (
            <button
              className={
                `whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium sm:px-4 sm:py-2 ` +
                (category.slug === selectedCategory?.slug
                  ? `bg-tfsdark-500/70 text-white`
                  : `bg-tfsdark-700/70 text-slate-400 hover:bg-tfsdark-700 hover:text-white`)
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
        </div> */}

      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <FilterPopoverPanel
            filters={SortFilter}
            filter={sort}
            setFilter={setSort}
          />
          <FilterPopoverPanel
            filters={RangeFilter}
            filter={range}
            setFilter={setRange}
          />
          {/* <select
            className="text-input"
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
          </select> */}

          {/* <select
            className="text-input"
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
          </select> */}
        </div>
        <div>
          <StackPopoverPanel
            item={StackFilter}
            stacks={StackFilter.stacks}
            stack={stack}
            setStack={setStack}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
