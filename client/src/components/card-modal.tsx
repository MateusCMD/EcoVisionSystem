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
          <div className="w-full h-32 bg-gradient-to-r from-eco-green-400 to-eco-green-600 rounded-lg flex items-center justify-center shadow-lg">
            <div className="text-white text-center">
              <CreditCard className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-medium">ECOcred</p>
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
