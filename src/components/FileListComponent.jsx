import {useState } from 'react';
import {useEffect} from 'react';

import FileCardComponent from './FileCardComponent';
import ClipLoader from "react-spinners/ClipLoader";

const FILES_FETCH_URL = 'https://localhost:7243/api/Documents/GetAllDocuments';
const FileListComponent = () =>{
 const [fileInfos, setFileInfos] = useState([]);
 const [spinnerLoading, setSpinnerLoading] = useState(false);
 const [spinnerColor, setSpinnerColor] = useState("#333333");
 const spinnerCssOverride = {
  display: "block",
  margin: "0 auto"
};

 const getAllFileInfos = async () =>{
    setSpinnerLoading(true);
    const response = await fetch(FILES_FETCH_URL);
    const data = await response.json();
    setSpinnerLoading(false);
    setFileInfos(data);
 }

 useEffect(() =>{
   getAllFileInfos();
   
 }, []);

 return(
        <div className = "card w-75 mx-auto mt-5">
          <div className="card-header">
              Uploaded Files
         </div>
               <div className='row row-cols-1 row-cols-md-3 g-4 px-2'>
               {
                fileInfos?.length > 0
                ?(
                    fileInfos.map((fileInfo) => {
                      return(
                        <FileCardComponent fileInfo={fileInfo} key={fileInfo.id}/>
                      );
                 })
                ):
                  (
                    <div className="mx-auto">
                      <ClipLoader
                        color={spinnerColor}
                        cssOverride={spinnerCssOverride}
                          loading={spinnerLoading}
                          size={25}
                          radius ={200}
                          aria-label="Loading Spinner"
                
                      />
                    <h4 className="text-center">Loading...</h4>
                    </div>

                  )

              }
               </div>
              
        </div> 
        );

}
export default FileListComponent;
