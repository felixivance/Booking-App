"use client";

import React from 'react'
import RoomItem from './room/roomItem'
import toast from 'react-hot-toast';
import { InterfaceRoom } from '@/backend/models/room';
import CustomPagination from './layout/CustomPagination';
import { useSearchParams } from 'next/navigation';

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

const searchParams = useSearchParams();

const location = searchParams.get('location');


return (
        <div>
        <section id="rooms" className="container mt-5">
            <h2 className="mb-3 ml-2 stays-heading" onClick={()=>toast.success('Hello toast!')} >
                { location ? `${filteredRoomsCount} Room(s) Found in ${location}` : 'All Rooms'}
            </h2>
            <a href="/search" className="ml-2 back-to-search">
            <i className="fa fa-arrow-left me-1"></i> Back to Search
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
        <CustomPagination resultsPerPage={resultsPerPage} filteredRoomsCount={filteredRoomsCount}/>
        </div>
    )
}

export default Home