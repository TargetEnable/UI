import Navbar from './Navbar.tsx';
import Carousel from './Carousel';
import LoginForm from './LoginForm';
import './App.css';

function LoginPage(){
    return(
            <div>
              <Navbar />
              <div className="content-container">
                <Carousel />
                <LoginForm />
              </div>
            </div>
    );
}

export default LoginPage;