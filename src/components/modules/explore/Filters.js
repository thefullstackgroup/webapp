import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import { StackFilter, RangeFilter, SortFilter } from './constants';
import StackPopoverPanel from 'components/modules/explore/StackPopoverPanel';
import FilterPopoverPanel from './FilterPopoverPanel';

const Filters = ({ range, setRange, stack, setStack, sort, setSort }) => {
  return (
    <div className="flex items-center justify-between space-x-4">
      {/* {category && (
            <FilterPopoverPanel
              filters={CategoriesFilter}
              filter={category}
              setFilter={setCategory}
            />
          )} */}

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
      {stack && (
        <StackPopoverPanel
          item={StackFilter}
          stacks={StackFilter.stacks}
          stack={stack}
          setStack={setStack}
        />
      )}
    </div>
  );
};

export default Filters;
