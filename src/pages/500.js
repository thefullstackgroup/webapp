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
    <div className="h-screen">
      <div className="w-full h-full flex justify-center">
        <div className="flex flex-col m-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-10 mb-4">
            Internal Server Error
          </h2>
          <p className="text-2xl text-slate-200">
            It looks like someone forgot to write a unit test and instead you
            got served this lame error page. We&apos;re truly sorry. Why
            don&apos;t you go grab a beer, have a slice (on us), then try
            refreshing the page or click the button below.
          </p>
          <p className="my-10">
            <a href={`${process.env.BASEURL}/`} className="btn-primary">
              Lets try this again &rarr;
            </a>
          </p>
          <p className="hidden mt-12 mb-8 md:flex flex-row justify-center items-center">
            <IoBeerOutline className="h-48 w-auto text-gray-400" />
            <FiPlus className="h-20 w-auto text-gray-400" />
            <FaPizzaSlice className="h-48 w-auto text-gray-400" />
          </p>
          <p className="text-xl text-gray-400 italic">
            Sorry we&apos;ll do better next time
          </p>
        </div>
      </div>
    </div>
  );
};

export default FiveZeroZero;
