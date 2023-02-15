
import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Index from './components/Index'


function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/index' element={<Index/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
