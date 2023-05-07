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
          <div className="mt-4 md:mt-12 flex pb-80 pt-40">
            <div className="w-full max-w-2xl lg:max-w-3xl overflow-hidden mx-auto">
              <div className="rounded-lg bg-tfsdark-700 mb-4 px-4 sm:px-6 py-4 mx-4 md:mx-0">
                <div className="sm:items-center flex flex-col sm:flex-row justify-center">
                  <div className="flex items-center space-x-4 justify-center">
                    <MdOutlineMarkEmailRead className="h-16 w-16 text-gray-300" />
                    <div className="flex flex-col">
                      <div className="space-x-1  text-xl font-bold text-gray-200 sm:text-xl tracking-tight lg:text-2xl">
                        Email Verification
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-tfsdark-600 mt-4 pt-4 sm:flex items-start justify-center">
                  <IoInformationCircleOutline className="hidden sm:block h-7 w-7 mr-2" />
                  <p className="text-base">{verifyMsg}</p>
                </div>
                <div className="sm:items-center flex flex-col sm:flex-row justify-center pt-10">
                  <Link href={`${process.env.BASEURL}/`} passHref>
                    <a
                      href="#"
                      className="content-center justify-center font-bold w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-md text-white border border-transparent bg-tfssecondary-500 hover:bg-tfssecondary-600"
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
