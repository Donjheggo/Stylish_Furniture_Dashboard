import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GetOrderById } from "@/lib/actions/orders";
import UpdateOrderForm from "@/components/orders/update-form";

export default async function UpdateOrder({
  params,
}: {
  params: { id: string };
}) {
  const item = await GetOrderById(params.id);

  return (
    <div className="p-4 lg:p-6">
      <Link href="/orders" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update</h1>
      <div className="mt-5">
        <UpdateOrderForm item={item} />
      </div>
    </div>
  );
}
