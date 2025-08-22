export default function Logo() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-eco-green-500 rounded-2xl mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-eco-green-400 to-eco-green-600"></div>
        <div className="relative z-10 flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
              fill="currentColor"
            />
            <path
              d="M12 22C6.477 22 2 17.523 2 12C2 11.685 2.015 11.374 2.044 11.067"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M22 12C22 17.523 17.523 22 12 22C11.685 22 11.374 21.985 11.067 21.956"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-eco-green-800 mb-2">Ecovision</h1>
      <p className="text-eco-green-600 text-lg">Sistema Inteligente de Reciclagem</p>
    </div>
  );
}
