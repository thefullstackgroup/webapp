import Icon from 'components/common/elements/Icon';
import { CategoriesFilter } from 'components/modules/explore/constants';
import Image from 'next/future/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Page = () => {
  const [expiryTime, setExpiryTime] = useState('15 oct 2023 23:59:59');
  const [countdownTime, setCountdownTime] = useState({
    countdownDays: '',
    countdownHours: '',
    countdownMinutes: '',
    countdownSeconds: '',
  });

  const countdownTimer = () => {
    const timeInterval = setInterval(() => {
      const countdownDateTime = new Date(expiryTime).getTime();
      const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime;
      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(
        (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const totalMinutes = Math.floor(
        (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

      const runningCountdownTime = {
        countdownDays: totalDays,
        countdownHours: totalHours,
        countdownMinutes: totalMinutes,
        countdownSeconds: totalSeconds,
      };

      setCountdownTime(runningCountdownTime);

      if (remainingDayTime < 0) {
        clearInterval(timeInterval);
        setExpiryTime(false);
      }
    }, 1000);
  };

  useEffect(() => {
    countdownTimer();
  });

  return (
    <div className="bg-transparent dark:bg-black">
      <div className="relative z-10 mx-auto mt-10 mb-20 max-w-5xl space-y-10">
        <h1 className="mb-12 px-4 text-center font-manrope text-3xl font-bold tracking-tighter md:text-7xl">
          Announcing our first Hackathon!
        </h1>

        <div className="relative h-[550px] w-full">
          <div className="h-[550px] w-full overflow-hidden rounded-2xl bg-black">
            <Image
              src={'/assets/landing/hackathon/competition-cover.webp'}
              alt="The Full Stack Hackathon"
              width="800"
              height="800"
              className="h-full w-full object-cover opacity-80"
              layout="fill"
            />
          </div>
          <div className="absolute top-1/3 flex w-full flex-col bg-black/70 py-8 text-center">
            <span className="text-6xl font-bold uppercase tracking-tight text-white">
              TFS Hackathon
            </span>
            <span className="font-mono text-2xl font-medium text-white">
              September 17th - October 15th
            </span>
          </div>
        </div>
        <div className="max-w-full space-y-10 px-4 text-xl">
          <div className="space-y-10 px-20">
            <p className="text-center">
              We’re annoucning our first hackathon for you or your team to build
              an awesome project, learn something new, win awesome prizes and
              ultimately have fun. We hope you’ll throw your hat into the ring
              by participating! Are you in?
            </p>
            <p className="flex justify-center gap-4">
              <a
                href="https://forms.gle/tGkCWjExJzY8YKTQ8"
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn btn-primary rounded-full px-10 py-4 text-xl">
                  Register here
                </button>
              </a>
            </p>
          </div>

          {expiryTime !== false ? (
            <div className="mx-auto flex max-w-md items-center gap-4">
              <div className="box flex w-80 flex-col bg-transparent text-center">
                <span className="text-4xl font-semibold">
                  {countdownTime.countdownDays}
                </span>
                <span className="text-base text-base-400 dark:text-base-500">
                  Days
                </span>
              </div>
              <div className="box flex w-80 flex-col bg-transparent text-center">
                <span className="text-4xl font-semibold">
                  {countdownTime.countdownHours}
                </span>
                <span className="text-base text-base-400 dark:text-base-500">
                  Hours
                </span>
              </div>
              <div className="box flex w-80 flex-col bg-transparent text-center">
                <span className="text-4xl font-semibold">
                  {countdownTime.countdownMinutes}
                </span>
                <span className="text-base text-base-400 dark:text-base-500">
                  Minutes
                </span>
              </div>
              <div className="box flex w-80 flex-col bg-transparent text-center">
                <span className="text-4xl font-semibold">
                  {countdownTime.countdownSeconds}
                </span>
                <span className="text-base text-base-400 dark:text-base-500">
                  Seconds
                </span>
              </div>
            </div>
          ) : (
            <p>Entry is closed</p>
          )}
        </div>
      </div>

      <div className="bg-base-200/50 py-20 dark:bg-base-800">
        <div className="mx-auto max-w-4xl space-y-10">
          <div>
            <div className="flex items-center gap-8">
              <div className="box flex w-full flex-col py-8 text-center">
                <span className="text-xl text-base-500 dark:text-cyan-default">
                  Hackathon starts:
                </span>
                <span className="text-3xl font-semibold">Sep 17th</span>
              </div>
              <div>
                <Icon
                  name="FiArrowRight"
                  className={'h-8 w-8 text-base-400 dark:text-base-500'}
                />
              </div>
              <div className="box flex w-full flex-col py-8 text-center">
                <span className="text-xl text-base-500 dark:text-cyan-default">
                  Hackathon ends:
                </span>
                <span className="text-3xl font-semibold">Oct 15th</span>
              </div>
              <div>
                <Icon
                  name="FiArrowRight"
                  className={'h-8 w-8 text-base-400 dark:text-base-500'}
                />
              </div>
              <div className="box flex w-full flex-col py-8 text-center">
                <span className="text-xl text-base-500 dark:text-cyan-default">
                  Winners announced:
                </span>
                <span className="text-3xl font-semibold">Oct 29th</span>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-2xl space-y-8">
            <p className="text-center text-xl">
              Register your name or team name and just start building. You will
              have until October 17th to submit your project to the Hackathon.
            </p>
            <p className="flex justify-center">
              <a
                href="https://forms.gle/tGkCWjExJzY8YKTQ8"
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn btn-primary rounded-full px-10 py-4 text-xl">
                  Register here &rarr;
                </button>
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="mx-auto max-w-4xl space-y-20">
          <div className="space-y-10">
            <h2 className="text-center font-manrope text-4xl font-bold">
              Awesome prizes to be won
            </h2>

            <div className="h-[350px] w-full overflow-hidden rounded-2xl">
              <Image
                src={'/assets/landing/hackathon/competition-cover.webp'}
                alt="The Full Stack Hackathon"
                width="800"
                height="800"
                className="h-full w-full object-cover"
                layout="fill"
              />
            </div>
            <div className="text-center text-xl">
              The winner will receive amazing prizes that include a customized
              mechanical keyboard of your choosing up to a value of $500. Unique
              one time only custom made swag made for you, including hat, hoody,
              t-shirts, water bottle, laptop bag, mugs, and more. Paid hosting
              or dev tooling year long subscriptions of your choice and gift
              cards for Thomann music. Runners up for second and third place
              will receive one time only swag including hat, hoody, t-shirts,
              water bottle, laptop bag, mugs, and more along with gift card
              subscriptions of your choice.
            </div>
          </div>

          <div className="space-y-10 text-center">
            <h2 className="text-center font-manrope text-4xl font-bold">
              Judges
            </h2>
            <p className="text-center text-xl">
              As The Full Stack is a community of developers, the judging will
              be based on the number of votes given to projects that are
              submitted for the hackathon. Therefore the project with the
              highest number of votes will be the winner. And the projects with
              second and third highest votes will be deemed the runners up.
            </p>
          </div>

          <div className="space-y-10">
            <h2 className="text-center font-manrope text-4xl font-bold">
              Useful Resources
            </h2>
            <p className="text-center text-xl">
              Check and explore the projects here to get inspiration and help to
              build your project idea.
            </p>
            <div className="no-scrollbar mt-6 flex flex-wrap gap-4">
              {CategoriesFilter.map(
                (item, index) =>
                  item.slug !== 'datascience' && (
                    <Link href={`/explore/popular/${item.slug}`} key={index}>
                      <div className="group flex w-72 grow cursor-pointer flex-col justify-between rounded-lg border border-base-200 bg-base-100 p-4 text-left duration-200 hover:border-base-700 hover:bg-base-50 dark:border-base-700 dark:bg-base-900 dark:hover:border-base-100 dark:hover:bg-base-900 lg:h-32 xl:max-w-[350px]">
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

          <div className="space-y-10 text-center">
            <h2 className="text-center font-manrope text-4xl font-bold">
              Looking for someone to pair up?
            </h2>
            <p className="text-center text-xl">
              Head over to the{' '}
              <Link href="/hangout">
                <span className="text-link cursor-pointer">
                  Hangout section
                </span>
              </Link>{' '}
              and share a post looking for people to pair up for the Hackathon.
            </p>
          </div>

          <div>
            <h2 className="text-center font-manrope text-xl font-semibold">
              Goodluck and happy coding!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
