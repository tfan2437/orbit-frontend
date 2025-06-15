import type { Chats } from "@/types";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import IconButton from "@/components/common/buttons/IconButton";
import SearchCommand from "@/components/common/search/SearchCommand";

interface SearchDialogProps {
  chats: Chats;
}

const SearchDialog = ({ chats }: SearchDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <IconButton
          icon={<SearchIcon className="size-[22px]" />}
          onClick={() => {}}
          className="hover:bg-neutral-700"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[680px] p-0">
        <DialogHeader className="hidden">
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Search for a chat or create a new one.
          </DialogDescription>
        </DialogHeader>
        <SearchCommand setDialogOpen={setDialogOpen} chats={chats} />
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
