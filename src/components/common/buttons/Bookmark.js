import { React, useEffect, useState } from 'react';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import axios from 'axios';
import * as ga from 'lib/ga';
import ToolTip from 'components/common/elements/ToolTip';

const ButtonBookmark = (props) => {
  const [isSaved, setIsSaved] = useState(false);

  const isProjectSaved = async () => {
    await axios
      .get(`${process.env.BASEURL}/api/projects/saved/get`)
      .then((response) => {
        setIsSaved(
          response.data.projects?.content?.find(function (proj) {
            return props.project?._id === proj.projectId;
          })
        );
      })
      .catch((error) => {
        console.log(error.status);
      });
  };

  const saveProject = async (action) => {
    const formData = {
      projectId: props.project.projectId || props.project._id,
    };
    await axios
      .post(
        `${process.env.BASEURL}/api/projects/project/${
          action === 'save' ? 'save' : 'unsave'
        }`,
        JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        setIsSaved(action === 'save' ? true : false);
      })
      .catch(() => {
        setIsSaved(action === 'save' ? false : true);
      });

    if (action === 'save') {
      sendSlackMessage(
        `Bookmarked the post titled '${props.project.projectName}'`
      );
    } else {
      sendSlackMessage(
        `Removed the post titled '${props.project.projectName}' from their bookmarks`
      );
    }

    ga.event({
      action: 'user_bookmarked_project',
    });
  };

  useEffect(() => {
    isProjectSaved();
  }, []);

  return (
    <>
      <button
        className="btn-secondary bg-transparent hover:bg-slate-400/20 rounded-xl px-2 text-sm cursor-pointer group relative"
        onClick={() => saveProject(!isSaved ? 'save' : 'remove')}
      >
        <ToolTip message="Save" />
        {isSaved ? (
          <IoBookmark className="w-6 h-auto sm:group-hover:text-slate-300" />
        ) : (
          <IoBookmarkOutline className="w-6 h-auto sm:group-hover:text-slate-300" />
        )}
      </button>
    </>
  );
};

export default ButtonBookmark;
