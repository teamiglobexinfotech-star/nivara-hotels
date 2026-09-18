import { useMemo, useState, type ReactNode } from "react";
import { BookingSummaryDialog } from "@/features/booking/components/BookingSummaryDialog";
import { CustomerSearchSheet } from "@/features/booking/components/CustomerSearchSheet";
import { GuestInformationDialog } from "@/features/booking/components/GuestInformationDialog";
import { StayDetailsDialog } from "@/features/booking/components/StayDetailsDialog";
import { customersApiResponse } from "@/mock/customer.mock";
import { availableRooms } from "@/mock/room.mock";
import type { AvailableRoom } from "@/types/room.types";
import type { Customer } from "@/types/customer.types";

export function NewBookingSheet({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [customerSheetOpen, setCustomerSheetOpen] = useState(false);
  const [stayOpen, setStayOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [roomType, setRoomType] = useState("");
  const [searchResults, setSearchResults] = useState<AvailableRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<AvailableRoom | null>(null);
  const [guestFormOpen, setGuestFormOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [initialPayment, setInitialPayment] = useState("5000");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [additionalGuests, setAdditionalGuests] = useState<
    Array<{
      id: number;
      name: string;
      age: string;
      gender: string;
      idProof: string;
    }>
  >([]);

  const filteredCustomers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return customersApiResponse.items;

    return customersApiResponse.items.filter((customer) => {
      const haystack = [customer.name, customer.phone, customer.customerId]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [searchTerm]);

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerSheetOpen(false);
    setStayOpen(true);
  };

  const handleSearchAvailableRooms = () => {
    const filteredRooms = availableRooms.filter((room) => {
      if (!roomType) return true;
      return room.roomTypeName === roomType;
    });

    setSearchResults(filteredRooms);
  };

  const handleSelectRoom = (room: AvailableRoom) => {
    setSelectedRoom(room);
    setStayOpen(false);
    setGuestFormOpen(true);
  };

  const handleSaveBooking = () => {
    setGuestFormOpen(false);
    setSummaryOpen(true);
  };

  const handleCreateBooking = () => {
    console.log("Creating booking", {
      selectedCustomer,
      selectedRoom,
      checkInDate,
      checkOutDate,
      roomType,
      initialPayment,
      paymentMethod,
      additionalGuests,
    });
  };

  const addAdditionalGuest = () => {
    setAdditionalGuests((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        age: "",
        gender: "",
        idProof: "",
      },
    ]);
  };

  const updateAdditionalGuest = (
    id: number,
    field: "name" | "age" | "gender" | "idProof",
    value: string
  ) => {
    setAdditionalGuests((prev) =>
      prev.map((guest) =>
        guest.id === id ? { ...guest, [field]: value } : guest
      )
    );
  };

  const roomCharge = selectedRoom?.nightlyRate ?? 0;
  const discount = 0;
  const tax = Math.round(roomCharge * 0.12);
  const total = roomCharge + tax - discount;
  const balance = Math.max(total - Number(initialPayment || 0), 0);

  return (
    <>
      <CustomerSearchSheet
        open={customerSheetOpen}
        onOpenChange={setCustomerSheetOpen}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        customers={filteredCustomers}
        selectedCustomer={selectedCustomer}
        onCustomerSelect={handleCustomerClick}
        trigger={children}
      />

      <StayDetailsDialog
        open={stayOpen}
        onOpenChange={(open) => {
          setStayOpen(open);
          if (!open) setSearchResults([]);
        }}
        selectedCustomer={selectedCustomer}
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        checkOutDate={checkOutDate}
        setCheckOutDate={setCheckOutDate}
        roomType={roomType}
        setRoomType={setRoomType}
        searchResults={searchResults}
        onSearchAvailableRooms={handleSearchAvailableRooms}
        onSelectRoom={handleSelectRoom}
        onCancel={() => {
          setStayOpen(false);
          setSearchResults([]);
        }}
      />

      <GuestInformationDialog
        open={guestFormOpen}
        onOpenChange={(open) => {
          setGuestFormOpen(open);
          if (!open) {
            setSelectedRoom(null);
            setAdditionalGuests([]);
          }
        }}
        selectedCustomer={selectedCustomer}
        selectedRoom={selectedRoom}
        additionalGuests={additionalGuests}
        onAddAdditionalGuest={addAdditionalGuest}
        onUpdateAdditionalGuest={updateAdditionalGuest}
        onSaveBooking={handleSaveBooking}
        onCancel={() => {
          setGuestFormOpen(false);
          setSelectedRoom(null);
          setAdditionalGuests([]);
        }}
      />

      <BookingSummaryDialog
        open={summaryOpen}
        onOpenChange={(open) => {
          setSummaryOpen(open);
          if (!open) {
            setGuestFormOpen(true);
          }
        }}
        selectedRoom={selectedRoom}
        roomCharge={roomCharge}
        discount={discount}
        tax={tax}
        total={total}
        initialPayment={initialPayment}
        setInitialPayment={setInitialPayment}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        balance={balance}
        onCancel={() => {
          setSummaryOpen(false);
          setGuestFormOpen(true);
        }}
        onCreateBooking={handleCreateBooking}
      />
    </>
  );
}
