
import { Button } from "@/components/ui/button";
import { Avatar, AvatarInitials } from "@/components/ui/avatar";
import { Pill, LogOut } from "lucide-react";

interface HeaderProps {
  user: string | null;
  onLogout: () => void;
}

export const Header = ({ user, onLogout }: HeaderProps) => {
  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Pill className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Med Guardian Buddy</h1>
            <p className="text-sm text-gray-500">Your medication companion</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarInitials>{user ? getInitials(user) : "U"}</AvatarInitials>
            </Avatar>
            <span className="text-sm text-gray-700">{user}</span>
          </div>
          
          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
