import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constant";
import StatesContext from "./StatesContext";
import { ethers } from "ethers";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";


const OverAllStates = (props) => {

    const queryClient = useQueryClient()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    let user = ''

    const loggedInTime = localStorage.getItem('LoggedInTime');
    const authUserString = localStorage.getItem('authUser');
    
    if (loggedInTime && authUserString) {
        const loggedInTimeMs = Number(loggedInTime);
        const currentDate = new Date().getTime();
        const fiveMinutesInMilliseconds = 120 * 60 * 1000;
        const isWithinFiveMinutes = (loggedInTimeMs + fiveMinutesInMilliseconds) > currentDate;
        console.log(isWithinFiveMinutes);
        if (isWithinFiveMinutes) {
             user = JSON.parse(authUserString);
        } else {
            localStorage.removeItem('LoggedInTime');
            localStorage.removeItem('authUser');
            localStorage.removeItem('token');
        }
    }
    const defaultStates = {
        user,
        success: '',
        error: '',
    }


    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`${BACKEND_URL}/api/v1/users/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
        },
        onSuccess: () => {
            if (!pathname.includes('/password/reset')) {
                navigate('/')
            }
            localStorage.removeItem('authUser');
            localStorage.removeItem('LoggedInTime');
            localStorage.removeItem('token');
            queryClient.clear()
            handleStateChange({ user: '' })
        }

    })

    const [state, setstate] = useState(defaultStates)
    const [ethBalance, setethBalance] = useState(0)
    const [isUpdated, setisUpdated] = useState(false)

    const { walletProvider } = useWeb3ModalProvider()
    const { address } = useWeb3ModalAccount()


    const FetchBalance = async () => {

        const ethersProvider = new ethers.providers.Web3Provider(walletProvider)

        const balanceWei = await ethersProvider.getBalance(address);

        // Convert balance from wei to ether
        const balanceEther = ethers.utils.formatEther(balanceWei);
        setethBalance(balanceEther)

    }

    const handleStateChange = (value) => {

        setstate((prev) => ({
            ...prev,
            ...value,
        }));
    };

    const handleLogout = () => {
       mutation.mutate();
    }

    useEffect(() => {

        if (address) {
            FetchBalance()
        } else {
            setethBalance(0)
        }

        if (isUpdated) {
            setisUpdated(false)
        }

    }, [address, isUpdated])


    return (
        <StatesContext.Provider
            value={{
                state,
                handleStateChange,
                handleLogout,
                ethBalance,
                setisUpdated
            }}>
            {props.children}
        </StatesContext.Provider>
    )
}
export default OverAllStates;