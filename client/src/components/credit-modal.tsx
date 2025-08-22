import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

interface CreditModalProps {
  isOpen: boolean;
  onClose: () => void;
  earnedCredits: number;
  onComplete: () => void;
}

export default function CreditModal({ isOpen, onClose, earnedCredits, onComplete }: CreditModalProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / 70); // 7 seconds = 70 intervals of 100ms
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-8 bg-white rounded-3xl text-center transform scale-95 transition-transform">
        <div className="w-16 h-16 bg-eco-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="text-eco-green-600 w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Parabéns!</h3>
        <p className="text-gray-600 mb-4">
          Você ganhou{" "}
          <span className="font-bold text-eco-green-600" data-testid="text-earned-credits">
            {earnedCredits}
          </span>{" "}
          créditos!
        </p>
        <div className="bg-eco-green-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-eco-green-700 mb-2">
            Aguarde para inserir seu cartão ECOcred...
          </p>
          <Progress 
            value={progress} 
            className="w-full h-2"
            data-testid="progress-timer"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
