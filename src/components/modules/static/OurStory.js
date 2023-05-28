import Image from 'next/future/image';
import Link from 'next/link';
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si';

const Main = () => {
  return (
    <div className="bg-black">
      <div className="fixed top-0 left-0 mx-auto mt-16 flex min-h-screen w-full justify-between bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-base-300/40 via-black to-base-900"></div>
      <div className="fixed top-0 right-0 w-1/2 opacity-20">
        <Image
          src="/assets/landing/about/nodes.webp"
          className="h-full w-full object-cover grayscale"
          alt="The Full Stack"
          width={800}
          height={800}
          layout="fill"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="max-w-7xl space-y-6 px-4 pt-24 md:max-w-4xl md:pt-32 lg:px-0">
          <Link href="/about/our-story">
            <div className="mb-10 w-min cursor-pointer whitespace-nowrap rounded-full border border-base-700 bg-slate-800/40 px-4 py-1 text-sm text-slate-300 hover:text-white">
              Our mission
            </div>
          </Link>
          <h1 className="flex justify-center -space-y-4 font-intertight text-5xl font-bold tracking-tight text-slate-100 md:text-7xl">
            Connecting developers to build awesome things.
          </h1>
          <div className="mx-auto max-w-3xl md:mx-0">
            <h4 className="text-2xl font-light text-slate-300">
              We build platforms that enable developers to grow a network and
              connect to teams to build the most amazing things.
            </h4>
          </div>
        </div>

        <div className="max-w-4xl space-y-10 px-4 md:px-0">
          <div className="mt-40 mb-10 w-min cursor-pointer whitespace-nowrap rounded-full border border-base-700 bg-slate-800/40 px-4 py-1 text-sm text-slate-300 hover:text-white">
            Our purpose
          </div>
          <h4 className="font-intertight text-4xl font-bold">
            Why this matters?
          </h4>
          <div className="space-y-4">
            <p className="text-xl text-slate-300">
              There is a global shortage of 40 million developers worldwide, yet
              10.2 million still get overlooked. We, as developers, love solving
              problems and building product. But we&apos;re not good at selling
              ourselves. Developers, very often, undersell themselves on paper.
              A resume filter has an inherent bias toward good academic
              credentials, yet 64% of the global developer population are
              self-taught, without the &quot;suited&quot; academic credentials.
              We are typically discovered through who you work for or who you
              know, not for what you can build.
            </p>

            <p className="text-xl text-slate-300">
              Frustrated with how developers get discovered and get connected to
              other developers and teams, we founded a company with a mission to
              make this easier and simpler with a better experience.
            </p>

            <p className="text-xl text-slate-300">
              Opportunity comes around when you expand your network. We believe
              in the power of building your own network. We believe showing off
              what you can build and expressing your story yields results. And
              importantly, we believe in human connection, resulting in a better
              and more inclusive experience for all. We&apos;re building a
              platform centred around community and the belief that showing off
              what you can build will help you grow your network and make your
              best career moves.
            </p>

            <p className="text-xl text-slate-300">
              We named it <span className="font-bold">The Full Stack</span>.
            </p>
          </div>
        </div>

        <div className="mt-20 max-w-4xl space-y-10 px-4 md:px-0">
          <h4 className="font-intertight text-2xl font-bold">The Team</h4>
          <div className="space-y-4">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 overflow-hidden rounded-lg grayscale md:h-32 md:w-32">
                  <Image
                    src="/assets/landing/about/noel.webp"
                    className="h-full w-full object-cover grayscale"
                    alt="Noel"
                    width={800}
                    height={800}
                    layout="fill"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold md:text-2xl">Noel Maher</h4>
                  <h5 className="text-slate-400">CEO & Co-founder</h5>
                  <div className="mt-2 flex items-center space-x-4">
                    <a
                      href="https://www.linkedin.com/in/noelmaher/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiLinkedin />
                    </a>
                    <a
                      href="https://twitter.com/danoely_"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiTwitter />
                    </a>
                    <a
                      href="https://github.com/danoely1979"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiGithub />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 overflow-hidden rounded-lg grayscale md:h-32 md:w-32">
                  <Image
                    src="/assets/landing/about/phil.webp"
                    className="h-full w-full object-cover grayscale"
                    alt="Phil"
                    width={800}
                    height={800}
                    layout="fill"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold md:text-2xl">Phil Bannon</h4>
                  <h5 className="text-slate-400">CTO & Co-founder</h5>
                  <div className="mt-2 flex items-center space-x-4">
                    <a
                      href="https://www.linkedin.com/in/philipbannon/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiLinkedin />
                    </a>
                    <a
                      href="https://twitter.com/BannonPhilip"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiTwitter />
                    </a>
                    <a
                      href="https://github.com/philbannon"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiGithub />
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 overflow-hidden rounded-lg grayscale md:h-32 md:w-32">
                  <Image
                    src="/assets/landing/about/jamie.webp"
                    className="h-full w-full object-cover grayscale"
                    alt="Jamie"
                    width={800}
                    height={800}
                    layout="fill"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold md:text-2xl">Jamie Good</h4>
                  <h5 className="text-slate-400">COO & Co-founder</h5>
                  <div className="mt-2 flex items-center space-x-4">
                    <a
                      href="https://www.linkedin.com/in/jamiegood/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiLinkedin />
                    </a>
                    <a
                      href="https://twitter.com/JamiePGood"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiTwitter />
                    </a>
                    <a
                      href="https://github.com/jamiegood"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiGithub />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 overflow-hidden rounded-lg grayscale md:h-32 md:w-32">
                  <Image
                    src="/assets/landing/about/henrique.webp"
                    className="h-full w-full object-cover grayscale"
                    alt="Henrique"
                    width={800}
                    height={800}
                    layout="fill"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold md:text-2xl">
                    Henrique Oliveira
                  </h4>
                  <h5 className="text-slate-400">Senior Engineer</h5>
                  <div className="mt-2 flex items-center space-x-4">
                    <a
                      href="https://www.linkedin.com/in/h3nrik/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiLinkedin />
                    </a>
                    <a
                      href="https://twitter.com/h3n_rik"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiTwitter />
                    </a>

                    <a
                      href="https://github.com/Henrique-Oliveira"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiGithub />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 mb-40 max-w-4xl space-y-10 px-4 md:px-0">
          <h4 className="text-center font-intertight text-2xl font-bold md:text-left">
            Supported and backed by
          </h4>
          <div className="mt-4 space-y-4">
            <div className="flex flex-col items-center space-y-8 md:flex-row md:space-y-0 md:space-x-20">
              <div className="flex flex-col space-y-4 text-center">
                <div className="h-12 w-auto overflow-hidden grayscale">
                  <Image
                    src="/assets/landing/about/ei.webp"
                    className="h-full w-full object-cover grayscale"
                    alt="Enterprise Ireland"
                    width={800}
                    height={800}
                    layout="fill"
                  />
                </div>
                <span className="text-sm">High Potential Startup</span>
              </div>
              <div className="flex flex-col space-y-4 text-center">
                <div className="h-12 w-auto overflow-hidden rounded-lg grayscale">
                  <Image
                    src="/assets/landing/about/ndrc.webp"
                    className="h-full w-full object-cover grayscale"
                    alt="NDRC"
                    width={800}
                    height={800}
                    layout="fill"
                  />
                </div>
                <span className="text-sm">Accelerator 2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
