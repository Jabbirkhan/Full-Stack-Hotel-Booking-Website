import roomImg1 from './roomImg1.png'
import roomImg2 from './roomImg2.png'
import roomImg3 from './roomImg3.png'
import roomImg4 from './roomImg4.png'

import hotel1 from './hotel1.jpg'
import hotel2 from './hotel2.jpg'
import hotel3 from './hotel3.jpg'
import hotel4 from './hotel4.jpg'
import hotel5 from './hotel5.jpg'
import hotel6 from './hotel6.jpg'
import hotel7 from './hotel7.jpg'
import hotel8 from './hotel8.jpg'
import hotel9 from './hotel9.jpg'
import hotel10 from './hotel10.jpg'
import hotel11 from './hotel11.jpg'
import hotel12 from './hotel12.jpg'
import hotel13 from './hotel13.jpg'
import hotel14 from './hotel14.jpg'
import hotel15 from './hotel15.jpg'
import hotel16 from './hotel16.jpg'
import hotel17 from './hotel17.jpg'
import hotel18 from './hotel18.jpg'
import hotel19 from './hotel19.jpg'
import hotel20 from './hotel20.jpg'
import hotel21 from './hotel21.jpg'
import hotel22 from './hotel22.jpg'
import hotel23 from './hotel23.jpg'
import hotel24 from './hotel24.jpg'
import hotel25 from './hotel25.jpg'
import hotel26 from './hotel26.jpg'
import hotel27 from './hotel27.jpg'
import hotel28 from './hotel28.jpg'
import hotel29 from './hotel29.jpg'
import hotel30 from './hotel30.jpg'
import hotel31 from './hotel31.jpg'

import preRegister from './preRegister.png'
import userIcon from './user icon.png'
import userRegister from './userRegister.png'
import heroImage from './heroImage.avif'
import experienceImage from './experienceImage.avif'
import testimonialImage from './testimonialImage.avif'

export const assets = {
    preRegister,
    userRegister,
    heroImage,
    experienceImage,
    testimonialImage,
}


export const owners = [
    {
        _id: "o1",
        name: "John Smith",
        email: "john@gmail.com",
        password: "123456789"
    },
    {
        _id: "o2",
        name: "Michael Brown",
        email: "michael.brown@gmail.com",
        password: "123456"
    }
];

export const users = [
    {
        _id: "u1",
        name: "Ali Khan",
        email: "ali@gmail.com",
        password: "123456",
        phone: "+92 300 1111111",
        avatar: userIcon,
        provider: "google",
        providerId: "google_12345"
    },
    {
        _id: "u2",
        name: "Sara Ahmed",
        email: "sara@gmail.com",
        password: "123456",
        phone: "+92 301 2222222",
        avatar: userIcon,
        provider: "google",
        providerId: "google_12345"
    }
];

export const hotels = [
    {
        _id: "h1",
        ownerId: "o1",

        owner: owners[0],

        name: "Grand Palace Hotel",
        description: "Luxury hotel located in the heart of Islamabad.",
        email: "info@grandpalace.com",
        phone: "+92 300 1000001",
        address: "Blue Area",
        city: "Islamabad",
        country: "Pakistan",

        images: [hotel1, hotel2, hotel3],

        amenities: [
            "WiFi",
            "Swimming Pool",
            "Parking",
            "Restaurant",
            "Gym"
        ],

        status: true
    },

    {
        _id: "h2",
        ownerId: "o1",

        owner: owners[0],

        name: "Royal Residency",
        description: "Modern hotel with premium facilities.",
        email: "info@royalresidency.com",
        phone: "+92 300 1000002",
        address: "F-8 Markaz",
        city: "Islamabad",
        country: "Pakistan",

        images: [hotel4, hotel5, hotel6],

        amenities: [
            "WiFi",
            "Restaurant",
            "Parking"
        ],

        status: true
    },

    {
        _id: "h3",
        ownerId: "o1",

        owner: owners[0],

        name: "Mountain View Resort",
        description: "Beautiful resort with mountain scenery.",
        email: "info@mountainview.com",
        phone: "+92 300 1000003",
        address: "Murree Expressway",
        city: "Murree",
        country: "Pakistan",

        images: [hotel7, hotel8, hotel9],

        amenities: [
            "WiFi",
            "Restaurant",
            "Bonfire",
            "Parking"
        ],

        status: true
    },

    {
        _id: "h4",
        ownerId: "o1",

        owner: owners[0],

        name: "City Comfort Inn",
        description: "Affordable and comfortable accommodation.",
        email: "info@citycomfort.com",
        phone: "+92 300 1000004",
        address: "Saddar",
        city: "Rawalpindi",
        country: "Pakistan",

        images: [hotel10, hotel11, hotel12],

        amenities: [
            "WiFi",
            "Parking"
        ],

        status: true
    },

    {
        _id: "h5",
        ownerId: "o1",

        owner: owners[0],

        name: "Lake View Hotel",
        description: "Premium lakeside experience.",
        email: "info@lakeview.com",
        phone: "+92 300 1000005",
        address: "Khanpur Lake",
        city: "Haripur",
        country: "Pakistan",

        images: [hotel13, hotel14, hotel15],

        amenities: [
            "WiFi",
            "Boating",
            "Restaurant",
            "Parking"
        ],

        status: true
    },

    {
        _id: "h6",
        ownerId: "o2",

        owner: owners[1],

        name: "Pearl Executive Hotel",
        description: "Business class hotel for executives.",
        email: "info@pearlexecutive.com",
        phone: "+92 300 1000006",
        address: "Gulberg",
        city: "Lahore",
        country: "Pakistan",

        images: [hotel16, hotel17, hotel18],

        amenities: [
            "WiFi",
            "Conference Room",
            "Gym",
            "Restaurant"
        ],

        status: true
    },

    {
        _id: "h7",
        ownerId: "o2",

        owner: owners[1],

        name: "Sunrise Suites",
        description: "Luxury suites for families and tourists.",
        email: "info@sunrisesuites.com",
        phone: "+92 300 1000007",
        address: "DHA Phase 5",
        city: "Lahore",
        country: "Pakistan",

        images: [hotel19, hotel20, hotel21],

        amenities: [
            "WiFi",
            "Swimming Pool",
            "Kids Area",
            "Parking"
        ],

        status: true
    },

    {
        _id: "h8",
        ownerId: "o2",

        owner: owners[1],

        name: "Elite Residency",
        description: "Premium accommodation for travelers.",
        email: "info@eliteresidency.com",
        phone: "+92 300 1000008",
        address: "Clifton",
        city: "Karachi",
        country: "Pakistan",

        images: [hotel22, hotel23, hotel24],

        amenities: [
            "WiFi",
            "Restaurant",
            "Gym"
        ],

        status: true
    },

    {
        _id: "h9",
        ownerId: "o2",

        owner: owners[1],

        name: "Sea Breeze Hotel",
        description: "Beachside luxury experience.",
        email: "info@seabreeze.com",
        phone: "+92 300 1000009",
        address: "Sea View",
        city: "Karachi",
        country: "Pakistan",

        images: [hotel25, hotel26, hotel27],

        amenities: [
            "WiFi",
            "Swimming Pool",
            "Restaurant",
            "Spa"
        ],

        status: true
    },

    {
        _id: "h10",
        ownerId: "o2",

        owner: owners[1],

        name: "Heritage Grand Hotel",
        description: "Traditional architecture with modern comfort.",
        email: "info@heritagegrand.com",
        phone: "+92 300 1000010",
        address: "Mall Road",
        city: "Peshawar",
        country: "Pakistan",

        images: [hotel28, hotel29, hotel30],

        amenities: [
            "WiFi",
            "Restaurant",
            "Parking",
            "Conference Room"
        ],

        status: true
    }
];

export const rooms = [
    {
        _id: "r1",
        hotelId: "h1",
        ownerId: "o1",

        hotel: hotels[0],
        owner: owners[0],

        roomNumber: "101",
        roomType: "Deluxe",
        pricePerNight: 120,
        capacity: 2,

        images: [roomImg1, roomImg2, roomImg3, roomImg4],

        description: "Spacious deluxe room with city view.",

        amenities: [
            "AC",
            "TV",
            "Mini Bar",
            "WiFi"
        ],

        status: true
    },

    {
        _id: "r2",
        hotelId: "h1",
        ownerId: "o1",

        hotel: hotels[0],
        owner: owners[0],

        roomNumber: "102",
        roomType: "Suite",
        pricePerNight: 180,
        capacity: 4,

        images: [roomImg2, roomImg1, roomImg3, roomImg4],

        description: "Luxury suite with living area.",

        amenities: [
            "AC",
            "TV",
            "Mini Bar",
            "WiFi",
            "Balcony"
        ],

        status: true
    },

    {
        _id: "r3",
        hotelId: "h2",
        ownerId: "o1",
        hotel: hotels[1],
        owner: owners[0],
        roomNumber: "201",
        roomType: "Standard",
        pricePerNight: 80,
        capacity: 2,
        images: [roomImg3, roomImg1, roomImg2, roomImg4],
        description: "Comfortable standard room.",
        amenities: ["AC", "TV", "WiFi"],
        status: true
    },

    {
        _id: "r4",
        hotelId: "h2",
        ownerId: "o1",
        hotel: hotels[1],
        owner: owners[0],
        roomNumber: "202",
        roomType: "Deluxe",
        pricePerNight: 110,
        capacity: 3,
        images: [roomImg4, roomImg1, roomImg2, roomImg3],
        description: "Deluxe room with modern furniture.",
        amenities: ["AC", "TV", "WiFi", "Mini Bar"],
        status: true
    },

    {
        _id: "r5",
        hotelId: "h3",
        ownerId: "o1",
        hotel: hotels[2],
        owner: owners[0],
        roomNumber: "301",
        roomType: "Standard",
        pricePerNight: 90,
        capacity: 2,
        images: [roomImg1, roomImg4, roomImg2, roomImg3],
        description: "Mountain facing room.",
        amenities: ["AC", "TV", "WiFi"],
        status: true
    },

    {
        _id: "r6",
        hotelId: "h3",
        ownerId: "o1",
        hotel: hotels[2],
        owner: owners[0],
        roomNumber: "302",
        roomType: "Executive",
        pricePerNight: 140,
        capacity: 3,
        images: [roomImg2, roomImg3, roomImg4, roomImg3],
        description: "Executive room with mountain view.",
        amenities: ["AC", "TV", "WiFi", "Mini Bar"],
        status: true
    },

    {
        _id: "r7",
        hotelId: "h4",
        ownerId: "o1",
        hotel: hotels[3],
        owner: owners[0],
        roomNumber: "401",
        roomType: "Standard",
        pricePerNight: 70,
        capacity: 2,
        images: [roomImg3, roomImg1, roomImg2, roomImg3],
        description: "Budget friendly room.",
        amenities: ["AC", "TV"],
        status: true
    },

    {
        _id: "r8",
        hotelId: "h4",
        ownerId: "o1",
        hotel: hotels[3],
        owner: owners[0],
        roomNumber: "402",
        roomType: "Deluxe",
        pricePerNight: 100,
        capacity: 3,
        images: [roomImg4, roomImg3, roomImg2, roomImg1],
        description: "Modern deluxe room.",
        amenities: ["AC", "TV", "WiFi"],
        status: true
    },

    {
        _id: "r9",
        hotelId: "h5",
        ownerId: "o1",
        hotel: hotels[4],
        owner: owners[0],
        roomNumber: "501",
        roomType: "Executive",
        pricePerNight: 150,
        capacity: 3,
        images: [roomImg1, roomImg3, roomImg2, roomImg4],
        description: "Lake facing executive room.",
        amenities: ["AC", "TV", "WiFi", "Mini Bar"],
        status: true
    },

    {
        _id: "r10",
        hotelId: "h5",
        ownerId: "o1",
        hotel: hotels[4],
        owner: owners[0],
        roomNumber: "502",
        roomType: "Suite",
        pricePerNight: 220,
        capacity: 5,
        images: [roomImg2, roomImg3, roomImg1, roomImg4],
        description: "Premium family suite.",
        amenities: ["AC", "TV", "WiFi", "Mini Bar", "Balcony"],
        status: true
    },

    {
        _id: "r11",
        hotelId: "h6",
        ownerId: "o2",
        hotel: hotels[5],
        owner: owners[1],
        roomNumber: "601",
        roomType: "Deluxe",
        pricePerNight: 130,
        capacity: 2,
        images: [roomImg3, roomImg2, roomImg1, roomImg4],
        description: "Business deluxe room.",
        amenities: ["AC", "TV", "WiFi"],
        status: true
    },

    {
        _id: "r12",
        hotelId: "h6",
        ownerId: "o2",
        hotel: hotels[5],
        owner: owners[1],
        roomNumber: "602",
        roomType: "Suite",
        pricePerNight: 210,
        capacity: 4,
        images: [roomImg4, roomImg2, roomImg1, roomImg3],
        description: "Executive suite.",
        amenities: ["AC", "TV", "WiFi", "Mini Bar"],
        status: true
    },

    {
        _id: "r13",
        hotelId: "h7",
        ownerId: "o2",
        hotel: hotels[6],
        owner: owners[1],
        roomNumber: "701",
        roomType: "Standard",
        pricePerNight: 90,
        capacity: 2,
        images: [roomImg1, roomImg2, roomImg4, roomImg3],
        description: "Family standard room.",
        amenities: ["AC", "TV", "WiFi"],
        status: true
    },

    {
        _id: "r14",
        hotelId: "h7",
        ownerId: "o2",
        hotel: hotels[6],
        owner: owners[1],
        roomNumber: "702",
        roomType: "Executive",
        pricePerNight: 160,
        capacity: 3,
        images: [roomImg2, roomImg1, roomImg4, roomImg3],
        description: "Executive family room.",
        amenities: ["AC", "TV", "WiFi", "Mini Bar"],
        status: true
    },

    {
        _id: "r15",
        hotelId: "h8",
        ownerId: "o2",
        hotel: hotels[7],
        owner: owners[1],
        roomNumber: "801",
        roomType: "Deluxe",
        pricePerNight: 120,
        capacity: 2,
        images: [roomImg3, roomImg1, roomImg4, roomImg2],
        description: "Premium deluxe room.",
        amenities: ["AC", "TV", "WiFi"],
        status: true
    },

    {
        _id: "r16",
        hotelId: "h8",
        ownerId: "o2",
        hotel: hotels[7],
        owner: owners[1],
        roomNumber: "802",
        roomType: "Suite",
        pricePerNight: 230,
        capacity: 5,
        images: [roomImg4, roomImg1, roomImg3, roomImg2],
        description: "Luxury suite.",
        amenities: ["AC", "TV", "WiFi", "Mini Bar", "Balcony"],
        status: true
    },

    {
        _id: "r17",
        hotelId: "h9",
        ownerId: "o2",
        hotel: hotels[8],
        owner: owners[1],
        roomNumber: "901",
        roomType: "Executive",
        pricePerNight: 170,
        capacity: 3,
        images: [roomImg1, roomImg4, roomImg3, roomImg2],
        description: "Sea view executive room.",
        amenities: ["AC", "TV", "WiFi", "Mini Bar"],
        status: true
    },

    {
        _id: "r18",
        hotelId: "h9",
        ownerId: "o2",
        hotel: hotels[8],
        owner: owners[1],
        roomNumber: "902",
        roomType: "Suite",
        pricePerNight: 260,
        capacity: 5,
        images: [roomImg4, roomImg1, roomImg3, roomImg2],
        description: "Luxury sea view suite.",
        amenities: ["AC", "TV", "WiFi", "Mini Bar", "Balcony"],
        status: true
    },

    {
        _id: "r19",
        hotelId: "h10",
        ownerId: "o2",
        hotel: hotels[9],
        owner: owners[1],
        roomNumber: "1001",
        roomType: "Standard",
        pricePerNight: 95,
        capacity: 2,
        images: [roomImg1, roomImg4, roomImg3, roomImg2],
        description: "Heritage standard room.",
        amenities: ["AC", "TV", "WiFi"],
        status: true
    },

    {
        _id: "r20",
        hotelId: "h10",
        ownerId: "o2",
        hotel: hotels[9],
        owner: owners[1],
        roomNumber: "1002",
        roomType: "Deluxe",
        pricePerNight: 140,
        capacity: 3,
        images: [roomImg4, roomImg1, roomImg3, roomImg2],
        description: "Heritage deluxe room.",
        amenities: ["AC", "TV", "WiFi", "Mini Bar"],
        status: true
    }
];

export const bookings = [
    {
        _id: "b1",
        userId: "u1",
        hotelId: "h1",
        roomId: "r1",

        user: users[0],
        hotel: hotels[0],
        room: rooms[0],

        checkInDate: new Date("2026-07-01"),
        checkOutDate: new Date("2026-07-05"),

        amount: 480,
        status: "confirmed",
        paymentStatus: "paid"
    },
    {
        _id: "b2",
        userId: "u2",
        hotelId: "h2",
        roomId: "r3",

        user: users[1],
        hotel: hotels[1],
        room: rooms[2],

        checkInDate: new Date("2026-07-10"),
        checkOutDate: new Date("2026-07-12"),

        amount: 240,
        status: "confirmed",
        paymentStatus: "paid"
    },
    {
        _id: "b3",
        userId: "u1",
        hotelId: "h3",
        roomId: "r5",

        user: users[0],
        hotel: hotels[2],
        room: rooms[4],

        checkInDate: new Date("2026-07-15"),
        checkOutDate: new Date("2026-07-18"),

        amount: 360,
        status: "pending",
        paymentStatus: "unpaid"
    },
    {
        _id: "b4",
        userId: "u2",
        hotelId: "h4",
        roomId: "r7",

        user: users[1],
        hotel: hotels[3],
        room: rooms[6],

        checkInDate: new Date("2026-07-20"),
        checkOutDate: new Date("2026-07-22"),

        amount: 220,
        status: "confirmed",
        paymentStatus: "paid"
    },
    {
        _id: "b5",
        userId: "u1",
        hotelId: "h5",
        roomId: "r9",

        user: users[0],
        hotel: hotels[4],
        room: rooms[8],

        checkInDate: new Date("2026-07-25"),
        checkOutDate: new Date("2026-07-28"),

        amount: 390,
        status: "cancelled",
        paymentStatus: "refunded"
    },
    {
        _id: "b6",
        userId: "u2",
        hotelId: "h6",
        roomId: "r11",

        user: users[1],
        hotel: hotels[5],
        room: rooms[10],

        checkInDate: new Date("2026-08-01"),
        checkOutDate: new Date("2026-08-03"),

        amount: 260,
        status: "confirmed",
        paymentStatus: "paid"
    },
    {
        _id: "b7",
        userId: "u1",
        hotelId: "h7",
        roomId: "r13",

        user: users[0],
        hotel: hotels[6],
        room: rooms[12],

        checkInDate: new Date("2026-08-05"),
        checkOutDate: new Date("2026-08-08"),

        amount: 420,
        status: "confirmed",
        paymentStatus: "paid"
    },
    {
        _id: "b8",
        userId: "u2",
        hotelId: "h8",
        roomId: "r15",

        user: users[1],
        hotel: hotels[7],
        room: rooms[14],

        checkInDate: new Date("2026-08-10"),
        checkOutDate: new Date("2026-08-12"),

        amount: 300,
        status: "pending",
        paymentStatus: "unpaid"
    },
    {
        _id: "b9",
        userId: "u1",
        hotelId: "h9",
        roomId: "r17",

        user: users[0],
        hotel: hotels[8],
        room: rooms[16],

        checkInDate: new Date("2026-08-15"),
        checkOutDate: new Date("2026-08-17"),

        amount: 280,
        status: "confirmed",
        paymentStatus: "paid"
    },
    {
        _id: "b10",
        userId: "u2",
        hotelId: "h10",
        roomId: "r19",

        user: users[1],
        hotel: hotels[9],
        room: rooms[18],

        checkInDate: new Date("2026-08-20"),
        checkOutDate: new Date("2026-08-23"),

        amount: 450,
        status: "confirmed",
        paymentStatus: "paid"
    }
];

export const payments = [
    {
        _id: "p1",
        bookingId: "b1",
        userId: "u1",

        booking: bookings[0],
        user: users[0],

        amount: 480,
        paymentMethod: "card",
        status: "success",
        transactionId: "TXN1001"
    },
    {
        _id: "p2",
        bookingId: "b2",
        userId: "u2",

        booking: bookings[1],
        user: users[1],

        amount: 240,
        paymentMethod: "jazzcash",
        status: "success",
        transactionId: "TXN1002"
    },
    {
        _id: "p3",
        bookingId: "b4",
        userId: "u2",

        booking: bookings[3],
        user: users[1],

        amount: 220,
        paymentMethod: "easypaisa",
        status: "success",
        transactionId: "TXN1003"
    },
    {
        _id: "p4",
        bookingId: "b6",
        userId: "u2",

        booking: bookings[5],
        user: users[1],

        amount: 260,
        paymentMethod: "card",
        status: "success",
        transactionId: "TXN1004"
    },
    {
        _id: "p5",
        bookingId: "b7",
        userId: "u1",

        booking: bookings[6],
        user: users[0],

        amount: 420,
        paymentMethod: "bank_transfer",
        status: "success",
        transactionId: "TXN1005"
    },
    {
        _id: "p6",
        bookingId: "b9",
        userId: "u1",

        booking: bookings[8],
        user: users[0],

        amount: 280,
        paymentMethod: "card",
        status: "success",
        transactionId: "TXN1006"
    },
    {
        _id: "p7",
        bookingId: "b10",
        userId: "u2",

        booking: bookings[9],
        user: users[1],

        amount: 450,
        paymentMethod: "jazzcash",
        status: "success",
        transactionId: "TXN1007"
    },
    {
        _id: "p8",
        bookingId: "b3",
        userId: "u1",

        booking: bookings[2],
        user: users[0],

        amount: 360,
        paymentMethod: "pending",
        status: "failed",
        transactionId: null
    },
    {
        _id: "p9",
        bookingId: "b5",
        userId: "u1",

        booking: bookings[4],
        user: users[0],

        amount: 390,
        paymentMethod: "card",
        status: "refunded",
        transactionId: "TXN1009"
    },
    {
        _id: "p10",
        bookingId: "b8",
        userId: "u2",

        booking: bookings[7],
        user: users[1],

        amount: 300,
        paymentMethod: "pending",
        status: "pending",
        transactionId: null
    }
];

export const reviews = [
    {
        _id: "rev1",
        userId: "u1",
        hotelId: "h1",
        bookingId: "b1",

        user: users[0],
        hotel: hotels[0],

        rating: 5,
        comment: "Excellent service and clean rooms. Highly recommended!",
        date: new Date("2026-07-06")
    },
    {
        _id: "rev2",
        userId: "u2",
        hotelId: "h2",
        bookingId: "b2",

        user: users[1],
        hotel: hotels[1],

        rating: 4,
        comment: "Good experience overall, but room was slightly small.",
        date: new Date("2026-07-13")
    },
    {
        _id: "rev3",
        userId: "u1",
        hotelId: "h4",
        bookingId: "b4",

        user: users[0],
        hotel: hotels[3],

        rating: 4,
        comment: "Nice location and friendly staff.",
        date: new Date("2026-07-23")
    },
    {
        _id: "rev4",
        userId: "u2",
        hotelId: "h6",
        bookingId: "b6",

        user: users[1],
        hotel: hotels[5],

        rating: 5,
        comment: "Perfect stay, everything was well managed.",
        date: new Date("2026-08-04")
    },
    {
        _id: "rev5",
        userId: "u1",
        hotelId: "h7",
        bookingId: "b7",

        user: users[0],
        hotel: hotels[6],

        rating: 3,
        comment: "Average experience, room service was slow.",
        date: new Date("2026-08-09")
    },
    {
        _id: "rev6",
        userId: "u2",
        hotelId: "h8",
        bookingId: "b8",

        user: users[1],
        hotel: hotels[7],

        rating: 4,
        comment: "Comfortable stay and good amenities.",
        date: new Date("2026-08-13")
    },
    {
        _id: "rev7",
        userId: "u1",
        hotelId: "h9",
        bookingId: "b9",

        user: users[0],
        hotel: hotels[8],

        rating: 5,
        comment: "Amazing hotel with great hospitality.",
        date: new Date("2026-08-18")
    },
    {
        _id: "rev8",
        userId: "u2",
        hotelId: "h10",
        bookingId: "b10",

        user: users[1],
        hotel: hotels[9],

        rating: 4,
        comment: "Very clean and peaceful environment.",
        date: new Date("2026-08-24")
    },
    {
        _id: "rev9",
        userId: "u1",
        hotelId: "h3",
        bookingId: "b3",

        user: users[0],
        hotel: hotels[2],

        rating: 3,
        comment: "Still improving, decent stay but not perfect.",
        date: new Date("2026-07-19")
    },
    {
        _id: "rev10",
        userId: "u2",
        hotelId: "h5",
        bookingId: "b5",

        user: users[1],
        hotel: hotels[4],

        rating: 2,
        comment: "Booking was cancelled, experience was not good.",
        date: new Date("2026-07-29")
    }
];