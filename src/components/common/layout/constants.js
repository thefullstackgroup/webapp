export const navigation = [
  {
    href: false,
    label: 'Showcase',
    children: true,
    slug: 'explore',
    childrenOne: [
      {
        href: '/explore/popular',
        label: 'Popular projects',
        desc: 'Most voted by the community',
        icon: 'FiStar',
      },
      {
        href: '/explore/trending',
        label: 'Trending projects',
        desc: 'Projects trending in the community',
        icon: 'FiTrendingUp',
      },
      {
        href: '/explore/new',
        label: 'Latest projects',
        desc: 'Recently added to the showcase',
        icon: 'FiClock',
      },
      {
        href: '/explore/popular/opentocollab',
        label: 'Open to collaboration',
        desc: 'Projects looking for contributors',
        icon: 'FiUsers',
      },
    ],
    childrenTwo: [
      {
        href: '/explore/popular/opensource',
        label: 'Open Source',
        desc: 'Get inspired under the hood',
        icon: 'FiUnlock',
      },
      {
        href: '/explore/popular/apps',
        label: 'Apps',
        desc: 'Cool apps built by the commmunity',
        icon: 'FiPackage',
      },
      {
        href: '/explore/popular/tools',
        label: 'Tools',
        desc: 'Devs solving their own problems',
        icon: 'FiTool',
      },
      {
        href: '/explore/popular',
        label: 'Browse all projects',
        desc: 'Go explore all projects',
        icon: 'FiCornerDownRight',
      },
    ],
  },
  {
    href: '/hangout',
    label: 'Hangout',
    children: true,
    slug: 'hangout',
    childrenOne: [
      {
        href: '/hangout/spark',
        label: 'Sparks',
        desc: 'Kinda like tweets!',
        icon: 'FiZap',
      },
      {
        href: '/hangout/post',
        label: 'Braindumps',
        desc: 'Long posts from the community',
        icon: 'FiCloud',
      },
      {
        href: '/hangout/frameworks',
        label: 'Frameworks',
        desc: 'Community suggested frameworks',
        icon: 'FiMaximize',
      },
      {
        href: '/hangout/utilities',
        label: 'Utilities',
        desc: 'Cool dev utilities shared',
        icon: 'FiTerminal',
      },
      {
        href: '/hangout/design_tips',
        label: 'Design Tips',
        desc: "Hey, we're not designers",
        icon: 'FiDroplet',
      },
      {
        href: '/hangout/article',
        label: 'Articles',
        desc: 'Devs sharing the writing skills',
        icon: 'FiFileText',
      },
    ],
    childrenTwo: [
      {
        href: '/hangout/poll',
        label: 'Polls',
        desc: 'Dev community opinions on topics',
        icon: 'FiPieChart',
      },
      {
        href: '/hangout/tutorials',
        label: 'Tutorials',
        desc: 'Devs sharing awesome tutotials',
        icon: 'FiYoutube',
      },
      {
        href: '/hangout/learning',
        label: 'Learning',
        desc: "We're always learning as a dev",
        icon: 'FiBookOpen',
      },
      {
        href: '/hangout/meme',
        label: 'Memes',
        desc: "Who doesn't like memes!",
        icon: 'FiSmile',
      },
      {
        href: '/hangout/career_advice',
        label: 'Career Advice',
        desc: 'Here to help with your dev career',
        icon: 'FiBriefcase',
      },
      {
        href: '/hangout',
        label: 'Browse community',
        desc: 'Go hangout in our community',
        icon: 'FiCornerDownRight',
      },
    ],
  },
  {
    href: '/for/developers',
    label: 'Developers',
    children: false,
    slug: 'developers',
  },
  { href: '/for/teams', label: 'Teams', children: false, slug: 'teams' },
];
