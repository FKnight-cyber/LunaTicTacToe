import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import GlobalStyle from './themes/globalStyles';
import UserContext from './contexts/UserContext';
import Login from './Pages/Login';

export default function App() {
  const [token, setToken ] = useState(localStorage.getItem('authToken'));

  const userContext:any = {
    token,
    setToken
  };

  return (
    <BrowserRouter>
      <GlobalStyle />
      <UserContext.Provider value={userContext}>
        <Routes>
          <Route path={"/"} element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter> 
  );
}
