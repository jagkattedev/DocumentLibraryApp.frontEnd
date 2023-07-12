import React from 'react';
import {useState} from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import './App.css';
import ShareLinkDetailsModalComponent from './ShareLinkDetailsModalComponent';
import { NotificationManager } from 'react-notifications';
const FileCardComponent = ({fileInfo}) =>{

    const [showModal, setShowModal] = useState(false); 
    const fileExtension = fileInfo.fileExtension.replaceAll(".","");
    const urls = [{ uri: fileInfo.documentFetchUrl }]; 

    const showShareLinkModal = () => {
      setShowModal(true);
    }

    const hideShareLinkModal= () => {
      setShowModal(false);
    }

    const showSuccessNotification = () =>{
      NotificationManager.success('Link shared Successfully.');
    }

    const showErrorNotification = () =>{
      NotificationManager.error('Error occured while sharing the link.');
    }

    return(
             <div className="col">
                <div className="card shadow mt-2 mr-2 cardMaxHeight cardDisplayHorizontal">
                          <DocViewer
                            prefetchMethod="GET"    
                            className="card-img-top border border-primary"
                            documents={urls}
                            pluginRenderers={DocViewerRenderers}
                            config={{
                              header: {
                                
                                disableFileName: true,
                                },
                              pdfZoom: {
                                defaultZoom: 1.1, // 1 as default,
                                zoomJump: 0.2, // 0.1 as default,
                              }
                              
                            }} 
                             
                          />
                        <div className="card-body">
                        <h5 className="card-title">{fileInfo.fileName}</h5>
                        <img src ={"https://pro.alchemdigital.com/api/extension-image/" + fileExtension }/>
                </div>
                        <ul className="list-group list-group-flush">
                        <li className="list-group-item">Uploaded on : {format(new Date(fileInfo.uploadedOn),'yyyy.MM.dd kk:mm:ss')}</li>
                        <li className="list-group-item">
                           <span>{fileInfo.numberOfDownloads} Downloads</span> 
                            
                            </li>

                </ul>
                <div className="card-footer">
                 <button className="btn btn-secondary float-start" onClick={showShareLinkModal}>Share</button> 
                <a href={fileInfo.documentDownloadUrl} className="btn btn-secondary btn-sm float-end">
                                  <FontAwesomeIcon icon={faDownload} size="lg" />
                            </a>
                </div>
                </div>
                <ShareLinkDetailsModalComponent show={showModal} docId = {fileInfo.fileUniqueIdentifierId} handleClose={hideShareLinkModal} 
                notifySuccess = {showSuccessNotification} notifyError = {showErrorNotification} />
              </div>
    );
}

    export default FileCardComponent;



