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
      <div className="fixed top-0 left-0 mx-auto mt-16 flex min-h-screen w-full justify-between bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-300/20 via-black to-tfsdark-900"></div>
      <div className="relative z-10 mx-auto max-w-screen-xl md:h-[70vh] lg:mt-16">
        <div className="max-w-7xl space-y-6 px-4 pt-24 md:pt-32 lg:px-0">
          <Link href="/about/our-story">
            <div className="mx-auto mb-10 w-min cursor-pointer whitespace-nowrap rounded-full border border-tfsdark-700 bg-slate-800/40 px-6 py-1 text-sm text-slate-300 hover:text-white">
              Why this matters? See our story &rarr;
            </div>
          </Link>
          <h1 className="flex justify-center -space-y-4 bg-gradient-to-r from-orange-600 via-orange-200 to-yellow-200 bg-clip-text text-center font-intertight text-6xl font-bold tracking-tight text-transparent md:text-9xl">
            Team Profiles.
          </h1>
          <div className="mx-auto max-w-3xl">
            <h4 className="px-4 text-center text-lg font-light text-slate-300 md:text-2xl">
              The Full Stack helps your engineering team share its unique
              culture with developers looking for more than just a job.
            </h4>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="mt-20 flex items-center justify-center space-x-6">
              <button
                className="btn-primary rounded-lg py-3 px-6 text-xl"
                onClick={() => {
                  setShowSignupModal(true);
                  sendSlackSignUpMessage('GET STARTED');
                }}
              >
                Create a team profile
              </button>
              <button
                className="btn-secondary hidden rounded-lg bg-tfsdark-900/30 bg-opacity-50 py-3 px-6 text-xl md:block"
                onClick={() => handleLearnMore()}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-28" id="learnmore"></div>
      <div className="relative mx-auto max-w-7xl space-y-20 text-center font-intertight md:h-[70vh]">
        <h4 className="text-3xl font-semibold">
          Why should you have a team profile?
        </h4>

        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-3">
          <div className="space-y-4 rounded-xl p-6 text-left md:bg-tfsdark-900/50">
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex w-min space-x-2 rounded-xl bg-slate-500/20 px-4 py-3 text-base">
                <BsCheckSquare className="h-8 w-8 text-slate-200" />
              </div>
              <h4 className="text-base font-semibold uppercase">Context</h4>
            </div>

            <p className="text-xl font-medium text-slate-300">
              Lots of developers are contacted about new opportunities all the
              time, but they lack context about who they will be working with,
              the dev tools, the dev process, or whether they are aligned with a
              teams mission.
            </p>
          </div>
          <div className="space-y-4 rounded-xl p-6 text-left md:bg-tfsdark-900/50">
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex w-min space-x-2 rounded-xl bg-slate-500/20 px-4 py-3 text-base">
                <FiStar className="h-8 w-8 text-slate-200" />
              </div>
              <h4 className="text-base font-semibold uppercase">Attract</h4>
            </div>
            <p className="text-xl font-medium text-slate-300">
              Developers come to The Full Stack to share their work, grow their
              network and connect with like-minded developers and engineering
              teams that share similar interests, tech stacks and shared values.
            </p>
          </div>

          <div className="space-y-4 rounded-xl p-6 text-left md:bg-tfsdark-900/50">
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex w-min space-x-2 rounded-xl bg-slate-500/20 px-4 py-3 text-base">
                <BsGraphUp className="h-8 w-8 text-slate-200" />
              </div>
              <h4 className="text-base font-semibold uppercase">Efficiency</h4>
            </div>
            <p className="text-xl font-medium text-slate-300">
              Tech hiring is becoming more social and informal. Having a team
              profile that articulates your mission and culture within a fast
              growing dev network keeps potential developers more informed about
              your team.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 mb-20 space-y-20 md:mt-0 md:mb-56 md:space-y-40">
        <div className="relative space-y-4 px-4 text-center">
          <h4 className="z-20 text-3xl font-bold md:text-5xl">
            Showcase your engineering team
          </h4>
          <p className="text-xl text-slate-300 md:text-2xl">
            Don&apos;t let your team and opportunities get overlooked
          </p>
        </div>

        <div className="mx-auto max-w-screen-xl space-y-80 pl-6 pr-4 md:h-[80vh] md:px-20">
          <div className="flex flex-col-reverse justify-between md:flex-row md:space-x-20">
            <div className="relative max-w-md">
              <div className="flex flex-col space-y-10 pt-10 font-intertight text-3xl tracking-wide">
                <h4 className="text-lg font-semibold uppercase text-slate-400">
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
                  <div className="flex w-min space-x-2 rounded-xl bg-slate-500/20 px-4 py-3 text-base">
                    <FiTarget className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex w-min space-x-2 rounded-xl bg-slate-500/20 px-4 py-3 text-base">
                    <GiTeamUpgrade className="h-11 w-11 text-slate-200" />
                  </div>
                </div>
              </div>
            </div>

            <Fade duration={1000} delay={200}>
              <div className="h-[60vh] rounded-lg border border-orange-900/60 bg-orange-500/10 shadow-2xl shadow-orange-700/20 md:w-[28vw]">
                <div className="-ml-3 mt-3 h-full w-full overflow-hidden rounded-t-xl border border-tfsdark-600 bg-black opacity-90 duration-300">
                  <div className="ml-4 flex h-8 items-center space-x-2 bg-tfsdark-700/20">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
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

        <div className="mx-auto max-w-screen-xl space-y-80 pl-6 pr-4 md:h-[80vh] md:px-20">
          <div className="flex flex-col-reverse justify-between md:flex-row md:space-x-20">
            <div className="relative max-w-md">
              <div className="flex h-[90vh] flex-col space-y-10 pt-10 font-intertight text-3xl tracking-wide">
                <h4 className="text-lg font-semibold uppercase text-slate-400">
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
              <div className="h-[60vh] rounded-lg border border-orange-900/60 bg-orange-500/10 shadow-2xl shadow-orange-700/20 md:w-[28vw]">
                <div className="-ml-3 mt-3 h-full w-full overflow-hidden rounded-t-xl border border-tfsdark-600 bg-black opacity-90 duration-300">
                  <div className="ml-4 flex h-8 items-center space-x-2 bg-tfsdark-700/20">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
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

        <div className="mx-auto max-w-screen-xl space-y-80 pl-6 pr-4 md:h-[80vh] md:px-20">
          <div className="flex flex-col-reverse justify-between md:flex-row md:space-x-20">
            <div className="relative max-w-md">
              <div className="flex flex-col space-y-10 pt-10 font-intertight text-3xl tracking-wide">
                <h4 className="text-lg font-semibold uppercase text-slate-400">
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
                  <div className="flex w-min space-x-2 rounded-xl bg-slate-500/20 px-4 py-3 text-base">
                    <SiVisualstudiocode className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex w-min space-x-2 rounded-xl bg-slate-500/20 px-4 py-3 text-base">
                    <SiReact className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex w-min space-x-2 rounded-xl bg-slate-500/20 px-4 py-3 text-base">
                    <SiJava className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex w-min space-x-2 rounded-xl bg-slate-500/20 px-4 py-3 text-base">
                    <FaAws className="h-11 w-11 text-slate-200" />
                  </div>
                </div>
              </div>
            </div>

            <Fade duration={1000} delay={200}>
              <div className="h-[60vh] rounded-lg border border-orange-900/60 bg-orange-500/10 shadow-2xl shadow-orange-700/20 md:w-[28vw]">
                <div className="-ml-3 mt-3 h-full w-full overflow-hidden rounded-t-xl border border-tfsdark-600 bg-black opacity-90 duration-300">
                  <div className="ml-4 flex h-8 items-center space-x-2 bg-tfsdark-700/20">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
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

        <div className="mx-auto max-w-screen-xl space-y-80 pl-6 pr-4 md:h-[80vh] md:px-20">
          <div className="flex flex-col-reverse justify-between md:flex-row md:space-x-20">
            <div className="relative max-w-md">
              <div className="flex flex-col space-y-10 pt-10 font-intertight text-3xl tracking-wide">
                <h4 className="text-lg font-semibold uppercase text-slate-400">
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
                  <div className="flex w-min space-x-2 rounded-xl bg-slate-500/20 px-4 py-3 text-base">
                    <IoTimeOutline className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex w-min space-x-2 rounded-xl bg-slate-500/20 px-4 py-3 text-base">
                    <IoShareSocialOutline className="h-11 w-11 text-slate-200" />
                  </div>
                </div>
              </div>
            </div>

            <Fade duration={1000} delay={200}>
              <div className="h-[60vh] rounded-lg border border-orange-900/60 bg-orange-500/10 shadow-2xl shadow-orange-700/20 md:w-[28vw]">
                <div className="-ml-3 mt-3 h-full w-full overflow-hidden rounded-t-xl border border-tfsdark-600 bg-black opacity-90 duration-300">
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

        <div className="mx-auto max-w-screen-xl space-y-80 pl-6 pr-4 md:h-[80vh] md:px-20">
          <div className="flex flex-col-reverse justify-between md:flex-row md:space-x-20">
            <div className="relative max-w-md">
              <div className="flex flex-col space-y-10 pt-10 font-intertight text-3xl tracking-wide">
                <h4 className="text-lg font-semibold uppercase text-slate-400">
                  Post Open roles
                </h4>
                <p>
                  <span className="text-orange-400">Looking for quality</span>{' '}
                  developers for your team? When you have a Team profile you
                  have the additional option of posting paid job listings, with
                  a pricing model that is fair.
                </p>
                <div className="flex items-center space-x-2 md:space-x-8">
                  <div className="flex w-min space-x-2 rounded-xl bg-slate-500/20 px-4 py-3 text-base">
                    <IoBriefcaseOutline className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex w-min space-x-2 rounded-xl bg-slate-500/20 px-4 py-3 text-base">
                    <IoPersonAddOutline className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex w-min space-x-2 rounded-xl bg-slate-500/20 px-4 py-3 text-base">
                    <IoDocumentTextOutline className="h-11 w-11 text-slate-200" />
                  </div>
                </div>
              </div>
            </div>

            <Fade duration={1000} delay={200}>
              <div className="h-[60vh] rounded-lg border border-orange-900/60 bg-orange-500/10 shadow-2xl shadow-orange-700/20 md:w-[28vw]">
                <div className="-ml-3 mt-3 h-full w-full overflow-hidden rounded-t-xl border border-tfsdark-600 bg-black opacity-90 duration-300">
                  <div className="ml-4 flex h-8 items-center space-x-2 bg-tfsdark-700/20">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
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

        <div className="relative space-y-10 text-center">
          <h4 className="z-20 text-3xl font-bold">
            Frequently asked questions
          </h4>
          <div className="relative mx-auto max-w-3xl px-4">
            <Faq />
          </div>
        </div>

        <div className="relative space-y-10 px-4 pt-20 text-center">
          <div className="relative mx-auto max-w-3xl text-2xl">
            &quot;We love what you guys stand for, we love what The Full Stack
            stands for and we are very excited to be part of the journey!&quot;
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-black">
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
      <div className="relative mx-auto max-w-3xl space-y-6 px-4 pt-28 pb-48 text-center font-intertight">
        <h4 className="text-4xl font-medium">
          Right now, there are great developers wondering if a{' '}
          <span className="text-orange-400">team like yours</span> even exists.
        </h4>

        <div className="mx-auto max-w-4xl">
          <div className="mt-10 flex items-center justify-center space-x-6">
            <button
              className="btn-primary rounded-lg py-3 px-6 text-xl"
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
