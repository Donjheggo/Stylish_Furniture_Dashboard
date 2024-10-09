import DashboardCard from "@/components/dashboard/dashboard-card";
import { Droplets, ScrollText, HandCoins } from "lucide-react";
// import { GetTotalClients } from "@/lib/actions/clients";
// import { GetAllUpaidBills, GetAllPaidBills } from "@/lib/actions/bills";
// import { GetTotalPayments } from "@/lib/actions/payments";
// import BillsTable from "@/components/dashboard/bills-table";
// import PaymentsTable from "@/components/dashboard/payments-table";

export default async function Dashboard() {
  // const [clients, unpaids, paids, payments] = await Promise.all([
  //   GetTotalClients(),
  //   GetAllUpaidBills(),
  //   GetAllPaidBills(),
  //   GetTotalPayments(),
  // ]);

  const cards = [
    {
      title: "Total Clients",
      number: 2,
      icon: <Droplets size={25} className="text-primary" />,
    },
    {
      title: "Total Paid Bills",
      number: 2,
      icon: <ScrollText size={25} className="text-primary" />,
    },
    {
      title: "Total Unpaid Bills",
      number: 2,
      icon: <ScrollText size={25} className="text-primary" />,
    },
    {
      title: "Total Payments",
      number: 3,
      icon: <HandCoins size={25} className="text-primary" />,
    },
  ];

  return (
    <div className="container mx-auto max-w-screen-2xl p-4 lg:p-6">
      <h1 className="text-center text-2xl">Dashboard</h1>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-4 mt-4">
        {cards.map((item, index) => (
          <DashboardCard key={index} item={item} />
        ))}
      </div>
      <div className="flex flex-1 flex-col lg:flex-row gap-4 mt-4">
        <div className="w-full">
          {/* <BillsTable searchQuery="" page={1} /> */}
        </div>
        <div className="w-full lg:w-[50%]">
          {/* <PaymentsTable searchQuery="" page={1} /> */}
        </div>
      </div>
    </div>
  );
}
