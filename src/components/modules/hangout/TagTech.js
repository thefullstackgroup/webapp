import TagStack from 'components/common/tags/TagStack';
import React from 'react';
import { useState } from 'react';

const TagTech = ({ savedSkills, setSavedSkills, setShowTech }) => {
  const [skillList, setSkillList] = useState([]);
  const [skillName, setSkillName] = useState('');

  const addSkill = (skill) => {
    setSkillName('');
    const skillsExists = savedSkills.find(function (item) {
      return skill.skillId === item;
    });

    if (skill.skillId === -1) {
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
            className="text-input bg-tfsdark-900"
            value={skillName}
          />
        </div>
      </div>
      <div>
        <div>
          {skillName.length > 1 && skillList.length > 0 && (
            <ul className="absolute top-10 left-0 w-full border border-tfsdark-800 bg-tfsdark-900 rounded shadow-lg z-10 max-h-96 overflow-scroll overscroll-contain">
              {skillList.map((result) => (
                <li className="my-1 px-4 items-center" key={result.skillId}>
                  <button
                    type="button"
                    className="flex items-center space-x-2 focus:outline-none w-full text-left text-slate-200 text-sm"
                    onClick={() => {
                      addSkill(result);
                      setShowTech(false);
                    }}
                  >
                    <TagStack tech={result.skillName} />
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
