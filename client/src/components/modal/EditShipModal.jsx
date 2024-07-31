/* eslint-disable react/no-unescaped-entities */
import { CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import StatesContext from '../../context/StatesContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { BACKEND_URL } from '../../constant';
import { useNavigate } from 'react-router-dom';



const EditShipModal = ({ open, setOpen, id }) => {

  console.log(id);
    const context = useContext(StatesContext)
    const { handleStateChange, state } = context;

    const [country, setcountry] = useState('')
    const [loading, setloading] = useState(false)

    const token = JSON.parse(localStorage.getItem("token"));
    const navigate = useNavigate()

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


    const [serviceTypeOpen, setserviceTypeOpen] = useState(false)
    const [serviceType, setserviceType] = useState('Service Type')
    const [shipContentOpen, setshipContentOpen] = useState(false)
    const [shipmentContent, setShipmentContent] = useState('Shipment Content')
    const [shipmentValue, setShipmentValue] = useState(data?.shipmentValue || "")
    const [shipmentWeight, setShipmentWeight] = useState(data?.shipmentWeight || "")
    const [collectedAmount, setCollectedAmount] = useState(data.collectedAmount || "")

    const [senderName, setSenderName] = useState(data?.senderDetails?.name || "")
    const [senderEmail, setSenderEmail] = useState(data?.senderDetails?.email || "")
    const [senderContactNumber, setSenderContactNumber] = useState(data?.senderDetails?.contactNumber || "")
    const [senderCountry, setSenderCountry] = useState(data?.senderDetails?.country || "")
    const [senderCity, setSenderCity] = useState(data?.senderDetails?.city || "")
    const [senderAddress, setSenderAddress] = useState(data?.senderDetails?.address || "")

    const [reciverName, setReciverName] = useState(data?.receiverDetails?.name || "")
    const [reciverEmail, setReciverEmail] = useState(data?.receiverDetails?.email || "")
    const [reciverContactNumber, setReciverContactNumber] = useState(data?.receiverDetails?.contactNumber || "")
    const [reciverCountry, setReciverCountry] = useState(data?.receiverDetails?.country || "")
    const [reciverCity, setReciverCity] = useState(data?.receiverDetails?.city || "")
    const [reciverAddress, setReciverAddress] = useState(data?.receiverDetails?.address || "")


    const mutation = useMutation({
        mutationFn: (newData) => {
            console.log(newData)
            return fetch(`${BACKEND_URL}/api/v1/shipment/${data._id}`, {
                method: 'PUT',
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
            if (res.success) {
                handleStateChange({ success: res.success })
                setOpen(false)
            }
        },

    })

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
                        <div className='w-[95%] mx-auto sm:w-[700px] max-h-[550px] overflow-auto bg-white rounded-[23px] py-[22px]'
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

                            <form className=''
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setloading(true);
                                    mutation.mutate({
                                        serviceType,
                                        shipmentContent,
                                        shipmentValue,
                                        shipmentWeight,
                                        collectedAmount,
                                        senderDetails: {
                                            name: senderName,
                                            email: senderEmail,
                                            contactNumber: senderContactNumber,
                                            country: senderCountry,
                                            city: senderCity,
                                            address: senderAddress,
                                        },
                                        receiverDetails: {
                                            name: reciverName,
                                            email: reciverEmail,
                                            contactNumber: reciverContactNumber,
                                            country: reciverCountry,
                                            city: reciverCity,
                                            address: reciverAddress,
                                        },

                                    })
                                    setloading(false);

                                }}
                            >
                                <div className='space-y-[20px]'>

                                    <h2 className='text-[#FFA500] font-semibold text-center text-[30px] mb-[10px]'>
                                        Update Shipment
                                    </h2>

                                    <h2 className='font-bold text-[13px] leading-[1px] pt-[20px]'>
                                        Shipment Basic Information
                                    </h2>

                                    <div
                                        className={`relative flex select-none w-full cursor-pointer justify-between gap-[15px] px-[10px] py-[10px] items-center rounded-[10px] `}

                                        onClick={() => setserviceTypeOpen(!serviceTypeOpen)}

                                        style={{
                                            border: '1px solid #E3E3E3'
                                        }}
                                    >
                                        <p
                                            className='text-[13px] text-gray-600  font-normal pl-[5px]'
                                        >
                                            {serviceType}
                                        </p>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-[8px] mr-[7px]' viewBox="0 0 10 6" fill="none">
                                            <path d="M9.77907 1.04697C9.77941 1.14896 9.7569 1.24973 9.71319 1.34188C9.66948 1.43403 9.60568 1.51521 9.52647 1.57946L5.4304 4.8768C5.30825 4.97721 5.15502 5.0321 4.9969 5.0321C4.83877 5.0321 4.68555 4.97721 4.5634 4.8768L0.467322 1.46341C0.327908 1.34753 0.240235 1.18102 0.223592 1.0005C0.206948 0.819981 0.262697 0.640244 0.378574 0.50083C0.494451 0.361415 0.660964 0.273743 0.841483 0.257099C1.022 0.240456 1.20174 0.296205 1.34115 0.412081L5.00031 3.46366L8.65947 0.514483C8.75968 0.431003 8.8817 0.377975 9.0111 0.361672C9.1405 0.34537 9.27187 0.366477 9.38965 0.422494C9.50743 0.478512 9.6067 0.567097 9.67571 0.677766C9.74472 0.788436 9.78059 0.916558 9.77907 1.04697Z" fill="black" />
                                        </svg>

                                        {serviceTypeOpen && (
                                            <div className="absolute top-[38px] h-[70px] overflow-auto left-0 right-0 z-20 bg-white"
                                                style={{
                                                    border: '1px solid #E3E3E3',
                                                    borderBottomLeftRadius: '5px',
                                                    borderBottomRightRadius: '5px',
                                                    borderTopColor: 'transparent',
                                                    boxShadow: '0px 3px 6px #0000000D',
                                                }}
                                            >
                                                <p
                                                    className='text-[10px] sm:text-[12px] hover:bg-gray-50  font-normal px-[16px] py-[8px] duration-500 '
                                                    onClick={() => {
                                                        setserviceType('Domestic')
                                                    }}
                                                >
                                                    Domestic
                                                </p>
                                                <p
                                                    className='text-[10px] sm:text-[12px] hover:bg-gray-50  font-normal px-[16px] py-[8px] duration-500 '
                                                    onClick={() => {
                                                        setserviceType('International')
                                                    }}
                                                >
                                                    International
                                                </p>

                                            </div>
                                        )}
                                    </div>

                                    <div
                                        className={`relative flex select-none w-full cursor-pointer justify-between gap-[15px] px-[10px] py-[10px] items-center rounded-[10px] `}

                                        onClick={() => setshipContentOpen(!shipContentOpen)}

                                        style={{
                                            border: '1px solid #E3E3E3'
                                        }}
                                    >
                                        <p
                                            className='text-[13px] text-gray-600  font-normal pl-[5px]'
                                        >
                                            {shipmentContent}
                                        </p>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-[8px] mr-[7px]' viewBox="0 0 10 6" fill="none">
                                            <path d="M9.77907 1.04697C9.77941 1.14896 9.7569 1.24973 9.71319 1.34188C9.66948 1.43403 9.60568 1.51521 9.52647 1.57946L5.4304 4.8768C5.30825 4.97721 5.15502 5.0321 4.9969 5.0321C4.83877 5.0321 4.68555 4.97721 4.5634 4.8768L0.467322 1.46341C0.327908 1.34753 0.240235 1.18102 0.223592 1.0005C0.206948 0.819981 0.262697 0.640244 0.378574 0.50083C0.494451 0.361415 0.660964 0.273743 0.841483 0.257099C1.022 0.240456 1.20174 0.296205 1.34115 0.412081L5.00031 3.46366L8.65947 0.514483C8.75968 0.431003 8.8817 0.377975 9.0111 0.361672C9.1405 0.34537 9.27187 0.366477 9.38965 0.422494C9.50743 0.478512 9.6067 0.567097 9.67571 0.677766C9.74472 0.788436 9.78059 0.916558 9.77907 1.04697Z" fill="black" />
                                        </svg>

                                        {shipContentOpen && (
                                            <div className="absolute top-[38px] h-[70px] overflow-auto left-0 right-0 z-20 bg-white"
                                                style={{
                                                    border: '1px solid #E3E3E3',
                                                    borderBottomLeftRadius: '5px',
                                                    borderBottomRightRadius: '5px',
                                                    borderTopColor: 'transparent',
                                                    boxShadow: '0px 3px 6px #0000000D',
                                                }}
                                            >
                                                <p
                                                    className='text-[10px] sm:text-[12px] hover:bg-gray-50  font-normal px-[16px] py-[8px] duration-500 '
                                                    onClick={() => {
                                                        setShipmentContent('Document')
                                                    }}
                                                >
                                                    Document
                                                </p>
                                                <p
                                                    className='text-[10px] sm:text-[12px] hover:bg-gray-50  font-normal px-[16px] py-[8px] duration-500 '
                                                    onClick={() => {
                                                        shipmentContent
                                                        setShipmentContent('Non Document')
                                                    }}
                                                >
                                                    Non Document
                                                </p>

                                            </div>
                                        )}
                                    </div>


                                    <input
                                        placeholder={'Shipment Value'}
                                        value={shipmentValue}
                                        onChange={(e) => setShipmentValue(e.target.value)}
                                        required
                                        className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                    />
                                    <input
                                        type='text'
                                        placeholder={'Shipment Weight'}
                                        value={shipmentWeight}
                                        onChange={(e) => setShipmentWeight(e.target.value)}
                                        required
                                        className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                    />
                                    <input
                                        placeholder={'Shipment fee'}
                                        value={collectedAmount}
                                        onChange={(e) => setCollectedAmount(e.target.value)}
                                        required
                                        className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                    />

                                    <h2 className='font-bold text-[13px] leading-[1px] pt-[10px]'>
                                        Sender Detail
                                    </h2>

                                    <input
                                        placeholder={'Sender Name'}
                                        value={senderName}
                                        onChange={(e) => setSenderName(e.target.value)}
                                        required
                                        className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                    />
                                    <input
                                        placeholder={'Email'}
                                        value={senderEmail}
                                        onChange={(e) => setSenderEmail(e.target.value)}
                                        required
                                        className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                    />
                                    <input
                                        placeholder={'Contact Number'}
                                        value={senderContactNumber}
                                        onChange={(e) => setSenderContactNumber(e.target.value)}
                                        required
                                        className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                    />


                                    <div className='flex flex-col sm:flex-row gap-[20px]'>
                                        <input
                                            placeholder={'Country'}
                                            value={senderCountry}
                                            onChange={(e) => setSenderCountry(e.target.value)}
                                            required
                                            className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                        />
                                        <input
                                            placeholder={'City'}
                                            value={senderCity}
                                            onChange={(e) => setSenderCity(e.target.value)}
                                            required
                                            className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                        />
                                    </div>

                                    <input
                                        placeholder={'Address'}
                                        value={senderAddress}
                                        onChange={(e) => setSenderAddress(e.target.value)}
                                        required
                                        className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                    />


                                    <h2 className='font-bold text-[13px] leading-[1px] pt-[10px]'>
                                        Receiver Details
                                    </h2>

                                    <input
                                        placeholder={'Receiver Name'}
                                        value={reciverName}
                                        onChange={(e) => setReciverName(e.target.value)}
                                        required
                                        className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                    />

                                    <input
                                        placeholder={'Email'}
                                        value={reciverEmail}
                                        onChange={(e) => setReciverEmail(e.target.value)}
                                        required
                                        className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                    />
                                    <input
                                        placeholder={'Contact Number'}
                                        value={reciverContactNumber}
                                        onChange={(e) => setReciverContactNumber(e.target.value)}
                                        required
                                        className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                    />


                                    <div className='flex flex-col sm:flex-row gap-[20px]'>
                                        <input
                                            placeholder={'Country'}
                                            value={reciverCountry}
                                            onChange={(e) => setReciverCountry(e.target.value)}
                                            required
                                            className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                        />
                                        <input
                                            placeholder={'City'}
                                            value={reciverCity}
                                            onChange={(e) => setReciverCity(e.target.value)}
                                            required
                                            className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                        />
                                    </div>

                                    <input
                                        placeholder={'Address'}
                                        value={reciverAddress}
                                        onChange={(e) => setReciverAddress(e.target.value)}
                                        required
                                        className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                    />




                                    <div className='pt-[10px]'>
                                        <button className="w-full bg-[#FFA500] text-[15px] font-semibold text-white rounded-[12px] h-[40px]"
                                            type='submit'
                                            // onClick={() => setopen(true)}
                                            disabled={loading || mutation.isPending}
                                        >
                                            {(loading || mutation.isPending) ? <CircularProgress sx={{ color: 'white' }} size={20} /> : 'Update'}
                                        </button>

                                    </div>

                                </div>

                            </form>


                        </div>
                    </motion.div>
                </div >
            )}
        </div >
    );
};

export default EditShipModal;
