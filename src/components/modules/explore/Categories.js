import { useRouter } from 'next/router';
import { CategoriesFilter } from './constants';

const Categories = ({ category, setCategory }) => {
  const router = useRouter();

  return (
    <div className="no-scrollbar mt-6 flex w-auto gap-2 overflow-hidden overflow-x-scroll px-4 md:px-0">
      {CategoriesFilter.map((item, index) => (
        <button
          className={
            `cursor-pointer whitespace-nowrap rounded-lg border py-2 px-4 text-xs duration-200 sm:text-sm ` +
            (category && item.slug === category.slug
              ? `border-tfsdark-200 text-tfsdark-900 dark:border-tfsdark-100 dark:text-white`
              : ` border-transparent bg-tfsdark-100/50 text-tfsdark-400 hover:bg-tfsdark-200/30 dark:border-transparent dark:bg-tfsdark-700 dark:text-tfsdark-300 dark:hover:border-tfsdark-400 dark:hover:bg-tfsdark-700`)
          }
          key={index}
          onClick={() => {
            setCategory(item);
            router.push(`/explore/popular/${item.slug}`, undefined, {
              shallow: true,
            });
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Categories;
