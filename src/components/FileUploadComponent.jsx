import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { NotificationManager } from 'react-notifications';
import ClipLoader from "react-spinners/ClipLoader";

const API_URL = "https://localhost:7243/api/Documents/UploadDocuments";

const FileUploadComponent = () => {
    const [files, setFiles] = useState([]);
    const [spinnerLoading, setSpinnerLoading] = useState(false);
    const [spinnerColor, setSpinnerColor] = useState("#333333");
    const [disableUploadButton, setDisableUploadButton] = useState(true);
    const onFileChange = (event) => {
        const uploadedFiles = Array.prototype.slice.call(event.target.files);
        setFiles(uploadedFiles);
        setDisableUploadButton(false);
       }

     const onUploadButtonClick = (e) =>{
         const formData = new FormData();
         files.forEach((file, i) => {
             formData.append("file", file);
        });
            try{
                setSpinnerLoading(true);

                    fetch(
                        API_URL,
                        {
                            method : 'POST',
                            body : formData
                        }
                    ).then((response) => response.json())
                     .then((result) =>{
                         setSpinnerLoading(false);
                         NotificationManager.success('Document uploaded Successfully.');
                          });
            }
            catch(error){
               console.log(error);  
               NotificationManager.error('Error occured while uploading the document.');   
            }
            
    };

    return(
       <div className="card w-75 text-center mx-auto">
       <div className="card-header">
        Upload Files
       </div>
       <div className="card-body">
       <FontAwesomeIcon icon={faUpload} size="lg" />
         <p className="card-text">PDF,Excel,Word,Images</p>
         <input className="form-control" type="file" onChange={onFileChange} accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf,application/vnd.ms-excel,application/msword,.docx,image/*'multiple></input>
         <button className="btn btn-primary mt-3" onClick={onUploadButtonClick} disabled={disableUploadButton}>
           <div className='float-left'>
           Upload
           </div>
           
            <div className="float-left mr-2">
            <ClipLoader
               color={spinnerColor}
                loading={spinnerLoading}
                size={25}
                radius ={200}
                aria-label="Loading Spinner"
                
             />
            </div>
           
         </button>
         <div className="text-center">
        
         </div>
         
       </div>
      
      
     </div>
    );

}

export default FileUploadComponent;