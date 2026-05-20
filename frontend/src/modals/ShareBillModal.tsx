import toast from "react-hot-toast";
import { X, Mail, Copy, Share2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import {
  shareOnWhatsApp,
  shareViaEmail,
  nativeShare,
} from "../utils/shareBill";

type ShareBillModalProps = {
  show: boolean;
  onClose: () => void;
  shareText: string;
  selectedMonth: string;
  theme: "light" | "dark";
};

export default function ShareBillModal({
  show,
  onClose,
  shareText,
  selectedMonth,
  theme,
}: ShareBillModalProps) {
  if (!show) return null;

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(shareText);

      toast.success("Bill summary copied!");
    } catch (error) {
      console.error(error);

      toast.error("Failed to copy summary");
    }
  };

  const handleNativeShare = async () => {
    try {
      await nativeShare(`Milk Bill - ${selectedMonth}`, shareText);
    } catch (error) {
      console.error(error);

      toast.error("Sharing not supported on this device");
    }
  };

 return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
     <div
       className={`
        w-full max-w-[340px] rounded-3xl p-5 border shadow-2xl

        ${
          theme === "light"
            ? `
              bg-white
              border-sky-100
            `
            : `
              bg-slate-900
              border-slate-800
            `
        }
      `}
     >
       {/* HEADER */}
       <div className="flex items-center justify-between mb-6">
         <div>
           <h2
             className={`text-xl font-black ${
               theme === "light" ? "text-slate-800" : "text-white"
             }`}
           >
             Share Bill
           </h2>

           <p
             className={`text-sm  ${
               theme === "light" ? "text-slate-400" : "text-slate-500"
             }`}
           >
             Share your monthly summary
           </p>
         </div>

         <button
           onClick={onClose}
           className={`
            w-10 h-10 rounded-2xl flex items-center justify-center transition

            ${
              theme === "light"
                ? `
                  bg-slate-100
                  hover:bg-slate-200
                  text-slate-600
                `
                : `
                  bg-slate-900
                  hover:bg-slate-700
                  text-slate-300
                `
            }
          `}
         >
           <X className="w-5 h-5" />
         </button>
       </div>

       {/* SHARE OPTIONS */}
       <div className="grid grid-cols-2 gap-5 px-2 ">
         {/* WHATSAPP */}
         <button
           onClick={() => shareOnWhatsApp(shareText)}
           className="rounded-3xl bg-green-600 text-white py-2 flex flex-col items-center justify-center gap-1 font-semibold transition hover:scale-[1.02]"
         >
           <FaWhatsapp className="w-7 h-7" />

           <span className="text-sm">WhatsApp</span>
         </button>

         {/* EMAIL */}
         <button
           onClick={() =>
             shareViaEmail(`Milk Bill - ${selectedMonth}`, shareText)
           }
           className="rounded-3xl bg-indigo-700 text-white py-4 flex flex-col items-center justify-center gap-1 font-semibold transition hover:scale-[1.02]"
         >
           <Mail className="w-7 h-7" />

           <span className="text-sm">Email</span>
         </button>

         {/* COPY */}
         <button
           onClick={handleCopySummary}
           className={`
            rounded-3xl p-4 flex flex-col items-center justify-center gap-1 font-semibold border transition hover:scale-[1.02]

            ${
              theme === "light"
                ? `
                  bg-slate-50
                  border-slate-200
                  text-slate-700
                `
                : `
                  bg-slate-800
                  border-slate-700
                  text-white
                `
            }
          `}
         >
           <Copy className="w-7 h-7" />

           <span className="text-sm">Copy</span>
         </button>

         {/* NATIVE SHARE */}
         <button
           onClick={handleNativeShare}
           className={`
            rounded-3xl p-4 flex flex-col items-center justify-center gap-1 font-semibold border transition hover:scale-[1.02]

            ${
              theme === "light"
                ? `
                  bg-slate-50
                  border-slate-200
                  text-slate-700
                `
                : `
                  bg-slate-800
                  border-slate-700
                  text-white
                `
            }
          `}
         >
           <Share2 className="w-7 h-7" />

           <span className="text-sm">Share</span>
         </button>
       </div>
     </div>
   </div>
 );
}
