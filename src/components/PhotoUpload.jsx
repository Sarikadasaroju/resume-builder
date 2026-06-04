function PhotoUpload({
  profilePhoto,
  setProfilePhoto,
}) {
  const handleImageChange = event => {
    const file = event.target.files[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)

      setProfilePhoto(imageUrl)
    }
  }

  return (
    <div>
      <h2>Profile Photo</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  )
}

export default PhotoUpload