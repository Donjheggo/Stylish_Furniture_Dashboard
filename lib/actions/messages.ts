"use server";

import { createClient } from "../supabase/server";

export async function GetAllMessages(admin_id: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("messages")
      .select(`*, sender_id(email)`)
      .eq("receiver_id", admin_id);

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function GetAllUsers() {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("users")
      .select("*")
      .eq("role", "USER");

    if (error) {
      console.error(error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function GetUserMessageById(user_id: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("sender_id", user_id);

    if (error) {
      return [];
    }

    return data;
  } catch (error) {
    return [];
  }
}
