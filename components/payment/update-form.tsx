"use client";

import { useState } from "react";
import { UpdatePayment } from "@/lib/actions/payment";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tables } from "@/database.types";
import { Input } from "@/components/ui/input";

export default function UpdatePaymentForm({ item }: { item: GcashNumberT }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);
    try {
      const { error } = await UpdatePayment(formData);
      if (error) {
        toast.error(error.toString());
      }
      router.push("/payment");
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
          <Input
            name="number"
            id="number"
            type="number"
            placeholder=""
            className="col-span-4"
            defaultValue={item.number}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

export type GcashNumberT = Tables<"gcash_number_payment">;
