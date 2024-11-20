import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GetCompletedOrders,
  GetTotalCompletedOrders,
} from "@/lib/actions/orders";
import { TablePagination } from "./pagination";
import { Badge } from "../ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import UpdateButton from "./update-button";
import DeleteButton from "./delete-button";
import ItemsDialog from "./items-dialog";

export default async function CompletedOrdersTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalOrders, orders] = await Promise.all([
    GetTotalCompletedOrders(),
    GetCompletedOrders(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalOrders / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Completed Orders</CardTitle>
        <CardDescription>Manage orders role.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Items</TableHead>
              <TableHead className="table-cell">Email</TableHead>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">Contact no.</TableHead>
              <TableHead className="table-cell">Address</TableHead>
              <TableHead className="table-cell">Payment Method</TableHead>
              <TableHead className="table-cell">Gcash Ref no.</TableHead>
              <TableHead className="table-cell">Delivery Status</TableHead>
              <TableHead className="table-cell">Delivery Schedule</TableHead>
              <TableHead className="table-cell">Total Price</TableHead>
              <TableHead className="table-cell">Total Shipping</TableHead>
              <TableHead className="table-cell">Total Payable</TableHead>
              <TableHead className="table-cell">Created At</TableHead>

              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-normal">
                  <ItemsDialog order_id={item.id} />
                </TableCell>
                <TableCell className="font-normal">
                  {item.user_id.email}
                </TableCell>
                <TableCell className="font-normal">{item.name}</TableCell>
                <TableCell className="font-normal">
                  {item.contact_number}
                </TableCell>
                <TableCell className="font-normal">{item.address}</TableCell>
                <TableCell className="font-normal">
                  {item.payment_method}
                </TableCell>
                <TableCell className="font-normal">
                  {item.gcash_reference_number}
                </TableCell>
                <TableCell className="font-normal">
                  <Badge>{item.delivery_status}</Badge>
                </TableCell>
                <TableCell className="font-normal">
                  {item.delivery_schedule &&
                    new Date(item.delivery_schedule).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-normal">
                  ₱{item.total_price}
                </TableCell>
                <TableCell className="font-normal text-center">
                  ₱{item.total_shipping_fee}
                </TableCell>
                <TableCell className="font-semibold text-lg">
                  ₱{item.total_payable}
                </TableCell>

                <TableCell className="font-normal">
                  {new Date(item.created_at).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <UpdateButton id={item.id} />
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <DeleteButton id={item.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{(page - 1) * items_per_page + 1}</strong>-
          <strong>{Math.min(page * items_per_page, totalOrders)}</strong> of{" "}
          <strong>{totalOrders}</strong> orders
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
