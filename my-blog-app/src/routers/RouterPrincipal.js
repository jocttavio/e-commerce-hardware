import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'; //IMPORTAMOS LAS 

import { Blog } from '../components/Blog';
import { Header } from '../components/Header';

export const RouterPrincipal = () => {
  return (
    <BrowserRouter>
 
    <Routes>
        <Route path='/*' element={<Header/>}>
          <Route path='blog' element={<Blog/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
  )
}
