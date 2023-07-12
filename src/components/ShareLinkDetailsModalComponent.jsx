import { v4 as uuidv4 } from 'uuid';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import 'react-notifications/lib/notifications.css';
const DOCUMENTS_API_BASE_URL = "https://localhost:7243/api/Documents";

const ShareLinkDetailsModalComponent = ({show,docId, handleClose, notifySuccess, notifyError}) => {

    const showHideClassName = show? "modal modal-display-block" : "modal modal-display-none";
    const windowId = docId + "window";
    const shareId = uuidv4();
    const link = DOCUMENTS_API_BASE_URL + "/ShareDocument?shareId=" + shareId;
    const shareLinkPostUrl = DOCUMENTS_API_BASE_URL + "/ShareLink";

    const copyLink = () =>{
      var copyText = document.getElementById(docId + "-shareLinkInput");
      copyText.select();
     // Copy the text inside the text field
     navigator.clipboard.writeText(copyText.value);   
    }

    const shareLink = async() =>{

      var validFor = document.getElementById(docId + "-shareLinkNumber");
      var validForUnit = document.getElementById(docId + "-shareLinkValidityUnit");
       const data = {
        documentId : docId,
        shareId : shareId,
        validFor : parseInt(validFor.value),
        validForUnit : parseInt(validForUnit.value)
       };

       try{

        await fetch(
          shareLinkPostUrl,
          {
            method : 'POST',
            headers: {
              "Content-Type": "application/json",
              "Accept":"application/json"
             },
             body : JSON.stringify(data)
          }
  
        ).then((response) => response.json())
        .then((result) => {handleClose(); notifySuccess(); });
        
       }
       catch(error){
        console.log(error);
        handleClose();
        notifyError();
       }
      
    }
       
    return(
        <div id ={windowId} className={showHideClassName}>
     <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 id={windowId + "label"} className="modal-title">Share Document</h5>
        <button type="button" className="btn-close" onClick={handleClose}></button>
      </div>
      <div className="modal-body">

      <label className="form-label fw-bold">Link</label>
        <input id={docId + "-shareLinkInput"} type="text" value={link} className="form-control mt-2" readOnly/>

        <label className="form-label mt-2 fw-bold">Valid for</label>
        <input className="form-control mt-2" type="number" min="1" max="365" id={docId + "-shareLinkNumber"}/>

        <select id={docId + "-shareLinkValidityUnit"} className="form-control mt-2">
            <option value="0">Hours</option>
            <option value="1" defaultValue>Days</option>
        </select>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={copyLink}>Copy Link</button>
        <button type="button" className="btn btn-primary" onClick={shareLink}>Share</button>
      </div>
    </div>
  </div>
</div>
    )
}

export default ShareLinkDetailsModalComponent;