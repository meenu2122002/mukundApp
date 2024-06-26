import  { useCallback, useState } from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone'
import { Button } from '../ui/button'
type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void,
  mediaUrl: string
}
const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl)
  const [file, setFile] = useState<File[]>([])
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    console.log("accepted files",acceptedFiles)
    setFile(acceptedFiles)
    fieldChange(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    console.log("file url",fileUrl)
  }, [file])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', 'jpg', '.svg', 'jpeg']
    }


  })

  return (
    <div {...getRootProps()} className='flex flex-col flex-center  bg-dark-3 rounded-xl cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ? <>
          <div
            className='flex flex-1 flex-col w-full p-5 lg:p-10 justify-center items-center'

          >
            <img src={fileUrl} alt=""
              className='file_uploader-img'

            />

          </div>
<p>Click or drag photo to replace</p>
        </> :
          <>
            <div className='file_uploader-box'>
              <img src="/assets/icons/file-upload.svg" alt="file-upload"
                width={96}
                height={77}

              />
              <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
              <h3 className='text-light-4 small-regular mb-2'>SVG,PNG,JPEG</h3>
              <Button className='shad-button_dark_4'>
                Select from computer

              </Button>
            </div>
          </>
      }
    </div>
  )
}

export default FileUploader