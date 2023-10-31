import React, { useState } from 'react'

const ImageAccepter = ({setFile}) => {
    const [previewUrl,setPreviewUrl] = useState()


    const onChangeHandler = (e)=>{
        setFile(e.target.files[0])
        const reader = new FileReader();

        reader.onload = ()=>{
            const blob = new Blob([reader.result])
            const pUrl = URL.createObjectURL(blob)

            setPreviewUrl(pUrl)
        }
        console.log(e.target.value)
        reader.readAsArrayBuffer(e.target.files[0])
    }

    const onFileDivClickHandler = ()=>{
        document.getElementById('file_img').click()
    }
  return (
    <div>
        {previewUrl ? <img className='acceptimage__img' src = {previewUrl} />:
        <div className="acceptimage__div" onClick={onFileDivClickHandler}>
            <p className="acceptimage__text">+Image</p>
        </div>
        }
        <input type="file" onChange={onChangeHandler} name="" id = 'file_img'  />
    </div>
  )
}

export default ImageAccepter