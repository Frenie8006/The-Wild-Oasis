import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabinPrice } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabinPrice() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: updateCabinPrice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin successfully edited");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateCabin };
}
