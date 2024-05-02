import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import '../helpers/styles/Photosuploader.css'
export default function Photosuploader({ addphotos, onChange }) {
  const [photolink, setphotolink] = useState('');
  async function uploadphoto(ev) {
    const files = ev.target.files
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('http://localhost:4000/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
      console.log(response);
      const { data: filename } = response;
      onChange((prev) => {
        return [...prev, filename];
      })
    })

    console.log(ev.target.files);
  }
  async function removephoto(e,filename) {
    e.preventDefault();
    console.log("hihi");
    await onChange([...addphotos.filter((photo) => (photo !== filename))])
  }
  async function addphotobylink(ev) {
    const { data: filename } = await axios.post('http://localhost:4000/uploadbylink', { link: photolink });
    console.log(filename);
    onChange((prev) => {
      return [...prev,filename];
    })
    setphotolink('');
  }
  function photomain(e,link) {
    e.preventDefault();
    const adddedphoto = addphotos.filter((photo) => (photo === link))
    const newphoto = addphotos.filter((photo) => (photo !== link))
    onChange([...adddedphoto, ...newphoto])
  }
  return (
    <div>
      <h2>Photos</h2>
      <span>
        <input type='text' className='link' onChange={(ev) => {
          setphotolink(ev.target.value)
        }}></input>

        <button  type="button" className='Addphoto' onClick={() => {
          addphotobylink()
        }}>Add photo</button>
      </span>
      <div className='photo'>
        {addphotos.length >= 0 && (
          addphotos.map((link) => {
            return (
              <span key={link}>
                <img className='image' src={'http://localhost:4000/uploads/' + link} alt=''></img>

                <div className='icon' >
                  <svg onClick={(e) => {
                  removephoto(e,link)
                }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                  <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                </div>
                <div className='star' >
                  {link === addphotos[0] && (
                    <svg xmlns="http://www.w3.org/2000/svg" >
                      <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" />
                    </svg>
                  )
                  }
                  {link !== addphotos[0] && (
                    <svg   onClick={(e) => { photomain(e,link) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                      <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                  )
                  }

                </div>

              </span>

            )
          })
        )}
        <label className='upload'>Upload from your device
          <input className='upload visible' type='file' id='hihi' onChange={uploadphoto} ></input>
        </label>
      </div>
    </div>
  )
}
