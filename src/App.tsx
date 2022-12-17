import React from 'react';
import './App.css';
import 'antd/dist/reset.css';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { publicRoutes } from 'routers';
import Login from 'pages/Login';
import { ConfigProvider } from 'antd';
import historyRouter from 'utils/history';

function App() {
  const queryClient = new QueryClient();

  console.log('publicRoutes', publicRoutes);

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
          <QueryClientProvider client={queryClient}>
            <HistoryRouter history={historyRouter}>
              <Routes>
                {publicRoutes.map(({ ...route }) => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))}
                <Route path="/home" element={<Login />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </HistoryRouter>
          </QueryClientProvider>
        </ConfigProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
