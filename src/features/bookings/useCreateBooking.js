import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking as createBookingApi } from "../../services/apiBookings";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isLoading: isCreating } = useMutation({
    // mutationFn: (bookingData) => createBooking(bookingData),
    mutationFn: createBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking created successfully");
    },
  });

  return { createBooking, isCreating };
}
