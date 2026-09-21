import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import type { BookingSearchDetails } from "@/components/BookingBar";
import { BookingModal } from "@/components/BookingModal";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { ProtectLayout } from "@/components/layout/ProtectLayout";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { LoginPage } from "@/pages/auth/LoginPage";
import { SignupPage } from "@/pages/auth/SignupPage";
import { DashboardPage } from "@/pages/dashboard";
import { AboutPage } from "@/pages/public/AboutPage";
import { ContactPage } from "@/pages/public/ContactPage";
import { HomePage } from "@/pages/public/HomePage";
import { RoomsPage } from "@/pages/public/RoomsPage";
import { RoomsPage as DRoomsPage } from "@/pages/room";
// import { BookingsPage } from "@/pages/shared/BookingsPage";
import { CustomersPage } from "@/pages/shared/CustomersPage";
import { StaffPage } from "@/pages/shared/StaffPage";
import type { Room } from "@/types";

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
        <Route path="dashboard" element={<ProtectLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="rooms" element={<DRoomsPage />} />
          {/* <Route path="bookings" element={<BookingsPage />} /> */}
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
