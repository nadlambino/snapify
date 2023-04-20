import {useDropzone, FileWithPath} from 'react-dropzone';
import './../../css/dropzone.css'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'
interface Props {
  setMedia: Function
}

export default function Dropzone({setMedia}: Props) {
  const onDrop = (newFiles: File[]) => {
    setFiles([...files, ...newFiles])
  }
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.webp', '.png'],
      'video/*': ['.mp4']
    },
    maxFiles: 5
  });
  const [files, setFiles] = useState<File[]>(acceptedFiles)

  useEffect(() => {
    setMedia(files)
  }, [files])

  const handleRemoveFile = (index: number) => {
    setFiles(() => files.filter((file, fileIndex) => fileIndex !== index))
  }

  return (
    <div className='relative w-full'>
      <section className="flex justify-center w-full h-full gap-2">
        <div className='preview flex flex-wrap overflow-x-auto gap-2 justify-center'>
          {
            files && files.map((file, index) => {
              return (
                file.type.includes('image') ?
                <div className='file-container' key={index}>
                  <div className='file-overlay'>
                    <AiOutlineDelete size={35} onClick={() => handleRemoveFile(index)} className='delete-icon'/>
                  </div>
                  <img key={index} src={URL.createObjectURL(file)} alt={file.name} />
                </div>
                :
                <video key={index} autoPlay muted>
                  <source src={URL.createObjectURL(file)} type="video/mp4"></source>
                </video>
              )
            })
          }
          {
            files.length < 5 ?
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <MdAddPhotoAlternate size={30}/>
            </div>
            : ''
          }
        </div>
      </section>
      <small className='text-gray-500 block absolute w-full text-right'>{files.length}/5</small>
    </div>
  )
}
