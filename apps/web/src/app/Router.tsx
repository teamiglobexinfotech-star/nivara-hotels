import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Room } from "@/types";

import type { BookingSearchDetails } from "@/components/BookingBar";
import { BookingModal } from "@/components/BookingModal";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { ProtectLayout } from "@/components/layout/ProtectLayout";

import { HomePage } from "@/pages/public/HomePage";
import { AboutPage } from "@/pages/public/AboutPage";
import { RoomsPage } from "@/pages/public/RoomsPage";
import { ContactPage } from "@/pages/public/ContactPage";
import { SignupPage } from "@/pages/auth/SignupPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { Dashboard } from "@/pages/dashboard";

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
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
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
