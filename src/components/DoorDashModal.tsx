import { X, Phone, ShoppingBag } from 'lucide-react';
import { restaurantInfo } from '../config/restaurantInfo';

interface DoorDashModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export default function DoorDashModal({ isOpen, onClose, onContinue }: DoorDashModalProps) {
  if (!isOpen) return null;

  const formatPhoneForTel = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      return '1' + digits;
    }
    return digits;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 rounded-2xl shadow-2xl border border-gray-800/50 max-w-sm w-full p-6 transform transition-all animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-1 transition-all"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div>
          {/* Header */}
          <div className="mb-5">
            <h3 className="text-lg font-bold text-white mb-1.5 leading-tight">
              Hey! Want to save some money?
            </h3>
            <p className="text-gray-400 text-xs">
              Our team delivers directly to you
            </p>
          </div>

          {/* Message */}
          <p className="text-gray-300 text-sm mb-5 leading-relaxed bg-gray-800/40 rounded-lg p-3 border border-gray-700/30">
            <span className="inline-flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#FF3008"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#FF3008" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <span className="text-[#FF3008] font-semibold">DoorDash</span>
            </span> charges extra fees and marks up our prices. Call us directly and talk to a real person - you'll get the same food at regular prices with no fees or markup!
          </p>

          {/* Benefits with better design */}
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-lg p-3.5 mb-5 border border-gray-700/40">
            <p className="text-white font-semibold mb-2.5 text-xs uppercase tracking-wide">What you save:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2.5">
                <div className="flex-shrink-0 w-4 h-4 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400 text-xs">✓</span>
                </div>
                <span className="text-gray-200 text-sm">No service fees</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex-shrink-0 w-4 h-4 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400 text-xs">✓</span>
                </div>
                <span className="text-gray-200 text-sm">No price markup</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex-shrink-0 w-4 h-4 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400 text-xs">✓</span>
                </div>
                <span className="text-gray-200 text-sm">Talk to a real person</span>
              </li>
            </ul>
          </div>

          {/* Buttons with better design */}
          <div className="flex flex-col gap-2.5">
            <a
              href={`tel:+${formatPhoneForTel(restaurantInfo.phone)}`}
              onClick={onClose}
              className="group flex items-center justify-center gap-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-semibold text-sm shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 transform hover:scale-[1.02]"
            >
              <Phone size={18} className="group-hover:scale-110 transition-transform" />
              <span>Call Us: {restaurantInfo.phone}</span>
            </a>
            <button
              onClick={onContinue}
              className="flex items-center justify-center gap-2 bg-gray-800/60 text-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-800/80 transition-all font-medium text-xs border border-gray-700/50 hover:border-gray-600"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#FF3008"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#FF3008" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <span>Use <span className="text-[#FF3008] font-semibold">DoorDash</span> anyway</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

