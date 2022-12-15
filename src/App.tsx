import React from 'react';
import './App.css';
import 'antd/dist/reset.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { publicRoutes } from 'routers';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            {publicRoutes.map(({ ...route }) => (
              <Route {...route} key={route.path} element={route.element} />
            ))}
          </Routes>{' '}
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
