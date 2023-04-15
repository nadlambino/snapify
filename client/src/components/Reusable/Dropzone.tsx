import {useDropzone, FileWithPath} from 'react-dropzone';
import './../../css/dropzone.css'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { useEffect, useState } from 'react';

export default function Dropzone() {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.webp', '.png'],
      'video/*': ['.mp4']
    },
    maxFiles: 5
  });
  const [files, setFiles] = useState<File[]>(acceptedFiles)

  useEffect(() => {
    setFiles([...files, ...acceptedFiles])
  }, [acceptedFiles])

  return (
    <section className="flex justify-start w-full h-full gap-2">
      <div className='preview flex flex-wrap overflow-x-auto gap-2 justify-center'>
        {
          files && files.map(file => (
            <img key={Math.random()} src={URL.createObjectURL(file)} alt={file.name} />
          ))
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
