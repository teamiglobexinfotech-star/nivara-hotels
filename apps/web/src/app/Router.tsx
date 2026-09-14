import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { HomePage } from "@/pages/public/HomePage";
import { AboutPage } from "@/pages/public/AboutPage";
import { RoomsPage } from "@/pages/public/RoomsPage";
import { ContactPage } from "@/pages/public/ContactPage";
import { BookingModal } from "@/components/BookingModal";
import type { Room } from "@/types";
import type { BookingSearchDetails } from "@/components/BookingBar";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function Router() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);
  const [bookingDetails] = useState<BookingSearchDetails | undefined>(
    undefined
  );

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedRoom(undefined);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route
            index
            element={<HomePage onOpenBooking={handleCloseBooking} />}
          />
          <Route
            path="/about"
            element={<AboutPage onOpenBooking={handleCloseBooking} />}
          />
          <Route
            path="/rooms"
            element={<RoomsPage onOpenBooking={handleCloseBooking} />}
          />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialRoom={selectedRoom}
        initialRoomId={bookingDetails?.roomId || selectedRoom?.id}
        initialCheckIn={bookingDetails?.checkIn}
        initialCheckOut={bookingDetails?.checkOut}
        initialGuests={bookingDetails?.guests}
      />
    </BrowserRouter>
  );
}
