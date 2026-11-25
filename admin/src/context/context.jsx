import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "./../utils/axiosInstance.js";

export const Context = createContext();

const ContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const currency = '$';
    const serviceFee = 50;
    const taxeFee = 10;
    const [auth, setAuth] = useState({
        status: 'checking',
        role: null
    });
    const [visible, setVisible] = useState(false);
    const [ownerAllHotels, setOwnerAllHotels] = useState([]);
    const [ownerAllRooms, setOwnerAllRooms] = useState([]);
    const [ownerAllBookings, setOwnerAllBookings] = useState([]);
    const [ownerProfile, setOwnerProfile] = useState({});

    const verifyAuth = async () => {
        try {
            const ownerResponse = await axiosInstance.get(`/api/v1/owner/verify`);
            if (ownerResponse.data.success) {
                setAuth({
                    status: 'authenticated',
                    role: ownerResponse.data.role
                });
                return
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }

        setAuth({
            status: 'unauthenticated',
            role: null
        })
    }

    useEffect(() => {
        verifyAuth();
    }, []);

    const fetchOwnerHotels = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/owner/all-hotels`);
            if (response.data.success) {
                setOwnerAllHotels(response.data.hotels);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        if (auth.status === 'authenticated' && auth.role === 'owner') {
            fetchOwnerHotels();
        }
    }, [auth]);

    const fetchOwnerRooms = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/owner/all-rooms`);
            if (response.data.success) {
                setOwnerAllRooms(response.data.rooms);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        if (auth.status === 'authenticated' && auth.role === 'owner') {
            fetchOwnerRooms();
        }
    }, [auth]);


    const fetchOwnerBookings = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/owner/all-bookings`);
            if (response.data.success) {
                setOwnerAllBookings(response.data.bookings);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        if (auth.status === 'authenticated' && auth.role === 'owner') {
            fetchOwnerBookings();
        }
    }, [auth]);
    
    const fetchOwnerProfile = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/owner/profile`);
            if (response.data.success) {
                setOwnerProfile(response.data.profile);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        if (auth.status === 'authenticated' && auth.role === 'owner') {
            fetchOwnerProfile();
        }
    }, [auth]);

    const value = useMemo(() => ({
        navigate, backendUrl, currency, serviceFee, taxeFee,
        auth, setAuth,
        visible, setVisible,
        ownerAllRooms, setOwnerAllRooms,
        ownerAllHotels, setOwnerAllHotels,
        ownerAllBookings, setOwnerAllBookings,
        fetchOwnerHotels, fetchOwnerRooms, fetchOwnerBookings,
        ownerProfile, fetchOwnerProfile,
    }), [auth, visible, ownerAllRooms, ownerAllHotels, ownerAllBookings,
        fetchOwnerHotels, fetchOwnerRooms, fetchOwnerBookings,
        fetchOwnerProfile,
    ]);

    return (
        <>
            <Context.Provider value={value}>
                {props.children}
            </Context.Provider>
        </>
    )
}

export default ContextProvider