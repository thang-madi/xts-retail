
import './App.css'
import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routeItems } from './components/Routes'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const App: React.FC = () => {

  const router = createBrowserRouter(routeItems())

  return (
    <div style={{ height: '100vh', backgroundColor: 'rgb(0, 150, 255)' }}>
      <RouterProvider router={router} />
    </div >

  )
}

export default App
