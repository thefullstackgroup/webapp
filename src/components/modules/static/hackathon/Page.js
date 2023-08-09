import Icon from 'components/common/elements/Icon';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="bg-transparent dark:bg-black">
      <div className="relative h-[350px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
          alt="Announcing our first Hackathon"
          width={2000}
          height={350}
          className="rotate-180 object-cover"
        />
        <div className="absolute bottom-8 w-full px-8 text-right">
          <span className="font-manrope text-xl font-semibold">
            September 22 - October 20
          </span>
        </div>
      </div>
      <div className="relative z-10 mx-auto mt-10 mb-20 max-w-5xl">
        <h1 className="mb-12 px-4 font-manrope text-3xl font-bold tracking-tighter md:text-6xl">
          Announcing our first Hackathon!
        </h1>
        <div className="prose max-w-full space-y-10 px-4 dark:prose-dark">
          <div>
            <p>Hey All!</p>
            <p>
              Today, we’re launching a new way for you to build an interesting
              application in the open, learn something new, and win awesome
              prizes in the process.
            </p>
            <p>
              If you’re familiar with hackathons, you know any dev community has
              a lot of fun with them and gets pretty creative with what they
              build. We hope you’ll throw your hat into the ring by
              participating in our first Hackathon!
            </p>
            <p>
              Keep reading to get all the details on how you can enter and learn
              more about the prizes we’re offering to the community.
            </p>
          </div>

          <div className="box">
            <h2>Important dates:</h2>
            <ul>
              <li>Start date: 25th August 2023</li>
              <li>End date: 22nd September 2023</li>
              <li>Winners announcement date: 24th September 2023</li>
            </ul>
          </div>

          <div>
            <h2>How to enter:</h2>
            <p>Some text here how to enter....</p>
          </div>

          <div>
            <h2>The prizes:</h2>

            <div className="grid grid-cols-3 items-start gap-4">
              <div className="box h-[400px]">
                <div className="flex items-center justify-between">
                  <h2>Winner</h2>
                  <Icon
                    name="IoTrophyOutline"
                    pack="Io"
                    className={'h-10 w-10'}
                  />
                </div>
                <ul className="mt-4 space-y-3 pl-0 text-sm leading-8 text-gray-600">
                  <li className="flex gap-x-3 pl-0">
                    <Icon
                      name="FiCheck"
                      className="h-6 w-5 flex-none text-green-500"
                    />
                    Customized mechanical keyboard to your choosing.
                  </li>
                  <li className="flex gap-x-3 pl-0">
                    <Icon
                      name="FiCheck"
                      className="h-6 w-5 flex-none text-green-500"
                    />
                    Gift cards for hosting subscription of your choice.
                  </li>
                  <li className="flex gap-x-3 pl-0">
                    <Icon
                      name="FiCheck"
                      className="h-6 w-5 flex-none text-green-500"
                    />
                    Unique one time only custom made swag made for you.
                  </li>
                  <li className="flex gap-x-3 pl-0">
                    <Icon
                      name="FiCheck"
                      className="h-6 w-5 flex-none text-green-500"
                    />
                    Featured project and social share
                  </li>
                </ul>
              </div>

              <div className="box h-[400px]">
                <div className="flex items-center justify-between">
                  <h2>First Runner Up</h2>
                  <Icon
                    name="IoRibbonOutline"
                    pack="Io"
                    className={'h-10 w-10'}
                  />
                </div>
                <ul className="mt-4 space-y-3 pl-0 text-sm leading-8 text-gray-600">
                  <li className="flex gap-x-3 pl-0">
                    <Icon
                      name="FiCheck"
                      className="h-6 w-5 flex-none text-green-500"
                    />
                    Unique one time only custom made swag made for you.
                  </li>
                  <li className="flex gap-x-3 pl-0">
                    <Icon
                      name="FiCheck"
                      className="h-6 w-5 flex-none text-green-500"
                    />
                    Gift cards for hosting subscription of your choice.
                  </li>
                  <li className="flex gap-x-3 pl-0">
                    <Icon
                      name="FiCheck"
                      className="h-6 w-5 flex-none text-green-500"
                    />
                    Featured project and social share
                  </li>
                </ul>
              </div>

              <div className="box h-[400px]">
                <div className="flex items-center justify-between">
                  <h2>Second Runner Up</h2>
                  <Icon
                    name="IoRibbonOutline"
                    pack="Io"
                    className={'h-10 w-10'}
                  />
                </div>
                <ul className="mt-4 space-y-3 pl-0 text-sm leading-8 text-gray-600">
                  <li className="flex gap-x-3 pl-0">
                    <Icon
                      name="FiCheck"
                      className="h-6 w-5 flex-none items-start text-green-500"
                    />
                    Unique one time only custom made swag made for you.
                  </li>
                  <li className="flex gap-x-3 pl-0">
                    <Icon
                      name="FiCheck"
                      className="h-6 w-5 flex-none text-green-500"
                    />
                    Gift cards for hosting subscription of your choice.
                  </li>
                  <li className="flex gap-x-3 pl-0">
                    <Icon
                      name="FiCheck"
                      className="h-6 w-5 flex-none text-green-500"
                    />
                    Featured project and social share
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2>The judging</h2>
            <p>
              Projects will be judged based on the following criteria:
              <ul>
                <li>Project Idea: How useful is the idea/solution?</li>
                <li>
                  UX: How well did your app function, and how simple was it to
                  use?
                </li>
                <li>
                  Write up: How constructive, crisp, and informative is the
                  project description?
                </li>
              </ul>
            </p>
          </div>

          <div>
            <h2>Useful resources</h2>
            <p>
              Check out these useful resources to get ideas and look to help
              build your project idea:
              <ul>
                <li>APIVault</li>
                <li>The Full Stack API</li>
                <li>...</li>
              </ul>
            </p>
          </div>

          <div>
            <h2>Where to get help / pair up?</h2>
            <p>Text here...</p>
          </div>

          <div>
            <h2>How to get started</h2>
            <p>Text here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
