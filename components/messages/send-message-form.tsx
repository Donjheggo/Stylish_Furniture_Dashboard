import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SendHorizonal } from "lucide-react";

export default function SendMessageForm() {
  return (
    <Card className="rounded-none border-t border-0">
      <CardContent className="p-3">
        <form className="flex gap-2">
          <Input name="message" placeholder="Type your message..." />
          <Button type="submit" size="icon">
            <SendHorizonal className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
