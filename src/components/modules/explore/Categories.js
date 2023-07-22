import { useRouter } from 'next/router';
import { CategoriesFilter } from './constants';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';

const Categories = ({ category, setCategory, enableState = true }) => {
  const router = useRouter();

  return (
    <div className="no-scrollbar mx-auto flex w-auto max-w-fit gap-2 overflow-hidden overflow-x-scroll pt-6">
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
            sendSlackMessage(
              `Clicked the category ${item.label} on the explore page`
            );
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Categories;
