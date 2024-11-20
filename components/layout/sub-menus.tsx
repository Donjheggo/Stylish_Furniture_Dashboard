import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

type SubmenuT = {
  name: string;
  href: string;
  icon: React.ReactNode;
};
type LinksT = {
  name: string;
  href: string;
  icon: React.ReactNode;
  children?: SubmenuT[];
};

export default function Submenus({ item }: { item: LinksT }) {
  return (
    <Accordion type="single" collapsible className="">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Link
            href={item.href}
            className="flex items-center gap-2 hover:bg-muted rounded-md p-2 w-full"
          >
            {item.icon}
            {item.name}
          </Link>
        </AccordionTrigger>
        {item.children?.map((item, index) => (
          <AccordionContent key={index} className="pl-5">
            <Link
              href={item.href}
              className="flex items-center gap-2 hover:bg-muted rounded-md p-2 w-full"
            >
              {item.icon}
              <h1>{item.name}</h1>
            </Link>
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  );
}
