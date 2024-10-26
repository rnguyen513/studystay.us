export type ListingData = {
    id: string,
    location: string,
    description?: string,
    title: string,
    typeOfProperty?: string,
    bedrooms: number,
    baths: number,
    guests?: string,
    views?: string,
    dates: string,
    price: number,
    rating?: number,
    lat?: number,
    lng?: number,
    address: string,
    extraCosts?: string[],
    otherRoommates?: string[],
    images: string[]
}

export const tempListings: ListingData[] = [
    {
        id: "1",
        location: 'Penhook, Virginia',
        views: 'Mountain and lake views',
        dates: 'Oct 20 - 25',
        price: 900,
        rating: 13,
        lat: 37.0024,
        lng: -79.6397,
        extraCosts: [
            "Water",
            "Electricity"
        ],
        images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-892669485442312919/original/d6226d33-5397-43b6-8806-9c9f2ffdacef.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-892669485442312919/original/d051d89a-be7d-47ac-b368-21e9a6b3e4ec.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-892669485442312919/original/bc78c584-9b93-4eaf-be31-7c35aeca9f88.jpeg?im_w=720',
        ]
    } as ListingData,
    {
        id: "2",
        location: 'Broadway, Virginia', 
        views: 'Mountain and valley views', 
        dates: 'Nov 18 - 23', 
        price: 225, 
        rating: 2, 
        lat: 38.6126, 
        lng: -78.7992,
        images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-625495310891506269/original/a701c888-2d26-4bcd-bfd7-7e5ad9a5ad4d.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-625495310891506269/original/7fb13042-18f0-4eb5-8361-dd15296d40c1.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-625495310891506269/original/63a41d17-b31e-4ff7-afdb-58627cd22267.jpeg?im_w=720',
        ]
    } as ListingData,
    {
        id: "3",
        location: 'Luray, Virginia', 
        views: 'Mountain and park views', 
        dates: 'Nov 17 - 22',
        address: "123 Fake Street",
        bedrooms: 2,
        baths: 1,
        description: "The Luxury Lake House is located near some of the area's finest restaurants, wineries, breweries, and golf courses. Bring your golf clubs and fishing poles along, as our property features an expansive lake front with excellent catch and release, providing a serene and picturesque setting to appreciate the beauty of the area and an unmatched view of Robert Trent Jones Golf course. The Lake House is a wildlife habitat and it is not uncommon to see wild animals and farm animals on the property.",
        guests: "3-6",
        price: 256, 
        rating: 18, 
        lat: 38.6651, 
        lng: -78.4594,
        images: [
        'https://a0.muscache.com/im/pictures/23be904d-ba59-4814-91b5-b23f82481421.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/db3bfcf3-cd0c-4884-a83a-b8b6ab206935.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/f0e49c18-15de-47d2-84c1-a1c70d5d9371.jpg?im_w=720',
        ]
    } as ListingData,
    {
        id: "4",
        location: 'Dunmore, West Virginia', 
        views: 'Mountain and lake views', 
        dates: 'Oct 13 - 18', 
        price: 121, 
        rating: 23, 
        lat: 38.2762, 
        lng: -79.7764,
        images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-49569025/original/96dad999-3c42-49f7-b04f-1b6616dfd126.jpeg?im_w=720',
        'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-49569025/original/d3896651-4cde-4241-afb2-2c2f29b3c2f0.jpeg?im_w=720',
        'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-49569025/original/c37eb15e-f926-4c40-8621-41a4411f429a.jpeg?im_w=720',
        ]
    } as ListingData,
    {
        id: "5",
        location: 'Dunmore, West Virginia', 
        views: 'Mountain and lake views', 
        dates: 'Oct 13 - 18', 
        price: 121, 
        rating: 26, 
        lat: 38.2762, 
        lng: -79.7764,
        images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-49569025/original/96dad999-3c42-49f7-b04f-1b6616dfd126.jpeg?im_w=720',
        'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-49569025/original/d3896651-4cde-4241-afb2-2c2f29b3c2f0.jpeg?im_w=720',
        'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-49569025/original/c37eb15e-f926-4c40-8621-41a4411f429a.jpeg?im_w=720',
        ]
    } as ListingData,
    {
        id: "6",
        location: 'Luray, Virginia', 
        views: 'Mountain and park views', 
        dates: 'Nov 17 - 22', 
        price: 256, 
        rating: 5, 
        lat: 38.6651, 
        lng: -78.4594,
        images: [
        'https://a0.muscache.com/im/pictures/23be904d-ba59-4814-91b5-b23f82481421.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/db3bfcf3-cd0c-4884-a83a-b8b6ab206935.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/f0e49c18-15de-47d2-84c1-a1c70d5d9371.jpg?im_w=720',
        ]
    } as ListingData,
    {
        id: "7",
        location: 'Penhook, Virginia', 
        views: 'Mountain and lake views', 
        dates: 'Oct 20 - 25', 
        price: 900, 
        rating: 11, 
        lat: 37.0024, 
        lng: -79.6397,
        images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-892669485442312919/original/d6226d33-5397-43b6-8806-9c9f2ffdacef.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-892669485442312919/original/d051d89a-be7d-47ac-b368-21e9a6b3e4ec.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-892669485442312919/original/bc78c584-9b93-4eaf-be31-7c35aeca9f88.jpeg?im_w=720',
        ]
    } as ListingData,
    {
        id: "8",
        location: 'Broadway, Virginia', 
        views: 'Mountain and valley views', 
        dates: 'Nov 18 - 23', 
        price: 225, 
        rating: 25, 
        lat: 38.6126, 
        lng: -78.7992,
        images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-625495310891506269/original/a701c888-2d26-4bcd-bfd7-7e5ad9a5ad4d.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-625495310891506269/original/7fb13042-18f0-4eb5-8361-dd15296d40c1.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-625495310891506269/original/63a41d17-b31e-4ff7-afdb-58627cd22267.jpeg?im_w=720',
        ]
    } as ListingData,
    {
        id: "9",
        location: 'Broadway, Virginia', 
        views: 'Mountain and valley views', 
        dates: 'Nov 18 - 23', 
        price: 225, 
        rating: 25, 
        lat: 38.6126, 
        lng: -78.7992,
        images: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-625495310891506269/original/a701c888-2d26-4bcd-bfd7-7e5ad9a5ad4d.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-625495310891506269/original/7fb13042-18f0-4eb5-8361-dd15296d40c1.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-625495310891506269/original/63a41d17-b31e-4ff7-afdb-58627cd22267.jpeg?im_w=720',
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