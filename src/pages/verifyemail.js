import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from 'components/common/layout/LayoutLoggedIn';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import Meta from 'components/common/partials/Metadata';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import { firebase } from 'firebase/firebaseApp';

const VerifyEmail = () => {
  const [verifyMsg, setVerifyMsg] = useState(
    'Verifing your email address. Just one tick...'
  );

  var router = useRouter();

  useEffect(() => {
    if (router.query['oobCode'] && router.query['mode'] == 'verifyEmail') {
      firebase
        .auth()
        .applyActionCode(router.query['oobCode'])
        .then((resp) => {
          setVerifyMsg(`Thanks for verifying your email address. Let's go`);
        })
        .catch((error) => {
          setVerifyMsg(
            'Your request to verify your email has expired or the link has already been used. Please try again.'
          );
        });
      sendSlackMessage(`Verify Email Page: Someone verifed their email`);
    }
  }, [router.query]);

  return (
    <>
      <Meta
        title="thefullstack | Verify Your Email Address"
        description="A place for developers to share projects and grow a
        network that gets you hired direct with tech employers."
        keywords="developer, social network, developers, software engineering, full stack, software engineering network, tech community, tech companies, best tech companies, developer portfolio, developer network, professional network, professional community"
      />
      <Layout>
        <div className="">
          <div className="mt-4 flex pb-80 pt-40 md:mt-12">
            <div className="mx-auto w-full max-w-2xl overflow-hidden lg:max-w-3xl">
              <div className="mx-4 mb-4 rounded-lg bg-base-700 px-4 py-4 sm:px-6 md:mx-0">
                <div className="flex flex-col justify-center sm:flex-row sm:items-center">
                  <div className="flex items-center justify-center space-x-4">
                    <MdOutlineMarkEmailRead className="h-16 w-16 text-gray-300" />
                    <div className="flex flex-col">
                      <div className="space-x-1  text-xl font-bold tracking-tight text-gray-200 sm:text-xl lg:text-2xl">
                        Email Verification
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 items-start justify-center border-t border-base-600 pt-4 sm:flex">
                  <IoInformationCircleOutline className="mr-2 hidden h-7 w-7 sm:block" />
                  <p className="text-base">{verifyMsg}</p>
                </div>
                <div className="flex flex-col justify-center pt-10 sm:flex-row sm:items-center">
                  <Link href={`${process.env.BASEURL}/`} passHref>
                    <a
                      href="#"
                      className="bg-tfssecondary-500 hover:bg-tfssecondary-600 w-auto content-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-bold text-white sm:px-8 sm:py-4 sm:text-lg"
                    >
                      Go Back&rarr;
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default VerifyEmail;
