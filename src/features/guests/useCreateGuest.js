import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createGuest as createGuestApi } from "../../services/apiGuests";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { mutate: createGuest, isLoading: isCreating } = useMutation({
    // mutationFn: (newCabin) => createCabin(newCabin),
    mutationFn: createGuestApi,
    onSuccess: () => {
      toast.success("New guest successfully created");
      queryClient.invalidateQueries({ queryKey: ["guest"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createGuest };
}
