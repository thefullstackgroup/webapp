import { React, useEffect, useState } from 'react';
import axios from 'axios';
import * as ga from 'lib/ga';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';

const ButtonFollow = ({ followToUser, followFromUser, followToName }) => {
  const [followStatus, setFollowStatus] = useState(false);

  const checkIfFollowing = () => {
    axios
      .get(
        `${process.env.BASEURL}/api/profile/social/following?userId=${followFromUser}`
      )
      .then((res) => {
        const alreadyFollowing = res.data.filter(function (profile) {
          return profile.followUserId === `${followToUser}`;
        });
        if (alreadyFollowing.length > 0) {
          setFollowStatus(true);
        }
      });
  };

  useEffect(() => {
    checkIfFollowing();
  }, []);

  const followProfile = async (followStatus) => {
    await axios
      .post(
        `${process.env.BASEURL}/api/profile/social/${
          followStatus ? 'follow' : 'unfollow'
        }?userId=${followToUser}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        console.log('Follow Action Successful');
        sendSlackMessage(
          `${
            followStatus ? 'Followed' : 'Unfollowed'
          } the user '${followToName}'.`
        );
        ga.event({
          action: followStatus ? 'user_followed' : 'user_unfollowed',
        });
      })
      .catch((error) => {
        console.log(error.status);
      });
  };

  return (
    <>
      {followStatus ? (
        <button
          type="button"
          className={'btn-secondary w-full sm:w-auto group'}
          onClick={() => {
            setFollowStatus(!followStatus);
            followProfile(!followStatus);
          }}
        >
          <>
            <span className="block group-hover:hidden text-slate-400">
              Following
            </span>
            <span className="hidden group-hover:block text-slate-200">
              Unfollow
            </span>
          </>
        </button>
      ) : (
        <button
          type="button"
          className="btn-secondary w-full sm:w-auto"
          onClick={() => {
            setFollowStatus(!followStatus);
            followProfile(!followStatus);
          }}
        >
          <span>Follow</span>
        </button>
      )}
    </>
  );
};

export default ButtonFollow;
