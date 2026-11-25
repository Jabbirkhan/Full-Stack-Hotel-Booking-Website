import React, { useContext, useState } from 'react'
import { Context } from '../../context/context';
import axiosInstance from '../../utils/axiosInstance.js';
import Loader from '../../components/loader.jsx';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddRoom = () => {

  const { auth, navigate, setOwnerAllRooms, ownerAllHotels } = useContext(Context);
  const [amenities, setAmenities] = useState([]);
  const [hotelName, setHotelName] = useState('');

  const hotelId = ownerAllHotels.find(hotel => hotel.name.toLowerCase() === hotelName.toLowerCase())?._id;

  const addAmenities = (e) => {
    const { name, checked } = e.target;

    if (checked) {
      setAmenities([...amenities, name]);
    } else {
      setAmenities(amenities.filter(item => item !== name));
    }
  };

  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    pricePerNight: "",
    capacity: "",
    description: "",
  });


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  }

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [loader, setLoader] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (auth.status !== 'authenticated' || auth.role !== 'owner') {
        return navigate('/owner-login');
      }
      setLoader(true);

      const roomData = new FormData();

      roomData.append("roomNumber", formData.roomNumber);
      roomData.append("roomType", formData.roomType);
      roomData.append("pricePerNight", formData.pricePerNight);
      roomData.append("capacity", formData.capacity);
      roomData.append("description", formData.description);
      roomData.append("amenities", JSON.stringify(amenities));
      roomData.append("hotelId", hotelId);

      image1 && roomData.append("image1", image1);
      image2 && roomData.append("image2", image2);
      image3 && roomData.append("image3", image3);
      image4 && roomData.append("image4", image4);

      const response = await axiosInstance.post(`/api/v1/owner/add-room`, roomData);
      if (response.data.success) {
        toast.success(response.data.message);
        setOwnerAllRooms((prev) => [...prev, response.data.room]);
        setFormData({
          roomNumber: "",
          roomType: "",
          pricePerNight: "",
          capacity: "",
          description: "",
        });
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setAmenities([]);
      }

    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (ownerAllHotels.length === 0) {
    return (
      <main className="min-h-screen w-full flex flex-1 flex-col justify-center items-center p-3 py-5 bg-slate-900">
        <h2 className="text-3xl font-bold text-white text-center mt-10">
          First add a hotel to list new room
        </h2>
        <h2 className="text-2xl font-medium text-white text-center mt-5">
          You can add hotel from below button
        </h2>
        <Link to='/' onClick={scrollToTop}>
          <button className='px-5 py-2 rounded-md bg-[#dec29a] hover:bg-[#e4af60] transition-all duration-200 mt-2 cursor-pointer'>Add Hotel</button>
        </Link>
      </main>
    )
  }

  if (loader) {
    return <Loader />
  }

  return (
    <div className='w-full flex-1 p-5 md:p-10 py-25 bg-slate-900'>

      <p className='text-lg font-medium text-white border-b-3 max-w-fit border-[#dec29a] mb-1'>
        List New Room
      </p>

      <form onSubmit={onSubmitHandler} className='mt-5 bg-slate-800 p-5 rounded-md border border-white/30'>

        <div className='flex flex-col items-start gap-4'>
          <label className='text-gray-300 mb-2'>Upload Images</label>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-4'>

            <div>
              <label htmlFor="image1">
                {
                  image1 ?
                    <img src={image1 && URL.createObjectURL(image1)} className='w-40 h-40 object-cover' alt="" />
                    :
                    <div className='w-40 h-40 bg-slate-700 rounded-md flex justify-center items-center text-gray-300'>Upload Image</div>
                }
                <input type="file" onChange={(e) => setImage1(e.target.files[0])} name='image1' id='image1' hidden />
              </label>
            </div>

            <div>
              <label htmlFor="image2">
                {
                  image2 ?
                    <img src={image2 && URL.createObjectURL(image2)} className='w-40 h-40 object-cover' alt="" />
                    :
                    <div className='w-40 h-40 bg-slate-700 rounded-md flex justify-center items-center text-gray-300'>Upload Image</div>
                }
                <input type="file" onChange={(e) => setImage2(e.target.files[0])} name='image2' id='image2' hidden />
              </label>
            </div>

            <div>
              <label htmlFor="image3">
                {
                  image3 ?
                    <img src={image3 && URL.createObjectURL(image3)} className='w-40 h-40 object-cover' alt="" />
                    :
                    <div className='w-40 h-40 bg-slate-700 rounded-md flex justify-center items-center text-gray-300'>Upload Image</div>
                }
                <input type="file" onChange={(e) => setImage3(e.target.files[0])} name='image3' id='image3' hidden />
              </label>
            </div>

            <div>
              <label htmlFor="image4">
                {
                  image4 ?
                    <img src={image4 && URL.createObjectURL(image4)} className='w-40 h-40 object-cover' alt="" />
                    :
                    <div className='w-40 h-40 bg-slate-700 rounded-md flex justify-center items-center text-gray-300'>Upload Image</div>
                }
                <input type="file" onChange={(e) => setImage4(e.target.files[0])} name='image4' id='image4' hidden />
              </label>
            </div>

          </div>

        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-2'>
          <div className='flex flex-col items-start'>
            <label htmlFor="roomNumber" className='text-gray-300 mb-1'>Room Number</label>
            <input type="text" onChange={handleChange} value={formData.roomNumber} name='roomNumber' id="roomNumber" className='w-full py-3 px-5 bg-slate-900/30 rounded-md border-none outline-none text-gray-200' placeholder='e.g 210' required />
          </div>
          <div className='flex flex-col items-start'>
            <label htmlFor="roomType" className='text-gray-300 mb-1'>Room Type</label>
            <select onChange={handleChange} value={formData.roomType} name="roomType" id="roomType" className='w-full py-3 px-5 bg-slate-900/30 rounded-md border-none outline-none text-gray-200' required>
              <option value="" className='bg-slate-700'>Select Room Type</option>
              <option value="Standard" className='bg-slate-700'>Standard</option>
              <option value="Deluxe" className='bg-slate-700'>Deluxe</option>
              <option value="Suite" className='bg-slate-700'>Suite</option>
              <option value="Executive" className='bg-slate-700'>Executive</option>
            </select>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-2'>
          <div className='flex flex-col items-start'>
            <label htmlFor="price" className='text-gray-300 mb-1'>Price Per Night</label>
            <input type="number" onChange={handleChange} value={formData.pricePerNight} name="pricePerNight" id="price" className='w-full py-3 px-5 bg-slate-900/30 rounded-md border-none outline-none text-gray-200' placeholder='e.g $149' required />
          </div>
          <div className='flex flex-col items-start'>
            <label htmlFor="capacity" className='text-gray-300 mb-1'>Capacity</label>
            <input type="number" onChange={handleChange} value={formData.capacity} name='capacity' id="capacity" className='w-full py-3 px-5 bg-slate-900/30 rounded-md border-none outline-none text-gray-200' placeholder='e.g 2' required />
          </div>
        </div>

        <div className='flex flex-col items-start mb-2'>
          <label htmlFor="description" className='text-gray-300 mb-1'>Room Description</label>
          <textarea onChange={handleChange} value={formData.description} name="description" rows={5} className='resize-none w-full py-3 px-5 bg-slate-900/30 rounded-md border-none outline-none text-gray-200' placeholder='e.g Grand Palace Hotel....' required></textarea>
        </div>

        <div>
          <select name="hotelName" onChange={(e) => setHotelName(e.target.value)} className='w-full py-3 px-5 bg-slate-900/30 rounded-md border-none outline-none text-gray-200' required>
            <option value="" className='bg-slate-700'>Select Hotel</option>
            {ownerAllHotels.map((hotel) => (
              <option key={hotel._id} value={hotel.name} className='bg-slate-700'>
                {hotel.name}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col items-start mb-2'>
          <label className='text-gray-300 mb-1'>Amenities</label>
          <div className='flex items-center justify-between gap-5'>
            <div>
              <input type="checkbox" onChange={addAmenities} checked={amenities.includes('WiFi')} name="WiFi" id="wifi" className='mr-2' />
              <label htmlFor="wifi" className='text-gray-300 text-sm'>WiFi</label>
            </div>
            <div>
              <input type="checkbox" onChange={addAmenities} checked={amenities.includes('AC')} name="AC" id="ac" className='mr-2' />
              <label htmlFor="ac" className='text-gray-300 text-sm'>AC</label>
            </div>
            <div>
              <input type="checkbox" onChange={addAmenities} checked={amenities.includes('TV')} name="TV" id="tv" className='mr-2' />
              <label htmlFor="tv" className='text-gray-300 text-sm'>TV</label>
            </div>
            <div>
              <input type="checkbox" onChange={addAmenities} checked={amenities.includes('Mini Bar')} name="Mini Bar" id="bar" className='mr-2' />
              <label htmlFor="bar" className='text-gray-300 text-sm'>Mini Bar</label>
            </div>
            <div>
              <input type="checkbox" onChange={addAmenities} checked={amenities.includes('Balcony')} name="Balcony" id="balcony" className='mr-2' />
              <label htmlFor="balcony" className='text-gray-300 text-sm'>Balcony</label>
            </div>

          </div>
        </div>

        <button type='submit' className=' mt-5 px-5 py-3 bg-[#dec29a] hover:bg-[#e4af60] transition-all duration-200 cursor-pointer rounded-md'>
          Add Room
        </button>

      </form>


    </div>
  )
}

export default AddRoom
