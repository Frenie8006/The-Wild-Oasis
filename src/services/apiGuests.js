import supabase from "./supabase";

export async function getGuests() {
  const { data, error } = await supabase.from("guests").select("id, fullName");

  if (error) throw new Error(error.message);

  return data;
}

export async function createGuest(newGuest) {
  const { data, error } = await supabase
    .from("guests")
    .insert([newGuest])
    .select();

  if (error) throw new Error(error.message);

  return data;
}
