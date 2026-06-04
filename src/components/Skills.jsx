import {useState} from 'react'

function Skills({skills, setSkills}) {
  const [skillInput, setSkillInput] = useState('')

  const addSkill = () => {
    if (skillInput.trim() === '') {
      return
    }

    setSkills([...skills, skillInput])

    setSkillInput('')
  }

  const deleteSkill = indexToDelete => {
    const updatedSkills = skills.filter(
      (_, index) => index !== indexToDelete,
    )

    setSkills(updatedSkills)
  }

  return (
    <div>
      <h2>Skills</h2>

      <input
        type="text"
        placeholder="Enter Skill"
        value={skillInput}
        onChange={event => setSkillInput(event.target.value)}
      />

      <button onClick={addSkill}>
        Add Skill
      </button>

      <ul>
        {skills.map((skill, index) => (
          <li key={index}>
            {skill}

            <button
              onClick={() => deleteSkill(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Skills