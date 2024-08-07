
import { CircularProgress } from '@mui/material';
import { useContext, useState } from 'react';
import NavBar from '../../components/NavBar';
import Sidebar from '../../components/Sidebar';
import EditCompanyModal from '../../components/modal/EditCompany';
import InvoiceModal from '../../components/modal/InvoiceModal';
import StatesContext from '../../context/StatesContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { BACKEND_URL } from '../../constant';


const tableHead = ['Tracking Number', 'Company Name', 'Sender Name', 'Reciver Name', 'Chargeable Amount', 'Payment Status', 'Actions'];

const MasterInvoice = () => {

    const [open, setopen] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [id, setId] = useState(false)
    const context = useContext(StatesContext)

    const token = JSON.parse(localStorage.getItem("token"));

    const { handleStateChange, state } = context;
    const fetchInvoices = async () => {
        const response = await fetch(`${BACKEND_URL}/api/v1/invoice/`, {
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
        queryKey: ['fetchInvoices'], // Updated key format
        queryFn: fetchInvoices,
        onError: (error) => {
            console.error('Error fetching data:', error);
        }
    });


    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${BACKEND_URL}/api/v1/invoice/request-payment/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify(newData)
            });
        },

        async onSuccess(data) {
            let res = await data.json()
            console.log(res)
            if (res.success) {
                handleStateChange({ success: res.success })
            }
        },

    })



    return (
        <div>

            {open && (
                <InvoiceModal open={open} setOpen={setopen} id={id} />
            )}

            <Sidebar />
            <NavBar />second
            <div className='md:ml-[230px]'>
                <div className='mt-[80px] w-full p-[20px]'>
                    <div className='max-w-[1300px] mx-auto'>

                        <h2 className='text-[#FFA500] font-semibold text-center text-[30px] mb-[10px]'>
                            Shipment Invoices
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
                                                    {item.companyName}
                                                </td>
                                                <td className="text-[13px] text-center ">
                                                    {item.shipmentId?.senderDetails.name}
                                                </td>
                                                <td className="text-[13px] text-center ">
                                                    {item.shipmentId?.receiverDetails.name}
                                                </td>
                                                <td className="text-[13px]   text-center ">
                                                    {item.fee}
                                                </td>
                                                <td className="text-[13px]   text-center ">
                                                    {item.status}
                                                </td>




                                                <td className=" gap-[10px]">

                                                    <div className="cursor-pointer flex justify-center"
                                                    >
                                                        <button
                                                            className={`${item.status === "In Progress" ? 'bg-gray-500' : item.status === "Paid" ? 'bg-green-500' : 'bg-[#FFA500]'} text-white font-semibold text-[11px] px-[10px] py-[5px] rounded-[20px]`}
                                                            onClick={() => mutation.mutate({ invoiceId: item._id })}
                                                            disabled={item.status === "In Progress" || item.status === "Paid"}
                                                        >
                                                            {item.status === "In Progress" ? "In Progress" : item.status === "Paid" ? "Payment Paid" : "Payment Request"}
                                                        </button>
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

export default MasterInvoice