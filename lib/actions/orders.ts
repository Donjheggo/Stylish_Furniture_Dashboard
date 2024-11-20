"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function GetOrders(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("orders")
      .select(`*, user_id(email)`)
      .order("created_at", { ascending: false })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("name", `%${searchQuery}%`)
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

export async function GetOrderById(order_id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .single();

    if (error) {
      return false;
    }
    return data;
  } catch (error) {
    return false;
  }
}

export async function UpdateOrder(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("orders")
      .update({
        delivery_status: formData.get("delivery_status"),
        delivery_schedule: formData.get("delivery_schedule") || null,
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/orders");

    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteOrder(order_id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("orders").delete().eq("id", order_id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/orders");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalOrders() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

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

export async function GetItemsByOrderId(order_id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("order_items")
      .select(`*, product_id(*)`)
      .eq("order_id", order_id);

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

export async function GetPendingOrders(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("orders")
      .select(`*, user_id(email)`)
      .eq("delivery_status", "PENDING")
      .order("created_at", { ascending: false })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("name", `%${searchQuery}%`)
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

export async function GetTotalPendingOrders() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("delivery_status", "PENDING");

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

export async function GetDeliveryOrders(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("orders")
      .select(`*, user_id(email)`)
      .eq("delivery_status", "OUT FOR DELIVERY")
      .order("created_at", { ascending: false })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("name", `%${searchQuery}%`)
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

export async function GetTotalDeliveryOrders() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("delivery_status", "OUT FOR DELIVERY");

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

export async function GetCompletedOrders(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("orders")
      .select(`*, user_id(email)`)
      .eq("delivery_status", "COMPLETED")
      .order("created_at", { ascending: false })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("name", `%${searchQuery}%`)
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

export async function GetTotalCompletedOrders() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("delivery_status", "COMPLETED");

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

export async function GetSales() {
  try {
    const supabase = createClient();
    const now = new Date();

    // Calculate time thresholds
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Get all completed orders
    const { data, error } = await supabase
      .from("orders")
      .select("created_at, total_payable")
      .eq("delivery_status", "COMPLETED");

    if (error) {
      console.error(error);
      return {
        last24Hours: 0,
        last7Days: 0,
        last30Days: 0,
        allTime: 0,
      };
    }

    // Process the data
    const result = data.reduce(
      (acc, order) => {
        const orderDate = new Date(order.created_at);
        const amount = Number(order.total_payable) || 0;

        // Add to all time total
        acc.allTime += amount;

        // Check other time periods
        if (orderDate >= last24Hours) {
          acc.last24Hours += amount;
        }
        if (orderDate >= last7Days) {
          acc.last7Days += amount;
        }
        if (orderDate >= last30Days) {
          acc.last30Days += amount;
        }

        return acc;
      },
      {
        last24Hours: 0,
        last7Days: 0,
        last30Days: 0,
        allTime: 0,
      }
    );

    return result;
  } catch (error) {
    console.error(error);
    return {
      last24Hours: 0,
      last7Days: 0,
      last30Days: 0,
      allTime: 0,
    };
  }
}
