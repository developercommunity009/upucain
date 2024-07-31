
// import { useContext, useEffect, useState } from 'react';
// import NavBar from '../../components/NavBar';
// import Sidebar from '../../components/Sidebar';
// import { PencilIcon } from '@heroicons/react/24/solid';
// import { CircularProgress } from '@mui/material';
// import EditCompanyModal from '../../components/modal/EditCompany';
// import StatesContext from '../../context/StatesContext';
// import { useQuery } from '@tanstack/react-query';
// import { BACKEND_URL } from '../../constant';

// const tableHead = ['Name', 'Email', 'Country', 'State', 'Location', 'Actions']


// const Companies = () => {

//     const context = useContext(StatesContext);
//     const { handleStateChange } = context;
//     const token = JSON.parse(localStorage.getItem("token"));

//     const [open, setOpen] = useState(false);
//     const [data, setData] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     const fetchCompanies = async () => {
//         const response = await fetch(`${BACKEND_URL}/api/v1/company/`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             credentials: 'include',
//         });
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     };

//     const { data: queryData, error, isFetching } = useQuery(['fetchCompanies'], fetchCompanies, {
//         onSuccess: (data) => {
//             if (data.success) {
//                 setData(data.result);
//             }
//         },
//         onError: (error) => {
//             console.error('Error fetching data:', error);
//         }
//     });

//     useEffect(() => {
//         setIsLoading(isFetching);
//     }, [isFetching]);

//     return (
//         <div>

//             {open && (
//                 <EditCompanyModal open={open} setOpen={setopen} />
//             )}

//             <Sidebar />
//             <NavBar />second
//             <div className='md:ml-[230px]'>
//                 <div className='mt-[80px] w-full p-[20px]'>
//                     <div className='max-w-[1100px] mx-auto'>

//                         <h2 className='text-[#FFA500] font-semibold text-center text-[30px] mb-[10px]'>
//                             All Companies
//                         </h2>

//                         <div
//                             className="w-full px-[20px] pt-[10px]"

//                         >

//                             <div className={` w-full  overflow-x-auto bg-[rgba(242,247,251,0.5)] py-[20px] px-[30px] rounded-[20px]`}
//                             >
//                                 <table className="min-w-[730px] w-full">
//                                     <thead className="text-[14px] font-normal text-[#656575]" >
//                                         <tr className='border-b-[0.5px] border-gray-300 pb-[10px] '>
//                                             {tableHead.map((item, i) => (
//                                                 <th scope="col" className={`${i !== 0 ? 'text-center' : 'text-start'}  pb-[10px] font-bold text-[#656575] `} key={i}>
//                                                     {item}
//                                                 </th>
//                                             ))}
//                                         </tr>
//                                     </thead>
//                                     <tbody className='w-full'>
//                                         {(!isLoading && data.length > 0) && data.map((item, i) => (
//                                             <tr
//                                                 key={i}
//                                                 className={` ${i < data.length - 1 && 'border-b-[0.5px] border-gray-300'}`}
//                                                 style={{
//                                                     background: 'rgba(255, 255, 255, 0.04)'
//                                                 }}
//                                             >
//                                                 <td className=" pt-[13px] pb-[8px] text-[13px] font-medium">
//                                                     {item.companyName}

//                                                 </td>

//                                                 <td className="text-[13px]   text-center ">
//                                                     {item.companyEmail}
//                                                 </td>
//                                                 <td className="text-[13px]   text-center ">
//                                                     {item.country}
//                                                 </td>
//                                                 <td className="text-[13px]   text-center ">
//                                                     {item.countryState}
//                                                 </td>
//                                                 <td className="text-[13px] text-center ">
//                                                     {item.location}
//                                                 </td>


//                                                 <td className=" gap-[10px]">

//                                                     <div className="cursor-pointer flex justify-center"
//                                                     >
//                                                         <PencilIcon className='h-[20px]'
//                                                             onClick={() => setopen(true)}
//                                                         />
//                                                     </div>
//                                                 </td>

//                                             </tr>
//                                         ))}

//                                         <tr
//                                             style={{
//                                                 background: 'rgba(255, 255, 255, 0.04)',
//                                             }}
//                                         >
//                                             {isLoading && (
//                                                 <td colSpan={'5'} className="py-[85px] text-center">
//                                                     <CircularProgress />
//                                                 </td>
//                                             )}
//                                             {!isLoading && data.length === 0 && (
//                                                 <td colSpan={'5'} className="text-[15px] py-[100px] font-medium text-[#87909C] text-center">
//                                                     No contracts yet!
//                                                 </td>
//                                             )}

//                                         </tr>

//                                     </tbody>
//                                 </table>
//                             </div>

//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Companies

import { useContext, useState } from 'react';
import NavBar from '../../components/NavBar';
import Sidebar from '../../components/Sidebar';
import { PencilIcon } from '@heroicons/react/24/solid';
import { CircularProgress } from '@mui/material';
import EditCompanyModal from '../../components/modal/EditCompany';
import StatesContext from '../../context/StatesContext';
import { useQuery } from '@tanstack/react-query';
import { BACKEND_URL } from '../../constant';

const tableHead = ['Name', 'Email', 'Country', 'State', 'Location', 'Actions'];

// cimport { useQuery } from '@tanstack/react-query';

const Companies = () => {
    const { handleStateChange } = useContext(StatesContext);
    const [item , setItem] = useState('');
    const token = JSON.parse(localStorage.getItem("token"));

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
        enabled: !!token, // Only fetch if token is available
    });

    const [open, setOpen] = useState(false);

    return (
        <div>
            {open && (
                <EditCompanyModal open={open} token={token} setOpen={setOpen} item={item} />
            )}

            <Sidebar />
            <NavBar />second
            <div className='md:ml-[230px]'>
                <div className='mt-[80px] w-full p-[20px]'>
                    <div className='max-w-[1100px] mx-auto'>
                        <h2 className='text-[#FFA500] font-semibold text-center text-[30px] mb-[10px]'>
                            All Companies
                        </h2>

                        <div className="w-full px-[20px] pt-[10px]">
                            <div className="w-full overflow-x-auto bg-[rgba(242,247,251,0.5)] py-[20px] px-[30px] rounded-[20px]">
                                <table className="min-w-[730px] w-full">
                                    <thead className="text-[14px] font-normal text-[#656575]">
                                        <tr className='border-b-[0.5px] border-gray-300 pb-[10px]'>
                                            {tableHead.map((item, i) => (
                                                <th
                                                    key={i}
                                                    scope="col"
                                                    className={`${i !== 0 ? 'text-center' : 'text-start'} pb-[10px] font-bold text-[#656575]`}
                                                >
                                                    {item}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className='w-full'>
                                        {data && data.result ? (
                                            data.result.map((item, i) => (
                                                <tr
                                                    key={i}
                                                    className={` ${i < data.length - 1 && 'border-b-[0.5px] border-gray-300'}`}
                                                    style={{ background: 'rgba(255, 255, 255, 0.04)' }}
                                                >
                                                    <td className="pt-[13px] pb-[8px] text-[13px] font-medium">
                                                        {item.companyName}
                                                    </td>
                                                    <td className="text-[13px] text-center">
                                                        {item.companyEmail}
                                                    </td>
                                                    <td className="text-[13px] text-center">
                                                        {item.country}
                                                    </td>
                                                    <td className="text-[13px] text-center">
                                                        {item.countryState}
                                                    </td>
                                                    <td className="text-[13px] text-center">
                                                        {item.location}
                                                    </td>
                                                    <td className="gap-[10px]">
                                                        <div className="cursor-pointer flex justify-center">
                                                            <PencilIcon
                                                                className='h-[20px]'
                                                                onClick={() =>{ setItem(item), setOpen(true)}}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={tableHead.length} className="py-[100px] text-center">
                                                    {isFetching ? (
                                                        <CircularProgress />
                                                    ) : (
                                                        <span className="text-[15px] font-medium text-[#87909C]">No contracts yet!</span>
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Companies;
