import { React, useEffect, useState } from 'react';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import axios from 'axios';
import * as ga from 'lib/ga';
import ToolTip from 'components/common/elements/ToolTip';
import Icon from '../elements/Icon';

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
        className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 pl-1 text-sm text-base-800 hover:bg-base-200 hover:text-base-700 dark:text-base-100 dark:hover:bg-base-700 dark:hover:text-base-100"
        onClick={() => saveProject(!isSaved ? 'save' : 'remove')}
      >
        <ToolTip message="Bookmark" position={props.toolTipPosition} />
        {isSaved ? (
          <Icon name="FiBookmark" className="h-auto w-6" />
        ) : (
          <Icon name="FiBookmark" className="h-auto w-6" />
        )}
        {props.showLabel && <span>Bookmark</span>}
      </button>
    </>
  );
};

export default ButtonBookmark;
