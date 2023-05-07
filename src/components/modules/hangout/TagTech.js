import React from 'react';
import { useState } from 'react';
import { IoCodeOutline } from 'react-icons/io5';
import * as Icons from 'react-icons/si';

const TagTech = ({ savedSkills, setSavedSkills, setShowTech }) => {
  const [skillList, setSkillList] = useState([]);
  const [skillName, setSkillName] = useState('');

  const Icon = (props) => {
    const { iconName } = props;

    const iconKey = `Si${
      iconName.charAt(0).toUpperCase() + iconName.slice(1).toLowerCase()
    }`;
    const icon = React.createElement(Icons[iconKey] || IoCodeOutline, {
      className: 'w-5 h-5 text-slate-400',
    });
    return <div>{icon}</div>;
  };

  const addSkill = (skill) => {
    setSkillName('');
    const skillsExists = savedSkills.find(function (item) {
      return skill.skillId === item;
    });

    if (skill.skillId === -1) {
      // createSkill();
      setSkillList([]);
    }
    if (!skillsExists && skill.skillId != -1) {
      setSavedSkills([...savedSkills, skill.skillName]);
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
    <>
      <div className="relative">
        <div>
          <input
            type="text"
            id="skill"
            name="skill"
            autoComplete="off"
            autoFocus
            placeholder="Search e.g. React"
            onChange={(e) => searchSkills(e.target.value)}
            className="text-white bg-tfsdark-900 focus:ring-0 border-0 focus:border-0 "
            value={skillName}
          />
        </div>
      </div>
      <div>
        <div>
          {skillName.length > 1 && skillList.length > 0 && (
            <ul className="absolute top-14 w-full border border-tfsdark-800 bg-tfsdark-900 rounded shadow-lg z-10 max-h-96 overflow-scroll overscroll-contain">
              {skillList.map((result) => (
                <li
                  className="my-1 px-4 py-1 items-center"
                  key={result.skillId}
                >
                  <button
                    type="button"
                    className="flex items-center space-x-2 focus:outline-none w-full text-left text-slate-200 text-sm"
                    onClick={() => {
                      addSkill(result);
                      setShowTech(false);
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
    </>
  );
};

export default TagTech;
