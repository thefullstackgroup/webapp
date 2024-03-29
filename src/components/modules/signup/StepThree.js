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
        className="badge relative cursor-pointer"
        onClick={() => saveInterest(interest.id)}
      >
        <span>{interest.interestName}</span>
        {interestSelected && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-600 ring-2 ring-white">
            <BsCheck className="h-4 w-4 text-white" />
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
    <div className="mx-auto mb-14 max-w-screen-xl">
      <div className="flex justify-center sm:w-full">
        <div className="w-full px-4 sm:px-0">
          <h4 className="text-center text-lg text-base-400">
            Select at least 3 below.
          </h4>
          <div className="my-8 space-y-8">
            {categories?.map((category, index) => (
              <div className="space-y-2" key={index}>
                <h4 className="text-sm font-medium uppercase">
                  {category.categoryName}
                </h4>
                <div className="flex w-full flex-wrap gap-1">
                  {interests[category.id] &&
                    Object.entries(interests[category.id]).map(
                      ([key, interest]) => (
                        <InterestPill interest={interest} key={interest.id} />
                      )
                    )}
                </div>
              </div>
            ))}
          </div>
          <div>
            {interests && savedInterests.length > 2 ? (
              <button
                type="submit"
                className="btn btn-primary w-full py-2"
                onClick={onSubmit}
              >
                Next &rarr;
              </button>
            ) : (
              <button className="btn btn-primary w-full py-2" disabled>
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
