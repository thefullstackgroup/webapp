export const navigation = [
  {
    href: false,
    label: 'Browse',
    children: true,
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
        href: '/explore/popular/all',
        label: 'Browse all projects',
        desc: 'Go explore all projects',
        icon: 'FiCornerDownRight',
      },
    ],
  },
  {
    href: '/hangout',
    label: 'Create',
    children: false,
  },
  {
    href: '/hangout',
    label: 'Community',
    children: true,
    childrenOne: [
      {
        href: '/showcase',
        label: 'Sparks',
        desc: 'Kinda like tweets!',
        icon: 'FiZap',
      },
      {
        href: '/showcase',
        label: 'Braindumps',
        desc: 'Long posts from the community',
        icon: 'FiCloud',
      },
      {
        href: '/showcase',
        label: 'Frameworks',
        desc: 'Community suggested frameworks',
        icon: 'FiMaximize',
      },
      {
        href: '/showcase',
        label: 'Utilities',
        desc: 'Cool dev utilities shared',
        icon: 'FiTerminal',
      },
      {
        href: '/showcase',
        label: 'Design Tips',
        desc: "Hey, we're not designers",
        icon: 'FiDroplet',
      },
      {
        href: '/showcase',
        label: 'Articles',
        desc: 'Devs sharing the writing skills',
        icon: 'FiFileText',
      },
    ],
    childrenTwo: [
      {
        href: '/showcase',
        label: 'Polls',
        desc: 'Dev community opinions on topics',
        icon: 'FiPieChart',
      },
      {
        href: '/showcase',
        label: 'Tutorials',
        desc: 'Devs sharing awesome tutotials',
        icon: 'FiHelpCircle',
      },
      {
        href: '/showcase',
        label: 'Learning',
        desc: "We're always learning as a dev",
        icon: 'FiBookOpen',
      },
      {
        href: '/showcase',
        label: 'Memes',
        desc: "Who doesn't like memes!",
        icon: 'FiSmile',
      },
      {
        href: '/showcase',
        label: 'Career Advice',
        desc: 'Here to help with your dev career',
        icon: 'FiBriefcase',
      },
      {
        href: '/showcase',
        label: 'Browse community',
        desc: 'Go hangout in our community',
        icon: 'FiCornerDownRight',
      },
    ],
  },
  { href: '/for/developers', label: 'Developers', children: false },
  { href: '/for/teams', label: 'Teams', children: false },
];
