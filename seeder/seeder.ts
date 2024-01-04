import Room from '../backend/models/room';
import mongoose, { mongo } from 'mongoose';
import { rooms } from './data';

const seedRooms = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/bookit-v2')

        await Room.deleteMany();
        console.log('Rooms are deleted');

        await Room.insertMany(rooms);
        console.log('All Rooms are added.');

        process.exit();
    }catch(error: unknown) {
        console.log(error);
        process.exit();
    }
}

seedRooms();