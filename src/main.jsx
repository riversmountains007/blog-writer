import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { store } from './RTK-Store/store.js';

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  ,
)