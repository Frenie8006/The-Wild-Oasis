import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    // mutationFn: (newSetting) => updateSettingApi(newSetting),
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] }); // Refetch the settings after update
      toast.success("Setting successfully edited");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateSetting };
}
