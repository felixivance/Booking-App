"use client";
import { InterfaceRoom } from '@/backend/models/room'
import React from 'react'
import StarRatings from 'react-star-ratings';
import RoomImageSlider from './RoomImageSlider';
import RoomFeatures from './RoomFeatures';
import BookingDatePicker from './BookingDatePicker';
import NewReview from '../review/NewReview';
import ListReviews from '../review/ListReviews';
interface Props  {
    data: {
        room: InterfaceRoom
    }
}

const RoomDetails = ({data}: Props) => {
    const { room } = data;
  return (
    <div className="container container-fluid">
      <h2 className="mt-5">{room.name}</h2>
      <p>{room.address}</p>

      <div className="ratings mt-auto mb-3">
        
        
      <StarRatings
                rating={room?.ratings}
                starRatedColor="#ffb400"
                numberOfStars={5}
                name="rating"
                starSpacing="1px"
                starDimension="18px"
                />
          <span className="no-of-reviews">({room.numOfReviews} Reviews)</span>
        
        
      </div>

      

    <RoomImageSlider images={room?.images} />
      {/* <div style={{width: '100%',height: '460px'}}>
        <img
          className="d-block m-auto"
          src="./images/default_room_image.jpg"
          alt="images/default_room_image.jpg"
        //   layout="fill"
        />
      </div> */}
      

      <div className="row my-5">
        <div className="col-12 col-md-6 col-lg-8">
          <h3>Description</h3>
          <p>
            {room.description}
          </p>

          {/* <!-- RoomFeatures Component --> */}
         <RoomFeatures room={room} />
          {/* <!-- End RoomFeatures Component --> */}
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          
            <BookingDatePicker room={room} />
          
    
          {/* <!-- Room Location Map (if available) goes here --> */}
        </div>
      </div>

      
      <NewReview room={room}/>
      {/* <!-- End NewReview Component --> */}

      {/* <!-- ListReviews Component --> */}
      <ListReviews room={room} />
      {/* <!-- End ListReviews Component --> */}
    </div>
    
  )
}

export default RoomDetails