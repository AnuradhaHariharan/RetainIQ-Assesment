import React from 'react'
import './App.css'
import Product from './Pages/Product/Product'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Navbar/Sidebar/Sidebar'

const App = () => {
  return (
    <div >
      <Navbar/>
      <Sidebar/>
      <div className='main-content'>
      <Product/>
      </div>
    </div>
  )
}

export default App
