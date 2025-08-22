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

  const getIcon = () => {
    switch (material.id) {
      case 'cans':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 2c-1.105 0-2 .895-2 2v16c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2V4c0-1.105-.895-2-2-2H6zm0 2h12v16H6V4zm3 2c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zm6 0c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"/>
          </svg>
        );
      case 'glass':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 2l-1 3h10l-1-3H8zm-2 5v12c0 1.105.895 2 2 2h8c1.105 0 2-.895 2-2V7H6zm3 2h2v8H9V9zm4 0h2v8h-2V9z"/>
          </svg>
        );
      case 'paper':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
          </svg>
        );
      case 'plastic':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm4 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/>
          </svg>
        );
      default:
        return <i className={`${material.icon} text-xl`}></i>;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-eco-green-100 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[material.color as keyof typeof colorClasses]}`}>
            {getIcon()}
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
