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
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 mb-6 shadow-inner flex justify-center">
          <div className="w-full max-w-sm h-40 bg-gradient-to-br from-eco-green-400 via-eco-green-500 to-eco-green-800 rounded-2xl flex flex-col justify-between p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden border border-eco-green-300">
            
            {/* Holographic effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse"></div>
            
            {/* Card Background Pattern */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" viewBox="0 0 300 180" fill="none">
                <circle cx="240" cy="30" r="60" fill="white" opacity="0.4"/>
                <circle cx="270" cy="60" r="30" fill="white" opacity="0.3"/>
                <circle cx="260" cy="90" r="20" fill="white" opacity="0.2"/>
                <path d="M20 20Q40 40 60 20T100 20" stroke="white" strokeWidth="2" opacity="0.2"/>
                <path d="M20 160Q40 140 60 160T100 160" stroke="white" strokeWidth="2" opacity="0.2"/>
              </svg>
            </div>
            
            {/* EMV Chip */}
            <div className="absolute top-4 left-6">
              <div className="w-6 h-5 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-sm shadow-md relative">
                <div className="absolute inset-0.5 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-sm">
                  <div className="grid grid-cols-3 gap-px p-0.5 h-full">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-yellow-600 rounded-sm opacity-60"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card Content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="text-white">
                  <p className="text-xs font-bold opacity-90 tracking-wide">CARTÃO DE CRÉDITOS</p>
                  <p className="text-2xl font-black tracking-wider mt-1">ECOcred</p>
                </div>
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                    <circle cx="12" cy="12" r="2" fill="white"/>
                  </svg>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="text-white font-mono tracking-widest text-lg font-bold mb-2">
                  •••• •••• •••• 1234
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-70 font-medium">VÁLIDO ATÉ</p>
                    <p className="text-sm font-bold text-white">12/28</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-90 font-bold tracking-wider">SUSTENTABILIDADE & RECICLAGEM</p>
                    <div className="mt-1 flex space-x-1">
                      <div className="w-8 h-1 bg-white rounded-full"></div>
                      <div className="w-8 h-1 bg-white bg-opacity-70 rounded-full"></div>
                      <div className="w-8 h-1 bg-white bg-opacity-50 rounded-full"></div>
                      <div className="w-8 h-1 bg-white bg-opacity-30 rounded-full"></div>
                    </div>
                  </div>
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
