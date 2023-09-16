import { Route, Routes } from "react-router-dom";
import LoginPage from "../LoginPage";
import RegistrationPage from "../RegistrationPage";
import IncidentForm from "../IncidentForm";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "../dashboard";
import IncidentList from "../incidentlist";
import SupDash from "../SupDash";
import IncidentDetails from "../SupIncident";
import Incident from "../EmpIncident";
import PageNotFound from "../Error";

export const AuthComponent = () => {

    const role = localStorage.getItem('role')
    
    
        return(
            <>
                <ToastContainer/>
                <Routes>
                    <Route exact path ="/" element={<LoginPage/>}/>
                    <Route exact path ="/register" element={<RegistrationPage/>}/>
                    <Route exact path="/employee/incident_form" element={role ==='team'?<IncidentForm/>:<PageNotFound/>}/>
                    <Route exact path="/employee/dashboard/:email" element={role ==='team'?<Dashboard/>:<PageNotFound/>}/>
                    <Route exact path="/employee/incident_list/:email" element={role ==='team'?<IncidentList/>:<PageNotFound/>}/>
                    <Route exact path="/admin/dashboard" element={role ==='admin'?<SupDash/>:<PageNotFound/>}/>
                    <Route exact path="/admin/incident_assignment" element={role ==='admin'?<IncidentDetails/>:<PageNotFound/>}/>
                    <Route exact path="/support/incident" element={role ==='support'?<Incident/>:<PageNotFound/>}/>
                    {/* <Route exact path="/logout" element={<LoginPage/>}/> */}
                </Routes>  
            </>    
        )
   
}