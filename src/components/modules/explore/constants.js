export const CategoriesFilter = [
  {
    label: 'All',
    value: '',
  },
  {
    label: 'Open to Collaboration',
    value: 'opentocollab',
  },
  {
    label: 'Apps',
    value: 'apps',
  },
  {
    label: 'Games',
    value: 'games',
  },
  {
    label: 'Open Source',
    value: 'opensource',
  },
  {
    label: 'Tools',
    value: 'tools',
  },
  {
    label: 'Frontend',
    value: 'frontend',
  },
  {
    label: 'Backend',
    value: 'backend',
  },
  {
    label: 'Full Stack',
    value: 'fullstack',
  },
  {
    label: 'Cloud',
    value: 'cloud',
  },
  {
    label: 'AI',
    value: 'ai',
  },
  {
    label: 'Machine Learning',
    value: 'machinelearning',
  },
  {
    label: 'Components',
    value: 'components',
  },
  {
    label: 'Libraries',
    value: 'libraries',
  },
  {
    label: 'Infrastructure',
    value: 'infrastructure',
  },
  {
    label: 'Automation',
    value: 'automation',
  },
  {
    label: 'DevOps',
    value: 'devops',
  },
  {
    label: 'Security',
    value: 'security',
  },
  {
    label: 'Databases',
    value: 'databases',
  },
  {
    label: 'Data Science',
    value: 'datascience',
  },
];

// export const techFilter = [
//   {
//     label: 'JavaScript',
//     value: 'javascript',
//   },
//   {
//     label: 'Java',
//     value: 'java',
//   },
//   {
//     label: 'Typescript',
//     value: 'typescript',
//   },
//   {
//     label: 'NodeJS',
//     value: 'nodejs',
//   },
//   {
//     label: 'PHP',
//     value: 'php',
//   },
//   {
//     label: 'Python',
//     value: 'python',
//   },
//   {
//     label: 'C#',
//     value: 'c',
//   },
//   {
//     label: 'Ruby',
//     value: 'ruby',
//   },
// ];

export const RangeFilter = [
  { value: 7, label: 'Posted this week' },
  { value: 30, label: 'Posted this month' },
  { value: 365, label: 'Posted this year' },
  { value: 900, label: 'All time' },
];

export const SortFilter = [
  { value: 'newest', label: 'Sort by latest' },
  { value: 'mostpopular', label: 'Sort by popular' },
  { value: 'oldest', label: 'Sort by oldest' },
];

export const StackFilter = {
  label: 'Stack',
  icon: 'FiLayers',
  stacks: [
    {
      value: 'javascript',
      label: 'JavaScript',
      icon: 'SiJavascript',
    },
    {
      value: 'react',
      label: 'React',
      icon: 'SiReact',
    },
    {
      value: 'vue',
      label: 'Vue',
      icon: 'SiVuedotjs',
    },
    {
      value: 'nextjs',
      label: 'NextJS',
      icon: 'SiNextdotjs',
    },
    {
      value: 'nuxtjs',
      label: 'NuxtJS',
      icon: 'SiNuxtdotjs',
    },
    {
      value: 'gatsby',
      label: 'Gatsby',
      icon: 'SiGatsby',
    },
    {
      value: 'angular',
      label: 'Angular',
      icon: 'SiAngular',
    },
    {
      value: 'tailwindcss',
      label: 'Tailwind',
      icon: 'SiTailwindcss',
    },
    {
      value: 'chakra',
      label: 'ChakraUI',
      icon: 'SiChakraui',
    },
    {
      value: 'bootstrap',
      label: 'Bootstrap',
      icon: 'SiBootstrap',
    },
    {
      value: 'redux',
      label: 'Redux',
      icon: 'SiRedux',
    },
    {
      value: 'svelte',
      label: 'Svelte',
      icon: 'SiSvelte',
    },
  ],
};
