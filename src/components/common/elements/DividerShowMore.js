import Link from 'next/link';
import Icon from './Icon';

const DividerShowMore = ({ label, href }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-base-200 dark:border-base-700" />
      </div>
      <div className="relative flex justify-center">
        <Link href={href} passHref>
          <a
            href="#"
            className="btn btn-sm btn-with-icon btn-secondary space-x-1 rounded-full border-base-200 py-1 text-xs hover:bg-base-100 dark:border-transparent dark:bg-base-900"
          >
            <span>{label || 'Show more'}</span>
            <Icon name={'FiChevronRight'} className="h-4 w-4" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default DividerShowMore;
