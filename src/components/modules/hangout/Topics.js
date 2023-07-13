import Icon from 'components/common/elements/Icon';
import Link from 'next/link';
import { topics } from './constants';

const Topics = ({ topic }) => {
  return (
    <div className="rounded-md px-6 pt-4">
      <div className="mb-4 flex items-end space-x-2">
        <span className="font-mono text-lg font-medium">Filter by</span>
        <Icon name="FiCornerRightDown" />
      </div>

      <div className="sm:w-40 lg:w-56">
        <Link href={`/hangout`} passHref>
          <a
            href="#"
            className={
              'btn btn-with-icon btn-pill whitespace-nowrap bg-transparent ' +
              (!topic
                ? 'bg-base-300/20 text-base-900 hover:bg-base-300/20 dark:bg-base-800 dark:text-base-50 dark:hover:bg-base-800'
                : 'text-base-500 dark:bg-transparent dark:text-base-400 dark:hover:text-base-200')
            }
          >
            <Icon name="FiHash" />
            <span className="relative">All topics</span>
          </a>
        </Link>
        {topics.map((item, index) => (
          <Link href={`/hangout/${item.slug}`} passHref key={index}>
            <a
              href="#"
              className={
                'btn btn-with-icon btn-pill whitespace-nowrap bg-transparent  ' +
                (topic === item.slug
                  ? 'bg-base-300/20 text-base-900 hover:bg-base-300/20 dark:bg-base-800 dark:text-base-50 dark:hover:bg-base-800'
                  : 'text-base-500 dark:bg-transparent dark:text-base-400 dark:hover:text-base-200')
              }
            >
              <Icon name={`${item.icon}`} />
              <span className="relative">{item.label}</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topics;
