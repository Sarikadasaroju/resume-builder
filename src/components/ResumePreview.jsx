function ResumePreview({
  selectedTemplate,
  profilePhoto,
  personalInfo,
  educationList,
  skills,
  projects,
  certifications,
}) {
  const getTemplateClass = () => {
    switch (selectedTemplate) {
      case 'professional':
        return 'professional-template'

      case 'creative':
        return 'creative-template'

      case 'minimal':
        return 'minimal-template'

      default:
        return 'modern-template'
    }
  }

  return (
    <div
      id="resume-preview"
      className={getTemplateClass()}
    >
      {profilePhoto && (
        <img
          src={profilePhoto}
          alt="profile"
          width="120"
        />
      )}

      <h1>{personalInfo.name}</h1>

      <p>{personalInfo.email}</p>

      <p>{personalInfo.phone}</p>

      <p>{personalInfo.address}</p>

      <hr />

      <h2>Education</h2>

      {educationList.map(
        (education, index) => (
          <div key={index}>
            <h4>
              {education.degree}
            </h4>

            <p>
              {education.college}
            </p>

            <p>{education.year}</p>
          </div>
        ),
      )}

      <hr />

      <h2>Skills</h2>

      <ul>
        {skills.map(
          (skill, index) => (
            <li key={index}>
              {skill}
            </li>
          ),
        )}
      </ul>

      <hr />

      <h2>Projects</h2>

      {projects.map(
        (project, index) => (
          <div key={index}>
            <h4>
              {project.projectName}
            </h4>

            <p>
              {
                project.description
              }
            </p>

            <p>
              {
                project.technologies
              }
            </p>
          </div>
        ),
      )}

      <hr />

      <h2>Certifications</h2>

      {certifications.map(
        (
          certification,
          index,
        ) => (
          <div key={index}>
            <h4>
              {certification.title}
            </h4>

            <p>
              {
                certification.organization
              }
            </p>

            <p>
              {certification.year}
            </p>
          </div>
        ),
      )}
    </div>
  )
}

export default ResumePreview