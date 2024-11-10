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
import { GetReviews, GetTotalReviews } from "@/lib/actions/reviews";
import { TablePagination } from "./pagination";
import DeleteButton from "./delete-button";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export default async function ReviewsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalReviews, reviews] = await Promise.all([
    GetTotalReviews(),
    GetReviews(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalReviews / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
        <CardDescription>Manage reviews.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead className="table-cell">Product</TableHead>
              <TableHead className="table-cell">User</TableHead>
              <TableHead className="table-cell">Message</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={item.product_id.image}
                    width="64"
                  />
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.product_id.name}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.user_id.email}</p>
                </TableCell>

                <TableCell>
                  <p className="font-normal">{item.message}</p>
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
          <strong>{(page - 1) * items_per_page + 1}</strong>-
          <strong>{Math.min(page * items_per_page, totalReviews)}</strong> of{" "}
          <strong>{totalReviews}</strong>
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
