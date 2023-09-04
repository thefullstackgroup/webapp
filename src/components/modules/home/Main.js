import Link from "next/link";
import Icon from "components/common/elements/Icon";
import Highlight from "components/modules/home/Highlight";
import Discover from "components/modules/home/Discover";
import ProjectCarousel from "components/modules/home/ProjectCarousel";
import { CategoriesFilter } from "components/modules/explore/constants";
import { FcGoogle } from "react-icons/fc";

export const Greeting = ({ name }) => {
  const myDate = new Date();
  const hours = myDate.getHours();
  const firstName = name.split(" ");
  let greet = "";

  if (hours < 12) greet = "Good morning";
  else if (hours >= 12 && hours <= 17) greet = "Good afternoon";
  else if (hours >= 17 && hours <= 24) greet = "Good evening";

  return (
    <div className="w-min font-mono text-base lg:-mb-6 lg:mt-0">
      <div className="greeting-line anim-typewriter flex items-center space-x-2">
        <span>
          {greet},<span className="capitlize">{firstName[0]}!</span>
        </span>
        <span className="hidden lg:block">
          Check these out{" "}
          <Icon name="FiCornerRightDown" className={"inline-flex"} />
        </span>
      </div>
    </div>
  );
};

const Main = ({ user }) => {
  return (
    <div className="min-h-screen space-y-8 px-4 pt-6 lg:pt-0">
      {!user && (
        <div className="rounded-lg bg-transparent dark:bg-transparent">
          <div className="mx-auto max-w-4xl py-10 text-center lg:py-14">
            <div className="relative space-y-10">
              <h1 className="font-manrope text-6xl font-extrabold tracking-tighter text-base-800 dark:text-base-200 xl:text-8xl">
                Unleash your{" "}
                <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                  Developer
                </span>{" "}
                projects.
              </h1>
              <h2 className="mx-auto max-w-2xl text-base font-light tracking-tight text-base-500 dark:text-base-400 xl:text-2xl">
                The Full Stack is an open source platform for developers to
                share projects and grow your developer network.
              </h2>
              <div className="flex flex-col items-center justify-center space-y-2 xl:flex-row xl:space-x-4 xl:space-y-0">
                <Link href="/signup">
                  <button className="btn btn-secondary btn-with-icon w-64 justify-center rounded-full py-2 lg:w-auto">
                    <Icon name="SiGithub" pack="Si" className="h-5 w-5" />
                    <span>Continue with GitHub</span>
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="btn btn-secondary btn-with-icon w-64 justify-center rounded-full py-2 lg:w-auto">
                    <FcGoogle />
                    <span>Continue with Google</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative lg:mt-6">
        {user && (
          <div className="hidden lg:block">
            <Greeting name={user?.name} />
          </div>
        )}
        <Highlight />
      </div>

      <div className="pb-10">
        <Discover user={user} sort="newest" range={90} />
      </div>

      <ProjectCarousel
        title="Recently added"
        sort={"newest"}
        range={60}
        count={15}
        showMore={"/explore/new"}
      />

      <ProjectCarousel
        title="Popular projects"
        sort={"mostpopular"}
        range={365}
        count={15}
        showMore={"/explore/popular"}
      />

      <ProjectCarousel
        title="Open to collaboration"
        sort={"mostpopular"}
        category={{
          label: "Open to Collaboration",
          slug: "opentocollab",
          term: "opentocollab",
          title: "Projects open to collaboration",
          desc: "Discover and connect to developers actively looking for collaborators",
        }}
        range={90}
        count={15}
        showMore={"/explore/popular/opentocollab"}
      />

      <ProjectCarousel
        title="Awesome apps you'll like"
        sort={"mostpopular"}
        category={{
          label: "Apps",
          slug: "apps",
          term: "apps",
          title: "Full stack apps projects",
          desc: "Cool apps built by the community",
        }}
        range={90}
        count={15}
        showMore={"/explore/popular/apps"}
      />

      <ProjectCarousel
        title="Games projects you'll like"
        sort={"mostpopular"}
        category={{
          label: "Games",
          slug: "games",
          term: "games",
          title: "Games",
          desc: "",
        }}
        range={365}
        count={15}
        showMore={"/explore/popular/games"}
      />

      <ProjectCarousel
        title="Dev tools projects"
        sort={"mostpopular"}
        category={{
          label: "Tools",
          slug: "tools",
          term: "tools",
          title: "",
          desc: "",
        }}
        range={90}
        count={15}
        showMore={"/explore/popular/tools"}
      />

      <ProjectCarousel
        title="Open Source projects"
        sort={"mostpopular"}
        category={{
          label: "Open Source",
          slug: "opensource",
          term: "open source",
          title: "",
          desc: "",
        }}
        range={365}
        count={15}
        showMore={"/explore/popular/opensource"}
      />

      <div className="space-y-3 pb-20">
        <div className="flex items-center space-x-2">
          <Icon name="FiTerminal" />
          <h3 className="font-mono text-base font-medium text-base-700 dark:text-base-200">
            Browse by category
          </h3>
        </div>
        <div className="no-scrollbar mt-6 flex flex-wrap gap-4">
          {CategoriesFilter.map(
            (item, index) =>
              item.slug !== "datascience" && (
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
                        name={"FiChevronRight"}
                        className="text-base-300 dark:text-base-400"
                      />
                    </div>
                  </div>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
