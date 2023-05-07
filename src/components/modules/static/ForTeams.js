import Image from 'next/future/image';
import Link from 'next/link';
import { isMobile } from 'react-device-detect';
import { Fade } from 'react-awesome-reveal';
import {
  images,
  ImageSample,
} from 'components/modules/static/shared/constants';
import { BsCheckSquare, BsGraphUp } from 'react-icons/bs';
import { FaAws } from 'react-icons/fa';
import { FiStar, FiTarget } from 'react-icons/fi';
import { GiTeamUpgrade } from 'react-icons/gi';
import { SiJava, SiReact, SiVisualstudiocode } from 'react-icons/si';
import {
  IoBriefcaseOutline,
  IoDocumentTextOutline,
  IoPersonAddOutline,
  IoShareSocialOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import dynamic from 'next/dynamic';

const VideoPlayerProfile = dynamic(() =>
  import('components/common/elements/mux/ProfileVideoPlayer')
);
const Faq = dynamic(() => import('components/modules/static/TeamsFaq'));
const Testimonials = dynamic(() =>
  import('components/modules/static/shared/TestimonialsSection')
);

const Page = ({ setShowSignupModal, sendSlackSignUpMessage }) => {
  const handleLearnMore = () => {
    const element = document.getElementById('learnmore');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black">
      <div className="fixed top-0 left-0 w-full mx-auto min-h-screen mt-16 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-300/20 via-black to-tfsdark-900 flex justify-between"></div>
      <div className="relative z-10 max-w-screen-xl mx-auto md:h-[70vh] lg:mt-16">
        <div className="pt-24 md:pt-32 max-w-7xl space-y-6 px-4 lg:px-0">
          <Link href="/about/our-story">
            <div className="rounded-full text-slate-300 hover:text-white bg-slate-800/40 border border-tfsdark-700 px-6 py-1 text-sm w-min whitespace-nowrap mx-auto mb-10 cursor-pointer">
              Why this matters? See our story &rarr;
            </div>
          </Link>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-200 to-yellow-200 font-intertight flex justify-center -space-y-4 text-center">
            Team Profiles.
          </h1>
          <div className="max-w-3xl mx-auto">
            <h4 className="text-center text-slate-300 font-light text-lg md:text-2xl px-4">
              The Full Stack helps your engineering team share its unique
              culture with developers looking for more than just a job.
            </h4>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="mt-20 flex justify-center items-center space-x-6">
              <button
                className="btn-primary text-xl py-3 px-6 rounded-lg"
                onClick={() => {
                  setShowSignupModal(true);
                  sendSlackSignUpMessage('GET STARTED');
                }}
              >
                Create a team profile
              </button>
              <button
                className="hidden md:block btn-secondary bg-tfsdark-900/30 bg-opacity-50 text-xl py-3 px-6 rounded-lg"
                onClick={() => handleLearnMore()}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-28" id="learnmore"></div>
      <div className="max-w-7xl text-center mx-auto relative font-intertight space-y-20 md:h-[70vh]">
        <h4 className="text-3xl font-semibold">
          Why should you have a team profile?
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-10">
          <div className="rounded-xl md:bg-tfsdark-900/50 p-6 text-left space-y-4">
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                <BsCheckSquare className="h-8 w-8 text-slate-200" />
              </div>
              <h4 className="font-semibold text-base uppercase">Context</h4>
            </div>

            <p className="text-xl text-slate-300 font-medium">
              Lots of developers are contacted about new opportunities all the
              time, but they lack context about who they will be working with,
              the dev tools, the dev process, or whether they are aligned with a
              teams mission.
            </p>
          </div>
          <div className="rounded-xl md:bg-tfsdark-900/50 p-6 text-left space-y-4">
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                <FiStar className="h-8 w-8 text-slate-200" />
              </div>
              <h4 className="font-semibold text-base uppercase">Attract</h4>
            </div>
            <p className="text-xl text-slate-300 font-medium">
              Developers come to The Full Stack to share their work, grow their
              network and connect with like-minded developers and engineering
              teams that share similar interests, tech stacks and shared values.
            </p>
          </div>

          <div className="rounded-xl md:bg-tfsdark-900/50 p-6 text-left space-y-4">
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                <BsGraphUp className="h-8 w-8 text-slate-200" />
              </div>
              <h4 className="font-semibold text-base uppercase">Efficiency</h4>
            </div>
            <p className="text-xl text-slate-300 font-medium">
              Tech hiring is becoming more social and informal. Having a team
              profile that articulates your mission and culture within a fast
              growing dev network keeps potential developers more informed about
              your team.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 md:mt-0 mb-20 md:mb-56 space-y-20 md:space-y-40">
        <div className="relative text-center space-y-4 px-4">
          <h4 className="z-20 text-3xl md:text-5xl font-bold">
            Showcase your engineering team
          </h4>
          <p className="text-slate-300 text-xl md:text-2xl">
            Don&apos;t let your team and opportunities get overlooked
          </p>
        </div>

        <div className="max-w-screen-xl mx-auto md:h-[80vh] space-y-80 pl-6 pr-4 md:px-20">
          <div className="flex flex-col-reverse md:flex-row justify-between md:space-x-20">
            <div className="relative max-w-md">
              <div className="font-intertight tracking-wide text-3xl flex flex-col space-y-10 pt-10">
                <h4 className="font-semibold text-lg uppercase text-slate-400">
                  Your mission
                </h4>
                <p>
                  Tell your <span className="text-orange-400">team story</span>{' '}
                  and mission. This is a developer platform, so talk as
                  technical as you want.{' '}
                  <span className="text-orange-400">The more in-depth</span>,
                  the better. You can talk about your team that can&apos;t be
                  replicated on other horizontal network.
                </p>
                <div className="flex items-center space-x-2 md:space-x-8">
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <FiTarget className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <GiTeamUpgrade className="h-11 w-11 text-slate-200" />
                  </div>
                </div>
              </div>
            </div>

            <Fade duration={1000} delay={200}>
              <div className="border border-orange-900/60 shadow-2xl bg-orange-500/10 shadow-orange-700/20 rounded-lg h-[60vh] md:w-[28vw]">
                <div className="h-full w-full bg-black border border-tfsdark-600 opacity-90 rounded-t-xl overflow-hidden duration-300 -ml-3 mt-3">
                  <div className="ml-4 flex items-center space-x-2 h-8 bg-tfsdark-700/20">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                  <Image
                    src="/assets/landing/forteams/screen-teams.webp"
                    className="h-full w-full object-cover object-top"
                    alt="The Full Stack"
                    width={1000}
                    height={1000}
                    layout="fill"
                  />
                </div>
              </div>
            </Fade>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto md:h-[80vh] space-y-80 pl-6 pr-4 md:px-20">
          <div className="flex flex-col-reverse md:flex-row justify-between md:space-x-20">
            <div className="relative max-w-md">
              <div className="h-[90vh] font-intertight tracking-wide text-3xl flex flex-col space-y-10 pt-10">
                <h4 className="font-semibold text-lg uppercase text-slate-400">
                  Teammates
                </h4>
                <p>
                  <span className="text-orange-400">Amplify your team</span>{' '}
                  profile by introducing your amazing team. Show potential
                  developers who they would be working with day to day. Give a{' '}
                  <span className="text-orange-400">
                    look behind the scenes
                  </span>{' '}
                  of what it&apos;s like to work on your team.
                </p>
                <div className="flex items-center -space-x-2">
                  {images.map((image, index) => (
                    <ImageSample image={image} key={index} />
                  ))}
                </div>
              </div>
            </div>

            <Fade duration={1000} delay={200}>
              <div className="border border-orange-900/60 shadow-2xl bg-orange-500/10 shadow-orange-700/20 rounded-lg h-[60vh] md:w-[28vw]">
                <div className="h-full w-full bg-black border border-tfsdark-600 opacity-90 rounded-t-xl overflow-hidden duration-300 -ml-3 mt-3">
                  <div className="ml-4 flex items-center space-x-2 h-8 bg-tfsdark-700/20">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                  <Image
                    src="/assets/landing/forteams/screen-teammates.webp"
                    className="h-full w-full object-cover object-bottom"
                    alt="The Full Stack"
                    width={1000}
                    height={1000}
                    layout="fill"
                  />
                </div>
              </div>
            </Fade>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto md:h-[80vh] space-y-80 pl-6 pr-4 md:px-20">
          <div className="flex flex-col-reverse md:flex-row justify-between md:space-x-20">
            <div className="relative max-w-md">
              <div className="font-intertight tracking-wide text-3xl flex flex-col space-y-10 pt-10">
                <h4 className="font-semibold text-lg uppercase text-slate-400">
                  Dev Tools &middot; Dev process
                </h4>
                <p>
                  Our team profile format{' '}
                  <span className="text-orange-400">makes it easy</span> to
                  answer the questions developers want to know about your team
                  or company and how{' '}
                  <span className="text-orange-400">your dev processes</span>{' '}
                  work.
                </p>
                <div className="flex items-center space-x-2 md:space-x-8">
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <SiVisualstudiocode className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <SiReact className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <SiJava className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <FaAws className="h-11 w-11 text-slate-200" />
                  </div>
                </div>
              </div>
            </div>

            <Fade duration={1000} delay={200}>
              <div className="border border-orange-900/60 shadow-2xl bg-orange-500/10 shadow-orange-700/20 rounded-lg h-[60vh] md:w-[28vw]">
                <div className="h-full w-full bg-black border border-tfsdark-600 opacity-90 rounded-t-xl overflow-hidden duration-300 -ml-3 mt-3">
                  <div className="ml-4 flex items-center space-x-2 h-8 bg-tfsdark-700/20">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                  <Image
                    src="/assets/landing/forteams/screen-tools.webp"
                    className="h-full w-full object-cover object-left"
                    alt="The Full Stack"
                    width={1000}
                    height={1000}
                    layout="fill"
                  />
                </div>
              </div>
            </Fade>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto md:h-[80vh] space-y-80 pl-6 pr-4 md:px-20">
          <div className="flex flex-col-reverse md:flex-row justify-between md:space-x-20">
            <div className="relative max-w-md">
              <div className="font-intertight tracking-wide text-3xl flex flex-col space-y-10 pt-10">
                <h4 className="font-semibold text-lg uppercase text-slate-400">
                  Free to use
                </h4>
                <p>
                  Team profiles are{' '}
                  <span className="text-orange-400">free to create</span> and
                  share. Keep your company tech brand always-on. Having a Team
                  profile will make{' '}
                  <span className="text-orange-400">initial conversations</span>{' '}
                  with developers more meaningful and efficient.
                </p>

                <div className="flex items-center space-x-2 md:space-x-8">
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <IoTimeOutline className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <IoShareSocialOutline className="h-11 w-11 text-slate-200" />
                  </div>
                </div>
              </div>
            </div>

            <Fade duration={1000} delay={200}>
              <div className="border border-orange-900/60 shadow-2xl bg-orange-500/10 shadow-orange-700/20 rounded-lg h-[60vh] md:w-[28vw]">
                <div className="h-full w-full bg-black border border-tfsdark-600 opacity-90 rounded-t-xl overflow-hidden duration-300 -ml-3 mt-3">
                  <VideoPlayerProfile
                    src={`https://stream.mux.com/wRd113AnijLQuPqnHs601NhVGO9OHGiSu18lBooF4Gfo.m3u8`}
                    controls={false}
                    muted={true}
                    autoPlay={isMobile ? false : true}
                  />
                </div>
              </div>
            </Fade>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto md:h-[80vh] space-y-80 pl-6 pr-4 md:px-20">
          <div className="flex flex-col-reverse md:flex-row justify-between md:space-x-20">
            <div className="relative max-w-md">
              <div className="font-intertight tracking-wide text-3xl flex flex-col space-y-10 pt-10">
                <h4 className="font-semibold text-lg uppercase text-slate-400">
                  Post Open roles
                </h4>
                <p>
                  <span className="text-orange-400">Looking for quality</span>{' '}
                  developers for your team? When you have a Team profile you
                  have the additional option of posting paid job listings, with
                  a pricing model that is fair.
                </p>
                <div className="flex items-center space-x-2 md:space-x-8">
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <IoBriefcaseOutline className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <IoPersonAddOutline className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <IoDocumentTextOutline className="h-11 w-11 text-slate-200" />
                  </div>
                </div>
              </div>
            </div>

            <Fade duration={1000} delay={200}>
              <div className="border border-orange-900/60 shadow-2xl bg-orange-500/10 shadow-orange-700/20 rounded-lg h-[60vh] md:w-[28vw]">
                <div className="h-full w-full bg-black border border-tfsdark-600 opacity-90 rounded-t-xl overflow-hidden duration-300 -ml-3 mt-3">
                  <div className="ml-4 flex items-center space-x-2 h-8 bg-tfsdark-700/20">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                  <Image
                    src="/assets/landing/forteams/screen-jobs.webp"
                    className="h-full w-full object-cover object-left"
                    alt="The Full Stack"
                    width={1000}
                    height={1000}
                    layout="fill"
                  />
                </div>
              </div>
            </Fade>
          </div>
        </div>

        <div className="relative text-center space-y-10">
          <h4 className="z-20 text-3xl font-bold">
            Frequently asked questions
          </h4>
          <div className="relative max-w-3xl mx-auto px-4">
            <Faq />
          </div>
        </div>

        <div className="pt-20 relative text-center space-y-10 px-4">
          <div className="relative max-w-3xl text-2xl mx-auto">
            &quot;We love what you guys stand for, we love what The Full Stack
            stands for and we are very excited to be part of the journey!&quot;
          </div>
          <div className="flex justify-center items-center space-x-4">
            <div className="h-12 w-12 bg-black rounded-full overflow-hidden">
              <Image
                src="/assets/landing/engineers/testimonial-foodcloud.webp"
                className="h-full w-full object-cover object-top"
                alt="The Full Stack"
                width={1000}
                height={1000}
                layout="fill"
              />
            </div>
            <h4 className="z-20 text-xl">FoodCloud</h4>
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <Testimonials />
      </div>
      <div className="max-w-3xl text-center mx-auto relative font-intertight space-y-6 pt-28 pb-48 px-4">
        <h4 className="text-4xl font-medium">
          Right now, there are great developers wondering if a{' '}
          <span className="text-orange-400">team like yours</span> even exists.
        </h4>

        <div className="max-w-4xl mx-auto">
          <div className="mt-10 flex justify-center items-center space-x-6">
            <button
              className="btn-primary text-xl py-3 px-6 rounded-lg"
              onClick={() => {
                setShowSignupModal(true);
                sendSlackSignUpMessage('GET STARTED');
              }}
            >
              Create a Team profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
