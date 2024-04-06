import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import PublicHome from './components/PublicHome';

import Home from './components/Home';
import MyDiary from './components/MyDiary';
import DiaryEntries from './components/DiaryEntries';

import Protected from './components/Protected';


function App() {
  return (
    <div className="App">
      <AppContent/>
    </div>
  );
}


function AppContent() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicHome/>}/>
          <Route path='/register' element={<Register />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Protected><Home/></Protected>} />
          <Route path="/mydiary" element={<Protected><MyDiary/></Protected>} />
          <Route path="/diaryentries" element={<Protected><DiaryEntries/></Protected>}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
