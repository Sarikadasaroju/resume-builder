function Certifications({
  certifications,
  setCertifications,
}) {
  const handleChange = (index, event) => {
    const {name, value} = event.target

    const updatedCertifications = [...certifications]

    updatedCertifications[index][name] = value

    setCertifications(updatedCertifications)
  }

  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        title: '',
        organization: '',
        year: '',
      },
    ])
  }

  const deleteCertification = indexToDelete => {
    const updatedCertifications = certifications.filter(
      (_, index) => index !== indexToDelete,
    )

    setCertifications(updatedCertifications)
  }

  return (
    <div>
      <h2>Certifications</h2>

      {certifications.map((certification, index) => (
        <div key={index}>
          <input
            type="text"
            name="title"
            placeholder="Certification Name"
            value={certification.title}
            onChange={event =>
              handleChange(index, event)
            }
          />

          <input
            type="text"
            name="organization"
            placeholder="Organization"
            value={certification.organization}
            onChange={event =>
              handleChange(index, event)
            }
          />

          <input
            type="text"
            name="year"
            placeholder="Year"
            value={certification.year}
            onChange={event =>
              handleChange(index, event)
            }
          />

          <button
            onClick={() =>
              deleteCertification(index)
            }
          >
            Delete
          </button>

          <hr />
        </div>
      ))}

      <button onClick={addCertification}>
        Add Certification
      </button>
    </div>
  )
}

export default Certifications