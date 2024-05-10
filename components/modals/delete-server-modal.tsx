"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const DeleteServerModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = data;
  const [loading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);
      router.push("/");
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription>
            Are you sue you want to do this?
            <br />
            <span className=" font-semibold text-indigo-500">
              {server?.name}
            </span>
            &nbsp;will be permanently deleted
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={loading}
              onClick={onClose}
              variant={"secondary"}
              size={"sm"}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={onClick}
              variant={"primary"}
              size={"sm"}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
