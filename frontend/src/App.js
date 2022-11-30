import logo from './logo.svg';
import './App.css';
import {Routes, BrowserRouter,Route} from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Main from './components/main';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
