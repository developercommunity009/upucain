/* eslint-disable react/no-unescaped-entities */
import { CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { BACKEND_URL } from '../../constant';
import StatesContext from '../../context/StatesContext';
import { useQueryClient, useMutation } from '@tanstack/react-query';



const EditCompanyModal = ({ open, setOpen, item, token }) => {

    const queryClient = useQueryClient()
    const context = useContext(StatesContext)
    const { handleStateChange } = context;


    const [companyName, setCompanyName] = useState(item?.companyName || '')
    const [companyEmail, setCompanyEmail] = useState(item?.companyEmail || '')
    const [shipmentPrice, setShipmentPrice] = useState(item?.shipmentPrice || '')
    const [country, setcountry] = useState(item?.country || '')
    const [countryState, setCountryState] = useState(item?.countryState || '')
    const [location, setLocation] = useState(item?.location || '')

    const [loading, setloading] = useState(false)

    const mutation = useMutation({
        mutationFn: (newData) => {
            return fetch(`${BACKEND_URL}/api/v1/company/${item?._id}`, {
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
            console.log(res)
            if (res.success) {
                handleStateChange({success: res.success})
            }else{
                handleStateChange({success: res.error})
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
                        <div className='w-[90%] mx-auto sm:w-[500px]  bg-white rounded-[23px] py-[22px]'
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
                                    e.preventDefault()
                                    setloading(true)
                                    mutation.mutate({
                                        companyName,
                                        companyEmail,
                                        shipmentPrice,
                                        country,
                                        countryState,
                                        location
                                    })
                                    setloading(false)
                                }}
                            >
                                <div className='space-y-[20px]'>

                                    <h2 className='text-[#FFA500] font-semibold text-center text-[30px] mb-[10px]'>
                                        Create Company
                                    </h2>

                                    <input
                                        placeholder={'Company Name'}
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                        className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                    />
                                    <input
                                        placeholder={'Company Email'}
                                        value={companyEmail}
                                        onChange={(e) => setCompanyEmail(e.target.value)}
                                        required
                                        className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                    />
                                    <input
                                        placeholder={'Shipment Price'}
                                        value={shipmentPrice}
                                        onChange={(e) => setShipmentPrice(e.target.value)}
                                        required
                                        className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                    />

                                    <div className='flex flex-col sm:flex-row gap-[20px]'>
                                        <input
                                            placeholder={'Country'}
                                            value={country}
                                            onChange={(e) => setcountry(e.target.value)}
                                            required
                                            className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                        />
                                        <input
                                            placeholder={'State'}
                                            value={countryState}
                                            onChange={(e) => setCountryState(e.target.value)}
                                            required
                                            className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                        />
                                    </div>

                                    <input
                                        placeholder={'Location'}
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        required
                                        className="outline-none w-full text-[13px]  bg-transparent border border-gray-300 rounded-[10px] font-normal px-[20px] py-[10px]"
                                    />

                                    <div className='pt-[10px]'>
                                        <button className="w-full bg-[#FFA500] text-[15px] font-semibold text-white rounded-[12px] h-[40px]"
                                            type='submit'
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

export default EditCompanyModal;
