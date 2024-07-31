import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import OverAllStates from './context/OverAllStates';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'



// // 1. Get projectId
const projectId = '3bc9b13ede2c46a106c03bfadb9129e8'

// 2. Set chains
const chain = {
  chainId: 11_155_111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://rpc.sepolia.org'
}

// 3. Create modal
const metadata = {
  name: 'Inheritly',
  // description: 'My Website description',
  url: 'http://localhost:5173/', // origin must match your domain & subdomain
  // url: 'https://mywebsite.com', // origin must match your domain & subdomain
  // icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [chain],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})
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
