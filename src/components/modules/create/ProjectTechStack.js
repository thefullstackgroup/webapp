import React from 'react';
import { useState } from 'react';
import { IoCodeOutline } from 'react-icons/io5';
import * as Icons from 'react-icons/si';

const ProjectTechStack = ({ postTechStack, setPostTechStack }) => {
  const [skillList, setSkillList] = useState([]);
  const [skillName, setSkillName] = useState('');

  const Icon = (props) => {
    const { iconName } = props;

    const iconKey = `Si${
      iconName.charAt(0).toUpperCase() + iconName.slice(1).toLowerCase()
    }`;
    const icon = React.createElement(Icons[iconKey] || IoCodeOutline, {
      className: 'w-5 h-5 text-base-400',
    });
    return <div>{icon}</div>;
  };

  const addSkill = (skill) => {
    setSkillName('');
    const skillsExists = postTechStack.find(function (item) {
      return skill.skillId === item;
    });

    if (skill.skillId === -1) {
      setSkillList([]);
    }
    if (!skillsExists && skill.skillId != -1) {
      setPostTechStack([...postTechStack, skill.skillName]);
    }
  };

  const searchSkills = async (term) => {
    const filteredTerm = term.replace(',', '');
    setSkillName(filteredTerm);
    if (term.indexOf(',') > 0) {
      const skillExists = skillList.find(function (item) {
        return filteredTerm.toLowerCase() === item.skillName.toLowerCase();
      });

      if (skillExists) {
        addSkill(skillExists);
        setSkillName('');
        return;
      }
    }
    if (term.length > 1) {
      setSkillName(term);
      const response = await fetch(`${process.env.BASEURL}/api/search/skills`, {
        method: 'POST',
        body: JSON.stringify(term),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const results = await response.json();

      if (!results.content.length) {
        setSkillList([]);
      } else {
        setSkillList(results.content);
      }
    }
  };

  return (
    <div className="relative flex flex-col rounded-md bg-base-700 py-1 px-2">
      <div className="relative">
        <div>
          <input
            type="text"
            id="skill"
            name="skill"
            autoComplete="off"
            autoFocus
            placeholder="Example: React"
            onChange={(e) => searchSkills(e.target.value)}
            className=" w-full border-0 bg-transparent text-white placeholder:text-base-400 focus:border-0 focus:ring-0"
            value={skillName}
          />
        </div>
      </div>
      <div>
        <div>
          {skillName.length > 1 && skillList.length > 0 && (
            <ul className="absolute top-11 left-0 z-10 max-h-72 w-full overflow-scroll overscroll-contain rounded-b-md bg-base-800 shadow-lg">
              {skillList.map((result) => (
                <li
                  className="my-1 items-center px-4 py-1"
                  key={result.skillId}
                >
                  <button
                    type="button"
                    className="flex w-full items-center space-x-2 text-left text-base-200 focus:outline-none"
                    onClick={() => {
                      addSkill(result);
                    }}
                  >
                    <Icon iconName={`${result.skillName}`} />
                    <span>{result.skillName}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectTechStack;
