"use client";

import React from 'react'
import RoomItem from './room/roomItem'
import toast from 'react-hot-toast';
import { InterfaceRoom } from '@/backend/models/room';

interface Props  {
    data: {
        success: boolean;
        resultsPerPage: number;
        filteredRoomsCount: number;
        rooms: InterfaceRoom[];
    }
}

const Home = ({data}: Props) => {

    const { rooms, resultsPerPage, filteredRoomsCount} = data;
    console.log(data);

  return (
        <div>
        <section id="rooms" className="container mt-5">
            <h2 className="mb-3 ml-2 stays-heading" onClick={()=>toast.success('Hello toast!')} >All Rooms</h2>
            <a href="/search" className="ml-2 back-to-search">
            <i className="fa fa-arrow-left"></i> Back to Search
            </a>
            <div className="row mt-4">
                {
                    rooms.length === 0 ?
                    <div className="alert alert-danger mt-5 w-100">
                        <b>No Rooms available</b>
                    </div>
                    :
                    rooms.map((room)=> <RoomItem key={room._id} room={room} />)
                }
            </div>
        </section>
        </div>
    )
}

export default Home