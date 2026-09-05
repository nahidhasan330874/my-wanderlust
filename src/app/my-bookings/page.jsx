 import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaEye,
  FaTrashAlt,
} from "react-icons/fa";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  console.log(user)
  const res = await fetch(
    `http://localhost:5000/booking/${user?.id}`,
    {
      cache: "no-store",
    }
  );

  const bookings = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and view your upcoming travel plans
        </p>
      </div>

      {/* Booking Cards */}
      <div className="space-y-5">
        {bookings?.map((booking) => (
          <div
            key={booking._id}
            className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col lg:flex-row items-center gap-5">
              {/* Image */}
              <div className="relative w-full lg:w-72 h-44 rounded-xl overflow-hidden">
                <Image
                  src={booking.imageUrl}
                  alt={booking.destinationName}
                  height={200}
                  width={300}
                  className="object-cover"
                />

              </div>

              {/* Info */}
              <div className="flex-1 w-full">
                <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs mb-2">
                  <FaCheckCircle className="text-[11px]" />
                  Confirmed
                </div>

                <h2 className="text-2xl font-bold text-gray-800">
                  {booking.destinationName}
                </h2>

                <div className="mt-3 space-y-2 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt />
                    Departure: {booking.departureDate}
                  </p>

                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    Booking ID: {booking._id.slice(0, 6)}
                  </p>
                </div>

                <h3 className="text-3xl font-bold text-sky-500 mt-3">
                  ${booking.price}
                </h3>
              </div>

              {/* Buttons */}
              <div className="flex ml-50 lg:flex-col gap-3 w-full lg:w-auto">
                <button className="flex-1 flex items-center justify-center gap-2 border border-red-400 text-red-500 px-5 py-2 rounded-lg hover:bg-red-50 transition">
                  <FaTrashAlt />
                  Cancel
                </button>

                <button className="flex-1 flex items-center justify-center gap-2 bg-sky-500 text-white px-5 py-2 rounded-lg hover:bg-sky-600 transition">
                  <FaEye />
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {bookings?.length === 0 && (
        <div className=" rounded-2xl p-50 text-center">
          <h2 className="text-2xl font-semibold">No Bookings Yet</h2>
          <p className="text-gray-500 mt-2">
            Your booked destinations will appear here.
          </p>
        </div>
      )}
    </div>
  );
};


export default MyBookingsPage;