import mongoose, { Schema } from "mongoose";

const roomSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Please enter a room name' ],
        trim: true,
        maxLength: [ 100, 'Room name cannot exceed 100 characters' ]
    }

});