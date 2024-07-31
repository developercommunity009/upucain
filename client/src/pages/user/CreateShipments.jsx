
import { CircularProgress } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import NavBar from '../../components/NavBar';
import Sidebar from '../../components/Sidebar';
import { BACKEND_URL } from '../../constant';
import InvoicePaid from '../../components/modal/InvoicePaid';
import { useQuery } from '@tanstack/react-query';
import StatesContext from '../../context/StatesContext';


const CreateShipments = () => {

    const queryClient = useQueryClient()
    const context = useContext(StatesContext)
    const { handleStateChange } = context;
    const [open, setopen] = useState(false)

    const [companyName, setcompanyName] = useState('Choose company')
    const [companyOpen, setcompanyOpen] = useState(false)
    const [serviceTypeOpen, setserviceTypeOpen] = useState(false)
    const [serviceType, setserviceType] = useState('Service Type')
    const [shipContentOpen, setshipContentOpen] = useState(false)
    const [shipmentContent, setShipmentContent] = useState('Shipment Content')
    const [shipmentValue, setShipmentValue] = useState('')
    const [shipmentWeight, setShipmentWeight] = useState('')
    const [collectedAmount, setCollectedAmount] = useState('')

    const [senderName, setSenderName] = useState('')
    const [senderEmail, setSenderEmail] = useState('')
    const [senderContactNumber, setSenderContactNumber] = useState('')
    const [senderCountry, setSenderCountry] = useState('')
    const [senderCity, setSenderCity] = useState('')
    const [senderAddress, setSenderAddress] = useState('')

    const [reciverName, setReciverName] = useState('')
    const [reciverEmail, setReciverEmail] = useState('')
    const [reciverContactNumber, setReciverContactNumber] = useState('')
    const [reciverCountry, setReciverCountry] = useState('')
    const [reciverCity, setReciverCity] = useState('')
    const [reciverAddress, setReciverAddress] = useState('')

    const [loading, setloading] = useState(false)
    const token = JSON.parse(localStorage.getItem("token"));


    const mutation = useMutation({
        mutationFn: (newData) => {
            console.log(newData)
            return fetch(`${BACKEND_URL}/api/v1/shipment`, {
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
            handleStateChange({ success: res.success })

        },

    })


    const fetchCompanies = async () => {
        const response = await fetch(`${BACKEND_URL}/api/v1/company/`, {
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
        queryKey: ['fetchCompanies'], // Updated key format
        queryFn: fetchCompanies,
        onError: (error) => {
            console.error('Error fetching data:', error);
        },
        // enabled: !!token, // Only fetch if token is available
    });


    return (
        <div className='min-h-[70vh]'>
            <div className='relative z-50'>
                <Sidebar />
                <NavBar />
            </div>

            {open && (
                <InvoicePaid open={open} setOpen={setopen} />
            )}

            <div className='md:ml-[230px] relative z-10'>
                <div className='mt-[80px] w-full p-[20px]'>
                    <div className='max-w-[570px] mx-auto'>

                        <div className=' w-full pb-[30px]'>
                            <form className=''
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setloading(true);
                                    mutation.mutate({
                                        companyName,
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
                                        Create Shipment
                                    </h2>

                                    <h2 className='font-bold text-[13px] leading-[1px] pt-[20px]'>
                                        Shipment Basic Information
                                    </h2>

                                    <div
                                        className={`relative flex select-none w-full cursor-pointer justify-between gap-[15px] px-[10px] py-[10px] items-center rounded-[10px] `}

                                        onClick={() => setcompanyOpen(!companyOpen)}

                                        style={{
                                            border: '1px solid #E3E3E3'
                                        }}
                                    >
                                        <p
                                            className='text-[13px] text-gray-600  font-normal pl-[5px]'
                                        >
                                            {companyName}
                                        </p>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-[8px] mr-[7px]' viewBox="0 0 10 6" fill="none">
                                            <path d="M9.77907 1.04697C9.77941 1.14896 9.7569 1.24973 9.71319 1.34188C9.66948 1.43403 9.60568 1.51521 9.52647 1.57946L5.4304 4.8768C5.30825 4.97721 5.15502 5.0321 4.9969 5.0321C4.83877 5.0321 4.68555 4.97721 4.5634 4.8768L0.467322 1.46341C0.327908 1.34753 0.240235 1.18102 0.223592 1.0005C0.206948 0.819981 0.262697 0.640244 0.378574 0.50083C0.494451 0.361415 0.660964 0.273743 0.841483 0.257099C1.022 0.240456 1.20174 0.296205 1.34115 0.412081L5.00031 3.46366L8.65947 0.514483C8.75968 0.431003 8.8817 0.377975 9.0111 0.361672C9.1405 0.34537 9.27187 0.366477 9.38965 0.422494C9.50743 0.478512 9.6067 0.567097 9.67571 0.677766C9.74472 0.788436 9.78059 0.916558 9.77907 1.04697Z" fill="black" />
                                        </svg>

                                        {companyOpen && (
                                            <div className="absolute top-[38px] h-[70px] overflow-auto left-0 right-0 z-20 bg-white"
                                                style={{
                                                    border: '1px solid #E3E3E3',
                                                    borderBottomLeftRadius: '5px',
                                                    borderBottomRightRadius: '5px',
                                                    borderTopColor: 'transparent',
                                                    boxShadow: '0px 3px 6px #0000000D',
                                                }}
                                            >
                                                {
                                                    data.result && data.result.map((item, i) => (
                                                        <p key={i}
                                                            className='text-[10px] sm:text-[12px] hover:bg-gray-50  font-normal px-[16px] py-[8px] duration-500 '
                                                            onClick={() => {
                                                                setcompanyName(item?.companyName)
                                                            }}
                                                        >
                                                            {item?.companyName}
                                                        </p>
                                                    ))
                                                }
                                                {/* <p
                                                    className='text-[10px] sm:text-[12px] hover:bg-gray-50  font-normal px-[16px] py-[8px] duration-500 '
                                                    onClick={() => {
                                                        setcompanyName('xyc')
                                                    }}
                                                >
                                                    xyc
                                                </p>
                                                <p
                                                    className='text-[10px] sm:text-[12px] hover:bg-gray-50  font-normal px-[16px] py-[8px] duration-500 '
                                                    onClick={() => {
                                                        setcompanyName('abc')
                                                    }}
                                                >
                                                    abc
                                                </p> */}

                                            </div>
                                        )}
                                    </div>

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
                                            {(loading || mutation.isPending) ? <CircularProgress sx={{ color: 'white' }} size={20} /> : 'Create'}
                                        </button>

                                    </div>

                                </div>

                            </form>


                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateShipments