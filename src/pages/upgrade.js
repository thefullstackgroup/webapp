import { FaPizzaSlice } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { IoBeerOutline } from 'react-icons/io5';

const Upgrade = () => {
  return (
    <div className="h-screen">
      <div className="w-full h-full flex justify-center">
        <div className="flex flex-col m-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-10 mb-4">
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
              className="w-72 mx-auto text-center block px-12 py-4 text-lg font-semibold rounded-md duration-200 text-white bg-stone-900 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600"
            >
              Back home &rarr;
            </a>
          </p>
          <p className="hidden mt-12 mb-8 md:flex flex-row justify-center items-center">
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
