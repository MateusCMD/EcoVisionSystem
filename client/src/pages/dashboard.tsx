import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { LogOut, Trophy } from "lucide-react";
import MaterialCard from "@/components/material-card";
import CreditModal from "@/components/credit-modal";
import CardModal from "@/components/card-modal";
import RankingModal from "@/components/ranking-modal";
import type { User } from "@shared/schema";

interface Materials {
  cans: number;
  glass: number;
  paper: number;
  plastic: number;
  electronics: number;
  medicines: number;
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [materials, setMaterials] = useState<Materials>({
    cans: 0,
    glass: 0,
    paper: 0,
    plastic: 0,
    electronics: 0,
    medicines: 0,
  });
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showRankingModal, setShowRankingModal] = useState(false);
  const [earnedCredits, setEarnedCredits] = useState(0);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const userData = localStorage.getItem("ecovision_user");
    if (!userData) {
      setLocation("/");
      return;
    }
    setCurrentUser(JSON.parse(userData));
  }, [setLocation]);

  const { data: rankings } = useQuery({
    queryKey: ["/api/rankings"],
    enabled: showRankingModal,
  });

  const submitMaterialsMutation = useMutation({
    mutationFn: async (data: { userId: string; materials: Materials }) => {
      const response = await apiRequest("POST", "/api/materials/submit", data);
      return response.json();
    },
    onSuccess: (data) => {
      setEarnedCredits(data.creditsEarned);
      setCurrentUser(data.user);
      localStorage.setItem("ecovision_user", JSON.stringify(data.user));
      setShowCreditModal(true);
      
      // Reset materials
      setMaterials({ cans: 0, glass: 0, paper: 0, plastic: 0, electronics: 0, medicines: 0 });
      
      // Invalidate rankings cache
      queryClient.invalidateQueries({ queryKey: ["/api/rankings"] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao enviar materiais",
        description: error.message || "Ocorreu um erro ao processar os materiais",
        variant: "destructive",
      });
    },
  });

  const materialTypes = [
    {
      id: "cans" as keyof Materials,
      name: "Latinhas",
      tokens: 1,
      icon: "fas fa-beer",
      color: "orange",
    },
    {
      id: "glass" as keyof Materials,
      name: "Garrafas de Vidro",
      tokens: 2,
      icon: "fas fa-wine-bottle", 
      color: "blue",
    },
    {
      id: "paper" as keyof Materials,
      name: "Papel",
      tokens: 1,
      icon: "fas fa-file-alt",
      color: "yellow",
    },
    {
      id: "plastic" as keyof Materials,
      name: "Plástico", 
      tokens: 4,
      icon: "fas fa-wine-glass",
      color: "purple",
    },
    {
      id: "electronics" as keyof Materials,
      name: "Lixo Eletrônico",
      tokens: 6,
      icon: "fas fa-microchip",
      color: "green",
    },
    {
      id: "medicines" as keyof Materials,
      name: "Medicamentos Vencidos",
      tokens: 10,
      icon: "fas fa-pills",
      color: "red",
    },
  ];

  const calculateTotalCredits = () => {
    return (
      materials.cans * 1 +
      materials.glass * 2 +
      materials.paper * 1 +
      materials.plastic * 4 +
      materials.electronics * 6 +
      materials.medicines * 10
    );
  };

  const updateMaterial = (type: keyof Materials, delta: number) => {
    setMaterials(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  const handleSubmitMaterials = () => {
    if (!currentUser) return;
    
    const totalCredits = calculateTotalCredits();
    if (totalCredits === 0) {
      toast({
        title: "Aviso",
        description: "Adicione pelo menos um material para reciclar!",
        variant: "destructive",
      });
      return;
    }

    submitMaterialsMutation.mutate({
      userId: currentUser.id,
      materials,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("ecovision_user");
    setLocation("/");
  };

  const handleShowRanking = () => {
    setShowRankingModal(true);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green-50 via-white to-eco-green-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-eco-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-eco-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-eco-green-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-eco-green-400 to-eco-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-eco-green-800 tracking-tight">Ecovision</h1>
              <p className="text-sm text-eco-green-600 font-medium" data-testid="text-username">
                Olá, {currentUser.name.split(' ')[0]}!
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right bg-gradient-to-br from-eco-green-50 to-eco-green-100 px-4 py-2 rounded-2xl">
              <p className="text-xs text-gray-500 font-medium">Seus Créditos</p>
              <p className="text-xl font-black text-eco-green-600" data-testid="text-total-credits">
                {currentUser.totalCredits} tokens
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShowRanking}
              className="p-2 text-eco-green-600 hover:bg-eco-green-100 rounded-lg transition-colors"
              data-testid="button-ranking"
            >
              <Trophy className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              data-testid="button-logout"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">
            Selecione os Materiais para Reciclagem
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Adicione a quantidade de cada material que você possui e ganhe tokens ECO
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="w-12 h-0.5 bg-eco-green-300 rounded-full"></div>
            <div className="w-3 h-3 bg-eco-green-400 rounded-full"></div>
            <div className="w-12 h-0.5 bg-eco-green-300 rounded-full"></div>
          </div>
        </div>

        {/* Material Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {materialTypes.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              quantity={materials[material.id]}
              onIncrement={() => updateMaterial(material.id, 1)}
              onDecrement={() => updateMaterial(material.id, -1)}
            />
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            onClick={handleSubmitMaterials}
            disabled={submitMaterialsMutation.isPending}
            className="bg-eco-green-500 hover:bg-eco-green-600 text-white font-semibold py-4 px-8 rounded-2xl transition-colors duration-200 transform hover:scale-105 shadow-lg"
            data-testid="button-submit-materials"
          >
            {submitMaterialsMutation.isPending ? (
              "Processando..."
            ) : (
              <>
                <i className="fas fa-recycle mr-2"></i>
                Enviar Materiais
              </>
            )}
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Total de créditos calculados:{" "}
            <span className="font-semibold text-eco-green-600" data-testid="text-calculated-credits">
              {calculateTotalCredits()}
            </span>
          </p>
        </div>
      </main>

      {/* Modals */}
      <CreditModal
        isOpen={showCreditModal}
        onClose={() => setShowCreditModal(false)}
        earnedCredits={earnedCredits}
        onComplete={() => {
          setShowCreditModal(false);
          setShowCardModal(true);
        }}
      />

      <CardModal
        isOpen={showCardModal}
        onClose={() => setShowCardModal(false)}
      />

      <RankingModal
        isOpen={showRankingModal}
        onClose={() => setShowRankingModal(false)}
        rankings={rankings || []}
      />
    </div>
  );
}
