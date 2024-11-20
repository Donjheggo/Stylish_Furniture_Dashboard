import {
  ShoppingCart,
  Truck,
  Loader,
  HandCoins,
  MessageSquareMore,
  Users,
  NotepadText,
  Armchair,
} from "lucide-react";
import {
  GetTotalPendingOrders,
  GetTotalDeliveryOrders,
  GetTotalCompletedOrders,
  GetTotalOrders,
  GetSales,
} from "@/lib/actions/orders";
import DashboardCard from "@/components/dashboard/dashboard-card";
import { GetTotalUsers } from "@/lib/actions/users";
import { GetTotalReviews } from "@/lib/actions/reviews";
import { GetTotalProducts } from "@/lib/actions/products";
import { GetTotalMessages } from "@/lib/actions/messages";

export default async function Dashboard() {
  const [
    orders,
    pending,
    delivery,
    completed,
    products,
    users,
    reviews,
    messages,
    sales,
  ] = await Promise.all([
    GetTotalOrders(),
    GetTotalPendingOrders(),
    GetTotalDeliveryOrders(),
    GetTotalCompletedOrders(),
    GetTotalProducts(),
    GetTotalUsers(),
    GetTotalReviews(),
    GetTotalMessages(),
    GetSales(),
  ]);

  const cards = [
    {
      href: "/orders",
      title: "Total Orders",
      number: orders,
      icon: <ShoppingCart size={25} className="text-primary" />,
    },
    {
      href: "/orders/pending",
      title: "Pending Orders",
      number: pending,
      icon: <Loader size={25} className="text-primary" />,
    },
    {
      href: "/orders/out-for-delivery",
      title: "Out For Delivery Orders",
      number: delivery,
      icon: <Truck size={25} className="text-primary" />,
    },
    {
      href: "/orders/completed",
      title: "Total Completed Orders",
      number: completed,
      icon: <ShoppingCart size={25} className="text-primary" />,
    },
    {
      href: "/products",
      title: "Total Products",
      number: products,
      icon: <Armchair size={25} className="text-primary" />,
    },
    {
      href: "/reviews",
      title: "Total Reviews",
      number: reviews,
      icon: <NotepadText size={25} className="text-primary" />,
    },
    {
      href: "/users",
      title: "Total Users",
      number: users,
      icon: <Users size={25} className="text-primary" />,
    },
    {
      href: "/messages",
      title: "Total Messages",
      number: messages,
      icon: <MessageSquareMore size={25} className="text-primary" />,
    },
    {
      href: "#",
      title: "24 hours sales",
      number: sales.last24Hours,
      icon: <HandCoins size={25} className="text-primary" />,
    },
    {
      href: "#",
      title: "Last 7 days sales",
      number: sales.last7Days,
      icon: <HandCoins size={25} className="text-primary" />,
    },
    {
      href: "#",
      title: "Last 30 days sales",
      number: sales.last30Days,
      icon: <HandCoins size={25} className="text-primary" />,
    },
    {
      href: "",
      title: "All time  sales",
      number: sales.allTime,
      icon: <HandCoins size={25} className="text-primary" />,
    },
  ];

  return (
    <div className="container mx-auto max-w-screen-2xl p-4 lg:p-6">
      <h1 className="text-center text-2xl">Dashboard</h1>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-4 mt-10">
        {cards.map((item, index) => (
          <DashboardCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
