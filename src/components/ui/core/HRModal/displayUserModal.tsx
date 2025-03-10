"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, Mail, Phone, Shield, Calendar, Lock } from "lucide-react";
import { userType } from "@/types/types";
import { Badge } from "../../badge";
import Image from "next/image";

interface UserDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: userType;
}

const DisplayUserModal = ({ isOpen, onClose, user }: UserDataModalProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-semibold">
            User Details of {user.user_name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <Image
                height={100}
                width={100}
                src={user.profile_image || "https://via.placeholder.com/150"}
                alt="Profile Image"
                className="object-cover bg-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-content-between">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-semibold">{user.user_name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-purple-500" />
              <div>
                <p className="font-semibold">{user.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-semibold">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-orange-500" />
              <div>
                <p className="font-semibold">{user.phone_num}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-pink-500" />
              <div>
                <p className="text-sm text-gray-500">Member Since:</p>
                <p className="font-semibold">
                  {new Date(user.createdAt!).toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-red-500" />
              <div>
                <div className="flex gap-2">
                  <Badge variant={user.isBlocked ? "destructive" : "default"}>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DisplayUserModal;
