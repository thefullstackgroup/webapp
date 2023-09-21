import { FaPizzaSlice } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { IoBeerOutline } from 'react-icons/io5';

const Upgrade = () => {
  return (
    <div className="h-screen">
      <div className="flex h-full w-full justify-center">
        <div className="m-auto flex max-w-3xl flex-col px-4 text-center">
          <h2 className="mt-10 mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            You caught us doing work!
          </h2>
          <p className="text-2xl text-gray-700 dark:text-gray-200">
            We{"'"}re so sorry, we{"'"}re in the process of doing a major
            upgrade and we had to take the site offline for just a small bit
            (just now)!! Be back very soon. In the meantime, why don&apos;t you
            go grab a beer, have a slice (on us), then come back later and we
            {"'"}ll be ready.
          </p>
          <p className="my-10">
            <a
              href={`${process.env.BASEURL}/`}
              className="mx-auto block w-72 rounded-md bg-stone-900 px-12 py-4 text-center text-lg font-semibold text-white duration-200 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Back home &rarr;
            </a>
          </p>
          <p className="mt-12 mb-8 hidden flex-row items-center justify-center md:flex">
            <IoBeerOutline className="h-48 w-auto text-gray-700 dark:text-gray-400" />
            <FiPlus className="h-20 w-auto text-gray-700 dark:text-gray-400" />
            <FaPizzaSlice className="h-48 w-auto text-gray-700 dark:text-gray-400" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
