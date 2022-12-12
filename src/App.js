import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import publicRoutes from './routers/publicRoutes.js';
import Home from './pages/Home.jsx';
import 'antd/dist/reset.css';

import { RecoilRoot } from 'recoil';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            {publicRoutes.map(({ ...route }) => (
              <Route {...route} key={route.path} component={route.component} />
            ))}
            <Route path="/home" element={<Home />} />
          </Routes>{' '}
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
