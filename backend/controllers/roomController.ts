import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";


export const allRooms = async (request: NextRequest) => {
    return NextResponse.json({"message": "Hello from the API!"})
}

export const newRoom = async (request: NextRequest) => {
    const body = await request.json();

    const room = await Room.create(body);

    return NextResponse.json({
        success: true,
        room
    })
}