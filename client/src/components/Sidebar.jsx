import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SendIcon from '@mui/icons-material/Send';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StatesContext from '../context/StatesContext';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const masterroutes = [
    {
        title: 'Existing Companies',
        path: '/master/companies',
        Icon: TextSnippetIcon
    },

    {
        title: 'Create Company',
        path: '/master/company/create',
        Icon: SendIcon
    },

    {
        title: 'Invoice',
        path: '/master/invoice',
        Icon: ReceiptIcon
    },
    {
        title: 'All Trackings',
        path: '/master/tracking',
        Icon: TrackChangesIcon
    },
    

]


const userroutes = [
    {
        title: 'Existing Shipments',
        path: '/shipments',
        Icon: TextSnippetIcon
    },

    {
        title: 'Create Shipment',
        path: '/shipment/create',
        Icon: SendIcon
    },
    {
        title: 'Trackings',
        path: '/tracking',
        Icon: TrackChangesIcon
    },

]

const Sidebar = () => {

    const context = useContext(StatesContext)
    const { handleLogout, state } = context


    const { pathname } = useLocation()
    const navigate = useNavigate()

    let routes

    if (pathname.includes('/master')) {
        routes = masterroutes
    } else {
        routes = userroutes
    }


    return (
        <div className="fixed top-0 left-0 bottom-0 z-40 hidden md:block  pt-[100px] h-screen bg-[#003366] w-[230px]">
            <div className='px-[20px] flex flex-col justify-between h-full'>
                <div className='space-y-[30px]' >
                    {routes.map((item, index) => (
                        <div key={index} className='flex items-center gap-[10px] cursor-pointer'
                            onClick={() => {
                                navigate(item.path)
                            }}
                        >
                            <item.Icon
                                sx={{
                                    color: pathname === item.path ? '#FFA500' : 'white',
                                    fontSize: '22px'
                                }}
                            />
                            <h2 className={` ${pathname === item.path ? 'text-[#FFA500]' : 'text-white'} font-medium text-[16px]`}>
                                {item.title}
                            </h2>
                        </div>
                    ))}

                </div>

                <div className='pb-[25px] space-y-[20px]'>
                    <div className='flex items-center gap-[10px] cursor-pointer'
                        onClick={() => {
                            navigate('/profile')
                        }}
                    >
                   { !state.user?.image?.url  ? (<AccountCircleIcon
                            sx={{
                                color: pathname === '/profile' ? '#FFA500' : 'white',
                                fontSize: '22px'
                            }}
                        />):(
                            <img 
                            src={state.user?.image?.url}
                            alt="User profile" 
                            style={{
                              height: '50px', // Set the desired height
                              width: '50px',  // Set the desired width
                              borderRadius: '50%', // Make the image rounded
                              color: pathname === '/profile' ? '#FFA500' : 'white', // Conditional color based on pathname
                              fontSize: '22px' // Set the desired font size
                            }}
                          />)}
                        <h2 className={`font-medium text-[16px]  ${pathname === '/profile' ? 'text-[#FFA500]' : 'text-white'}`}>
                            Profile
                        </h2>
                    </div>
                    <div className='flex items-center gap-[10px] cursor-pointer'
                        onClick={() => {
                            handleLogout()
                            // navigate('/')
                        }}
                    >
                        <LogoutIcon
                            sx={{
                                color: 'white',
                                fontSize: '22px'
                            }}
                        />
                        <h2 className={` text-white font-medium text-[16px]`}>
                            Logout
                        </h2>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Sidebar