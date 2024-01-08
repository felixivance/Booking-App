"use client";
import { InterfaceRoom } from '@/backend/models/room';
import React from 'react'
import StarRatings from 'react-star-ratings';

interface Props  {
  room: InterfaceRoom;
}

function RoomItem({room}: Props) {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3 d-flex">
        <div className="card p-2 w-100">
        <img
            className="card-img-top mx-auto"
            src={ room?.images?.length > 0 ? room.images[0].url : "images/default_room_image.jpg"}
            alt=""
            height="170"
            width="100"
        />
        <div className="card-body d-flex flex-column">
            <h5 className="card-title">
            <a href="/rooms/roomId">{room?.name}</a>
            </h5>
            <div className="mt-auto">
            <p className="card-text mt-2"><b>${room?.pricePerNight}</b> / night</p>
            </div>
            <div>
            <div className='d-flex'>
                <StarRatings
                rating={4}
                starRatedColor="#ffb400"
                numberOfStars={5}
                name="rating"
                starSpacing="1px"
                starDimension="18px"
                />
                <span className="no-of-reviews">({room?.numOfReviews} Reviews)</span>
            </div>
            <a className="btn view-btn mt-3 w-100" href="/rooms/roomId">View Details</a>
            </div>
        </div>
        </div>
    </div>
  )
}

export default RoomItem