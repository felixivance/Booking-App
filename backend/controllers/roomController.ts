import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";


export const allRooms = catchAsyncErrors( async (request: NextRequest) => {
    const rooms  = await Room.find();
    return NextResponse.json({
        success: true,
        rooms
    })
})

export const newRoom = catchAsyncErrors( async (request: NextRequest) => {
    const body = await request.json();

    const room = await Room.create(body);

    return NextResponse.json({
        success: true,
        room
    })
})

// api/room/[id]
export const getRoomDetails = catchAsyncErrors( async (request: NextRequest, { params }: { params:{id:string}}) => {

    const { id } = params;

    const room = await Room.findById(id);

    if(!room) {
        new ErrorHandler('Room not found with this ID', 404);
    }

    return NextResponse.json({
        success: true,
        room
    })
   
})

// update room details => /api/admin/rooms/[id]
export const updateRoom = catchAsyncErrors( async (request: NextRequest, { params }: { params:{id:string}}) => {
    
    let room = await Room.findById(params.id);

    if(!room){
        throw new ErrorHandler('Room not found', 404);
    }
    let body = await request.json();

    room = await Room.findByIdAndUpdate(params.id, body,{
        new: true // return the new updated data
    })

    return NextResponse.json({
        success:true,
        room
    })
})

// delete room -> api/admin/[id]
export const deleteRoom = catchAsyncErrors( async (request: NextRequest, { params }: { params:{id:string}})=>{
    
    const { id } = params;

    let room  = await Room.findById(id);

    if(!room){
        throw new ErrorHandler('Room not found', 404);
    }
    // TODO: delete image associated with the room

    await Room.findByIdAndDelete(id);


    return NextResponse.json({
        success:true,
        message: "Room deleted successfully"
    })
})