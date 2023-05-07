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

export { SignUpSteps, getNextStepRoute };
