import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "./../utils/axiosInstance.js";
import Loader from "./../components/loader";

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

    const [allHotels, setAllHotels] = useState([]);
    const [allRooms, setAllRooms] = useState([]);
    const [allBookings, setAllBookings] = useState([]);
    const [userProfile, setUserProfile] = useState({});

    const verifyAuth = async () => {
        try {
            const userResponse = await axiosInstance.get(`/api/v1/user/verify`);
            if (userResponse.data.success) {
                setAuth({
                    status: 'authenticated',
                    role: userResponse.data.role
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

    const fetchAllHotels = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/user/all-hotels`);
            if (response.data.success) {
                setAllHotels(response.data.allHotels);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        if (auth.status === 'authenticated' && auth.role === 'user') {
            fetchAllHotels();
        }
    }, [auth]);

    const fetchAllRooms = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/user/all-rooms`);
            if (response.data.success) {
                setAllRooms(response.data.allRooms);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        if (auth.status === 'authenticated' && auth.role === 'user') {
            fetchAllRooms();
        }
    }, [auth]);

    // user all bookings
    const fetchAllBookings = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/user/bookings`);
            if (response.data.success) {
                setAllBookings(response.data.bookings);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        if (auth.status === 'authenticated' && auth.role === 'user') {
            fetchAllBookings();
        }
    }, [auth]);

    const fetchUserProfile = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/user/profile`);
            if (response.data.success) {
                setUserProfile(response.data.profile);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        if (auth.status === 'authenticated' && auth.role === 'user') {
            fetchUserProfile();
        }
    }, [auth]);

    const value = useMemo(() => ({
        navigate, backendUrl, currency, serviceFee, taxeFee,
        auth, setAuth,
        visible, setVisible,
        allHotels, setAllHotels, allRooms, setAllRooms,
        allBookings, setAllBookings, fetchAllBookings,
        userProfile, fetchUserProfile,
    }), [
        auth, visible, userProfile,
        allHotels, allRooms, allBookings, fetchUserProfile, fetchAllBookings,
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