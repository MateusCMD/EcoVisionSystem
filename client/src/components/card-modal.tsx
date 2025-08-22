import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CardModal({ isOpen, onClose }: CardModalProps) {
  const handleConfirmTransfer = () => {
    // Simulate card transfer
    setTimeout(() => {
      onClose();
      // Show success message
      alert("Créditos transferidos com sucesso para seu cartão ECOcred!");
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-8 bg-white rounded-3xl text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="text-blue-600 w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Insira seu Cartão ECOcred
        </h3>
        <p className="text-gray-600 mb-6">
          Posicione seu cartão no leitor para transferir os créditos
        </p>
        
        {/* Card Slot Animation */}
        <div className="bg-gray-100 rounded-xl p-8 mb-6">
          <div className="w-full h-32 bg-gradient-to-br from-eco-green-400 via-eco-green-500 to-eco-green-700 rounded-2xl flex flex-col justify-between p-4 shadow-2xl transform hover:scale-105 transition-transform relative overflow-hidden">
            {/* Card Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 200 120" fill="none">
                <circle cx="160" cy="20" r="40" fill="white" opacity="0.3"/>
                <circle cx="180" cy="40" r="20" fill="white" opacity="0.2"/>
              </svg>
            </div>
            
            {/* Card Content */}
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div className="text-white">
                  <p className="text-xs font-medium opacity-90">CARTÃO DE CRÉDITOS</p>
                  <p className="text-lg font-bold">ECOcred</p>
                </div>
                <div className="w-8 h-8 bg-white bg-opacity-30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
              </div>
              
              <div className="mt-4 text-white">
                <p className="text-xs opacity-80">SUSTENTABILIDADE & RECICLAGEM</p>
                <div className="mt-1 flex space-x-1">
                  <div className="w-8 h-1 bg-white rounded"></div>
                  <div className="w-8 h-1 bg-white bg-opacity-60 rounded"></div>
                  <div className="w-8 h-1 bg-white bg-opacity-40 rounded"></div>
                  <div className="w-8 h-1 bg-white bg-opacity-20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Button
          onClick={handleConfirmTransfer}
          className="w-full bg-eco-green-500 hover:bg-eco-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          data-testid="button-confirm-transfer"
        >
          Confirmar Transferência
        </Button>
      </DialogContent>
    </Dialog>
  );
}
