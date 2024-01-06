"use client";

import React from 'react'
import RoomItem from './room/roomItem'
import toast from 'react-hot-toast';

type Props = {}

const Home = ({data}) => {

    

  return (
        <div>
        <section id="rooms" className="container mt-5">
            <h2 className="mb-3 ml-2 stays-heading" onClick={()=>toast.success('Hello toast!')} >All Rooms</h2>
            <a href="/search" className="ml-2 back-to-search">
            <i className="fa fa-arrow-left"></i> Back to Search
            </a>
            <div className="row mt-4">
            
                <RoomItem/>
            
            </div>
        </section>
        </div>
    )
}

export default Home