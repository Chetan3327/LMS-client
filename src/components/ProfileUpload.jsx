import React, { useState } from 'react'
const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET
const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME

const ProfileUpload = ({uploadImageUrl}) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState("")

  const uploadImage = (e) => {
    e.preventDefault()
    if(selectedFile === null){
      setError("Please Select File!")
      return ;
    }
    console.log('uploading image')
    const data = new FormData()
    data.append("file", selectedFile)
    data.append("upload_preset", UPLOAD_PRESET)
    data.append("cloud_name", CLOUD_NAME)
    fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "post",
        body: data
    }).then(resp => resp.json()).then(data => {
        const imageUrl = data.url
        uploadImageUrl(imageUrl)
    }).catch(err => {
      console.log('heer')
      console.log(err)}
    )        
}
  return (
    <div className='p-5 min-w-[450px]'>
      <h3 className='text-2xl font-semibold'>Upload Profile</h3>
      <p className='my-2'>Upload Image you want to set as Your profile pic</p>
      <form className='flex flex-col items-center gap-3'>
        <div className="w-full py-1">
            <input accept='image/*' onChange={(e) => setSelectedFile(e.target.files[0])} className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary" type="file" id="formFile" />
        </div>
        {selectedFile && (<img width={300} src={URL.createObjectURL(selectedFile)} alt='uploaded image'/>)}
        {selectedFile && (<button className="bg-primary w-full rounded p-2 text-white" onClick={(e) => uploadImage(e)}>Upload Picture</button>)}
      </form>
      {error && (<div className="text-center border-red-400 p-2 mt-2 border-solid border-2 rounded-xl bg-red-100">{error}</div>)}
    </div>
  )
}

export default ProfileUpload
