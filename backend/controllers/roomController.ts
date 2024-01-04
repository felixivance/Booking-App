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