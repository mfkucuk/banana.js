import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './home/home'
import Editor from './editor/BananaEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/editor' element={ <Editor/> } />

      </Routes>
    </Router>
  );
}

export default App;
