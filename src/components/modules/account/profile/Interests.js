import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { BsCheck } from 'react-icons/bs';
import Loader from 'components/common/elements/Loader';

const InterestPill = ({ interest, savedInterests, saveInterest }) => {
  const interestSelected = savedInterests?.find(function (item) {
    return interest.id === item;
  });

  return (
    <div
      className="badge badge-with-icon relative cursor-pointer px-2.5 py-1.5"
      onClick={() => saveInterest(interest.id, interest.interestName)}
    >
      <span>{interest.interestName}</span>
      {interestSelected && (
        <span className="absolute -top-1 -left-1 h-4 w-4 rounded-full bg-green-600 ring-2 ring-white">
          <BsCheck className="h-4 w-4 text-white" />
        </span>
      )}
    </div>
  );
};

const Interests = ({ user }) => {
  const [interests, setInterests] = useState({});
  const [savedInterests, setSavedInterests] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryCalledOnce, setCategoryCalledOnce] = useState(false);

  const fetchProfileInterests = async () => {
    await axios
      .get(`${process.env.BASEURL}/api/profile/user?userId=${user.displayName}`)
      .then((res) => {
        setSavedInterests(res.data.interestList);
      })
      .catch((error) => console.log(error));
  };

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

  const getAllInterests = async () => {
    categories?.map(async (category, index) => {
      await getInterestsPerCat(category.id);
    });
  };

  const getAllCategories = async () => {
    await axios
      .get(
        `${process.env.BASEURL}/api/profile/interests/getcategories?page=0&size=10`
      )
      .then(async (response) => {
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
        console.log(error);
      });
  };

  const saveInterest = async (interestId, interestName) => {
    if (savedInterests.includes(interestId)) {
      const filteredInterests = savedInterests.filter(
        (value) => value !== interestId
      );
      setSavedInterests(filteredInterests);

      await axios
        .post(`${process.env.BASEURL}/api/profile/interests/delete`, {
          interestId: interestId,
        })
        .then((response) => {
          sendSlackMessage('remove', interestName);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSavedInterests((prev) => [...prev, interestId]);

      await axios
        .post(`${process.env.BASEURL}/api/profile/interests/update`, [
          ...savedInterests,
          interestId,
        ])
        .then((response) => {
          sendSlackMessage('add', interestName);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const sendSlackMessage = async (action, name) => {
    const message = `PROFILE INTERESTS: ${user.name} has ${
      action === 'remove'
        ? `removed the interest (${name}) from their profile`
        : `added the interest (${name}) to their profile`
    }`;

    await fetch(`${process.env.BASEURL}/api/notifications/slack/postMessage`, {
      method: 'POST',
      body: JSON.stringify({
        message: message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (Object.keys(interests).length === 0) {
      getAllInterests();
    }
  }, [interests, getAllInterests]);

  useEffect(() => {
    fetchProfileInterests();
  }, []);

  if (Object.keys(interests).length === 0)
    return (
      <div className="flex h-80 w-full flex-col items-center justify-center space-y-2 text-sm">
        <Loader />
      </div>
    );

  return (
    <>
      <div className="my-6 w-full space-y-6">
        {categories?.map((category, index) => (
          <div className="" key={index}>
            <h4 className="text-sm font-semibold uppercase">
              {category.categoryName}
            </h4>
            <div className="my-4 flex w-full flex-wrap gap-1">
              {interests[category.id] &&
                Object.entries(interests[category.id]).map(
                  ([key, interest]) => (
                    <InterestPill
                      interest={interest}
                      key={interest.id}
                      savedInterests={savedInterests}
                      saveInterest={saveInterest}
                    />
                  )
                )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Interests;
