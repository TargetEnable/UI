import Navbar from './Navbar.tsx';
import RegistrationForm from './RegistrationForm';

function RegistrationPage(){
    return(
            <div>
              <Navbar />
              <div className="content-container">
                <RegistrationForm />
              </div>
            </div>
    );
}

export default RegistrationPage;