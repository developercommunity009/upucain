import { CircularProgress } from '@mui/material';
import { useContext, useState } from 'react';
import NavBar from '../../components/NavBar';
import Sidebar from '../../components/Sidebar';
import EditCompanyModal from '../../components/modal/EditCompany';
import InvoiceModal from '../../components/modal/InvoiceModal';
import { PencilIcon } from '@heroicons/react/24/solid';
import ShipDetailModal from '../../components/modal/ShipmentDetail';
import EditShipModal from '../../components/modal/EditShipModal';
import TrackingModal from '../../components/modal/TrackingModal';
import { BACKEND_URL } from '../../constant';
import { useQuery } from '@tanstack/react-query';
import StatesContext from '../../context/StatesContext';
import EditTrackingModel from '../../components/modal/EditTracking';

const tableHead = ['Tracking Number', 'SeqNo', 'DateTime', 'ActionBy', 'ActionByCompany', 'City', 'Country' , 'Status' , 'Update']

const MyTrackings = () => {
    const context = useContext(StatesContext)
    const { handleStateChange , state } = context;

    const [open, setopen] = useState(false)
    const [openTrackingDeatil, setopenTrackingDeatil] = useState(false)
    const [trackingOpen, settrackingOpen] = useState(false)
    const [trackingId, setTrackingId] = useState('')
    const [item, setItem] = useState('')
    const [isLoading, setisLoading] = useState(false)

    const token = JSON.parse(localStorage.getItem("token"));

    const fetchTrackings = async () => {
        const response = await fetch(`${BACKEND_URL}/api/v1/tracking/creator/${state.user._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    };

    const { data = [], error, isFetching } = useQuery({
        queryKey: ['fetchTrackings'], // Updated key format
        queryFn: fetchTrackings,
        onError: (error) => {
            console.error('Error fetching data:', error);
        },
    });
   
    return (
        <div>

            {/* {open && (
                <ShipDetailModal open={open} setOpen={setopen} id={id} />
            )} */}

            {openTrackingDeatil && (
                <EditTrackingModel open={openTrackingDeatil} setOpen={setopenTrackingDeatil} item={item} token={token} />
            )}

            {/* {trackingOpen && (
                <TrackingModal open={trackingOpen} setOpen={settrackingOpen} trackingId={trackingId} token={token} />
            )} */}

            <Sidebar />
            <NavBar />second
            <div className='md:ml-[230px]'>
                <div className='mt-[80px] w-full p-[20px]'>
                    <div className='max-w-[1300px] mx-auto'>

                        <h2 className='text-[#FFA500] font-semibold text-center text-[30px] mb-[10px]'>
                          {state.user?.role === "admin" ?  "All Trackings" : "My Trackings"}
                        </h2>

                        <div
                            className="w-full px-[20px] pt-[10px]"

                        >

                            <div className={` w-full  overflow-x-auto bg-[rgba(242,247,251,0.5)] py-[20px] px-[30px] rounded-[20px]`}
                            >
                                <table className="min-w-[930px] w-full">
                                    <thead className="text-[14px] font-normal text-[#656575]" >
                                        <tr className='border-b-[0.5px] border-gray-300 pb-[10px] '>
                                            {tableHead.map((item, i) => (
                                                <th scope="col" className={`${i !== 0 ? 'text-center' : 'text-start'}  pb-[10px] font-bold text-[#656575] `} key={i}>
                                                    {item}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className='w-full'>
                                        {(!isLoading && data.length > 0) && data.map((item, i) => (
                                            <tr
                                                key={i}
                                                className={` ${i < data.length - 1 && 'border-b-[0.5px] border-gray-300'}`}
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.04)'
                                                }}
                                            >
                                                <td className=" pt-[13px] pb-[8px] text-[13px] font-medium">
                                                    {item.trackingId}

                                                </td>

                                                <td className="text-[13px]   text-center ">
                                                    {item.seqNo}
                                                </td>
                                                <td className="text-[13px]   text-center ">
                                                    {item.dateTime}
                                                </td>
                                                <td className="text-[13px]   text-center ">
                                                    {item.actionBy}
                                                </td>
                                                <td className="text-[13px] text-center ">
                                                    {item.actionByCompany}
                                                </td>
                                                <td className="text-[13px] text-center ">
                                                    {item.city}
                                                </td>
                                                <td className="text-[13px] text-center ">
                                                    {item.country}
                                                </td>
                                             


                                                <td className=" gap-[10px]">
                                                  In Transist
                                                </td>
                                                <td className=" gap-[10px]">

                                                    <div className="cursor-pointer flex justify-center items-center gap-[7px]"
                                                    >
                                                        <PencilIcon className='h-[16px]'
                                                            onClick={() =>{setItem(item) ,setopenTrackingDeatil(true)}}
                                                        />
                                                    </div>
                                                </td>

                                            </tr>
                                        ))}

                                        <tr
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.04)',
                                            }}
                                        >
                                            {isLoading && (
                                                <td colSpan={'5'} className="py-[85px] text-center">
                                                    <CircularProgress />
                                                </td>
                                            )}
                                            {!isLoading && data.length === 0 && (
                                                <td colSpan={'5'} className="text-[15px] py-[100px] font-medium text-[#87909C] text-center">
                                                    No contracts yet!
                                                </td>
                                            )}

                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyTrackings