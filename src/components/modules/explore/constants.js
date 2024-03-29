export const CategoriesFilter = [
  // {
  //   label: 'All',
  //   slug: '',
  //   term: '',
  // },
  {
    label: 'Open to Collaboration',
    slug: 'opentocollab',
    term: 'opentocollab',
    title: 'Projects open to collaboration',
    desc: 'Find projects and connect to developers looking for collaborators',
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
    desc: 'Explore cool games projects showcased',
  },
  {
    label: 'Open Source',
    slug: 'opensource',
    term: 'open source',
    title: '',
    desc: 'Developer projects that are open source',
  },
  {
    label: 'Tools',
    slug: 'tools',
    term: 'tools',
    title: 'Tools built by devs',
    desc: 'Useful tools built by developers',
  },
  {
    label: 'Frontend',
    slug: 'frontend',
    term: 'frontend',
    title: 'Awesome frontend projects',
    desc: 'Browse projects that are all things frontend',
  },
  {
    label: 'Backend',
    slug: 'backend',
    term: 'backend',
    title: 'Solid, scalable backend projects',
    desc: 'Browse projects that are all things backend',
  },
  {
    label: 'Full Stack',
    slug: 'fullstack',
    term: 'fullstack',
    title: 'Frontend vs backend',
    desc: 'Browse these awesome full stack developer projects',
  },
  {
    label: 'Cloud',
    slug: 'cloud',
    term: 'cloud',
    title: '',
    desc: 'Projects utilizing the power of the cloud',
  },
  {
    label: 'AI',
    slug: 'ai',
    term: 'AI',
    title: 'All things AI',
    desc: 'The world has become obsessed with AI, check out these projects',
  },
  {
    label: 'Machine Learning',
    slug: 'machinelearning',
    term: 'machine learning',
    title: '',
    desc: 'Projects that utilize the power of machine learning',
  },
  {
    label: 'Components',
    slug: 'components',
    term: 'components',
    title: 'We love components',
    desc: 'Useful components showcased by developers',
  },
  {
    label: 'Libraries',
    slug: 'libraries',
    term: 'libraries',
    title: 'Useful library projects',
    desc: 'Check out these libraries showcased',
  },
  {
    label: 'Infrastructure',
    slug: 'infrastructure',
    term: 'infrastructure',
    title: '',
    desc: 'Projects that utilize and optimise our infrastructure',
  },
  {
    label: 'Automation',
    slug: 'automation',
    term: 'automation',
    title: '',
    desc: 'Anything that can be repeated, automate it',
  },
  {
    label: 'DevOps',
    slug: 'devops',
    term: 'devops',
    title: '',
    desc: 'Developer utilities for the DevOps person in you',
  },
  {
    label: 'Security',
    slug: 'security',
    term: 'security',
    title: '',
    desc: 'Everything we build needs to be secure, check these projects out',
  },
  {
    label: 'Databases',
    slug: 'databases',
    term: 'databases',
    title: '',
    desc: 'Think you know all about data storage? Think again',
  },
  {
    label: 'Data Science',
    slug: 'datascience',
    term: 'data science',
    title: 'Data is power',
    desc: 'Awesome projects utilizing the power of Data',
  },
];

export const RangeFilter = [
  // { type: 'range', days: 7, label: 'Posted this week' },
  { type: 'range', days: 30, label: 'Posted this month' },
  { type: 'range', days: 365, label: 'Posted this year' },
  { type: 'range', days: 900, label: 'All time' },
];

export const SortFilter = [
  { type: 'sort', orderBy: 'newest', label: 'Sort by latest' },
  { type: 'sort', orderBy: 'mostpopular', label: 'Sort by popular' },
  { type: 'sort', orderBy: 'oldest', label: 'Sort by oldest' },
];

export const StackFilter = {
  label: 'Stack',
  icon: 'FiCode',
  stacks: {
    frontend: [
      {
        slug: 'react',
        label: 'React',
        icon: 'SiReact',
        terms: 'react,reactjs',
      },
      {
        slug: 'vue',
        label: 'Vue',
        icon: 'SiVuedotjs',
        terms: 'vue,vuejs',
      },
      {
        slug: 'nextjs',
        label: 'NextJS',
        icon: 'SiNextdotjs',
        terms: 'nextjs',
      },
      {
        slug: 'nuxtjs',
        label: 'NuxtJS',
        icon: 'SiNuxtdotjs',
        terms: 'nuxt,nuxtjs',
      },
      {
        slug: 'gatsby',
        label: 'Gatsby',
        icon: 'SiGatsby',
        terms: 'gatsby',
      },
      {
        slug: 'angular',
        label: 'Angular',
        icon: 'SiAngular',
        terms: 'angular',
      },
      {
        slug: 'tailwindcss',
        label: 'Tailwind',
        icon: 'SiTailwindcss',
        terms: 'tailwind,tailwindcss',
      },
      {
        slug: 'chakra',
        label: 'ChakraUI',
        icon: 'SiChakraui',
        terms: 'chakra,chakraui',
      },
      {
        slug: 'bootstrap',
        label: 'Bootstrap',
        icon: 'SiBootstrap',
        terms: 'bootstrap',
      },
      {
        slug: 'redux',
        label: 'Redux',
        icon: 'SiRedux',
        terms: 'redux',
      },
      {
        slug: 'svelte',
        label: 'Svelte',
        icon: 'SiSvelte',
        terms: 'svelte',
      },
    ],

    backend: [
      {
        slug: 'nodejs',
        label: 'NodeJS',
        icon: 'SiNodedotjs',
        terms: 'nodejs',
      },
      {
        slug: 'express',
        label: 'Express',
        icon: 'SiExpress',
        terms: 'express',
      },
      {
        slug: 'nestjs',
        label: 'NestJS',
        icon: 'SiNestjs',
        terms: 'nestjs',
      },
      {
        slug: 'fastapi',
        label: 'FastAPI',
        icon: 'SiFastapi',
        terms: 'fastapi',
      },
      {
        slug: 'graphql',
        label: 'GraphQL',
        icon: 'SiGraphql',
        terms: 'graphql',
      },
      {
        slug: 'mongodb',
        label: 'MongoDB',
        icon: 'SiMongodb',
        terms: 'mongodb',
      },
      {
        slug: 'mysql',
        label: 'MySQL',
        icon: 'SiMysql',
        terms: 'mysql',
      },
      {
        slug: 'postgresql',
        label: 'PostgreSQL',
        icon: 'SiPostgresql',
        terms: 'postgresql',
      },
      {
        slug: 'firebase',
        label: 'Firebase',
        icon: 'SiFirebase',
        terms: 'firebase',
      },
      {
        slug: 'heroku',
        label: 'Heroku',
        icon: 'SiHeroku',
        terms: 'heroku',
      },
      {
        slug: 'flask',
        label: 'Flask',
        icon: 'SiFlask',
        terms: 'flask',
      },
      {
        slug: 'supabase',
        label: 'Supabase',
        icon: 'SiSupabase',
        terms: 'supabase',
      },
    ],
    core: [
      {
        slug: 'php',
        label: 'PHP',
        icon: 'SiPhp',
        terms: 'php',
      },
      {
        slug: 'go',
        label: 'Go',
        icon: 'SiGo',
        terms: 'go',
      },
      {
        slug: 'javascript',
        label: 'JavaScript',
        icon: 'SiJavascript',
        terms: 'javascript',
      },
      {
        slug: 'typescript',
        label: 'TypeScript',
        icon: 'SiTypescript',
        terms: 'typescript',
      },
      {
        slug: 'python',
        label: 'Python',
        icon: 'SiPython',
        terms: 'python',
      },
      {
        slug: 'ruby',
        label: 'Ruby',
        icon: 'SiRuby',
        terms: 'ruby',
      },
      {
        slug: 'java',
        label: 'Java',
        icon: 'FaJava',
        pack: 'Fa',
        terms: 'java',
      },
      {
        slug: 'c++',
        label: 'C++',
        icon: 'SiCplusplus',
        terms: 'c++',
      },
      {
        slug: 'swift',
        label: 'Swift',
        icon: 'SiSwift',
        terms: 'swift',
      },
      {
        slug: 'kotlin',
        label: 'Kotlin',
        icon: 'SiKotlin',
        terms: 'kotlin',
      },
    ],
    infra: [
      {
        slug: 'aws',
        label: 'AWS',
        icon: 'SiAmazonaws',
        terms: 'aws',
      },
      {
        slug: 'azure',
        label: 'Azure',
        icon: 'SiMicrosoftazure',
        terms: 'azure',
      },
      {
        slug: 'digital ocean',
        label: 'Digital Ocean',
        icon: 'SiDigitalocean',
        terms: 'digital ocean',
      },
      {
        slug: 'gcp',
        label: 'GCP',
        icon: 'SiGooglecloud',
        terms: 'gcp',
      },
      {
        slug: 'netlify',
        label: 'Netlify',
        icon: 'SiNetlify',
        terms: 'netlify',
      },
      {
        slug: 'vercel',
        label: 'Vercel',
        icon: 'SiVercel',
        terms: 'vercel',
      },
    ],
    misc: [
      {
        slug: 'laravel',
        label: 'Laravel',
        icon: 'SiLaravel',
        terms: 'laravel',
      },
      {
        slug: 'symfony',
        label: 'Symfony',
        icon: 'SiSymfony',
        terms: 'symfony',
      },
      {
        slug: 'dotnet',
        label: '.NET',
        icon: 'SiDotnet',
        terms: 'dotnet',
      },
      {
        slug: 'django',
        label: 'Django',
        icon: 'SiDjango',
        terms: 'django',
      },
      {
        slug: 'flutter',
        label: 'Flutter',
        icon: 'SiFlutter',
        terms: 'flutter',
      },
      {
        slug: 'reactnative',
        label: 'React Native',
        icon: 'SiReact',
        terms: 'reactnative',
      },
    ],
  },
};
