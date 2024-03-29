import { React, useEffect, useState } from 'react';
import axios from 'axios';
import * as ga from 'lib/ga';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import ToolTip from '../elements/ToolTip';

const ButtonFollow = ({ followToUser, followFromUser, followToName, size }) => {
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
          className={
            'btn btn-secondary group relative w-full sm:w-auto ' + size
          }
          onClick={() => {
            setFollowStatus(!followStatus);
            followProfile(!followStatus);
          }}
        >
          <ToolTip message={`Click to unfollow ${followToName}`} />
          Following
        </button>
      ) : (
        <button
          type="button"
          className={'btn btn-secondary w-full sm:w-auto ' + size}
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
