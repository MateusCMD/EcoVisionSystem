import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { User } from "@shared/schema";

interface RankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  rankings: User[];
}

export default function RankingModal({ isOpen, onClose, rankings }: RankingModalProps) {
  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return {
          bg: "bg-eco-green-50",
          badge: "bg-eco-green-500",
        };
      case 2:
        return {
          bg: "bg-gray-50",
          badge: "bg-gray-400",
        };
      case 3:
        return {
          bg: "bg-orange-50",
          badge: "bg-orange-400",
        };
      default:
        return {
          bg: "bg-gray-25",
          badge: "bg-gray-300",
        };
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-8 bg-white rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Ranking</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            data-testid="button-close-ranking"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="space-y-3" data-testid="ranking-list">
          {rankings.slice(0, 10).map((user, index) => {
            const position = index + 1;
            const colors = getPositionColor(position);
            
            return (
              <div
                key={user.id}
                className={`flex items-center justify-between p-3 ${colors.bg} rounded-xl`}
                data-testid={`ranking-item-${position}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${colors.badge} text-white rounded-full flex items-center justify-center text-sm font-bold`}>
                    {position}
                  </div>
                  <span className="font-medium text-gray-800" data-testid={`ranking-name-${position}`}>
                    {user.name}
                  </span>
                </div>
                <span className="font-bold text-eco-green-600" data-testid={`ranking-credits-${position}`}>
                  {user.totalCredits} tokens
                </span>
              </div>
            );
          })}
          
          {rankings.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p>Nenhum usuário encontrado no ranking ainda.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
