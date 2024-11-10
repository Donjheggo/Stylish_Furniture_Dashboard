"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetReviews(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("reviews")
      .select(`*, user_id(*), product_id(*)`)
      .order("created_at", { ascending: true })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("product_id.name", `%${searchQuery}%`)
      : await query;

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

export async function GetReviewsById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("reviews")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return false;
    }
    return data;
  } catch (error) {
    return false;
  }
}

export async function DeleteReview(id: string) {
  try {
    const supabase = createClient();

    const { error } = await supabase.from("reviews").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/reviews");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalReviews() {
  try {
    const supabase = createClient();
    const { error, data } = await supabase.from("reviews").select("*");

    if (error) {
      console.error(error);
      return 0;
    }
    return data.length || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
