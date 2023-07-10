import Image from 'next/future/image';
import Link from 'next/link';
import { Fade } from 'react-awesome-reveal';
import { isMobile } from 'react-device-detect';
import {
  images,
  ImageSample,
} from 'components/modules/static/shared/constants';
import { BsGem } from 'react-icons/bs';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import {
  IoArrowDown,
  IoBriefcaseOutline,
  IoChatboxOutline,
  IoCodeSlashSharp,
  IoCubeOutline,
  IoFlashOutline,
  IoHeartOutline,
  IoImageOutline,
  IoLogoGithub,
  IoTerminalOutline,
  IoVideocamOutline,
} from 'react-icons/io5';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import { RiChatFollowUpFill } from 'react-icons/ri';
import { SiDevdotto, SiHashnode, SiMedium } from 'react-icons/si';
import dynamic from 'next/dynamic';

const VideoPlayerProfile = dynamic(() =>
  import('components/common/elements/mux/ProfileVideoPlayer')
);
const Testimonials = dynamic(() =>
  import('components/modules/static/shared/TestimonialsSection')
);

const ForDevelopers = ({ user }) => {
  const handleLearnMore = () => {
    const element = document.getElementById('learnmore');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="dark:bg-base-900">
      <div className="fixed top-0 left-0 mx-auto mt-16 flex min-h-screen w-full justify-between bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] dark:from-purple-900/40 dark:via-black dark:to-black"></div>
      <div className="relative z-10 mx-auto max-w-screen-xl lg:mt-16 lg:min-h-screen">
        <div className="max-w-7xl space-y-6 px-4 pt-24 md:pt-32 lg:px-0">
          <Link href="/about/our-story">
            <div className="mx-auto mb-10 w-min cursor-pointer whitespace-nowrap rounded-full border border-base-200 px-6 py-1 text-sm text-base-300 hover:text-white dark:border-base-700 dark:bg-base-800/40">
              Created by developers. See our story &rarr;
            </div>
          </Link>
          <h1 className="flex justify-center -space-y-4 bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 bg-clip-text text-center font-intertight text-6xl font-bold tracking-tight text-transparent dark:from-base-300 dark:via-violet-200 dark:to-white md:text-9xl">
            Share. Network. Grow.
          </h1>
          <div className="mx-auto max-w-5xl">
            <h4 className="text-center text-lg font-light text-base-400 md:text-2xl">
              The Full Stack is the platform for developers, providing a
              supportive dev community to share your work, grow your network and
              help you make your best career moves.
            </h4>
          </div>
          {!user && (
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center justify-center space-x-6 md:mt-20">
                <Link href="/signup" passHref>
                  <a
                    href="#"
                    className="btn btn-primary rounded-lg py-2.5 px-6 text-lg"
                  >
                    Get started
                  </a>
                </Link>

                <button
                  className="btn btn-secondary hidden rounded-lg bg-opacity-50 py-2.5 px-6 text-lg md:block"
                  onClick={() => handleLearnMore()}
                >
                  Learn more
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="absolute bottom-40 z-10 hidden w-full text-center md:block">
          <IoArrowDown className="mx-auto h-8 w-auto animate-bounce md:h-12" />
        </div>
      </div>

      <div className="pt-28" id="learnmore"></div>
      <div className="mb-56">
        <div className="mx-auto max-w-screen-xl space-y-20 pl-6 pr-4 md:min-h-screen md:space-y-80 md:px-20">
          <div className="flex flex-col-reverse justify-between md:flex-row md:space-x-20">
            <div className="relative max-w-md">
              <div className="flex flex-col pt-20 text-2xl tracking-tight md:h-[100vh] md:space-y-10 md:pt-80 md:text-3xl">
                <p>
                  We as developers love solving problems. And we especially{' '}
                  <span className="text-purple-400">love building</span>{' '}
                  solutions to problems. But very often we suck at selling
                  ourselves.
                </p>
                <div className="flex items-center space-x-6">
                  <div className="h-14 w-14">
                    <Image
                      src="/assets/landing/fordevelopers/thumbs-down.png"
                      className="h-full w-full object-cover object-left"
                      alt="The Full Stack"
                      width={800}
                      height={800}
                      layout="fill"
                    />
                  </div>
                  <div className="h-14 w-14">
                    <Image
                      src="/assets/landing/fordevelopers/worried-face.png"
                      className="h-full w-full object-cover object-left"
                      alt="The Full Stack"
                      width={800}
                      height={800}
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-10 pt-20 text-2xl tracking-tight md:h-[80vh] md:pt-80 md:text-3xl">
                <p>
                  Your <span className="text-purple-400">developer story</span>{' '}
                  deserves more than just a CV. Express yourself through what
                  you build. Show off projects you have built (or are working
                  on) to a community of{' '}
                  <span className="text-purple-400">
                    like-minded developers
                  </span>
                  .
                </p>
                <div className="flex items-center space-x-6">
                  <div className="h-14 w-14">
                    <Image
                      src="/assets/landing/fordevelopers/nerd-face.png"
                      className="h-full w-full object-cover object-left"
                      alt="The Full Stack"
                      width={800}
                      height={800}
                      layout="fill"
                    />
                  </div>
                  <div className="h-14 w-14">
                    <Image
                      src="/assets/landing/fordevelopers/thumbs-up.png"
                      className="h-full w-full object-cover object-left"
                      alt="The Full Stack"
                      width={800}
                      height={800}
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Fade duration={1500} delay={600}>
              <div className="h-[60vh] w-full rounded-lg border border-base-300 bg-base-200 shadow-2xl shadow-purple-700/20 dark:border-purple-900/60 dark:bg-purple-500/10 md:sticky md:top-48 md:w-[28vw]">
                <div className="-ml-3 mt-3 h-full w-full overflow-hidden rounded-xl border border-base-600 bg-black opacity-90 duration-300">
                  <div className="ml-4 flex h-8 items-center space-x-2 bg-base-700/20">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <Image
                    src="/assets/landing/fordevelopers/screen1.webp"
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

          <div className="flex flex-col-reverse justify-between md:flex-row md:space-x-20">
            <div className="relative max-w-md">
              <div className="flex flex-col space-y-10 pt-20 text-2xl tracking-tight md:h-[100vh] md:pt-80 md:text-3xl">
                <p className=" leading-snug">
                  With our seamless{' '}
                  <span className="text-purple-400">integration to GitHub</span>
                  , you can import your projects straight from GitHub and share
                  them to the community in{' '}
                  <span className="text-purple-400">just a few clicks</span>.
                </p>
                <p>
                  <div className="flex items-center space-x-4">
                    <div className="flex w-min whitespace-nowrap rounded-xl bg-base-200 px-4 py-3 text-base dark:bg-base-500/20">
                      <IoLogoGithub className="h-11 w-11" />
                    </div>
                    <span className="text-lg font-medium">
                      GitHub integration
                    </span>
                  </div>
                </p>
              </div>
              <div className="flex h-[80vh] flex-col space-y-10 pt-20 text-2xl tracking-tight md:pt-80 md:text-3xl">
                <p className=" leading-snug">
                  Add{' '}
                  <span className="text-purple-400">
                    videos, images, demo links
                  </span>{' '}
                  and tech stacks to your projects. Tag contributors and
                  categories to optmise for{' '}
                  <span className="text-purple-400">discoverablity</span>.
                  Looking for contributors? Just toggle on.
                </p>

                <p>
                  <div className="flex items-center space-x-2 md:space-x-6">
                    <div className="flex w-min whitespace-nowrap rounded-xl bg-base-200 px-4 py-3 text-base dark:bg-base-500/20">
                      <IoVideocamOutline className="h-11 w-11" />
                    </div>
                    <div className="flex w-min whitespace-nowrap rounded-xl bg-base-200 px-4 py-3 text-base dark:bg-base-500/20">
                      <IoImageOutline className="h-11 w-11" />
                    </div>
                    <div className="flex w-min whitespace-nowrap rounded-xl bg-base-200 px-4 py-3 text-base dark:bg-base-500/20">
                      <FiLink className="h-11 w-11" />
                    </div>
                    <div className="flex w-min whitespace-nowrap rounded-xl bg-base-200 px-4 py-3 text-base dark:bg-base-500/20">
                      <IoTerminalOutline className="h-11 w-11" />
                    </div>
                  </div>
                </p>
              </div>
            </div>

            <Fade duration={1500} delay={600}>
              <div className="h-[60vh] w-full rounded-lg border border-base-300 bg-base-200 shadow-2xl shadow-purple-700/20 dark:border-purple-900/60 dark:bg-purple-500/10 md:sticky md:top-48 md:w-[28vw]">
                <div className="-ml-3 mt-3 h-full w-full overflow-hidden rounded-xl border border-base-600 bg-black opacity-90 duration-300">
                  <div className="ml-4 flex h-8 items-center space-x-2 bg-base-700/20">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <Image
                    src="/assets/landing/fordevelopers/screen-project.webp"
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

          <div className="flex flex-col-reverse justify-between md:flex-row md:space-x-20">
            <div className="relative max-w-md">
              <div className="flex flex-col space-y-10 pt-20 text-2xl tracking-tight md:h-[100vh] md:pt-80 md:text-3xl">
                <p className=" leading-snug">
                  Publish your projects on the community showcase and let people{' '}
                  <span className="text-purple-400">follow you</span>. Get
                  feedback, up-votes, comments and questions on your work.
                  Receive <span className="text-purple-400">rewards</span> for
                  your project.
                </p>
                <div className="flex items-center space-x-2 md:space-x-6">
                  <div className="flex space-x-2 rounded-xl bg-red-500/20 px-4 py-3 text-base">
                    <IoHeartOutline className="h-12 w-12 text-red-500" />
                  </div>
                  <div className="flex space-x-2 rounded-xl bg-purple-500/20 px-4 py-3 text-base">
                    <IoChatboxOutline className="h-12 w-12 text-purple-500" />
                  </div>
                  <div className="flex space-x-2 rounded-xl bg-yellow-300/20 px-4 py-3 text-base">
                    <BsGem className="h-11 w-11 text-yellow-400" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-10 pt-20 text-2xl tracking-tight md:h-[80vh] md:pt-80 md:text-3xl">
                <p className=" leading-snug">
                  <span className="text-purple-400">Seek inspiration</span> from
                  others. Discover projects by catgeory, tech stack or similar{' '}
                  <span className="text-purple-400">interests to you</span>.
                  Like what you see? Follow them.
                </p>

                <p className="flex items-center space-x-8">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2 rounded-xl bg-blue-500/20 px-4 py-3 text-base">
                      <RiChatFollowUpFill className="h-12 w-12 text-blue-500" />
                    </div>
                    <span className="text-lg font-medium text-blue-300">
                      Follow
                    </span>
                  </div>
                </p>
              </div>
              <div className="flex flex-col space-y-10 pt-20 text-2xl tracking-tight md:h-[80vh] md:pt-80 md:text-3xl">
                <p className=" leading-snug">
                  <span className="text-purple-400">Looking for projects</span>{' '}
                  to contribute to? No problem. Simply explore the huge growing
                  collection of projects tagged looking for contributors, and{' '}
                  <span className="text-purple-400">start connecting</span>.
                </p>

                <p>
                  <div className="flex items-center space-x-4">
                    <div className="flex w-min space-x-2 rounded-xl bg-green-500/20 px-4 py-3 text-base">
                      <FaHandHoldingHeart className="h-12 w-12 text-green-500" />
                    </div>
                    <span className="text-lg font-medium text-green-400">
                      Contribute
                    </span>
                  </div>
                </p>
              </div>
            </div>

            <Fade duration={1500} delay={600}>
              <div className="h-[60vh] w-full rounded-lg border border-base-300 bg-base-200 shadow-2xl shadow-purple-700/20 dark:border-purple-900/60 dark:bg-purple-500/10 md:sticky md:top-48 md:w-[28vw]">
                <div className="-ml-3 mt-3 h-full w-full overflow-hidden rounded-xl border border-base-600 bg-black opacity-90 duration-300">
                  <div className="ml-4 flex h-8 items-center space-x-2 bg-base-700/20">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <Image
                    src="/assets/landing/fordevelopers/screen-showcase.webp"
                    className="h-full w-full object-cover object-left-top"
                    alt="The Full Stack"
                    width={1000}
                    height={1000}
                    layout="fill"
                  />
                </div>
              </div>
            </Fade>
          </div>

          <div className="flex flex-col-reverse justify-between md:flex-row md:space-x-20">
            <div className="relative max-w-md">
              <div className="flex flex-col space-y-10 pt-20 text-2xl tracking-tight md:h-[100vh] md:pt-80 md:text-3xl">
                <p>
                  In our community{' '}
                  <span className="text-purple-400">Hangout</span> area you can
                  ask questions,{' '}
                  <span className="text-purple-400">look for advice</span>, or
                  share progress on your work and{' '}
                  <span className="text-purple-400">seek early feedback</span>.
                  And who doesn&apos;t like memes!
                </p>
                <div className="flex items-center space-x-6">
                  <div className="h-14 w-14">
                    <Image
                      src="/assets/landing/fordevelopers/thinking-face.png"
                      className="h-full w-full object-cover object-left"
                      alt="The Full Stack"
                      width={800}
                      height={800}
                      layout="fill"
                    />
                  </div>
                  <div className="h-14 w-14">
                    <Image
                      src="/assets/landing/fordevelopers/smiling-face.png"
                      className="h-full w-full object-cover object-left"
                      alt="The Full Stack"
                      width={800}
                      height={800}
                      layout="fill"
                    />
                  </div>
                  <div className="h-14 w-14">
                    <Image
                      src="/assets/landing/fordevelopers/crying-face.png"
                      className="h-full w-full object-cover object-left"
                      alt="The Full Stack"
                      width={800}
                      height={800}
                      layout="fill"
                    />
                  </div>
                  <div className="h-14 w-14">
                    <Image
                      src="/assets/landing/fordevelopers/laughing-face.png"
                      className="h-full w-full object-cover object-left"
                      alt="The Full Stack"
                      width={800}
                      height={800}
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-10 pt-20 text-2xl tracking-tight md:h-[80vh] md:pt-80 md:text-3xl">
                <p>
                  <span className="text-purple-400">Say hello</span> and
                  introduce yourself! We&apos;re super proud of our community
                  vibe - just be kind.{' '}
                  <span className="text-purple-400">Positive vibes</span> go a
                  long way!
                </p>
                <div className="flex items-center space-x-6">
                  <div className="h-14 w-14">
                    <Image
                      src="/assets/landing/fordevelopers/handshake.png"
                      className="h-full w-full object-cover object-left"
                      alt="The Full Stack"
                      width={800}
                      height={800}
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Fade duration={1500} delay={600}>
              <div className="h-[60vh] w-full rounded-lg border border-base-300 bg-base-200 shadow-2xl shadow-purple-700/20 dark:border-purple-900/60 dark:bg-purple-500/10 md:sticky md:top-48 md:w-[28vw]">
                <div className="-ml-3 mt-3 h-full w-full overflow-hidden rounded-xl border border-base-600 bg-black opacity-90 duration-300">
                  <div className="ml-4 flex h-8 items-center space-x-2 bg-base-700/20">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <Image
                    src="/assets/landing/fordevelopers/screen-hangout.webp"
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

          <div className="flex flex-col-reverse justify-between md:flex-row md:space-x-20">
            <div className="relative max-w-md">
              <div className="flex flex-col space-y-10 pt-20 text-2xl tracking-tight md:h-[100vh] md:pt-80 md:text-3xl">
                <p>
                  On <span className="text-purple-400">your profile</span>,
                  highlight your projects, code snippets, sparks (kinda like
                  tweets).{' '}
                  <span className="text-purple-400">Looking for work?</span> Set
                  your ideal work preferences. Private by default and no{' '}
                  <span className="text-purple-400">recruiter spam</span>.
                </p>
                <div className="flex items-center space-x-2 md:space-x-6">
                  <div className="flex w-min space-x-2 rounded-xl bg-base-200 px-4 py-3 text-base dark:bg-base-500/20">
                    <IoCubeOutline className="h-11 w-11" />
                  </div>
                  <div className="flex w-min space-x-2 rounded-xl bg-base-200 px-4 py-3 text-base dark:bg-base-500/20">
                    <IoCodeSlashSharp className="h-11 w-11" />
                  </div>
                  <div className="flex w-min space-x-2 rounded-xl bg-base-200 px-4 py-3 text-base dark:bg-base-500/20">
                    <IoFlashOutline className="h-11 w-11" />
                  </div>
                  <div className="flex w-min space-x-2 rounded-xl bg-base-200 px-4 py-3 text-base dark:bg-base-500/20">
                    <IoBriefcaseOutline className="h-11 w-11" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-10 pt-20 text-2xl tracking-tight md:h-[80vh] md:pt-80 md:text-3xl">
                <p>
                  Not only GitHub, but with our integrations to{' '}
                  <span className="text-purple-400">DEV, Hashnode</span> and{' '}
                  <span className="text-purple-400">Medium</span>, you can sync
                  your blog posts and articles to your profile to further
                  enhance your{' '}
                  <span className="text-purple-400">discoverablity</span>.
                </p>
                <div className="flex items-center space-x-2 md:space-x-6">
                  <div className="flex w-min space-x-2 rounded-xl bg-base-200 px-4 py-3 text-base dark:bg-base-500/20">
                    <SiDevdotto className="h-11 w-11" />
                  </div>
                  <div className="flex w-min space-x-2 rounded-xl bg-base-200 px-4 py-3 text-base dark:bg-base-500/20">
                    <SiHashnode className="h-11 w-11" />
                  </div>
                  <div className="flex w-min space-x-2 rounded-xl bg-base-200 px-4 py-3 text-base dark:bg-base-500/20">
                    <SiMedium className="h-11 w-11" />
                  </div>
                </div>
              </div>
            </div>

            <Fade duration={1500} delay={600}>
              <div className="h-[60vh] w-full rounded-lg border border-base-300 bg-base-200 shadow-2xl shadow-purple-700/20 dark:border-purple-900/60 dark:bg-purple-500/10 md:sticky md:top-48 md:w-[28vw]">
                <div className="-ml-3 mt-3 h-full w-full overflow-hidden rounded-xl border border-base-600 bg-black opacity-90 duration-300">
                  <div className="ml-4 flex h-8 items-center space-x-2 bg-base-700/20">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <Image
                    src="/assets/landing/fordevelopers/screen-profile.webp"
                    className="h-full w-full object-cover object-top"
                    alt="The Full Stack"
                    width={800}
                    height={800}
                    layout="fill"
                  />
                </div>
              </div>
            </Fade>
          </div>

          <div className="flex flex-col-reverse justify-between md:flex-row md:space-x-20">
            <div className="relative max-w-md">
              <div className="flex flex-col space-y-10 pt-20 text-2xl tracking-tight md:h-[100vh] md:pt-80 md:text-3xl">
                <p>
                  People make{' '}
                  <span className="text-purple-400">real connections</span> with
                  real people, not only code. Introduce yourself to others in a{' '}
                  <span className="text-purple-400">whole new way</span>, right
                  from your profile.
                </p>
                <p>
                  <div className="flex w-min space-x-2 rounded-xl bg-base-200 px-4 py-3 text-base dark:bg-base-500/20">
                    <MdOutlineSlowMotionVideo className="h-11 w-11" />
                  </div>
                </p>
              </div>
              <div className="flex flex-col space-y-10 pt-20 text-2xl tracking-tight md:h-[80vh] md:pt-80 md:text-3xl">
                <p>
                  With a <span className="text-purple-400">video intro</span> on
                  your profile, you&apos;re 2x more likely to make better
                  connections and find opportunities from tech teams so you can{' '}
                  <span className="text-purple-400">
                    work like never before
                  </span>
                  .
                </p>
                <p>
                  <div className="flex w-min space-x-2 rounded-xl bg-base-200 px-4 py-3 text-base dark:bg-base-500/20">
                    <MdOutlineSlowMotionVideo className="h-11 w-11" />
                  </div>
                </p>
              </div>
            </div>

            <Fade duration={1500} delay={600}>
              <div className="h-[60vh] w-full rounded-lg border border-base-300 bg-base-200 shadow-2xl shadow-purple-700/20 dark:border-purple-900/60 dark:bg-purple-500/10 md:sticky md:top-48 md:w-[28vw]">
                <div className="-ml-3 mt-3 h-full w-full overflow-hidden rounded-xl border border-base-600 bg-black opacity-90 duration-300">
                  <VideoPlayerProfile
                    src={`https://stream.mux.com/OGgHsrxVO6KHXUBDdtsVPCMMnJej3tuPszF3L00K00m8U.m3u8`}
                    controls={false}
                    muted={true}
                    autoPlay={isMobile ? false : true}
                  />
                </div>
                <span className="absolute top-10 left-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-blue-500 px-6 py-3 text-2xl text-white transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-blue-500 before:content-[''] md:left-4">
                  Hello!
                </span>
              </div>
            </Fade>
          </div>

          <div className="flex flex-col-reverse justify-between md:flex-row md:space-x-20">
            <div className="relative max-w-md">
              <div className="flex flex-col space-y-10 pt-20 text-2xl tracking-tight md:h-[100vh] md:pt-80 md:text-3xl">
                <p>
                  <span className="text-purple-400">Team profiles</span> make
                  strong connections with people looking to collaborate or find
                  work by introducing them to the people and{' '}
                  <span className="text-purple-400">personalities</span> on the
                  team.
                </p>
                <div className="flex items-center -space-x-2">
                  {images.map((image, index) => (
                    <ImageSample image={image} key={index} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-10 pt-20 text-2xl tracking-tight md:h-[80vh] md:pt-80 md:text-3xl">
                <p>
                  Browse and discover{' '}
                  <span className="text-purple-400">teams</span> building great
                  tech and{' '}
                  <span className="text-purple-400">engineering cultures</span>.
                  Already in a team? Create a team profile and{' '}
                  <span className="text-purple-400">invite your teammates</span>
                  .
                </p>
                <div className="flex items-center -space-x-2">
                  {images.map((image, index) => (
                    <ImageSample image={image} key={index} />
                  ))}
                </div>
              </div>
            </div>

            <Fade duration={1500} delay={600}>
              <div className="h-[60vh] w-full rounded-lg border border-base-300 bg-base-200 shadow-2xl shadow-purple-700/20 dark:border-purple-900/60 dark:bg-purple-500/10 md:sticky md:top-48 md:w-[28vw]">
                <div className="-ml-3 mt-3 h-full w-full overflow-hidden rounded-xl border border-base-600 bg-black opacity-90 duration-300">
                  <div className="ml-4 flex h-8 items-center space-x-2 bg-base-700/20">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <Image
                    src="/assets/landing/fordevelopers/screen-teams.webp"
                    className="h-full w-full object-cover object-top"
                    alt="The Full Stack"
                    width={800}
                    height={800}
                    layout="fill"
                  />
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <Testimonials />
      </div>

      <div className="relative mx-auto max-w-3xl space-y-6 px-4 pt-28 pb-48 text-center">
        <h2>Opportunity comes when you expand your network.</h2>
        <p className="text-2xl tracking-tight text-base-400">
          Connect with like-minded developers and grow your network. This is
          truly the best way to strengthen your career as a developer.
        </p>
        <div className="mx-auto max-w-4xl">
          <div className="mt-10 flex items-center justify-center space-x-6">
            <Link href="/signup" passHref>
              <a href="#" className="btn btn-primary text-lg">
                Get started
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForDevelopers;
