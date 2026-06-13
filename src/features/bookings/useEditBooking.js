import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useEditBooking() {
  const queryClient = useQueryClient();

  const { mutate: updateBooking, isLoading: isEditing } = useMutation({
    mutationFn: ({ newBookingData, id }) =>
      updateBookingApi(newBookingData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateBooking, isEditing };
}
