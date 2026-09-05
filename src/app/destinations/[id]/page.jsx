import BookingCard from "@/components/BookingCard";
import { DeleteForm } from "@/components/DeleteFrom";
import { EditForm } from "@/components/EditFrom";
import Image from "next/image";

import Link from "next/link";
import { FaStar } from "react-icons/fa";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/destinations/${id}`);

  const destinations = await res.json();
  const {
    destinationName,
    imageUrl,
    description,
    duration,
    country,
    category,
    departureDate,
  } = destinations;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Image */}
      <section className="relative h-[420px] overflow-hidden md:h-[520px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={destinationName || "Destination"}
            fill
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#14A1BF]/10">
            <span className="text-8xl">🏞️</span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Back Button */}
        <div className="absolute left-4 right-4 top-3 flex items-center justify-between gap-3 md:left-10 md:right-10">
          {/* Back Button - Left */}
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-lg backdrop-blur transition hover:bg-white"
          >
            ← Back
          </Link>

          {/* Edit + Cancel - Right */}
          <div className="flex ju gap-2  md:gap-3">
            {/* Edit Button */}
            <div className="inline-flex  rounded-full border-2 border-[#14A1BF] bg-white/95   text-sm font-bold text-[#14A1BF] shadow-lg backdrop-blur transition duration-300 hover:bg-[#14A1BF] hover:text-white hover:shadow-xl md:px-1">
              <EditForm destination={destinations} />
            </div>
            <DeleteForm destination={destinations} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* About */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-5">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#14A1BF]">
                  Explore
                </p>

                <h2 className="mt-1 text-3xl font-bold text-slate-900">
                  About This Destination
                </h2>
              </div>

              <p className="text-base leading-8 text-slate-600">
                {description ||
                  "No description available for this destination."}
              </p>
            </div>

            {/* Destination Information */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Destination Information
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Country */}
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-400">Country</p>

                  <p className="mt-2 text-lg font-semibold text-slate-800">
                    {country || "N/A"}
                  </p>
                </div>

                {/* Category */}
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-400">Category</p>

                  <p className="mt-2 text-lg font-semibold text-slate-800">
                    {category || "N/A"}
                  </p>
                </div>

                {/* Duration */}
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-400">Duration</p>

                  <p className="mt-2 text-lg font-semibold text-slate-800">
                    {duration ? `${duration} days` : "N/A"}
                  </p>
                </div>

                {/* Departure */}
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-400">Departure Date</p>

                  <p className="mt-2 text-lg font-semibold text-slate-800">
                    {departureDate || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Why Visit */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Why Visit {destinationName}?
              </h2>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-[#14A1BF]/10 p-5">
                  <h3 className="font-bold text-slate-900">Beautiful Views</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Enjoy amazing natural scenery and unforgettable views.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#14A1BF]/10 p-5">
                  <h3 className="font-bold text-slate-900">Great Experience</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Create memorable moments with an exciting travel experience.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#14A1BF]/10 p-5">
                  <h3 className="font-bold text-slate-900">Memorable Trip</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Discover new places and make memories that last forever.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <BookingCard destinations={destinations} />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-5 py-14 text-center md:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#14A1BF]">
            Start Your Journey
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Ready to Explore {destinationName}?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Pack your bags, choose your destination and get ready for an
            unforgettable adventure.
          </p>

          <Link
            href="/destinations"
            className="mt-7 inline-flex rounded-xl bg-[#14A1BF] px-7 py-3.5 font-semibold text-white transition hover:bg-[#118da8] hover:shadow-lg"
          >
            Explore More Destinations
          </Link>
        </div>
      </section>
    </main>
  );
};

export default DestinationDetailsPage;
