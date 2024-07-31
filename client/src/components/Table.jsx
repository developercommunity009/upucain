import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import TimeAgo from 'react-timeago'
import { BACKEND_URL } from "../constant"
import StatesContext from "../context/StatesContext"

import { CircularProgress } from "@mui/material"
import { handleDownload } from "../utils/HandleAwsUpload"

const tableHead = ['Address', 'Status', 'Deployed Date', 'Actions']

const Table = () => {

    const context = useContext(StatesContext)
    const { state } = context



    const { data, isLoading } = useQuery({
        queryKey: ['contracts'],
        queryFn: () => {
            return fetch(`${BACKEND_URL}/api/contracts?userId=${state.user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }).then(
                async (res) => await res.json()
            );
        },
    })


    return (
        <div className=" pb-[15px]">

            <div className="border border-gray-200 shadow-sm rounded-[20px] overflow-hidden pb-[20px]">
                <div className="pb-[5px] px-[23px] w-full  rounded-[20px] mt-[12px]">
                    <div>
                        <h2 className=" text-center sm:text-start font-semibold text-[21px] text-gray-500 ">
                            Contracts
                        </h2>

                    </div>

                </div>

                <div
                    className="w-full px-[20px] pt-[10px]"

                >

                    <div className={` w-full  overflow-x-auto`}
                    >
                        <table className="min-w-[730px] w-full">
                            <thead className="text-[14px] font-normal text-[#656575]" >
                                <tr className='border-b-[0.5px] border-gray-300 pb-[10px] '>
                                    {tableHead.map((item, i) => (
                                        <th scope="col" className={`${(i !== 0 && i !== 5) ? 'text-center' : 'text-start'} pb-[10px] font-bold text-[#656575] `} key={i}>
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='w-full'>
                                {(!isLoading && data.contracts.length > 0) && data.contracts.map((item, i) => (
                                    <tr
                                        key={i}
                                        className={` ${i < data.length - 1 && 'border-b-[0.5px] border-gray-300'}`}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.04)'
                                        }}
                                    >
                                        <td className=" pt-[13px] pb-[8px] w-[300px] text-[13px] font-medium">
                                        {item.hash && item.hash.substring(0, 35) + '...'}

                                        </td>

                                        <td className="text-[13px]  font-bold text-center text-green-500">
                                            Verified
                                        </td>
                                        {/* <td className="text-[13px]  font-normal text-center text-[#1A1919]">
                                            $34
                                        </td> */}
                                        <td className="text-[13px]   font-normal text-center text-[#1A1919]">
                                            <TimeAgo
                                                date={new Date(item.createdAt)}
                                            />
                                        </td>
                                        <td className="flex justify-center items-center gap-[10px]">

                                            <div className="cursor-pointer"
                                                onClick={() => handleDownload(item.contractUrl)}
                                            >
                                                <CloudDownloadIcon sx={{ fontSize: '23px', color: '#757575' }} />
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
                                            <CircularProgress  />
                                        </td>
                                    )}
                                    {!isLoading && data.contracts.length === 0 && (
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
    )
}

export default Table