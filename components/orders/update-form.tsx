"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { UpdateOrder } from "@/lib/actions/orders";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tables } from "@/database.types";
import { Input } from "../ui/input";

export default function UpdateOrderForm({ item }: { item: OrdersT }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);
    try {
      const { error } = await UpdateOrder(formData);
      if (error) {
        toast.error(error.toString());
      }
      router.push("/orders");
    } catch (error) {
      toast.error("There was an unexpected error updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mt-5 container max-w-screen-sm mx-auto">
        <div className="grid gap-2">
          <input
            name="id"
            id="id"
            type="text"
            placeholder=""
            required
            defaultValue={item.id}
            hidden
          />
          <Label htmlFor="schedule">Delivery Status</Label>
          <Select name="delivery_status" defaultValue={item.delivery_status}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="OUT FOR DELIVERY">
                  Out for Delivery
                </SelectItem>
                <SelectItem value="COMPLETED">COMPLETED</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <input
            name="id"
            id="id"
            type="text"
            placeholder=""
            required
            defaultValue={item.id}
            hidden
          />
          <Label htmlFor="delivery_schedule">Delivery Schedule</Label>
          <Input
            name="delivery_schedule"
            id="delivery_schedule"
            type="date"
            placeholder=""
            defaultValue={
              item.delivery_schedule
                ? new Date(item.delivery_schedule).toISOString().slice(0, 10)
                : ""
            }
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

export type OrdersT = Tables<"orders">;
