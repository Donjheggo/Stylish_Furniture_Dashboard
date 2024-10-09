import { Card, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { GetUserMessageById } from "@/lib/actions/messages";

export default async function UserMessages({ user_id }: { user_id: string }) {
  if (!user_id) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>No user selected. Please select a conversation.</p>
      </div>
    );
  }

  const messages = await GetUserMessageById(user_id);

  return (
    <>
      {/* Chat header */}
      <Card className="rounded-none border-b border-t-0 border-l-0 border-r-0">
        <CardHeader className="py-3">
          <CardTitle className="text-lg">Email here</CardTitle>
        </CardHeader>
      </Card>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        {messages?.map((item, index) => (
          <div
            key={index}
            className={`flex ${
              item.sender_id === user_id ? "justify-start" : "justify-end"
            } mb-4`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                item.receiver_id === user_id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p>{item.message}</p>
              <p className="text-xs mt-1 opacity-70">{item.created_at}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </>
  );
}
