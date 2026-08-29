"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

import { Button, DateField, Label } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
 
import toast from "react-hot-toast";

const BookingCard = ({ destinations }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [departureDate, setDepartureData] = useState(null);

  const { price, rating, _id, destinationName, imageUrl, country } =
    destinations;

  const handleBooking = async () => {
    const bookingData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      destinationId: _id,
      destinationName,
      price,
      imageUrl,
      country,
      departureDate: new Date(departureDate),
    };
     
   const res = await fetch('http://localhost:5000/booking', {
    method: "POST",
    headers :{
      'content-type':'application/json'
    },
    body :JSON.stringify(bookingData)
   })

   const data = await res.json();
 
   toast.success("Your booked successfully!")

  };

  return (
    <div>
      {/* Price Header */}
      <div className="bg-[#14A1BF] p-6 text-white">
        <p className="text-sm text-white/80">Starting from</p>

        <div className="mt-1 flex items-end gap-2">
          <span className="text-4xl font-extrabold">${price ?? "N/A"}</span>

          <span className="mb-1 text-sm text-white/80">/ person</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-5">
          <span className="text-sm text-slate-500">Customer Rating</span>

          <span className="font-semibold flex gap-2 text-yellow-500">
            <FaStar /> {rating ?? "N/A"}
          </span>
        </div>

        {/* Departure */}
        <div className="flex items-center justify-between border-b border-slate-200 py-5">
          <DateField
            onChange={setDepartureData}
            className="w-[256px]"
            name="date"
          >
            <Label>Departure Date</Label>
            <DateField.Group>
              <DateField.Input>
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>
            </DateField.Group>
          </DateField>
        </div>
       <Button
          onClick={handleBooking}
          className="mt-6 w-full rounded-2xl bg-[#14A1BF] px-5 py-4 font-bold text-white transition duration-300 hover:bg-[#118da8] hover:shadow-lg"
        >
          Book This Trip →
         </Button>

        <p className="mt-4 text-center text-xs leading-5 text-slate-400">
          Secure your spot and start planning your next adventure.
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
