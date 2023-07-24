import { useEffect } from 'react';
import { FaPizzaSlice } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { IoBeerOutline } from 'react-icons/io5';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import { useRouter } from 'next/router';

const FiveZeroZero = () => {
  const router = useRouter();

  useEffect(() => {
    sendSlackMessage(
      `500 ERROR - 500 error page on the frontend was triggered \nReferrer path ${router.asPath}`
    );
  }, []);
  return (
    <div className="h-screen bg-base-50 dark:bg-base-900">
      <div className="flex h-full w-full justify-center">
        <div className="m-auto flex max-w-3xl flex-col px-4 text-center">
          <h2 className="mt-10 mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Internal Server Error
          </h2>
          <p className="text-2xl text-base-200">
            It looks like someone forgot to write a unit test and instead you
            got served this lame error page. We&apos;re truly sorry. Why
            don&apos;t you go grab a beer, have a slice (on us), then try
            refreshing the page or click the button below.
          </p>
          <p className="my-10">
            <a href={`${process.env.BASEURL}/`} className="btn btn-primary">
              Lets try this again &rarr;
            </a>
          </p>
          <p className="mt-12 mb-8 hidden flex-row items-center justify-center md:flex">
            <IoBeerOutline className="h-48 w-auto text-gray-400" />
            <FiPlus className="h-20 w-auto text-gray-400" />
            <FaPizzaSlice className="h-48 w-auto text-gray-400" />
          </p>
          <p className="text-xl italic text-gray-400">
            Sorry we&apos;ll do better next time
          </p>
        </div>
      </div>
    </div>
  );
};

export default FiveZeroZero;
