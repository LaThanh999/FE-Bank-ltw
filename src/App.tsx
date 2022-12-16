import React from 'react';
import './App.css';
import 'antd/dist/reset.css';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { publicRoutes } from 'routers';
import Test from 'pages/Login';
import { ConfigProvider } from 'antd';
import historyRouter from 'utils/history';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#48BB78',
            },
          }}
        >
          <HistoryRouter history={historyRouter}>
            <Routes>
              {publicRoutes.map(({ ...route }) => (
                <Route {...route} key={route.path} path={route.path} element={route.element} />
              ))}
              <Route path="/login" element={<Test />} />
            </Routes>
          </HistoryRouter>
        </ConfigProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
