import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import  OverAllStates  from './context/OverAllStates';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <OverAllStates>
          <App />
        </OverAllStates>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);


// const queryClient = new QueryClient()


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <QueryClientProvider client={queryClient}>
//         <OverAllStates>
//           <App />
//         </OverAllStates>
//       </QueryClientProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
// )
