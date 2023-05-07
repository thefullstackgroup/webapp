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

const Main = ({ setShowSignupModal, sendSlackSignUpMessage }) => {
  const handleLearnMore = () => {
    const element = document.getElementById('learnmore');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black">
      <div className="fixed top-0 left-0 w-full mx-auto min-h-screen mt-16 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-tfsdark-900 flex justify-between"></div>
      <div className="relative z-10 max-w-screen-xl mx-auto lg:min-h-screen lg:mt-16">
        <div className="pt-24 md:pt-32 max-w-7xl space-y-6 px-4 lg:px-0">
          <Link href="/about/our-story">
            <div className="rounded-full text-slate-300 hover:text-white bg-slate-800/40 border border-tfsdark-700 px-6 py-1 text-sm w-min whitespace-nowrap mx-auto mb-10 cursor-pointer">
              Created by developers. See our story &rarr;
            </div>
          </Link>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-300 via-violet-200 to-white font-intertight flex justify-center -space-y-4 text-center">
            Share. Network. Grow.
          </h1>
          <div className="max-w-5xl mx-auto">
            <h4 className="text-center text-slate-400 font-light text-lg md:text-2xl">
              The Full Stack is the platform for developers, providing a
              supportive dev community to share your work, grow your network and
              help you make your best career moves.
            </h4>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="md:mt-20 flex justify-center items-center space-x-6">
              <button
                className="btn-primary text-xl py-3 px-6 rounded-lg"
                onClick={() => {
                  setShowSignupModal(true);
                  sendSlackSignUpMessage('GET STARTED');
                }}
              >
                Get started
              </button>
              <button
                className="hidden md:block btn-secondary bg-opacity-50 text-xl py-3 px-6 rounded-lg"
                onClick={() => handleLearnMore()}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
        <div className="z-10 hidden md:block absolute bottom-20 md:bottom-20 w-full text-center">
          <IoArrowDown className="text-tfsdark-100 w-auto h-8 md:h-12 mx-auto animate-bounce" />
        </div>
      </div>

      <div className="pt-28" id="learnmore"></div>
      <div className="mb-56">
        <div className="max-w-screen-xl mx-auto md:min-h-screen space-y-20 md:space-y-80 pl-6 pr-4 md:px-20">
          <div className="flex flex-col-reverse md:flex-row justify-between md:space-x-20">
            <div className="relative max-w-md">
              <div className="md:h-[100vh] font-intertight tracking-wide text-2xl md:text-3xl flex flex-col md:space-y-10 pt-20 md:pt-80">
                <p>
                  We as developers love solving problems. And we especially{' '}
                  <span className="text-purple-400">love building</span>{' '}
                  solutions to problems. But very often we suck at selling
                  ourselves.
                </p>
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14">
                    <Image
                      src="/assets/landing/fordevelopers/thumbs-down.png"
                      className="h-full w-full object-cover object-left"
                      alt="The Full Stack"
                      width={800}
                      height={800}
                      layout="fill"
                    />
                  </div>
                  <div className="w-14 h-14">
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
              <div className="md:h-[80vh] font-intertight text-2xl md:text-3xl flex flex-col space-y-10 pt-20 md:pt-80">
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
                  <div className="w-14 h-14">
                    <Image
                      src="/assets/landing/fordevelopers/nerd-face.png"
                      className="h-full w-full object-cover object-left"
                      alt="The Full Stack"
                      width={800}
                      height={800}
                      layout="fill"
                    />
                  </div>
                  <div className="w-14 h-14">
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
              <div className="md:sticky md:top-48 border border-purple-900/60 shadow-2xl bg-purple-500/10 shadow-purple-700/20 rounded-lg h-[60vh] w-full md:w-[28vw]">
                <div className="h-full w-full bg-black border border-tfsdark-600 opacity-90 rounded-t-xl overflow-hidden duration-300 -ml-3 mt-3">
                  <div className="ml-4 flex items-center space-x-2 h-8 bg-tfsdark-700/20">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
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

          <div className="flex flex-col-reverse md:flex-row justify-between md:space-x-20">
            <div className="relative max-w-md">
              <div className="md:h-[100vh] font-intertight text-2xl md:text-3xl flex flex-col space-y-10 pt-20 md:pt-80">
                <p className=" leading-snug">
                  With our seamless{' '}
                  <span className="text-purple-400">integration to GitHub</span>
                  , you can import your projects straight from GitHub and share
                  them to the community in{' '}
                  <span className="text-purple-400">just a few clicks</span>.
                </p>
                <p>
                  <div className="flex items-center space-x-4">
                    <div className="flex text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min whitespace-nowrap">
                      <IoLogoGithub className="h-11 w-11 text-slate-200" />
                    </div>
                    <span className="text-lg text-slate-300 font-medium">
                      GitHub integration
                    </span>
                  </div>
                </p>
              </div>
              <div className="h-[80vh] font-intertight text-2xl md:text-3xl flex flex-col space-y-10 pt-20 md:pt-80">
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
                    <div className="flex text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min whitespace-nowrap">
                      <IoVideocamOutline className="h-11 w-11 text-slate-200" />
                    </div>
                    <div className="flex text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min whitespace-nowrap">
                      <IoImageOutline className="h-11 w-11 text-slate-200" />
                    </div>
                    <div className="flex text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min whitespace-nowrap">
                      <FiLink className="h-11 w-11 text-slate-200" />
                    </div>
                    <div className="flex text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min whitespace-nowrap">
                      <IoTerminalOutline className="h-11 w-11 text-slate-200" />
                    </div>
                  </div>
                </p>
              </div>
            </div>

            <Fade duration={1500} delay={600}>
              <div className="md:sticky md:top-48 border border-purple-900/60 shadow-2xl bg-purple-500/10 shadow-purple-700/20 rounded-lg h-[60vh] w-full md:w-[28vw]">
                <div className="h-full w-full bg-black border border-tfsdark-600 opacity-90 rounded-t-xl overflow-hidden duration-300 -ml-3 mt-3">
                  <div className="ml-4 flex items-center space-x-2 h-8 bg-tfsdark-700/20">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
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

          <div className="flex flex-col-reverse md:flex-row justify-between md:space-x-20">
            <div className="relative max-w-md">
              <div className="md:h-[100vh] font-intertight text-2xl md:text-3xl flex flex-col space-y-10 pt-20 md:pt-80">
                <p className=" leading-snug">
                  Publish your projects on the community showcase and let people{' '}
                  <span className="text-purple-400">follow you</span>. Get
                  feedback, up-votes, comments and questions on your work.
                  Receive <span className="text-purple-400">rewards</span> for
                  your project.
                </p>
                <div className="flex items-center space-x-2 md:space-x-6">
                  <div className="flex space-x-2 text-base rounded-xl bg-red-500/20 px-4 py-3">
                    <IoHeartOutline className="h-12 w-12 text-red-500" />
                  </div>
                  <div className="flex space-x-2 text-base rounded-xl bg-purple-500/20 px-4 py-3">
                    <IoChatboxOutline className="h-12 w-12 text-purple-500" />
                  </div>
                  <div className="flex space-x-2 text-base rounded-xl bg-yellow-300/20 px-4 py-3">
                    <BsGem className="h-11 w-11 text-yellow-400" />
                  </div>
                </div>
              </div>
              <div className="md:h-[80vh] font-intertight text-2xl md:text-3xl flex flex-col space-y-10 pt-20 md:pt-80">
                <p className=" leading-snug">
                  <span className="text-purple-400">Seek inspiration</span> from
                  others. Discover projects by catgeory, tech stack or similar{' '}
                  <span className="text-purple-400">interests to you</span>.
                  Like what you see? Follow them.
                </p>

                <p className="flex items-center space-x-8">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2 text-base rounded-xl bg-blue-500/20 px-4 py-3">
                      <RiChatFollowUpFill className="h-12 w-12 text-blue-500" />
                    </div>
                    <span className="text-lg text-blue-300 font-medium">
                      Follow
                    </span>
                  </div>
                </p>
              </div>
              <div className="md:h-[80vh] font-intertight text-2xl md:text-3xl flex flex-col space-y-10 pt-20 md:pt-80">
                <p className=" leading-snug">
                  <span className="text-purple-400">Looking for projects</span>{' '}
                  to contribute to? No problem. Simply explore the huge growing
                  collection of projects tagged looking for contributors, and{' '}
                  <span className="text-purple-400">start connecting</span>.
                </p>

                <p>
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2 text-base rounded-xl bg-green-500/20 px-4 py-3 w-min">
                      <FaHandHoldingHeart className="h-12 w-12 text-green-500" />
                    </div>
                    <span className="text-lg text-green-400 font-medium">
                      Contribute
                    </span>
                  </div>
                </p>
              </div>
            </div>

            <Fade duration={1500} delay={600}>
              <div className="md:sticky md:top-48 border border-purple-900/60 shadow-2xl bg-purple-500/10 shadow-purple-700/20 rounded-lg h-[60vh] w-full md:w-[28vw]">
                <div className="h-full w-full bg-black border border-tfsdark-600 opacity-90 rounded-t-xl overflow-hidden duration-300 -ml-3 mt-3">
                  <div className="ml-4 flex items-center space-x-2 h-8 bg-tfsdark-700/20">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
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

          <div className="flex flex-col-reverse md:flex-row justify-between md:space-x-20">
            <div className="relative max-w-md">
              <div className="md:h-[100vh] font-intertight tracking-wide text-2xl md:text-3xl flex flex-col space-y-10 pt-20 md:pt-80">
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
                  <div className="w-14 h-14">
                    <Image
                      src="/assets/landing/fordevelopers/thinking-face.png"
                      className="h-full w-full object-cover object-left"
                      alt="The Full Stack"
                      width={800}
                      height={800}
                      layout="fill"
                    />
                  </div>
                  <div className="w-14 h-14">
                    <Image
                      src="/assets/landing/fordevelopers/smiling-face.png"
                      className="h-full w-full object-cover object-left"
                      alt="The Full Stack"
                      width={800}
                      height={800}
                      layout="fill"
                    />
                  </div>
                  <div className="w-14 h-14">
                    <Image
                      src="/assets/landing/fordevelopers/crying-face.png"
                      className="h-full w-full object-cover object-left"
                      alt="The Full Stack"
                      width={800}
                      height={800}
                      layout="fill"
                    />
                  </div>
                  <div className="w-14 h-14">
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
              <div className="md:h-[80vh] font-intertight text-2xl md:text-3xl flex flex-col space-y-10 pt-20 md:pt-80">
                <p>
                  <span className="text-purple-400">Say hello</span> and
                  introduce yourself! We&apos;re super proud of our community
                  vibe - just be kind.{' '}
                  <span className="text-purple-400">Positive vibes</span> go a
                  long way!
                </p>
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14">
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
              <div className="md:sticky md:top-48 border border-purple-900/60 shadow-2xl bg-purple-500/10 shadow-purple-700/20 rounded-lg h-[60vh] w-full md:w-[28vw]">
                <div className="h-full w-full bg-black border border-tfsdark-600 opacity-90 rounded-t-xl overflow-hidden duration-300 -ml-3 mt-3">
                  <div className="ml-4 flex items-center space-x-2 h-8 bg-tfsdark-700/20">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
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

          <div className="flex flex-col-reverse md:flex-row justify-between md:space-x-20">
            <div className="relative max-w-md">
              <div className="md:h-[100vh] font-intertight tracking-wide text-2xl md:text-3xl flex flex-col space-y-10 pt-20 md:pt-80">
                <p>
                  On <span className="text-purple-400">your profile</span>,
                  highlight your projects, code snippets, sparks (kinda like
                  tweets).{' '}
                  <span className="text-purple-400">Looking for work?</span> Set
                  your ideal work preferences. Private by default and no{' '}
                  <span className="text-purple-400">recruiter spam</span>.
                </p>
                <div className="flex items-center space-x-2 md:space-x-6">
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <IoCubeOutline className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <IoCodeSlashSharp className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <IoFlashOutline className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <IoBriefcaseOutline className="h-11 w-11 text-slate-200" />
                  </div>
                </div>
              </div>
              <div className="md:h-[80vh] font-intertight text-2xl md:text-3xl flex flex-col space-y-10 pt-20 md:pt-80">
                <p>
                  Not only GitHub, but with our integrations to{' '}
                  <span className="text-purple-400">DEV, Hashnode</span> and{' '}
                  <span className="text-purple-400">Medium</span>, you can sync
                  your blog posts and articles to your profile to further
                  enhance your{' '}
                  <span className="text-purple-400">discoverablity</span>.
                </p>
                <div className="flex items-center space-x-2 md:space-x-6">
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <SiDevdotto className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <SiHashnode className="h-11 w-11 text-slate-200" />
                  </div>
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <SiMedium className="h-11 w-11 text-slate-200" />
                  </div>
                </div>
              </div>
            </div>

            <Fade duration={1500} delay={600}>
              <div className="md:sticky md:top-48 border border-purple-900/60 shadow-2xl bg-purple-500/10 shadow-purple-700/20 rounded-lg h-[60vh] w-full md:w-[28vw]">
                <div className="h-full w-full bg-black border border-tfsdark-600 opacity-90 rounded-t-xl overflow-hidden duration-300 -ml-3 mt-3">
                  <div className="ml-4 flex items-center space-x-2 h-8 bg-tfsdark-700/20">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
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

          <div className="flex flex-col-reverse md:flex-row justify-between md:space-x-20">
            <div className="relative max-w-md">
              <div className="md:h-[100vh] font-intertight tracking-wide text-2xl md:text-3xl flex flex-col space-y-10 pt-20 md:pt-80">
                <p>
                  People make{' '}
                  <span className="text-purple-400">real connections</span> with
                  real people, not only code. Introduce yourself to others in a{' '}
                  <span className="text-purple-400">whole new way</span>, right
                  from your profile.
                </p>
                <p>
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <MdOutlineSlowMotionVideo className="h-11 w-11 text-slate-200" />
                  </div>
                </p>
              </div>
              <div className="md:h-[80vh] font-intertight text-2xl md:text-3xl flex flex-col space-y-10 pt-20 md:pt-80">
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
                  <div className="flex space-x-2 text-base rounded-xl bg-slate-500/20 px-4 py-3 w-min">
                    <MdOutlineSlowMotionVideo className="h-11 w-11 text-slate-200" />
                  </div>
                </p>
              </div>
            </div>

            <Fade duration={1500} delay={600}>
              <div className="relative md:sticky md:top-48 border border-purple-900/60 shadow-2xl bg-purple-500/10 shadow-purple-700/20 rounded-lg h-[60vh] w-full md:w-[28vw]">
                <div className="h-full w-full bg-black border border-tfsdark-600 opacity-90 rounded-t-xl overflow-hidden duration-300 -ml-3 mt-3">
                  <VideoPlayerProfile
                    src={`https://stream.mux.com/OGgHsrxVO6KHXUBDdtsVPCMMnJej3tuPszF3L00K00m8U.m3u8`}
                    controls={false}
                    muted={true}
                    autoPlay={isMobile ? false : true}
                  />
                </div>
                <span className="absolute text-2xl top-10 left-10 md:left-4 -translate-x-1/2 whitespace-nowrap rounded-lg bg-blue-500 px-6 py-3 text-white transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-blue-500 before:content-['']">
                  Hello!
                </span>
              </div>
            </Fade>
          </div>

          <div className="flex flex-col-reverse md:flex-row justify-between md:space-x-20">
            <div className="relative max-w-md">
              <div className="md:h-[100vh] font-intertight tracking-wide text-2xl md:text-3xl flex flex-col space-y-10 pt-20 md:pt-80">
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
              <div className="md:h-[80vh] font-intertight text-2xl md:text-3xl flex flex-col space-y-10 pt-20 md:pt-80">
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
              <div className="md:sticky md:top-48 border border-purple-900/60 shadow-2xl bg-purple-500/10 shadow-purple-700/20 rounded-lg h-[60vh] w-full md:w-[28vw]">
                <div className="h-full w-full bg-black border border-tfsdark-600 opacity-90 rounded-t-xl overflow-hidden duration-300 -ml-3 mt-3">
                  <div className="ml-4 flex items-center space-x-2 h-8 bg-tfsdark-700/20">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
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

      <div className="max-w-3xl text-center mx-auto relative font-intertight space-y-6 px-4 pt-28 pb-48">
        <h4 className="text-3xl font-bold">
          Opportunity comes when you expand your network.
        </h4>
        <p className="text-2xl text-slate-400">
          Connect with like-minded developers and grow your network. This is
          truly the best way to strengthen your career as a developer.
        </p>
        <div className="max-w-4xl mx-auto">
          <div className="mt-10 flex justify-center items-center space-x-6">
            <button
              className="btn-primary text-xl py-3 px-6 rounded-lg"
              onClick={() => {
                setShowSignupModal(true);
                sendSlackSignUpMessage('GET STARTED');
              }}
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
