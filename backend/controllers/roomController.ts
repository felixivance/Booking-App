import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";


export const allRooms = async (request: NextRequest) => {
    const rooms  = await Room.find();
    return NextResponse.json({
        success: true,
        rooms
    })
}

export const newRoom = async (request: NextRequest) => {
    const body = await request.json();

    const room = await Room.create(body);

    return NextResponse.json({
        success: true,
        room
    })
}

// api/room/[id]
export const getRoomDetails = async (request: NextRequest, { params }: { params:{id:string}}) => {
    const { id } = params;

    const room = await Room.findById(id);

    if(!room) {
        return NextResponse.json({
            success: false,
            message: 'Room not found with this ID'
        }, {status: 404})
    }

    return NextResponse.json({
        success: true,
        room
    })
}

// update room details => /api/admin/rooms/[id]
export const updateRoom = async (request: NextRequest, { params }: { params:{id:string}}) => {
    
    let room = await Room.findById(params.id);

    if(!room){
        return NextResponse.json({
            success: false,
            message: 'Room not found'
        }, { status: 404})
    }
    let body = await request.json();

    room = await Room.findByIdAndUpdate(params.id, body,{
        new: true // return the new updated data
    })

    return NextResponse.json({
        success:true,
        room
    })
}

// delete room -> api/admin/[id]
export const deleteRoom = async (request: NextRequest, { params }: { params:{id:string}})=>{
    
    const { id } = params;

    let room  = await Room.findById(id);

    if(!room){
        return NextResponse.json({
            success:false,
            message: "room not found"
        })
    }

    await Room.findByIdAndDelete(id);

    return NextResponse.json({
        success:true,
        message: "Room deleted successfully"
    })
}