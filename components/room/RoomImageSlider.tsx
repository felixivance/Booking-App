"use client";
import { InterfaceRoom, InterfaceRoomImage } from '@/backend/models/room'
import Image from 'next/image';
import React from 'react'
import { Carousel } from 'react-bootstrap'

interface Props  {
    images:  {
        public_id: string,
        url: string
    }[]
}

const RoomImageSlider = ({images}: Props) => {
  return <Carousel>
    {
        images?.length > 0 ? (
           images?.map((image, index)=>(
            <Carousel.Item key={index}>
                <div style={{ widows:'100', height:'460px'}}>
                    <Image className='d-block m-auto'
                    src={image?.url} alt={image?.url} layout='fill' />
                </div>
            </Carousel.Item>
           ))
        ) : (
            <Carousel.Item >
                <div style={{ widows:'100', height:'460px'}}>
                    <Image className='d-block m-auto'
                    src={"/images/default_room_image.jpg"}
                    alt={"/images/default_room_image.jpg"}
                     layout='fill' />
                </div>
            </Carousel.Item>
        )
    }
  </Carousel>
}

export default RoomImageSlider