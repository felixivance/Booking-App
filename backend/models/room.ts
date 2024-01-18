import mongoose, { Schema, Document } from "mongoose";

export interface InterfaceRoom extends Document {
    name: string;
    description: string;
    pricePerNight: number;
    address: string;
    location: {
        type: string;
        coordinates: number[];
        formattedAddress: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    guestCapacity: number;
    numOfBeds: number;
    isInternet: boolean;
    isBreakfast: boolean;
    isAirConditioned: boolean;
    isPetsAllowed: boolean;
    isRoomCleaning: boolean;
    ratings: number;
    numOfReviews: number;
    images: {
        public_id: string;
        url: string;
    }[];
    category: string;
    reviews: {
        user: mongoose.Schema.Types.ObjectId;
        name: string;
        rating: number;
        comment: string;
    }[];
    user: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export interface InterfaceRoomImage {
    public_id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}

const roomSchema: Schema<InterfaceRoom> = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Please enter a room name' ],
        trim: true,
        maxLength: [ 100, 'Room name cannot exceed 100 characters' ]
    },
    description: {
        type: String,
        required: [ true, 'Please enter a room description' ]
    },
    pricePerNight: {
        type: Number,
        required: [ true, 'Please enter a room price' ],
        default: 0.0
    },
    address: {
        type: String,
        required: [ true, 'Please enter a room address' ]
    },
    location: {
        type: {
            type: String,
            enum: [ 'Point' ]
        },
        coordinates: {
            type: [ Number ],
            index: '2dsphere' // 2d sphere index for geospatial queries
        },
        formattedAddress: String, // formatted address from reverse geocoding
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    guestCapacity: {
        type: Number,
        required: [ true, 'Please enter a room guest capacity' ]
    },
    numOfBeds: {
        type: Number,
        required: [ true, 'Please enter a room number of beds' ]
    },
    isInternet: {
        type: Boolean,
        default: false
    },
    isBreakfast: {
        type: Boolean,
        default: false
    },
    isAirConditioned: {
        type: Boolean,
        default: false
    },
    isPetsAllowed: {
        type: Boolean,
        default: false
    },
    isRoomCleaning: {
        type: Boolean,
        default: false
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    category: {
        type: String,
        required: [ true, 'Please enter a room category' ],
        enum: {
            values: [
                'King',
                'Single',
                'Twins'
            ],
            message: 'Please select correct category for room'
        }
    },

    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }

    
});

export default mongoose.models.Room || mongoose.model<InterfaceRoom>('Room', roomSchema);