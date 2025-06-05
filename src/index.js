import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { Provider } from 'react-redux';
import store from './features/store.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DetailedWeatherView } from './components/DetailedWeatherView.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/details/:city' element={<DetailedWeatherView/>}/>

    </Routes>
  </BrowserRouter>
  </Provider>
  </StrictMode>,
)
