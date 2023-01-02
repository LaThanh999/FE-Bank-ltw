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
import LayoutContainer from 'layouts';
import ForgotPasswordPage from 'pages/ForgotPassword';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <RecoilRoot>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#4699EB',
            },
            components: {
              Button: {
                colorBgLayout: '#4699EB',
                colorBgBase: '#4699EB',
                colorPrimary: '#4699EB',
                colorPrimaryHover: '#4699EB',
                colorPrimaryActive: '#4699EB',
              },
              Modal: {
                colorBgLayout: '#4699EB',
                colorBgBase: '#4699EB',
                colorPrimary: '#4699EB',
                colorPrimaryHover: '#4699EB',
                colorPrimaryActive: '#4699EB',
              },
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <HistoryRouter history={historyRouter}>
              <Routes>
                <Route element={<LayoutContainer />}>
                  {publicRoutes.map(({ ...route }) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                  ))}
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              </Routes>
            </HistoryRouter>
          </QueryClientProvider>
        </ConfigProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
