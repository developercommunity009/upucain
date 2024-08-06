import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import socketio from "socket.io-client";
import { BACKEND_URL } from "../constant";
import StatesContext from "./StatesContext";



const getSocket = () => {
    const token = localStorage.getItem("token");
    return socketio(BACKEND_URL, {
        withCredentials: true,
        auth: { token },
    });
};

const OverAllStates = (props) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [notificationCount, setNotificationCount] = useState('');
    let user = "";

    const loggedInTime = localStorage.getItem("LoggedInTime");
    const authUserString = localStorage.getItem("authUser");


    if (loggedInTime && authUserString) {
        const loggedInTimeMs = Number(loggedInTime);
        const currentDate = new Date().getTime();
        const fiveMinutesInMilliseconds = 120 * 60 * 1000;
        const isWithinFiveMinutes =
            loggedInTimeMs + fiveMinutesInMilliseconds > currentDate;
        if (isWithinFiveMinutes) {
            user = JSON.parse(authUserString);
        } else {
            localStorage.removeItem("LoggedInTime");
            localStorage.removeItem("authUser");
            localStorage.removeItem("token");
        }
    }

    const defaultStates = {
        user,
        success: "",
        error: "",
    };

    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`${BACKEND_URL}/api/v1/users/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
        },
        onSuccess: () => {
            if (!pathname.includes("/password/reset")) {
                navigate("/");
            }
            localStorage.removeItem("authUser");
            localStorage.removeItem("LoggedInTime");
            localStorage.removeItem("token");
            queryClient.clear();
            handleStateChange({ user: "" });
        },
    });

    const [state, setState] = useState(defaultStates);

    const handleStateChange = (value) => {
        setState((prev) => ({
            ...prev,
            ...value,
        }));
    };

    const handleLogout = () => {
        mutation.mutate();
    };

    const [socket, setSocket] = useState(null);
    console.log(socket)
    useEffect(() => {
        setSocket(getSocket());
    }, []);
    const token = JSON.parse(localStorage.getItem("token"));

    const fetchInvoices = async () => {
        const response = await fetch(`${BACKEND_URL}/api/v1/invoice/inprogress`, {
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
        queryKey: ['fetchInvoic'], // Updated key format
        queryFn: fetchInvoices,
        onError: (error) => {
            console.error('Error fetching data:', error);
        }
        });

        useEffect(() => {
            setNotificationCount(data?.length || 0);
        }, [data]);

    return (
        <StatesContext.Provider
            value={{
                state,
                handleStateChange,
                handleLogout,
                socket,
                notificationCount,
                setNotificationCount
            }}
        >
            {props.children}
        </StatesContext.Provider>
    );
};

export default OverAllStates;
