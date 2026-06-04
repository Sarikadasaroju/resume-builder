function Education({educationList, setEducationList}) {
  const handleChange = (index, event) => {
    const {name, value} = event.target

    const updatedEducation = [...educationList]

    updatedEducation[index][name] = value

    setEducationList(updatedEducation)
  }

  const addEducation = () => {
    setEducationList([
      ...educationList,
      {
        college: '',
        degree: '',
        year: '',
      },
    ])
  }

  return (
    <div>
      <h2>Education</h2>

      {educationList.map((education, index) => (
        <div key={index}>
          <input
            type="text"
            name="college"
            placeholder="College Name"
            value={education.college}
            onChange={event => handleChange(index, event)}
          />

          <br />
          <br />

          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={education.degree}
            onChange={event => handleChange(index, event)}
          />

          <br />
          <br />

          <input
            type="text"
            name="year"
            placeholder="Year"
            value={education.year}
            onChange={event => handleChange(index, event)}
          />

          <hr />
        </div>
      ))}

      <button onClick={addEducation}>
        Add Education
      </button>
    </div>
  )
}

export default Education