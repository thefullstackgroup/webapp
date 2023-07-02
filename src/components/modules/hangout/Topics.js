import Icon from 'components/common/elements/Icon';
import Link from 'next/link';
import { topics } from './constants';

const Topics = ({ topic }) => {
  return (
    <div className="rounded-md px-6 pt-4">
      <div className="mb-4 flex items-end space-x-2">
        <span className="pl-4 font-mono text-lg font-medium">Filter</span>
        <Icon name="FiCornerRightDown" />
      </div>

      <div className="grid w-56 grid-cols-1 gap-1">
        <Link href={`/hangout`} passHref>
          <a
            href="#"
            className={
              'btn btn-with-icon btn-pill whitespace-nowrap bg-transparent text-base dark:bg-transparent ' +
              (!topic
                ? 'text-base-900 dark:text-base-50'
                : 'text-base-500 dark:text-base-400 dark:hover:text-base-200')
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
                'btn btn-with-icon btn-pill whitespace-nowrap bg-transparent text-base dark:bg-transparent  ' +
                (topic === item.slug
                  ? 'text-base-900 dark:text-base-50'
                  : 'text-base-500 dark:text-base-400 dark:hover:text-base-200')
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
