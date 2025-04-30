export type ListingData = {
    id: string,
    created_at: string
    location: string,
    description?: string,
    title: string,
    typeOfProperty?: string,
    bedrooms: number,
    baths: number,
    guests?: string,
    views?: string,
    dates: {
        from: string,
        to: string
    },
    price: number,
    discount?: number,
    rating?: number,
    lat?: number,
    lng?: number,
    address: string,
    extraCosts?: string[],
    otherRoommates?: string[],
    images: string[],
    postedbyemail: string,
    gender?: string,
    additionalcontact?: string,
    available?: boolean,
    sharedbathroom?: boolean,
    available_semester?: string,
    available_year?: number,
    furnished?: boolean,
    pets_allowed?: boolean,
    car_parking_space?: boolean,
    washer_and_dryer?: boolean,
    handicap_accessible?: boolean,
    open_to_demographics?: string[],
    agreementUrl: string
}

export type SearchQuery = {
    listing: Partial<ListingData>,
    minPrice?: number,
    maxPrice?: number,
    demographic?: string
}

export const tempListings: ListingData[] = [
    {
        id: "51",
        title: "Cool apt by the corner",
        location: 'Graduate Court',
        dates: {
            "to": "2025-08-01T23:10:00.568Z",
            "from": "2025-01-01T23:10:00.568Z"
        },
        price: 110,
        discount: 50,
        bedrooms: 1,
        rating: 13,
        lat: 37.0024,
        lng: -79.6397,
        extraCosts: [
            "Water",
            "Electricity"
        ],
        images: [
        'https://zinuafgdmiwpkvlixboz.supabase.co/storage/v1/object/uploadedimages/b3781d3b-8717-4436-97cb-59d008bea97c',
        'https://zinuafgdmiwpkvlixboz.supabase.co/storage/v1/object/uploadedimages/ab386879-f9b0-462c-96e7-f31c1c701fbc',
        'https://zinuafgdmiwpkvlixboz.supabase.co/storage/v1/object/uploadedimages/52b0af4b-1adb-46c8-8caa-2ebfe9f9b213',
        ]
    } as ListingData,
    {
        id: "61",
        location: 'Graduate Court',
        title: "Cool apt by the corner",
        bedrooms: 1,
        dates: {
            "to": "2025-08-01T23:10:00.568Z",
            "from": "2025-01-01T23:10:00.568Z"
        },
        price: 1250,
        discount: 750,
        rating: 2, 
        lat: 38.6126, 
        lng: -78.7992,
        images: [
        'https://zinuafgdmiwpkvlixboz.supabase.co/storage/v1/object/uploadedimages/ee441742-23a2-4a03-94c2-1b1d4a1067a1'
        ]
    } as ListingData,
    {
        id: "74",
        location: '1819 Jefferson Park Ave.',
        dates: {
            "to": "2025-08-01T23:10:00.568Z",
            "from": "2025-01-01T23:10:00.568Z"
        },
        address: "123 Fake Street",
        title: "Cool apt by the corner",
        bedrooms: 2,
        baths: 1,
        description: "The Luxury Lake House is located near some of the area's finest restaurants, wineries, breweries, and golf courses. Bring your golf clubs and fishing poles along, as our property features an expansive lake front with excellent catch and release, providing a serene and picturesque setting to appreciate the beauty of the area and an unmatched view of Robert Trent Jones Golf course. The Lake House is a wildlife habitat and it is not uncommon to see wild animals and farm animals on the property.",
        guests: "3-6",
        price: 1300,
        discount: 800,
        rating: 18, 
        lat: 38.6651, 
        lng: -78.4594,
        images: [
        'https://zinuafgdmiwpkvlixboz.supabase.co/storage/v1/object/uploadedimages/894c1e08-e705-420f-ad28-8787f63ddc8c',
        ]
    } as ListingData,
    {
        id: "97",
        location: '714 B Madison Ave',
        title: "Cool apt by the corner",
        bedrooms: 1,
        dates: {
            "to": "2025-08-01T23:10:00.568Z",
            "from": "2025-01-01T23:10:00.568Z"
        },
        price: 1150,
        discount: 500,
        rating: 23, 
        lat: 38.2762, 
        lng: -79.7764,
        images: [
        'https://zinuafgdmiwpkvlixboz.supabase.co/storage/v1/object/uploadedimages/806d5f44-4fff-4134-894d-bdc0f008b4ad',
        ]
    } as ListingData,
    {
        id: "101",
        location: 'The Corner, UVA',
        title: "Cool apt by the corner",
        bedrooms: 1,
        dates: {
            "to": "2025-08-01T23:10:00.568Z",
            "from": "2025-01-01T23:10:00.568Z"
        },
        price: 850,
        discount: 300,
        rating: 26, 
        lat: 38.2762, 
        lng: -79.7764,
        images: [
        'https://zinuafgdmiwpkvlixboz.supabase.co/storage/v1/object/uploadedimages/6dbfadc1-e420-4fb8-85ba-510639023a79',
        ]
    } as ListingData,
    {
        id: "103",
        location: 'Mill Creek',
        title: "Cool apt by the corner",
        bedrooms: 1,
        dates: {
            "to": "2025-08-01T23:10:00.568Z",
            "from": "2025-01-01T23:10:00.568Z"
        },
        price: 800,
        discount: 300,
        rating: 5, 
        lat: 38.6651, 
        lng: -78.4594,
        images: [
        'https://zinuafgdmiwpkvlixboz.supabase.co/storage/v1/object/uploadedimages/31880cbd-2c06-4eab-a450-64fbc1ee6b2f',
        ]
    } as ListingData,
    {
        id: "104",
        location: 'Corner, UVA',
        title: "Cool apt by the corner",
        bedrooms: 1,
        dates: {
            "to": "2025-08-01T23:10:00.568Z",
            "from": "2025-01-01T23:10:00.568Z"
        },
        price: 900,
        discount: 400,
        rating: 11, 
        lat: 37.0024, 
        lng: -79.6397,
        images: [
        'https://zinuafgdmiwpkvlixboz.supabase.co/storage/v1/object/uploadedimages/b444caef-ff40-4d5b-9f91-9bffd3ad9064',
        ]
    } as ListingData,
    {
        id: "110",
        location: 'Graduate Court',
        title: "Cool apt by the corner",
        bedrooms: 1,
        dates: {
            "to": "2025-08-01T23:10:00.568Z",
            "from": "2025-01-01T23:10:00.568Z"
        },
        price: 1000,
        discount: 600,
        rating: 25, 
        lat: 38.6126, 
        lng: -78.7992,
        images: [
        'https://zinuafgdmiwpkvlixboz.supabase.co/storage/v1/object/uploadedimages/82341a96-0ba6-4400-bbfe-47c04f6c2357',
        ]
    } as ListingData
];

// export const categoryIcons = [
//     {text:'Amazing views',thumbnail:"https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg"},
//     {text:'Icons',thumbnail:"https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png"},
//     {text:'Cabins',thumbnail:"https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg"},
//     {text:'Treehouses',thumbnail:"https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg"},
//     {text:'Earth homes',thumbnail:"https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg"},
//     {text:'Bed & breakfasts',thumbnail:"https://a0.muscache.com/pictures/5ed8f7c7-2e1f-43a8-9a39-4edfc81a3325.jpg"},
//     {text:'Tiny homes',thumbnail:"https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg"},
//     {text:'OMG!',thumbnail:"https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg"},
//     {text:'Lakefront',thumbnail:"https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg"},
//     {text:'Beachfront',thumbnail:"https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg"}
// ];

export const categoryIcons = [
    {text: "Townhouse", thumbnail: "https://a0.muscache.com/pictures/7ff6e4a1-51b4-4671-bc9a-6f523f196c61.jpg"},
    {text: "Apartment", thumbnail: "https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg"},
    {text: "House", thumbnail: "https://a0.muscache.com/pictures/b887040f-0968-4174-9a4f-2d41f8728248.jpg"},
]