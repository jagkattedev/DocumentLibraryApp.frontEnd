import FileUploadComponent from './FileUploadComponent';
import FileListComponent from './FileListComponent';
import {NotificationContainer } from 'react-notifications';


const App = () => {

    return(
        <div className='align-content-center'>
            <NotificationContainer/>
           <FileUploadComponent/>
            <FileListComponent />
        </div>
     );

    }

    export default App;