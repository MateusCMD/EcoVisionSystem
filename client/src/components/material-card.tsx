import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface MaterialCardProps {
  material: {
    id: string;
    name: string;
    tokens: number;
    icon: string;
    color: string;
  };
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function MaterialCard({ material, quantity, onIncrement, onDecrement }: MaterialCardProps) {
  const colorClasses = {
    orange: "bg-orange-100 text-orange-600",
    blue: "bg-blue-100 text-blue-600", 
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-eco-green-100 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[material.color as keyof typeof colorClasses]}`}>
            <i className={`${material.icon} text-xl`}></i>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{material.name}</h3>
            <p className="text-sm text-eco-green-600">
              {material.tokens} token{material.tokens > 1 ? 's' : ''} por unidade
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onDecrement}
          className="w-10 h-10 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          data-testid={`button-decrement-${material.id}`}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="text-2xl font-bold text-gray-800" data-testid={`text-quantity-${material.id}`}>
          {quantity}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onIncrement}
          className="w-10 h-10 bg-eco-green-100 text-eco-green-600 rounded-lg hover:bg-eco-green-200 transition-colors"
          data-testid={`button-increment-${material.id}`}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
