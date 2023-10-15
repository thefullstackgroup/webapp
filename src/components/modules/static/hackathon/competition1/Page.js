import Icon from 'components/common/elements/Icon';
import { CategoriesFilter } from 'components/modules/explore/constants';
import Image from 'next/future/image';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="bg-transparent dark:bg-black">
      <div className="relative z-10 mx-auto mb-20 max-w-5xl space-y-10 sm:pt-14">
        <div className="relative h-64 w-full sm:h-[500px]">
          <div className="h-64 w-full overflow-hidden bg-black sm:h-[500px] sm:rounded-2xl">
            <Image
              src={
                'https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
              }
              alt="The Full Stack Hackathon"
              width="800"
              height="800"
              className="h-full w-full object-cover opacity-60"
              layout="fill"
            />
          </div>
          <div className="absolute top-14 flex w-full flex-col space-y-2 text-center sm:top-28 sm:py-8">
            <div className="mx-auto h-16 w-16 cursor-pointer overflow-hidden">
              <Image
                src={'/assets/icons/thefullstack-dark.webp'}
                className="object-contain"
                alt="The Full Stack"
                width={200}
                height={200}
              />
            </div>
            <span className="font-manrope text-2xl font-bold uppercase tracking-tight text-white sm:text-6xl">
              Hackathon #1
            </span>
            <span className="font-mono text-base font-medium text-white sm:text-2xl">
              September 17th - October 15th
            </span>
          </div>
        </div>
        <h1 className="mb-12 px-4 text-center font-manrope text-3xl font-bold tracking-tighter md:text-6xl">
          Announcing our first Hackathon!
        </h1>
        <div className="max-w-full space-y-10 px-4 text-xl">
          <div className="space-y-10 px-4 sm:px-20">
            <p className="text-center">
              We&apos;re announcing our first hackathon for you or your team to
              build an awesome project, get exposure, learn something new, win
              awesome prizes and ultimately have fun.
            </p>

            <div className="flex justify-center gap-4">
              <Link href="/hackathon/entries">
                <button className="btn btn-primary rounded-full px-10 py-4 text-xl font-medium">
                  Vote your favourite project &rarr;
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="mx-auto max-w-4xl space-y-20">
          <div className="space-y-6 px-4">
            <h2 className="font-manrope text-4xl font-bold">Prizes</h2>

            <div className="h-52 w-full overflow-hidden rounded-2xl sm:h-[420px]">
              <Image
                src={'/assets/landing/hackathon/competition-cover.webp'}
                alt="The Full Stack Hackathon"
                width="800"
                height="800"
                className="h-full w-full object-cover object-center"
                layout="fill"
              />
            </div>
            <div className="text-xl">
              The winner (or members of winning team) will receive amazing
              prizes that include a{' '}
              <span className="underline">customized mechanical keyboard</span>{' '}
              of your choosing up to a value of $500. Unique{' '}
              <span className="underline">one time only custom made swag</span>{' '}
              made for you, including hat, hoody, t-shirts, water bottle, laptop
              bag, mugs, and more. Paid hosting or dev tooling{' '}
              <span className="underline">year long subscriptions</span> of your
              choice and gift cards for Thomann music. Runners up for second and
              third place will receive one time only swag including hat, hoody,
              t-shirts, water bottle, laptop bag, mugs, and more along with gift
              card subscriptions of your choice.
            </div>
          </div>

          <div className="space-y-6 px-4">
            <h2 className="font-manrope text-4xl font-bold">Raffle</h2>
            <p className="text-xl">
              For everyone who registers, you will be entered into a raffle to
              be in with a chance to receive one time only swag including hat,
              hoody, t-shirts, water bottle, laptop bag, mugs, and more along
              with gift card subscriptions of your choice. As this is our first
              hackathon, we would love for as many people to participate and
              have fun. Please share this hackathon with your friends or on your
              social accounts, and you too will be entered into a raffle to be
              in with a chance to receive one time only swag.
            </p>
          </div>

          <div className="space-y-6 px-4">
            <h2 className="font-manrope text-4xl font-bold">Judges</h2>
            <p className="text-xl">
              As The Full Stack is a community, the judging will be community
              based. All project submissions will be posted here on The Full
              Stack and open to the community to vote on. Therefore the project
              with the highest number of votes will be the winner. And the
              projects with second and third highest votes will be deemed the
              runners up.
            </p>
          </div>

          <div className="space-y-6 px-4">
            <h2 className="font-manrope text-4xl font-bold">How to enter</h2>

            <ul className="ml-6 list-disc text-xl">
              <li>
                If you are not already a member,{' '}
                <Link href="/signup">
                  <a href="#" className="text-link">
                    sign up
                  </a>
                </Link>{' '}
                to The Full Stack
              </li>
              <li>
                Once you are logged in, click &apos;Add Your Project&apos;
                button in the header
              </li>
              <li>Import your project from GitHub or Create from scratch.</li>
              <li>
                Add all the information about your project. Suggest to add a
                short video demo of your project.
              </li>
              <li>Select YES to enter your project to the Hackathon</li>
              <li>Then &apos;Publish&apos; your project!</li>
            </ul>
            <p className="text-xl">
              If you have an existing project already published on The Full
              Stack, just go to your project, click on Edit Project and select
              YES to enter your project to the Hackathon.
            </p>
          </div>

          <div className="space-y-6 px-4">
            <h2 className="font-manrope text-4xl font-bold">Rules</h2>

            <ul className="ml-6 list-disc text-xl">
              <li>
                Team size 1-5 (all team members on a winning team will receive
                the prizes)
              </li>
              <li>It&apos;s not a requirement to use AI</li>
              <li>Can be any language or framework</li>
              <li>All entries preferably be Open Source, but not mandatory</li>
              <li>All submissions must be posted on The Full Stack</li>
              <li>You must submit your project before the deadline</li>
            </ul>
          </div>

          <div className="space-y-6 px-4">
            <h2 className="font-manrope text-4xl font-bold">
              Useful Resources
            </h2>
            <p className="text-xl">
              Explore projects from the community to get inspiration and help
              get you started.
            </p>
            <div className="no-scrollbar mt-6 flex flex-wrap gap-4">
              {CategoriesFilter.map(
                (item, index) =>
                  item.slug !== 'datascience' && (
                    <Link href={`/explore/popular/${item.slug}`} key={index}>
                      <div className="group flex w-64 grow cursor-pointer flex-col justify-between rounded-lg border border-base-200 bg-base-100 p-4 text-left duration-200 hover:border-base-700 hover:bg-base-50 dark:border-base-700 dark:bg-base-900 dark:hover:border-base-100 dark:hover:bg-base-900 lg:h-32 xl:max-w-[350px]">
                        <div className="flex flex-col">
                          <span className="text-base font-medium text-base-700 group-hover:text-base-700 dark:text-base-200 dark:group-hover:text-base-100">
                            {item.label}
                          </span>
                          <span className="text-sm text-base-300 dark:text-base-400">
                            {item.desc}
                          </span>
                        </div>
                        <div className="hidden justify-end lg:flex">
                          <Icon
                            name={'FiChevronRight'}
                            className="text-base-300 dark:text-base-400"
                          />
                        </div>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </div>

          <div className="space-y-6 px-4">
            <h2 className="font-manrope text-4xl font-bold">Community Help</h2>
            <p className="text-xl">
              Head over to the{' '}
              <Link href="/hangout">
                <span className="text-link cursor-pointer">
                  Hangout section
                </span>
              </Link>{' '}
              and ask the community for help. Come join us. Tag your post with
              #pairup if you are looking for others to collaborate with for the
              Hackathon.
            </p>
          </div>

          <div className="space-y-6 px-4">
            <h2 className="font-manrope text-4xl font-bold">Additional Info</h2>
            <p className="text-xl">
              To keep up to date on news and progress throughout the hackathon,
              head over to our{' '}
              <Link href="/hangout/hackathon">
                <span className="text-link cursor-pointer">
                  Hackathon hangout
                </span>
              </Link>
              . Share updates on how you are progressing with your project
              build. And seek out help if needs be. We&apos;re here to help and
              learn too.
            </p>
            <p className="text-xl">
              Any intellectual property developed during the hackathon will
              belong to the person or team that developed it. The Full Stack
              does not make any claims over your IP.
            </p>
          </div>

          <p className="flex justify-center">
            <Link href="/hackathon/entries">
              <button className="btn btn-primary rounded-full px-10 py-4 text-xl">
                Vote your favourite project &rarr;
              </button>
            </Link>
          </p>

          <div>
            <h2 className="text-center font-manrope text-xl font-semibold">
              Good luck ... and happy coding !
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
