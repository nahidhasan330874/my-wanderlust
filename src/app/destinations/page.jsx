 import React from "react";

const DestinationPage = async () => {
  let destinations = [];

  try {
    const res = await fetch("http://localhost:5000/destination", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch destinations");
    }

    destinations = await res.json();
  } catch (error) {
    console.error("Destination fetch error:", error);
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#14A1BF]">
            Explore The World
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            All Destinations
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Discover amazing destinations, explore new places, and plan your
            next unforgettable journey.
          </p>
        </div>

        {/* Empty State */}
        {destinations.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#14A1BF]/10 text-3xl">
              🌍
            </div>

            <h2 className="text-2xl font-semibold text-slate-900">
              No destinations found
            </h2>

            <p className="mt-2 text-slate-500">
              Please make sure your backend server is running on port 5000.
            </p>
          </div>
        ) : (
          /* Destination Grid */
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination, index) => (
              <div
                key={destination._id || destination.id || index}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#14A1BF]/40 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  {destination.imageUrl ? (
                    <img
                      src={destination.imageUrl}
                      alt={destination.destinationName || "Destination"}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#14A1BF]/10">
                      <span className="text-6xl">🏞️</span>
                    </div>
                  )}

                  {/* Category */}
                  {destination.category && (
                    <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#14A1BF] shadow-md">
                      {destination.category}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5">

                  {/* Title */}
                  <div className="mb-3">
                    <h2 className="text-2xl font-bold text-slate-900 transition duration-300 group-hover:text-[#14A1BF]">
                      {destination.destinationName ||
                        "Unknown Destination"}
                    </h2>

                    {destination.country && (
                      <p className="mt-1 text-sm text-slate-500">
                        📍 {destination.country}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mb-5 line-clamp-2 text-sm leading-6 text-slate-500 ">
                    {destination.description ||
                      "No description available for this destination."}
                  </p>

                  {/* Info */}
                  <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">

                    {/* Price */}
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">
                        Price
                      </p>

                      <p className="mt-1 font-semibold text-[#14A1BF]">
                        ${destination.price ?? "N/A"}
                      </p>
                    </div>

                    {/* Duration */}
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">
                        Duration
                      </p>

                      <p className="mt-1 font-semibold text-slate-800">
                        {destination.duration
                          ? `${destination.duration} days`
                          : "N/A"}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">
                        Rating
                      </p>

                      <p className="mt-1 font-semibold text-yellow-500">
                        ⭐ {destination.rating ?? "N/A"}
                      </p>
                    </div>

                    {/* Category */}
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">
                        Category
                      </p>

                      <p className="mt-1 truncate font-semibold text-slate-800">
                        {destination.category || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    className="mt-5 w-full rounded-xl bg-[#14A1BF] px-4 py-3 font-semibold text-white transition duration-300 hover:bg-[#118da8] hover:shadow-lg"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationPage;