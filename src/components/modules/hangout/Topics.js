import Icon from 'components/common/elements/Icon';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { topics } from './constants';

const Topics = ({ topic }) => {
  const router = useRouter();

  return (
    <div className="sticky top-20 rounded-md px-6 pt-4">
      <div className="mb-4 flex items-center space-x-2">
        <span className="text-lg font-semibold">Filter by #topic</span>
      </div>

      <div className="grid w-48 grid-cols-1 gap-1">
        {topics.map((item, index) => (
          <Link href={`/hangout/${item.slug}`} passHref key={index}>
            <a
              href="#"
              className={
                'btn btn-with-icon whitespace-nowrap bg-transparent dark:bg-transparent ' +
                (topic === item.slug ? 'btn-pill-active' : 'btn-pill')
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
