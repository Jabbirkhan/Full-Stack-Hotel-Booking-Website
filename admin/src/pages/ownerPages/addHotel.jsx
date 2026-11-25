import React, { useContext, useState } from 'react'
import { Context } from '../../context/context';
import axiosInstance from '../../utils/axiosInstance.js';
import Loader from '../../components/loader';
import { toast } from "react-toastify";

const AddHotel = () => {

  const { auth, navigate, setOwnerAllHotels } = useContext(Context);
  const [amenities, setAmenities] = useState([]);
  
  const addAmenities = (e) => {
    const { name, checked } = e.target;

    if (checked) {
      setAmenities([...amenities, name]);
    } else {
      setAmenities(amenities.filter(item => item !== name));
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({...formData, [name]: value});
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

      const hotelData = new FormData();
      
      hotelData.append("name", formData.name);
      hotelData.append("description", formData.description);
      hotelData.append("email", formData.email);
      hotelData.append("phone", formData.phone);
      hotelData.append("address", formData.address);
      hotelData.append("city", formData.city);
      hotelData.append("country", formData.country);
      hotelData.append("amenities", JSON.stringify(amenities));

      image1 && hotelData.append("image1", image1);
      image2 && hotelData.append("image2", image2);
      image3 && hotelData.append("image3", image3);
      image4 && hotelData.append("image4", image4);

      const response = await axiosInstance.post(`/api/v1/owner/create-hotel`, hotelData);
      if (response.data.success) {
        toast.success(response.data.message);
        setOwnerAllHotels((hotel)=> [...hotel, response.data.hotel]);
        setFormData({
          name: "",
          description: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          country: "",
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

  if(loader){
    return <Loader />
  }

  return (
    <div className='w-full flex-1 p-5 md:p-10 py-25 bg-slate-900'>

      <p className='text-lg font-medium text-white border-b-3 max-w-fit border-[#dec29a] mb-1'>
        List New Hotel
      </p>

      <form onSubmit={onSubmitHandler} className='mt-5 bg-slate-800 p-5 rounded-md border border-white/30'>

        <div className='flex flex-col items-start gap-4'>
          <label className='text-gray-300 mb-2'>Upload Images</label>
          
          <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-4'>
            
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

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2'>
          <div className='flex flex-col items-start'>
            <label htmlFor="name" className='text-gray-300 mb-1'>Hotel Name</label>
            <input type="text" onChange={handleChange} value={formData.name} name="name" id="name" className='w-full py-3 px-5 bg-slate-900/30 rounded-md border-none outline-none text-gray-200' placeholder='e.g Grand Palace Hotel' required />
          </div>
          <div className='flex flex-col items-start'>
            <label htmlFor="email" className='text-gray-300 mb-1'>Hotel Enail</label>
            <input type="text" onChange={handleChange} value={formData.email} name='email' id="email" className='w-full py-3 px-5 bg-slate-900/30 rounded-md border-none outline-none text-gray-200' placeholder='e.g info@grandpalace.com' required />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2'>
          <div className='flex flex-col items-start'>
            <label htmlFor="phone" className='text-gray-300 mb-1'>Hotel Phone Number</label>
            <input type="tel" onChange={handleChange} value={formData.phone} name="phone" id="phone" className='w-full py-3 px-5 bg-slate-900/30 rounded-md border-none outline-none text-gray-200' placeholder='e.g +92 300 1000001' required />
          </div>
          <div className='flex flex-col items-start'>
            <label htmlFor="address" className='text-gray-300 mb-1'>Hotel Address</label>
            <input type="text" onChange={handleChange} value={formData.address} name='address' id="address" className='w-full py-3 px-5 bg-slate-900/30 rounded-md border-none outline-none text-gray-200' placeholder='e.g Blue Area' required />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2'>
          <div className='flex flex-col items-start'>
            <label htmlFor="country" className='text-gray-300 mb-1'>Country</label>
            <input type="text" onChange={handleChange} value={formData.country} name="country" id="country" className='w-full py-3 px-5 bg-slate-900/30 rounded-md border-none outline-none text-gray-200' placeholder='e.g Pakistan' required />
          </div>
          <div className='flex flex-col items-start'>
            <label htmlFor="city" className='text-gray-300 mb-1'>City</label>
            <input type="text" onChange={handleChange} value={formData.city} name='city' id="city" className='w-full py-3 px-5 bg-slate-900/30 rounded-md border-none outline-none text-gray-200' placeholder='e.g Lahore' required />
          </div>
        </div>

        <div className='flex flex-col items-start mb-2'>
          <label htmlFor="description" className='text-gray-300 mb-1'>Hotel Description</label>
          <textarea name="description" onChange={handleChange} value={formData.description} id="description" rows={5} className='resize-none w-full py-3 px-5 bg-slate-900/30 rounded-md border-none outline-none text-gray-200' placeholder='e.g Grand Palace Hotel....' required></textarea>
        </div>

        <div className='flex flex-col items-start mb-2'>
          <label htmlFor="amenities" className='text-gray-300 mb-1'>Amenities</label>
          <div className='flex flex-wrap items-center justify-between gap-5'>
            <div>
              <input type="checkbox" onChange={addAmenities} checked={amenities.includes("WiFi")} name="WiFi" id="wifi" className='mr-2' />
              <label htmlFor="wifi" className='text-gray-300 text-sm'>WiFi</label>
            </div>
            <div>
              <input type="checkbox" onChange={addAmenities} checked={amenities.includes("Pool")} name="Pool" id="pool" className='mr-2' />
              <label htmlFor="pool" className='text-gray-300 text-sm'>Swimming Pool</label>
            </div>
            <div>
              <input type="checkbox" onChange={addAmenities} checked={amenities.includes("Parking")} name="Parking" id="parking" className='mr-2' />
              <label htmlFor="parking" className='text-gray-300 text-sm'>Parking</label>
            </div>
            <div>
              <input type="checkbox" onChange={addAmenities} checked={amenities.includes("Restaurant")} name="Restaurant" id="restaurant" className='mr-2' />
              <label htmlFor="restaurant" className='text-gray-300 text-sm'>Restaurant</label>
            </div>
            <div>
              <input type="checkbox" onChange={addAmenities} checked={amenities.includes("Gym")} name="Gym" id="gym" className='mr-2' />
              <label htmlFor="gym" className='text-gray-300 text-sm'>Gym</label>
            </div>
            <div>
              <input type="checkbox" onChange={addAmenities} checked={amenities.includes("Bonefire")} name="Bonefire" id="bonefire" className='mr-2' />
              <label htmlFor="bonefire" className='text-gray-300 text-sm'>Bonfire</label>
            </div>
            <div>
              <input type="checkbox" onChange={addAmenities} checked={amenities.includes("Boating")} name="Boating" id="boating" className='mr-2' />
              <label htmlFor="boating" className='text-gray-300 text-sm'>Boating</label>
            </div>
            <div>
              <input type="checkbox" onChange={addAmenities} checked={amenities.includes("Conference Room")} name="Conference Room" id="conference" className='mr-2' />
              <label htmlFor="conference" className='text-gray-300 text-sm'>Conference Room</label>
            </div>
            <div>
              <input type="checkbox" onChange={addAmenities} checked={amenities.includes("Kids Area")} name="Kids Area" id="kidsArea" className='mr-2' />
              <label htmlFor="kidsArea" className='text-gray-300 text-sm'>Kids Area</label>
            </div>
            <div>
              <input type="checkbox" onChange={addAmenities} checked={amenities.includes("Spa")} name="Spa" id="spa" className='mr-2' />
              <label htmlFor="spa" className='text-gray-300 text-sm'>Spa</label>
            </div>
          </div>
        </div>

        <button type='submit' className=' mt-5 px-5 py-3 bg-[#dec29a] hover:bg-[#e4af60] transition-all duration-200 cursor-pointer rounded-md'>
          Add Hotel
        </button>

      </form>

    </div>
  )
}

export default AddHotel
