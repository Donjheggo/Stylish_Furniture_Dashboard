import CreatePaymentDialog from "@/components/payment/create-dialog";
import { GetPaymentMethod } from "@/lib/actions/payment";
import UpdateButton from "@/components/payment/update-button";

export default async function Payment() {
  const item = await GetPaymentMethod();

  return (
    <div className="p-4 lg:p-6 container max-w-screen-md mx-auto">
      <h1 className="text-center text-2xl">GCASH Number Payment</h1>
      <div className="mt-5 flex justify-center">
        {item ? (
          <div className="border rounded-md p-4 flex items-center gap-4 ">
            <h1 className="text-2xl ">{item.number}</h1>
            <UpdateButton id={item.id} />
          </div>
        ) : (
          <CreatePaymentDialog />
        )}
      </div>
    </div>
  );
}
