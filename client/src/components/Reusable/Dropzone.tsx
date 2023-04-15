import {useDropzone, FileWithPath} from 'react-dropzone';
import './../../css/dropzone.css'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { useEffect, useState } from 'react';

export default function Dropzone() {
  const onDrop = (newFiles: File[]) => {
    console.log(newFiles)
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

  return (
    <section className="flex justify-center w-full h-full gap-2">
      <div className='preview flex flex-wrap overflow-x-auto gap-2 justify-center'>
        {
          files && files.map((file, index) => {
            return (
              file.type.includes('image') ?
              <img key={index} src={URL.createObjectURL(file)} alt={file.name} />
              :
              <video key={index} autoPlay muted>
                <source src={URL.createObjectURL(file)} type="video/mp4"></source>
              </video>
            )
          })
        }
        {
          files.length < 5 ?
          <div {...getRootProps({className: 'dropzone'})} className='w-[100px] h-[100px] flex justify-center items-center border-dashed border-2 border-gray-600'>
            <input {...getInputProps()} />
            <MdAddPhotoAlternate className='btn-icon' size={30}/>
          </div>
          : ''
        }
        
      </div>
    </section>
  )
}
