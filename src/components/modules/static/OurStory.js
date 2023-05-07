import Image from 'next/future/image';
import Link from 'next/link';
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si';

const Main = () => {
  return (
    <div className="bg-black">
      <div className="fixed top-0 left-0 w-full mx-auto min-h-screen mt-16 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-tfsdark-300/40 via-black to-tfsdark-900 flex justify-between"></div>
      <div className="fixed w-1/2 top-0 right-0 opacity-20">
        <Image
          src="/assets/landing/about/nodes.webp"
          className="h-full w-full object-cover grayscale"
          alt="The Full Stack"
          width={800}
          height={800}
          layout="fill"
        />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="pt-24 md:pt-32 max-w-7xl md:max-w-4xl space-y-6 px-4 lg:px-0">
          <Link href="/about/our-story">
            <div className="rounded-full text-slate-300 hover:text-white bg-slate-800/40 border border-tfsdark-700 px-4 py-1 text-sm w-min whitespace-nowrap mb-10 cursor-pointer">
              Our mission
            </div>
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-100 font-intertight flex justify-center -space-y-4">
            Connecting developers to build awesome things.
          </h1>
          <div className="max-w-3xl mx-auto md:mx-0">
            <h4 className="text-slate-300 font-light text-2xl">
              We build platforms that enable developers to grow a network and
              connect to teams to build the most amazing things.
            </h4>
          </div>
        </div>

        <div className="max-w-4xl space-y-10 px-4 md:px-0">
          <div className="mt-40 rounded-full text-slate-300 hover:text-white bg-slate-800/40 border border-tfsdark-700 px-4 py-1 text-sm w-min whitespace-nowrap mb-10 cursor-pointer">
            Our purpose
          </div>
          <h4 className="text-4xl font-bold font-intertight">
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

        <div className="max-w-4xl space-y-10 mt-20 px-4 md:px-0">
          <h4 className="text-2xl font-bold font-intertight">The Team</h4>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex space-x-4 items-center">
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-lg grayscale overflow-hidden">
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
                  <h4 className="text-lg md:text-2xl font-bold">Noel Maher</h4>
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

              <div className="flex space-x-4 items-center">
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-lg grayscale overflow-hidden">
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
                  <h4 className="text-lg md:text-2xl font-bold">Phil Bannon</h4>
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
              <div className="flex space-x-4 items-center">
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-lg grayscale overflow-hidden">
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
                  <h4 className="text-lg md:text-2xl font-bold">Jamie Good</h4>
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

              <div className="flex space-x-4 items-center">
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-lg grayscale overflow-hidden">
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
                  <h4 className="text-lg md:text-2xl font-bold">
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

        <div className="max-w-4xl space-y-10 mt-32 mb-40 px-4 md:px-0">
          <h4 className="text-2xl font-bold font-intertight text-center md:text-left">
            Supported and backed by
          </h4>
          <div className="mt-4 space-y-4">
            <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-20 items-center">
              <div className="flex flex-col text-center space-y-4">
                <div className="w-auto h-12 grayscale overflow-hidden">
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
              <div className="flex flex-col text-center space-y-4">
                <div className="w-auto h-12 rounded-lg grayscale overflow-hidden">
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
