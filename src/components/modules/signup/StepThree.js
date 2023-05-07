import axios from 'axios';
import { useAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as ga from 'lib/ga';
import { SignUpSteps } from 'components/modules/signup/constants';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import { BsCheck } from 'react-icons/bs';

const StepThree = ({ user }) => {
  const [interests, setInterests] = useState({});
  const [savedInterests, setSavedInterests] = useState(
    user?.interestList || []
  );
  const [categories, setCategories] = useState([]);
  const [categoryCalledOnce, setCategoryCalledOnce] = useState(false);
  const router = useRouter();
  const AuthUser = useAuthUser();

  const InterestPill = ({ interest }) => {
    const interestSelected = savedInterests?.find(function (item) {
      return interest.id === item;
    });

    return (
      <div
        className={
          'relative flex items-center space-x-1 rounded-full py-2 px-3 text-sm font-medium cursor-pointer ' +
          (interestSelected
            ? 'bg-tfsdark-500/70 text-white'
            : 'bg-tfsdark-600/40 text-tfsdark-300')
        }
        onClick={() => saveInterest(interest.id)}
      >
        {/* <Icon iconName={tech.icon} className={'w-6 h-6 ' + (techSelected ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-tfsdark-300')} /> */}
        <span>{interest.interestName}</span>
        {interestSelected && (
          <span className="absolute bg-green-600 w-4 h-4 -top-1 -left-1 rounded-full ring-2 ring-white">
            <BsCheck className="text-white w-4 h-4" />
          </span>
        )}
      </div>
    );
  };

  async function onSubmit(e) {
    e.preventDefault();

    await axios
      .post(
        `${process.env.BASEURL}/api/profile/interests/update`,
        savedInterests
      )
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });

    const stepData = {
      signUpProcessStatus: SignUpSteps.SIGNUP_INTERESTS_COMPLETED.param,
      completedOnBoarding: false,
    };
    await axios
      .post(`${process.env.BASEURL}/api/profile/update`, stepData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        if (response.status === 204) {
          ga.event({
            action: 'SIGNUP_INTERESTS_COMPLETED',
          });
        }
        router.push('/account/signup/step4');
      })
      .catch((error) => {
        console.log(error);
        sendSlackMessage(`User had an error on step 3 of the sign up process`);
        router.push('/account/signup/step3');
      });
  }

  const getInterestsPerCat = async (categoryID) => {
    await axios
      .get(
        `${process.env.BASEURL}/api/profile/interests/get?categoryID=${categoryID}&page=0&size=100`
      )
      .then((response) => {
        let newInterests = {
          [categoryID]: {
            ...interests,
            ...response.data.categories,
          },
        };

        setInterests((prev) => ({ ...prev, ...newInterests }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveInterest = async (interestID) => {
    if (savedInterests.includes(interestID)) {
      const filteredInterests = savedInterests.filter(
        (value) => value !== interestID
      );
      setSavedInterests(filteredInterests);
    } else {
      setSavedInterests((prev) => [...prev, interestID]);
    }
  };

  const getAllInterests = async () => {
    categories?.map(async (category, index) => {
      await getInterestsPerCat(category.id);
    });
  };

  const getAllCategories = async () => {
    await axios
      .get(
        `${process.env.BASEURL}/api/profile/interests/getcategories?page=0&size=100`
      )
      .then(async (response) => {
        setCategoryCalledOnce(true);
        setCategories((categories) => {
          let newCategories = [];
          response.data.categories.forEach((cat) => {
            if (!categories.includes(cat)) {
              newCategories.push(cat);
            }
          });
          return [...newCategories];
        });
      })
      .catch((error) => {
        setCategoryCalledOnce(true);
        console.log(error); //Do something helpful here
      });
  };

  useEffect(() => {
    if (categories.length == 0 && !categoryCalledOnce) {
      getAllCategories();
    }
  }, [getAllCategories, categoryCalledOnce]);

  useEffect(() => {
    if (Object.keys(interests).length === 0) {
      getAllInterests();
    }
  }, [interests, getAllInterests]);

  return (
    <div className="max-w-screen-xl mx-auto mb-14">
      <div className="sm:w-full flex justify-center">
        <div className="w-full px-4 sm:px-0">
          <h2 className="text-lg text-slate-400 text-center">
            Select at least 3 below.
          </h2>
          {categories?.map((category, index) => (
            <div key={index}>
              <div className="my-8 bg-tfsdark-700/50 p-3 pb-2 rounded-xl">
                <h4 className="pl-2 font-semibold uppercase text-sm text-tfsdark-100">
                  {category.categoryName}
                </h4>
                <div className="w-full flex flex-wrap my-4 gap-3">
                  {interests[category.id] &&
                    Object.entries(interests[category.id]).map(
                      ([key, interest]) => (
                        <InterestPill interest={interest} key={interest.id} />
                      )
                    )}
                </div>
              </div>
            </div>
          ))}
          <div>
            {interests && savedInterests.length > 2 ? (
              <button
                type="submit"
                className="btn-primary py-3 w-full"
                onClick={onSubmit}
              >
                Next &rarr;
              </button>
            ) : (
              <button className="btn-primary py-3 w-full" disabled>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
