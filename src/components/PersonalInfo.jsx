function PersonalInfo({personalInfo, setPersonalInfo}) {
  const handleChange = event => {
    const {name, value} = event.target

    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    })
  }

  return (
    <div>
      <h2>Personal Information</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={personalInfo.name}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={personalInfo.email}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={personalInfo.phone}
        onChange={handleChange}
      />

      <br />
      <br />

      <textarea
        name="address"
        placeholder="Address"
        value={personalInfo.address}
        onChange={handleChange}
      />

    </div>
  )
}

export default PersonalInfo