import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import SendIcon from '@mui/icons-material/Send';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';

import logo from '../assets/logo.png'
import StatesContext from "../context/StatesContext";
// import { useDisconnect, useWeb3Modal, useWeb3ModalAccount, useWeb3ModalState } from "@web3modal/ethers5/react";
import { CircularProgress } from "@mui/material";

const NavBar = () => {

    const context = useContext(StatesContext)
    const { handleLogout, state } = context


    const [isOpen, setisOpen] = useState(false)
    const navigate = useNavigate()
    const { pathname } = useLocation()

    // const { open } = useWeb3Modal()
    // const { disconnect } = useDisconnect()
    // const { address } = useWeb3ModalAccount()
    // const { open: modalOpen } = useWeb3ModalState()



    // const handleConnect = async () => {

    //     if (address) {
    //         await disconnect()
    //     } else {
    //         open()
    //     }
    // }

    // function formatWalletAddress(address) {
    //     const addressLength = address.length;

    //     let value = 4

    //     const truncatedAddress = address.slice(0, value) + "..." + address.slice(addressLength - value);

    //     return truncatedAddress;
    // }


    const routes = [
        {
            title: 'Dashboard',
            path: '/dashboard',
            Icon: DashboardIcon
        },
        {
            title: 'Create Contract',
            path: '/contract/create',
            Icon: SendIcon
        },
        {
            title: 'Existing Contract',
            path: '/contracts',
            Icon: TextSnippetIcon
        },
    ]



    return (
        <div className="fixed top-0 left-0 md:left-[230px] right-0 py-[12px] md:h-[60px] bg-[#003366] ">
            <div className="flex justify-between md:justify-center items-center h-full px-[20px]">
                <div className="flex items-center gap-[10px]">
                    <img src={logo} alt="" className="h-[30px] md:h-[37px]" />
                  

                </div>
                
            </div>

            {isOpen && (

                <div className='fixed inset-0 z-10 bg-[#003366]  px-[20px] py-[12px]'>
                    <div className='relative h-full'>
                        <div className='flex justify-between items-center'>
                            <h2 className="text-white font-bold text-[23px] md:text-[25px]">
                                Inheritly
                            </h2>
                            <div className='flex items-center gap-[20px]'>

                                <div className='h-[38px] w-[38px] bg-[#FFA500] rounded-full flex justify-center items-center'
                                    onClick={() => {
                                        setisOpen(false)
                                    }}
                                >
                                    <XMarkIcon className='h-[23px] text-white' />
                                </div>
                            </div>
                        </div>


                        <div

                            className=''
                        >
                            <div className='mt-[80px] flex flex-col gap-[30px] max-h-[450px] overflow-y-auto'>

                                {routes.map((item, i) => (

                                    <div key={i} className={`px-[20px] py-[10px]  ${pathname === item.path ? 'bg-[#FFA500]' : 'bg-gray-50'} shadow-md rounded-[10px] flex items-center gap-[10px]`}
                                        onClick={() => {
                                            navigate(item.path)
                                        }}
                                    >

                                        <item.Icon
                                            sx={{
                                                color: pathname === item.path && 'white',
                                                fontSize: '22px'
                                            }}
                                        />

                                        <p
                                            className={`text-[17px]  duration-500 relative z-20  cursor-pointer font-semibold ${pathname === item.path ? 'text-white' : ''} `}

                                        >
                                            {item.title}
                                        </p>
                                    </div>
                                ))}

                                <div className={`px-[20px] py-[10px]  ${pathname === '/profile' ? 'bg-[#FFA500]' : 'bg-gray-50'} shadow-md rounded-[10px] flex items-center gap-[10px]`}
                                    onClick={() => {
                                        navigate('/profile')
                                    }}
                                >

                                    <AccountCircleIcon
                                        sx={{
                                            color: pathname === '/profile' && 'white',
                                            fontSize: '22px'
                                        }}
                                    />

                                    <p
                                        className={`text-[17px]  duration-500 relative z-20  cursor-pointer font-semibold ${pathname === '/profile' ? 'text-white' : ''} `}

                                    >
                                        Profile
                                    </p>
                                </div>
                                <div className={`px-[20px] py-[10px]  ${pathname === '/verify/kyc' ? 'bg-[#FFA500]' : `${state.user.isKycApproved ? 'bg-[rgb(34,197,94)]' : 'bg-gray-50'}`} shadow-md rounded-[10px] flex items-center gap-[10px]`}
                                    onClick={() => {
                                        if (!state.user.isKycApproved) {
                                            navigate('/verify/kyc')
                                        }
                                    }}
                                >
                                    <AccountCircleIcon
                                        sx={{
                                            color: pathname === '/verify/kyc' ? 'white' : `${state.user.isKycApproved ? 'white' : 'black'}`,
                                            fontSize: '22px'
                                        }}
                                    />

                                    <p
                                        className={`text-[17px]  duration-500 relative z-20  cursor-pointer font-semibold ${(pathname === '/verify/kyc' || state.user.isKycApproved) ? 'text-white' : ''} `}

                                    >
                                        {state.user.isKycApproved ? 'KYC Verified' : 'Verify KYC'}
                                    </p>
                                </div>

                                <div className={`px-[20px] py-[10px]  bg-gray-50 shadow-md rounded-[10px] flex items-center gap-[10px]`}
                                    onClick={() => {
                                        handleLogout()
                                    }}
                                >
                                    <LogoutIcon
                                        sx={{
                                            fontSize: '22px'
                                        }}
                                    />
                                    <p
                                        className={`text-[17px]  duration-500 relative z-20  cursor-pointer font-semibold `}
                                    >
                                        Logout
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default NavBar