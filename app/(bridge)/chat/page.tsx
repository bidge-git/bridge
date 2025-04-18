"use client";

import * as React from "react";
import { Check, Plus, Send, Users2 } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {

} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

/* ------------------------------------------------------------------ */
/*  seed data + helpers                                               */
/* ------------------------------------------------------------------ */

const friends = [
  { id: "u1", name: "Sofia Davis",    email: "m@example.com", avatar: "/avatars/01.png" },
  { id: "u2", name: "Jackson Lee",    email: "p@example.com", avatar: "/avatars/02.png" },
  { id: "u3", name: "Isabella Nguyen",email: "i@example.com", avatar: "/avatars/03.png" },
] as const;

type Friend = typeof friends[number];

type Group = {
  id: string;
  name: string;
  members: Friend[];
  avatar?: string; // optional custom avatar
};

type ChatTarget =
  | { type: "friend"; friend: Friend }
  | { type: "group"; group: Group };

const firstNames = (arr: Friend[]) =>
  arr.map((f) => f.name.split(" ")[0]).join(", ");

/* ------------------------------------------------------------------ */
/*  ChatCard – right side                                             */
/* ------------------------------------------------------------------ */

function ChatCard({ target }: { target: ChatTarget }) {
  const title =
    target.type === "friend" ? target.friend.name : target.group.name;
  const avatar =
    target.type === "friend"
      ? target.friend.avatar
      : target.group.avatar ?? "/avatars/01.png";

  const [messages, setMessages] = React.useState<
    { role: "agent" | "user"; content: string }[]
  >([
    { role: "agent", content: "Hi – demo chat loaded 🎉" },
    { role: "user", content: "Hello there!" },
  ]);

  const [input, setInput] = React.useState("");

  /* rename group title */
  React.useEffect(() => {
    if (target.type === "group") {
      document.title = `${target.group.name} • Chat`; // optional side‑effect
    }
  }, [target]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>

        {/* editable title for groups */}
        {target.type === "group" ? (
          <EditableHeading
            initial={title}
            onChange={(newName) => (target.group.name = newName)}
          />
        ) : (
          <div>
            <p className="text-sm font-medium leading-none">{title}</p>
            <p className="text-xs text-muted-foreground">
              {target.friend.email}
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={cn(
                "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                m.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {m.content}
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim().length === 0) return;
            setMessages([...messages, { role: "user", content: input }]);
            setInput("");
          }}
          className="flex w-full items-center gap-2"
        >
          <Input
            placeholder="Type your message…"
            className="flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

function EditableHeading({
  initial,
  onChange,
}: {
  initial: string;
  onChange: (n: string) => void;
}) {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(initial);

  return editing ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setEditing(false);
        onChange(value.trim() || initial);
      }}
      className="flex items-center gap-2"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-7 w-40"
      />
      <Button type="submit" size="sm">
        Save
      </Button>
    </form>
  ) : (
    <Button
      variant="ghost"
      onClick={() => setEditing(true)}
      className="p-0 text-sm font-medium"
    >
      {value}
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/*  Left list card with tab switcher                                  */
/* ------------------------------------------------------------------ */

function LeftPane({
  activeTab,
  setActiveTab,
  selected,
  onSelect,
  groups,
  onNewGroupClick,
}: {
  activeTab: "friends" | "teams";
  setActiveTab: React.Dispatch<React.SetStateAction<"friends" | "teams">>;
  selected: ChatTarget | null;
  onSelect: (c: ChatTarget) => void;
  groups: Group[];
  onNewGroupClick: () => void;
}) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as never)}
          className="flex-1"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* + button only in Teams tab */}
        {activeTab === "teams" && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto rounded-full"
                  onClick={onNewGroupClick}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={8}>New Team</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-1 px-0">
        {activeTab === "friends"
          ? friends.map((f) => (
              <ListRow
                key={f.id}
                label={f.name}
                sub={f.email}
                avatar={f.avatar}
                active={
                  selected?.type === "friend" && selected.friend.id === f.id
                }
                onClick={() => onSelect({ type: "friend", friend: f })}
              />
            ))
          : groups.map((g) => (
              <ListRow
                key={g.id}
                label={g.name}
                sub={firstNames(g.members)}
                avatar={<Users2 className="h-4 w-4" />}
                active={
                  selected?.type === "group" && selected.group.id === g.id
                }
                onClick={() => onSelect({ type: "group", group: g })}
              />
            ))}
      </CardContent>
    </Card>
  );
}

function ListRow({
  label,
  sub,
  avatar,
  active,
  onClick,
}: {
  label: string;
  sub: string;
  avatar: string | React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between px-4 py-2 text-left hover:bg-muted/50",
        active && "bg-muted"
      )}
    >
      <div className="flex items-center space-x-4">
        {typeof avatar === "string" ? (
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar} />
            <AvatarFallback>{label[0]}</AvatarFallback>
          </Avatar>
        ) : (
          avatar
        )}
        <div>
          <p className="text-sm font-medium leading-none truncate">{label}</p>
          <p className="text-xs text-muted-foreground truncate">{sub}</p>
        </div>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  New‑group dialog                                                  */
/* ------------------------------------------------------------------ */

function GroupDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onCreate: (members: Friend[]) => void;
}) {
  const [selected, setSelected] = React.useState<Friend[]>([]);

  const toggle = (u: Friend) =>
    setSelected((prev) =>
      prev.includes(u) ? prev.filter((p) => p !== u) : [...prev, u]
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 outline-none">
        <DialogHeader className="px-4 pb-4 pt-5">
          <DialogTitle>New Team</DialogTitle>
          <DialogDescription>
            Select at least two friends to start a group chat.
          </DialogDescription>
        </DialogHeader>

        <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
          <CommandInput placeholder="Search friends…" />
          <CommandList>
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup className="p-2">
              {friends.map((u) => (
                <CommandItem
                  key={u.id}
                  className="flex items-center px-2"
                  onSelect={() => toggle(u)}
                >
                  <Avatar>
                    <AvatarImage src={u.avatar} />
                    <AvatarFallback>{u.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-2">
                    <p className="text-sm font-medium leading-none">
                      {u.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  {selected.includes(u) && (
                    <Check className="ml-auto h-5 w-5 text-primary" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>

        <DialogFooter className="flex items-center border-t p-4">
          <Button
            disabled={selected.length < 2}
            onClick={() => {
              onCreate(selected);
              setSelected([]);
              onOpenChange(false);
            }}
          >
            Create group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/*  Page wrapper                                                      */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [activeTab, setActiveTab] = React.useState<"friends" | "teams">(
    "friends"
  );
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [showGroupDlg, setShowGroupDlg] = React.useState(false);
  const [selected, setSelected] = React.useState<ChatTarget | null>(null);

  /* create group handler */
  const createGroup = (members: Friend[]) => {
    const id = `g-${Date.now()}`;
    const newGroup: Group = {
      id,
      members,
      name: firstNames(members),
    };
    setGroups((prev) => [...prev, newGroup]);
    setActiveTab("teams");
    setSelected({ type: "group", group: newGroup });
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />

        <div className="flex flex-col md:flex-row h-[calc(100vh_-_var(--header-height))] gap-4 p-4">
          <div className="md:w-72 w-full">
            <LeftPane
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              selected={selected}
              onSelect={setSelected}
              groups={groups}
              onNewGroupClick={() => setShowGroupDlg(true)}
            />
          </div>

          <div className="flex-1 min-h-0">
            {selected ? (
              <ChatCard
                key={
                  selected.type === "friend"
                    ? selected.friend.id
                    : selected.group.id
                }
                target={selected}
              />
            ) : (
              <div className="flex h-full items-center justify-center border rounded-md">
                <p className="text-lg text-muted-foreground">
                  Click on a chat to continue
                </p>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>

      {/* new group dialog */}
      <GroupDialog
        open={showGroupDlg}
        onOpenChange={setShowGroupDlg}
        onCreate={createGroup}
      />
    </SidebarProvider>
  );
}