/* eslint-disable react/no-unescaped-entities */
import { CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import StatesContext from '../../context/StatesContext';
import { useQuery } from '@tanstack/react-query';
import { BACKEND_URL } from '../../constant';


const ShipDetailModal = ({ open, setOpen , id }) => {

    const context = useContext(StatesContext)
    const { handleStateChange , state } = context;

  




    const token = JSON.parse(localStorage.getItem("token"));
    const fetchShipmentById = async () => {
        const response = await fetch(`${BACKEND_URL}/api/v1/shipment/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    };

    const { data = [], error, isFetching } = useQuery({
        queryKey: ['fetchShipmentById'], // Updated key format
        queryFn: fetchShipmentById,
        onError: (error) => {
            console.error('Error fetching data:', error);
        },
    });

    return (
        <div>
            {open && (
                <div
                    className="fixed top-0 left-0 w-full h-full z-50"
                    style={{
                        background: 'rgba(91, 91, 91, 0.15)',
                        backdropFilter: 'blur(12.5px)'
                    }}
                ></div>
            )}

            {open && (
                <div
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-50  max-w-[632px]"
                >
                    <motion.div
                        whileInView={{ scale: [0.7, 1], opacity: [0, 1] }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        initial='hidden'
                        style={{ opacity: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className='w-[90%] mx-auto sm:w-[500px] max-h-[500px] overflow-auto bg-white rounded-[23px] py-[22px]'
                        >

                            <div className='flex justify-end  px-[20px] '>
                                <div
                                    className='cursor-pointer'
                                    onClick={() => setOpen(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className='w-[16px] sm:w-[16px] h]' viewBox="0 0 21 20" fill="none">
                                        <path d="M20.2457 18.0243C20.3371 18.1157 20.4097 18.2242 20.4591 18.3436C20.5086 18.463 20.5341 18.5911 20.5341 18.7203C20.5341 18.8496 20.5086 18.9776 20.4591 19.097C20.4097 19.2165 20.3371 19.325 20.2457 19.4164C20.1543 19.5078 20.0458 19.5803 19.9264 19.6298C19.8069 19.6792 19.6789 19.7047 19.5497 19.7047C19.4204 19.7047 19.2924 19.6792 19.173 19.6298C19.0535 19.5803 18.945 19.5078 18.8536 19.4164L10.6951 11.2567L2.53665 19.4164C2.35204 19.601 2.10166 19.7047 1.84059 19.7047C1.57951 19.7047 1.32913 19.601 1.14452 19.4164C0.959913 19.2318 0.856201 18.9814 0.856201 18.7203C0.856201 18.4593 0.959913 18.2089 1.14452 18.0243L9.30423 9.86578L1.14452 1.70731C0.959913 1.5227 0.856201 1.27232 0.856201 1.01124C0.856201 0.750165 0.959913 0.499783 1.14452 0.315175C1.32913 0.130567 1.57951 0.0268555 1.84059 0.0268555C2.10166 0.0268555 2.35204 0.130567 2.53665 0.315175L10.6951 8.47488L18.8536 0.315175C19.0382 0.130567 19.2886 0.0268555 19.5497 0.0268555C19.8107 0.0268555 20.0611 0.130567 20.2457 0.315175C20.4303 0.499783 20.5341 0.750165 20.5341 1.01124C20.5341 1.27232 20.4303 1.5227 20.2457 1.70731L12.086 9.86578L20.2457 18.0243Z" fill="#C6C6C6" />
                                    </svg>
                                </div>
                            </div>


                            <div className='px-[20px]'>

                                <h2 className='text-[#FFA500] font-semibold text-center text-[20px] sm:text-[30px] mb-[10px]'>
                                    Shipment Detail
                                </h2>

                                <div className='border-t border-b border-gray-300  mt-[10px] space-y-[5px] py-[10px]'>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                            Company Name:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                            {data.companyName}
                                        </h2>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                            Service Type:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                        {data.serviceType}
                                        </h2>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                            Shipment Content:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                        {data.shipmentContent}
                                        </h2>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                            Shipment Value:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                        {data.shipmentValue}
                                        </h2>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                            Shipment Weight:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                        {data.shipmentWeight}
                                        </h2>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                            Sender Name:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                        {data.senderDetails?.name}
                                        </h2>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                            Sender Contact Number:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                        {data.senderDetails?.contactNumber}
                                        </h2>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                            Sender Address:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                        {data.senderDetails?.address}
                                        </h2>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                            Sender Country:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                        {data.senderDetails?.country}
                                        </h2>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                            Sender City:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                        {data.senderDetails?.city}
                                        </h2>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                            Sender Email:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                        {data.senderDetails?.email}
                                        </h2>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                            Receiver Name:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                        {data.receiverDetails?.name}
                                        </h2>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                        Receiver Contact Number:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                        {data.receiverDetails?.contactNumber}
                                        </h2>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                        Receiver Address:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                        {data.receiverDetails?.address}
                                        </h2>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                        Receiver Country:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                        {data.receiverDetails?.country}
                                        </h2>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                        Receiver City:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                        {data.receiverDetails?.city}
                                        </h2>
                                    </div>
                                    <div className='flex justify-between'>
                                        <h2 className='text-[13px] font-semibold'>
                                        Receiver Email:
                                        </h2>
                                        <h2 className='text-[13px]  text-gray-400'>
                                        {data.receiverDetails?.email}
                                        </h2>
                                    </div>
                                   
                                </div>

                                <div className='flex justify-between mt-[10px]'>
                                    <h2 className='text-[20px] font-semibold'>
                                        Charges:
                                    </h2>
                                    <h2 className='text-[20px] font-semibold'>
                                    ${data.collectedAmount}
                                    </h2>
                                </div>


                            </div>



                        </div>
                    </motion.div>
                </div >
            )}
        </div >
    );
};

export default ShipDetailModal;
