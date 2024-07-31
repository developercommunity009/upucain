
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import WalletIcon from '@mui/icons-material/Wallet';
import NavBar from '../../components/NavBar';
import Sidebar from '../../components/Sidebar';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/eth.png';
import ConnectBtn from '../../components/ConnectBtn';
import StatesContext from '../../context/StatesContext';



const Dashboard = () => {

    const context = useContext(StatesContext)
    const { state, ethBalance } = context


    const navigate = useNavigate()

    return (
        <div>
            <Sidebar />
            <NavBar />
            <div className='md:ml-[230px]'>
                <div className='mt-[60px] w-full p-[20px]'>
                    <div className='max-w-[1100px] mx-auto'>

                        <div className='flex justify-between items-center'>
                            <div>
                                <h2 className='text-[25px] font-extrabold'>
                                    Hello {state.user && (state.user.firstName + ' ' + state.user.lastName)}
                                </h2>
                                <p className='text-gray-500 text-[14px] font-semibold mt-[-2px]'>
                                    Send and receive payments easily
                                </p>
                            </div>
                            <ConnectBtn />
                        </div>

                        <p className='text-gray-700 mt-[20px] text-[23px] font-semibold '>
                            Wallet balance
                        </p>

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] mt-[10px]'>

                            <div className='sm:h-[150px] bg-[#003366] w-full rounded-[10px] p-[20px]'>
                                <div className='flex items-center gap-[7px]'>
                                    <WalletIcon sx={{ color: 'white', fontSize: '20px' }} />
                                    <h2 className='text-white font-bold text-[15px]'>
                                        INTY wallet
                                    </h2>
                                </div>
                                <h2 className=' font-semibold text-[14px] mt-[20px] sm:mt-[25px] text-gray-200'>
                                    Available Tokens
                                </h2>
                                <h2 className=' font-extrabold text-[30px]  text-white'>
                                    0
                                </h2>
                            </div>
                            <div className='sm:h-[150px] bg-[#003366] w-full rounded-[10px] p-[20px]'>
                                <div className='flex items-center gap-[7px]'>
                                    <img src={img} alt="" className='h-[20px] rounded-full' />
                                    <h2 className='text-white font-bold text-[15px]'>
                                        ETH
                                    </h2>
                                </div>
                                <h2 className=' font-semibold text-[14px] mt-[20px] sm:mt-[25px] text-gray-200'>
                                    ETH Balance
                                </h2>
                                <h2 className=' font-extrabold text-[30px]  text-white'>
                                    {Number(ethBalance).toFixed(5)}
                                </h2>
                            </div>



                            <div className='h-[150px] border border-gray-400 w-full rounded-[10px] flex justify-center items-center cursor-pointer'
                                onClick={() => {
                                    navigate('/contract/create')
                                }}
                            >
                                <div className='flex flex-col items-center gap-[5px]'>
                                    <AddCircleOutlineIcon sx={{ fontSize: '60px', color: '#bdbdbd' }} />
                                    <h2 className='text-gray-400 text-[15px] font-semibold'>
                                        Add new contract
                                    </h2>
                                </div>
                            </div>
                        </div>

                      

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard