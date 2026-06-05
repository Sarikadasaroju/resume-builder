import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import api from '../services/api'

import '../styles/ResumeBuilder.css'

import PhotoUpload from '../components/PhotoUpload'
import PersonalInfo from '../components/PersonalInfo'
import Education from '../components/Education'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Certifications from '../components/Certifications'
import ResumePreview from '../components/ResumePreview'

function ResumeBuilder() {
  const navigate = useNavigate()

  const [selectedTemplate, setSelectedTemplate] =
    useState('modern')

  const [savedResumes, setSavedResumes] =
    useState([])

  const [editingResumeId, setEditingResumeId] =
    useState(null)

  const [profilePhoto, setProfilePhoto] =
    useState('')

  const [personalInfo, setPersonalInfo] =
    useState({
      name: '',
      email: '',
      phone: '',
      address: '',
    })

  const [educationList, setEducationList] =
    useState([
      {
        college: '',
        degree: '',
        year: '',
      },
    ])

  const [skills, setSkills] = useState([])

  const [projects, setProjects] = useState([
    {
      projectName: '',
      description: '',
      technologies: '',
    },
  ])

  const [
    certifications,
    setCertifications,
  ] = useState([
    {
      title: '',
      organization: '',
      year: '',
    },
  ])

//  useEffect(() => {
 //   loadResumes()
  //}, [])

  const loadResumes = async () => {
    try {
      const token =
        localStorage.getItem('token')

      const response =
        await api.get('/resumes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

      setSavedResumes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const loadResumeIntoForm = resume => {
    setEditingResumeId(resume.id)

    const data = JSON.parse(
      resume.resume_data,
    )

    setSelectedTemplate(
      data.selectedTemplate ||
        'modern',
    )

    setProfilePhoto(
      data.profilePhoto || '',
    )

    setPersonalInfo(
      data.personalInfo || {
        name: '',
        email: '',
        phone: '',
        address: '',
      },
    )

    setEducationList(
      data.educationList || [],
    )

    setSkills(data.skills || [])

    setProjects(data.projects || [])

    setCertifications(
      data.certifications || [],
    )
  }

  const saveResume = async () => {
    try {
      const token =
        localStorage.getItem('token')

      const payload = {
        selectedTemplate,
        profilePhoto,
        personalInfo,
        educationList,
        skills,
        projects,
        certifications,
      }

      if (editingResumeId) {
        await api.put(
          `/resumes/${editingResumeId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        alert('Resume Updated Successfully')
      } else {
        await api.post(
          '/resumes',
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        alert('Resume Saved Successfully')
      }

      loadResumes()
    } catch (error) {
      console.log(error)
      alert('Operation Failed')
    }
  }

  const deleteResume = async id => {
    try {
      const token =
        localStorage.getItem('token')

      await api.delete(
        `/resumes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      alert('Resume Deleted Successfully')

      if (editingResumeId === id) {
        setEditingResumeId(null)
      }

      loadResumes()
    } catch (error) {
      console.log(error)
      alert('Delete Failed')
    }
  }

  const downloadPDF = async () => {
    const resume =
      document.getElementById(
        'resume-preview',
      )

    if (!resume) return

    const canvas =
      await html2canvas(resume)

    const image =
      canvas.toDataURL('image/png')

    const pdf = new jsPDF()

    const pdfWidth =
      pdf.internal.pageSize.getWidth()

    const pdfHeight =
      (canvas.height * pdfWidth) /
      canvas.width

    pdf.addImage(
      image,
      'PNG',
      0,
      0,
      pdfWidth,
      pdfHeight,
    )

    pdf.save('resume.pdf')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="resume-builder-container">
      <h1>Resume Builder</h1>

      <div className="template-selector">
        <label htmlFor="template">
          Select Template:
        </label>

        <select
          id="template"
          value={selectedTemplate}
          onChange={e =>
            setSelectedTemplate(
              e.target.value,
            )
          }
        >
          <option value="modern">
            Modern
          </option>

          <option value="professional">
            Professional
          </option>

          <option value="creative">
            Creative
          </option>

          <option value="minimal">
            Minimal
          </option>
        </select>
      </div>

      <div className="download-container">
        <button
          className="action-btn"
          type="button"
          onClick={downloadPDF}
        >
          Download PDF
        </button>

        <button
          className="action-btn"
          type="button"
          onClick={saveResume}
        >
          {editingResumeId
            ? 'Update Resume'
            : 'Save Resume'}
        </button>

        <button
          className="action-btn"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="builder-content">
        <div className="form-section">
          <PhotoUpload
            profilePhoto={profilePhoto}
            setProfilePhoto={
              setProfilePhoto
            }
          />

          <PersonalInfo
            personalInfo={personalInfo}
            setPersonalInfo={
              setPersonalInfo
            }
          />

          <Education
            educationList={
              educationList
            }
            setEducationList={
              setEducationList
            }
          />

          <Skills
            skills={skills}
            setSkills={setSkills}
          />

          <Projects
            projects={projects}
            setProjects={setProjects}
          />

          <Certifications
            certifications={
              certifications
            }
            setCertifications={
              setCertifications
            }
          />
        </div>

        <ResumePreview
          selectedTemplate={
            selectedTemplate
          }
          profilePhoto={profilePhoto}
          personalInfo={personalInfo}
          educationList={educationList}
          skills={skills}
          projects={projects}
          certifications={
            certifications
          }
        />
      </div>

      <div className="saved-resumes">
        <h2>Saved Resumes</h2>

        {savedResumes.length === 0 ? (
          <p>No resumes found</p>
        ) : (
          <ul>
            {savedResumes.map(
              resume => (
                <li
                  key={resume.id}
                  style={{
                    marginBottom:
                      '10px',
                  }}
                >
                  <button
                    className="action-btn"
                    type="button"
                    onClick={() =>
                      loadResumeIntoForm(
                        resume,
                      )
                    }
                  >
                    Open Resume #
                    {resume.id}
                  </button>

                  <button
                    className="action-btn"
                    type="button"
                    onClick={() =>
                      deleteResume(
                        resume.id,
                      )
                    }
                    style={{
                      marginLeft:
                        '10px',
                    }}
                  >
                    Delete
                  </button>
                </li>
              ),
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ResumeBuilder