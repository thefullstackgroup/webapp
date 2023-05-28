import { useRouter } from 'next/router';
import { CategoriesFilter } from './constants';

const Categories = ({ category, setCategory, enableState = true }) => {
  const router = useRouter();

  return (
    <div className="no-scrollbar mt-6 flex w-auto gap-2 overflow-hidden overflow-x-scroll">
      {CategoriesFilter.map((item, index) => (
        <button
          className={
            category && item.slug === category.slug
              ? `btn-pill-active`
              : `btn-pill`
          }
          key={index}
          onClick={() => {
            enableState && setCategory(item);
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
