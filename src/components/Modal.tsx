


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText: string;
  colorClass: string;
  icon: string;
}

const primaryTextColorClass = "text-slate-800";

export default function Modal({ isOpen, onClose, title, message, buttonText, colorClass, icon }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-md transform scale-100 transition-transform duration-300 border border-gray-200">
        <div className="text-center">
       
          <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 ${colorClass.replace('bg-', 'bg-opacity-20 ')}`}>
            <span className={`text-2xl font-bold ${colorClass.replace('bg-', 'text-')}`}>{icon}</span>
          </div>
          
          <h3 className={`text-xl font-bold mb-3 ${primaryTextColorClass}`}>{title}</h3>
          <p className="text-sm text-gray-600 mb-6">{message}</p>
          
        
          <button
            onClick={onClose}
            className={`${colorClass} text-white px-5 py-2 rounded-lg font-semibold transition duration-200 ease-in-out w-full`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}