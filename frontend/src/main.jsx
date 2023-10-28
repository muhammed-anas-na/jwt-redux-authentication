import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileScreen from './Screens/ProfileScreen.jsx';  
import ProviteRoute from './Components/ProviteRoute.jsx';

import store from './store.js';
import {Provider} from 'react-redux';

import {createBrowserRouter , createRoutesFromElements , Route , RouterProvider} from 'react-router-dom'
import Homescreen from './Screens/Homescreen.jsx';
import LoginScreen from './Screens/LoginScreen.jsx';
import RegisterScreen from './Screens/RegisterScreen.jsx';
import AdminLoginScreen from './Screens/AdminLoginScreen.jsx';
import AdminPrivate from './Components/AdminPrivate.jsx';
import AdminDash from './Screens/AdminDash.jsx';

const route = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route to='' element={<AdminPrivate/>}>
      <Route path='/admin-dash' element={<AdminDash/>}/>
    </Route>
    <Route path='/' element={<App/>}>
      <Route path='/admin' element={<AdminLoginScreen/>}/>
      <Route index={true} path='/' element={<Homescreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
      {/* Private Route for user*/}
      <Route to='' element={<ProviteRoute/>}>
        <Route path='/profile' element={<ProfileScreen/>}/>
      </Route>
    </Route>
    </>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={route}/>
  </React.StrictMode>,
  </Provider>
)
