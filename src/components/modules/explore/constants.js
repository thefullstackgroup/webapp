export const CategoriesFilter = [
  {
    label: 'All',
    slug: '',
    term: '',
  },
  {
    label: 'Open to Collaboration',
    slug: 'opentocollab',
    term: 'opentocollab',
    title: 'Projects open to collaboration',
    desc: 'Discover and connect to developers actively looking for collaborators',
  },
  {
    label: 'Apps',
    slug: 'apps',
    term: 'apps',
    title: 'Full stack apps projects',
    desc: 'Cool apps built by the community',
  },
  {
    label: 'Games',
    slug: 'games',
    term: 'games',
    title: 'Games',
    desc: '',
  },
  {
    label: 'Open Source',
    slug: 'opensource',
    term: 'opensource',
    title: '',
    desc: '',
  },
  {
    label: 'Tools',
    slug: 'tools',
    term: 'tools',
    title: '',
    desc: '',
  },
  {
    label: 'Frontend',
    slug: 'frontend',
    term: 'frontend',
    title: '',
    desc: '',
  },
  {
    label: 'Backend',
    slug: 'backend',
    term: 'backend',
    title: '',
    desc: '',
  },
  {
    label: 'Full Stack',
    slug: 'fullstack',
    term: 'fullstack',
    title: '',
    desc: '',
  },
  {
    label: 'Cloud',
    slug: 'cloud',
    term: 'cloud',
    title: '',
    desc: '',
  },
  {
    label: 'AI',
    slug: 'ai',
    term: 'ai',
    title: '',
    desc: '',
  },
  {
    label: 'Machine Learning',
    slug: 'machinelearning',
    term: 'machine learning',
    title: '',
    desc: '',
  },
  {
    label: 'Components',
    slug: 'components',
    term: 'components',
    title: '',
    desc: '',
  },
  {
    label: 'Libraries',
    slug: 'libraries',
    term: 'libraries',
    title: '',
    desc: '',
  },
  {
    label: 'Infrastructure',
    slug: 'infrastructure',
    term: 'infrastructure',
    title: '',
    desc: '',
  },
  {
    label: 'Automation',
    slug: 'automation',
    term: 'automation',
    title: '',
    desc: '',
  },
  {
    label: 'DevOps',
    slug: 'devops',
    term: 'devops',
    title: '',
    desc: '',
  },
  {
    label: 'Security',
    slug: 'security',
    term: 'security',
    title: '',
    desc: '',
  },
  {
    label: 'Databases',
    slug: 'databases',
    term: 'databases',
    title: '',
    desc: '',
  },
  {
    label: 'Data Science',
    slug: 'datascience',
    term: 'data science',
    title: '',
    desc: '',
  },
];

export const RangeFilter = [
  { days: 7, label: 'Posted this week' },
  { days: 30, label: 'Posted this month' },
  { days: 365, label: 'Posted this year' },
  { days: 900, label: 'All time' },
];

export const SortFilter = [
  { orderBy: 'newest', label: 'Sort by latest' },
  { orderBy: 'mostpopular', label: 'Sort by popular' },
  { orderBy: 'oldest', label: 'Sort by oldest' },
];

export const StackFilter = {
  label: 'Stack filter',
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
