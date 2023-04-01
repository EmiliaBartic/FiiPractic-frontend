import './App.css';
import Router from './Router';
import { CurrentUserProvider } from './context/auth';
import "./styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <CurrentUserProvider>
      <Router/>  
    </CurrentUserProvider>
  );
}

export default App;
