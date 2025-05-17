import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SearchCommand from "@/components/SearchCommand";
import { SearchIcon } from "lucide-react";
import IconButton from "@/components/button/IconButton";
import { useState } from "react";

const SearchDialog = () => {
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
        <SearchCommand setDialogOpen={setDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
