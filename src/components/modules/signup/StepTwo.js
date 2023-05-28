import axios from 'axios';
import { useAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as ga from 'lib/ga';
import { SignUpSteps, goalsList } from 'components/modules/signup/constants';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';

const StepTwo = ({ user }) => {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState(user?.profileGoal);
  const AuthUser = useAuthUser();

  async function handleSubmit(e) {
    e.preventDefault();
    const stepData = {
      profileGoal: selectedGoal,
      signUpProcessStatus: SignUpSteps.SIGNUP_GOALS_COMPLETED.param,
      completedOnBoarding: false,
    };

    await axios
      .post(`${process.env.BASEURL}/api/profile/update`, stepData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        if (response.status === 204) {
          ga.event({
            action: 'SIGNUP_GOALS_COMPLETED',
          });
        }
        router.push('/account/signup/step3');
      })
      .catch((error) => {
        sendSlackMessage(`User had an error on step 2 of the sign up process`);
        router.push('/account/signup/step2');
      });
  }

  return (
    <div className="mx-auto mb-14 max-w-screen-xl px-4 sm:px-0">
      <div className="flex justify-center sm:w-full">
        <div className="w-full">
          <h2 className="text-center text-lg text-slate-400">
            Choose one goal below.
          </h2>
          <fieldset className="mt-6 mb-6">
            <legend className="sr-only">Goals</legend>
            <div className="space-y-4">
              {goalsList.map((goal, goalIndex) => (
                <label
                  key={goalIndex}
                  className={
                    'relative flex cursor-pointer items-center rounded-xl border-2 py-4 px-4 md:px-6 ' +
                    (selectedGoal == goal.id
                      ? 'border-2 border-green-600'
                      : 'border-base-600 hover:bg-base-700')
                  }
                  htmlFor={`goal-${goal.id}`}
                >
                  <div className="min-w-0 flex-1 text-sm">
                    <span className="text-xl font-bold text-slate-100">
                      {goal.title}
                    </span>
                    <p
                      id={`goal-${goal.id}-description`}
                      className="text-slate-400"
                    >
                      {goal.description}
                    </p>
                  </div>
                  <div className="ml-3 flex h-5 items-center">
                    <input
                      id={`goal-${goal.id}`}
                      aria-describedby={`goal-${goal.id}-description`}
                      name="goal"
                      type="radio"
                      defaultChecked={
                        goal.id === selectedGoal ? 'checking' : ''
                      }
                      onChange={(e) => setSelectedGoal(goal.id)}
                      className="h-5 w-5 border-slate-500 text-green-600 focus:hidden focus:ring-0"
                    />
                  </div>
                </label>
              ))}
            </div>
          </fieldset>

          {selectedGoal ? (
            <button
              type="submit"
              className="btn-primary w-full py-3"
              onClick={handleSubmit}
            >
              Next &rarr;
            </button>
          ) : (
            <button className="btn-primary w-full py-3" disabled>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
