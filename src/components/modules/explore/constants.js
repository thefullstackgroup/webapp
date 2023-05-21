export const Categories = [
  {
    title: 'New',
    slug: 'recent',
    sort: 'newest',
  },
  {
    title: 'Trending',
    slug: 'trending',
    sort: 'mostpopular',
  },
  {
    title: 'For You',
    slug: 'foryou',
    sort: 'newest',
  },
  {
    title: 'Following',
    slug: 'following',
    filter: 'following',
    sort: 'newest',
  },
  {
    title: 'Popular',
    slug: 'popular',
    sort: 'mostpopular',
  },
  {
    title: 'Open to Collaboration',
    slug: 'opentocollab',
    sort: 'newest',
  },
  {
    title: 'Apps',
    slug: 'apps',
    sort: 'newest',
  },
  {
    title: 'Games',
    slug: 'games',
    sort: 'newest',
  },
  {
    title: 'Open Source',
    slug: 'opensource',
    sort: 'newest',
  },
  {
    title: 'Tools',
    slug: 'tools',
    sort: 'newest',
  },
  {
    title: 'Frontend',
    slug: 'frontend',
    sort: 'newest',
  },
  {
    title: 'Backend',
    slug: 'backend',
    sort: 'newest',
  },
  {
    title: 'Full Stack',
    slug: 'fullstack',
    sort: 'newest',
  },
  {
    title: 'Cloud',
    slug: 'cloud',
    sort: 'newest',
  },
  {
    title: 'AI',
    slug: 'ai',
    sort: 'newest',
  },
  {
    title: 'Machine Learning',
    slug: 'machinelearning',
    sort: 'newest',
  },
  {
    title: 'Components',
    slug: 'components',
    sort: 'newest',
  },
  {
    title: 'Libraries',
    slug: 'libraries',
    filter: 'libraries',
    sort: 'newest',
  },
  {
    title: 'Infrastructure',
    slug: 'infrastructure',
    filter: 'infrastructure',
    sort: 'newest',
  },
  {
    title: 'Automation',
    slug: 'automation',
    sort: 'newest',
  },
  {
    title: 'DevOps',
    slug: 'devops',
    sort: 'newest',
  },
  {
    title: 'Security',
    slug: 'security',
    sort: 'newest',
  },
  {
    title: 'Databases',
    slug: 'databases',
    sort: 'newest',
  },
  {
    title: 'Data Science',
    slug: 'datascience',
    sort: 'newest',
  },
];

// export const techFilter = [
//   {
//     label: 'JavaScript',
//     slug: 'javascript',
//   },
//   {
//     label: 'Java',
//     slug: 'java',
//   },
//   {
//     label: 'Typescript',
//     slug: 'typescript',
//   },
//   {
//     label: 'NodeJS',
//     slug: 'nodejs',
//   },
//   {
//     label: 'PHP',
//     slug: 'php',
//   },
//   {
//     label: 'Python',
//     slug: 'python',
//   },
//   {
//     label: 'C#',
//     slug: 'c',
//   },
//   {
//     label: 'Ruby',
//     slug: 'ruby',
//   },
// ];

// export const categoriesFilter = [
//   'apps',
//   'games',
//   'opensource',
//   'tools',
//   'infrastructure',
//   'databases',
//   'data science',
//   'frontend',
//   'backend',
//   'fullstack',
//   'cloud',
//   'AI',
//   'machine learning',
//   'components',
//   'libraries',
//   'automation',
//   'devops',
//   'security',
// ];

export const RangeFilter = [
  { value: 7, label: 'Posted this week', icon: 'FiClock' },
  { value: 30, label: 'Posted this month', icon: 'FiClock' },
  { value: 365, label: 'Posted this year', icon: 'FiClock' },
  { value: 900, label: 'All time', icon: 'FiClock' },
];

export const SortFilter = [
  { value: 'newest', label: 'Newest', icon: 'FiClock' },
  { value: 'mostpopular', label: 'Popular', icon: 'FiClock' },
  { value: 'oldest', label: 'Oldest', icon: 'FiClock' },
];

export const StackFilter = {
  label: 'Stack',
  icon: 'FiLayers',
  stacks: [
    {
      slug: 'javascript',
      label: 'JavaScript',
      icon: 'SiJavascript',
    },
    {
      slug: 'react',
      label: 'React',
      icon: 'SiReact',
    },
    {
      slug: 'vue',
      label: 'Vue',
      icon: 'SiVuedotjs',
    },
    {
      slug: 'nextjs',
      label: 'NextJS',
      icon: 'SiNextdotjs',
    },
    {
      slug: 'nuxtjs',
      label: 'NuxtJS',
      icon: 'SiNuxtdotjs',
    },
    {
      slug: 'gatsby',
      label: 'Gatsby',
      icon: 'SiGatsby',
    },
    {
      slug: 'angular',
      label: 'Angular',
      icon: 'SiAngular',
    },
    {
      slug: 'tailwindcss',
      label: 'Tailwind',
      icon: 'SiTailwindcss',
    },
    {
      slug: 'chakra',
      label: 'ChakraUI',
      icon: 'SiChakraui',
    },
    {
      slug: 'bootstrap',
      label: 'Bootstrap',
      icon: 'SiBootstrap',
    },
    {
      slug: 'redux',
      label: 'Redux',
      icon: 'SiRedux',
    },
    {
      slug: 'svelte',
      label: 'Svelte',
      icon: 'SiSvelte',
    },
  ],
};
