export default function Logo() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-eco-green-400 via-eco-green-500 to-eco-green-700 rounded-3xl mb-6 relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-white/10 rounded-full"></div>
        
        <div className="relative z-10 flex items-center justify-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 48 48"
            fill="none"
            className="text-white drop-shadow-lg"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Leaf design with recycling symbol */}
            <path
              d="M24 4C18 4 14 8 14 14C14 20 18 24 24 24C30 24 34 20 34 14C34 8 30 4 24 4Z"
              fill="currentColor"
              fillOpacity="0.9"
            />
            <path
              d="M24 24C18 24 14 28 14 34C14 40 18 44 24 44C30 44 34 40 34 34C34 28 30 24 24 24Z"
              fill="currentColor"
              fillOpacity="0.7"
            />
            <path
              d="M38 19C32 19 28 23 28 29C28 35 32 39 38 39C44 39 48 35 48 29C48 23 44 19 38 19Z"
              fill="currentColor"
              fillOpacity="0.5"
            />
            {/* Recycling arrows */}
            <path
              d="M16 16L20 12L24 16L20 20L16 16Z"
              fill="white"
              fillOpacity="0.8"
            />
            <path
              d="M28 32L32 28L36 32L32 36L28 32Z"
              fill="white"
              fillOpacity="0.6"
            />
            <circle cx="24" cy="24" r="2" fill="white" fillOpacity="0.9"/>
          </svg>
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-5xl font-black bg-gradient-to-r from-eco-green-600 via-eco-green-700 to-eco-green-800 bg-clip-text text-transparent mb-3 tracking-tight">
          Ecovision
        </h1>
        <div className="max-w-sm mx-auto">
          <p className="text-eco-green-600 text-xl font-medium">Sistema Inteligente de Reciclagem</p>
          <div className="mt-2 flex items-center justify-center space-x-2">
            <div className="w-8 h-0.5 bg-eco-green-300 rounded-full"></div>
            <div className="w-2 h-2 bg-eco-green-400 rounded-full"></div>
            <div className="w-8 h-0.5 bg-eco-green-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
