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
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 48 48">
            <defs>
              <linearGradient id="canGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.7"/>
              </linearGradient>
            </defs>
            <rect x="14" y="6" width="20" height="36" rx="2" fill="url(#canGradient)"/>
            <ellipse cx="24" cy="6" rx="10" ry="3" fill="currentColor" opacity="0.8"/>
            <ellipse cx="24" cy="42" rx="10" ry="3" fill="currentColor" opacity="0.6"/>
            <rect x="16" y="12" width="16" height="2" rx="1" fill="white" opacity="0.5"/>
            <rect x="16" y="16" width="16" height="2" rx="1" fill="white" opacity="0.3"/>
            <circle cx="20" cy="20" r="1" fill="white" opacity="0.4"/>
            <circle cx="28" cy="22" r="1" fill="white" opacity="0.4"/>
          </svg>
        );
      case 'glass':
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 48 48">
            <defs>
              <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
                <stop offset="50%" stopColor="currentColor" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.6"/>
              </linearGradient>
            </defs>
            <path d="M16 4h16l-2 4H18l-2-4z" fill="currentColor" opacity="0.9"/>
            <path d="M18 8h12l-2 32c0 2-1 4-3 4h-2c-2 0-3-2-3-4l-2-32z" fill="url(#glassGradient)"/>
            <ellipse cx="24" cy="4" rx="8" ry="2" fill="currentColor" opacity="0.7"/>
            <path d="M20 12h8v2h-8z" fill="white" opacity="0.3"/>
            <path d="M21 16h6v2h-6z" fill="white" opacity="0.2"/>
            <ellipse cx="24" cy="35" rx="3" ry="8" fill="white" opacity="0.1"/>
          </svg>
        );
      case 'paper':
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 48 48">
            <defs>
              <linearGradient id="paperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.8"/>
              </linearGradient>
            </defs>
            <path d="M12 4h18l6 6v32c0 2-2 4-4 4H12c-2 0-4-2-4-4V8c0-2 2-4 4-4z" fill="url(#paperGradient)"/>
            <path d="M30 4v6h6l-6-6z" fill="currentColor" opacity="0.7"/>
            <rect x="14" y="16" width="20" height="2" rx="1" fill="white" opacity="0.6"/>
            <rect x="14" y="20" width="20" height="2" rx="1" fill="white" opacity="0.4"/>
            <rect x="14" y="24" width="16" height="2" rx="1" fill="white" opacity="0.4"/>
            <rect x="14" y="28" width="18" height="2" rx="1" fill="white" opacity="0.3"/>
            <rect x="14" y="32" width="14" height="2" rx="1" fill="white" opacity="0.3"/>
            <path d="M8 8l4 4 4-4" stroke="white" strokeWidth="1" fill="none" opacity="0.2"/>
          </svg>
        );
      case 'plastic':
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 48 48">
            <defs>
              <linearGradient id="plasticGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
                <stop offset="50%" stopColor="currentColor" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.6"/>
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="18" fill="url(#plasticGradient)"/>
            <circle cx="24" cy="24" r="12" fill="none" stroke="white" strokeWidth="2" opacity="0.4"/>
            <circle cx="24" cy="24" r="6" fill="none" stroke="white" strokeWidth="1" opacity="0.3"/>
            <path d="M24 12v6m0 6v6m6-12h-6m-6 0h6" stroke="white" strokeWidth="2" opacity="0.5"/>
            <circle cx="18" cy="18" r="2" fill="white" opacity="0.3"/>
            <circle cx="30" cy="30" r="2" fill="white" opacity="0.3"/>
            <path d="M12 24c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="white" strokeWidth="1" fill="none" opacity="0.2"/>
          </svg>
        );
      default:
        return <i className={`${material.icon} text-xl`}></i>;
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-eco-green-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-eco-green-50 to-transparent rounded-full -mr-10 -mt-10"></div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colorClasses[material.color as keyof typeof colorClasses]} shadow-lg relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="relative z-10">
              {getIcon()}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-1">{material.name}</h3>
            <p className="text-sm text-eco-green-600 font-medium">
              {material.tokens} token{material.tokens > 1 ? 's' : ''} por unidade
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onDecrement}
          className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 text-red-600 rounded-xl hover:from-red-200 hover:to-red-300 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
          data-testid={`button-decrement-${material.id}`}
        >
          <Minus className="w-5 h-5" />
        </Button>
        
        <div className="text-center">
          <span className="text-3xl font-black text-gray-800 block" data-testid={`text-quantity-${material.id}`}>
            {quantity}
          </span>
          <p className="text-xs text-gray-500 font-medium">unidades</p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onIncrement}
          className="w-12 h-12 bg-gradient-to-br from-eco-green-100 to-eco-green-200 text-eco-green-600 rounded-xl hover:from-eco-green-200 hover:to-eco-green-300 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
          data-testid={`button-increment-${material.id}`}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
