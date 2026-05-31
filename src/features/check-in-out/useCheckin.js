import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isLoading: isChecking } = useMutation({
    mutationFn: ({ bookingId, breakfast = {} }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully check in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { checkIn, isChecking };
}

export default useCheckin;
