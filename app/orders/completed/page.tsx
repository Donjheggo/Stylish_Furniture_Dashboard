import SearchBar from "@/components/search-bar";
import CompletedOrdersTable from "@/components/orders/completed-orders-table";

export default function CompletedOrders({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="p-4 lg:p-6 container max-w-screen-2xl mx-auto">
      <h1 className="text-center text-2xl">Completed Orders</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <SearchBar />
        </div>
        <div className="mt-2">
          <CompletedOrdersTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
