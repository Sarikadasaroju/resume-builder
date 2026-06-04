function Projects({projects, setProjects}) {
  const handleChange = (index, event) => {
    const {name, value} = event.target

    const updatedProjects = [...projects]
    updatedProjects[index][name] = value

    setProjects(updatedProjects)
  }

  const addProject = () => {
    setProjects([
      ...projects,
      {
        projectName: '',
        description: '',
        technologies: '',
      },
    ])
  }

  const deleteProject = indexToDelete => {
    const updatedProjects = projects.filter(
      (_, index) => index !== indexToDelete,
    )

    setProjects(updatedProjects)
  }

  return (
    <div>
      <h2>Projects</h2>

      {projects.map((project, index) => (
        <div key={index}>
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={project.projectName}
            onChange={event => handleChange(index, event)}
          />

          <br />
          <br />

          <textarea
            name="description"
            placeholder="Project Description"
            value={project.description}
            onChange={event => handleChange(index, event)}
          />

          <br />
          <br />

          <input
            type="text"
            name="technologies"
            placeholder="Technologies Used"
            value={project.technologies}
            onChange={event => handleChange(index, event)}
          />

          <br />
          <br />

          <button onClick={() => deleteProject(index)}>
            Delete Project
          </button>

          <hr />
        </div>
      ))}

      <button onClick={addProject}>
        Add Project
      </button>
    </div>
  )
}

export default Projects