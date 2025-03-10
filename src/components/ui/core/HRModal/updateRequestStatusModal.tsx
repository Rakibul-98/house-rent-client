import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type DeleteModalPropsType = {
  selectedId: string | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: (param: string) => void;
};

const UpdateRequestStatusModal: React.FC<DeleteModalPropsType> = ({
  selectedId,
  isOpen,
  onOpenChange,
  onConfirm,
}) => {
  const [status, setStatus] = useState<string>("");

  const handleConfirm = () => {
    if (!status) {
      toast.error("Please select a status.");
      return;
    }
    onConfirm(status);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold">
            Update request status for {selectedId}
          </DialogTitle>
          <DialogDescription className="my-3">
            Select the new status for this request.
          </DialogDescription>
        </DialogHeader>

          <Select onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="w-full" id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

        <DialogFooter>
          <Button
            className="cursor-pointer"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRequestStatusModal;