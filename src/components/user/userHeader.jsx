import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function UserProfileHeader({ user }) {
  if (!user) return null;

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300 shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-50"></div>
              <Avatar className="w-20 h-20 border-2 border-gray-700 relative">
                {user.image ? (
                  <AvatarImage src={user.image} alt={user.name} />
                ) : (
                  <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>

            {/* User Info */}
            <div className="ml-4 flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>

          {/* Plan Badge */}
          <Badge className="mr-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-blue-500/30 hover:from-blue-500/30 hover:to-purple-500/30 transition-all px-4 py-2 text-sm font-semibold">
            <Sparkles className="w-4 h-4 mr-2" />
            FREE PLAN
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
