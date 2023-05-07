const SignUpSteps = {
  SIGNUP_INIT: {
    param: 'SIGNUP_INIT',
    nextRoute: '/account/signup/step1',
  },
  SIGNUP_ABOUT_USER_COMPLETED: {
    param: 'SIGNUP_ABOUT_USER_COMPLETED',
    nextRoute: '/account/signup/step2',
  },
  SIGNUP_GOALS_COMPLETED: {
    param: 'SIGNUP_GOALS_COMPLETED',
    nextRoute: '/account/signup/step3',
  },
  SIGNUP_INTERESTS_COMPLETED: {
    param: 'SIGNUP_INTERESTS_COMPLETED',
    nextRoute: '/account/signup/step4',
  },
  SIGNUP_SKILLS_COMPLETED: {
    param: 'SIGNUP_SKILLS_COMPLETED',
    nextRoute: '/account/signup/step5',
  },
  SIGNUP_INTRO_COMPLETED: {
    param: 'SIGNUP_INTRO_COMPLETED',
    nextRoute: '/account/signup/step1',
  },
};

const getNextStepRoute = (CURRENT_STEP = SignUpSteps.SIGNUP_INIT.param) => {
  for (const [key, value] of Object.entries(SignUpSteps)) {
    if (key === CURRENT_STEP) {
      return SignUpSteps[key].nextRoute;
    }
  }
  return SignUpSteps.SIGNUP_INIT.nextRoute;
};

const setRandomPitch = () => {
  const randomPitchPhrases = [
    'I am a talented, ambitious and hardworking individual, with broad skills and experience in digital and printed marketing, social media and leading projects.',
    'I am adept at handling multiple tasks on a daily basis competently and at working well under pressure.',
    'I instil confidence in others and approach new challenges with an open mind.',
    'I am passionate about my work. Because I love what I do, I have a steady source of motivation that drives me to do my best',
    'I am ambitious and driven. I thrive on challenge and constantly set goals for myself, so I have something to strive toward.',
    'I am highly organized. I always take notes, and I use a series of tools to help myself stay on top of deadlines. I like to keep a clean workspace and create a logical filing method so I’m always able to find what I need.',
    'I’m a people-person. I love meeting new people and learning about their lives and their backgrounds. I can almost always find common ground with strangers, and I like making people feel comfortable in my presence.',
    'I’m a natural leader. I’ve eventually been promoted to a leadership role in almost every job because I like to help people.',
    'I am results-oriented, constantly checking in with the goal to determine how close or how far away we are and what it will take to make it happen.',
    'I am an excellent communicator. I pride myself on making sure people have the right information because it drives better results.',
  ];
  const randomSample =
    randomPitchPhrases[Math.floor(Math.random() * randomPitchPhrases.length)];
  return randomSample;
};

const roleTitles = [
  'Full Stack Developer',
  'Front End Developer',
  'Back End Developer',
  'Web Developer',
  'Software Engineer',
  'Tech Lead',
  'Technical Architect',
  'Principal Architect',
  'Software Engineering Manager',
];

const goalsList = [
  {
    title: 'Share and grow my network',
    description: 'Show off my projects and connect to developers.',
    id: 'GROW_NETWORK',
  },
  {
    title: 'Find the right job for me',
    description: 'Work with a great team with a great culture.',
    id: 'FIND_WORK',
  },
  {
    title: 'Hire developers',
    description: 'Post opportunities for my team and connect to developers.',
    id: 'HIRE',
  },
];

const hearFromList = [
  'Twitter',
  'Reddit',
  'GitHub',
  'Instagram',
  'TikTok',
  'Facebook',
  'LinkedIn',
  'Quora',
  'Google',
  'Friend',
];

export {
  SignUpSteps,
  getNextStepRoute,
  setRandomPitch,
  roleTitles,
  goalsList,
  hearFromList,
};
