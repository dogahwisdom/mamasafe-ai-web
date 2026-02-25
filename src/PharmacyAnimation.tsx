import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Check } from 'lucide-react';

export const PharmacyAnimation = () => {
  const [items, setItems] = useState([
    { id: 'p1', color: 'bg-blue-500' },
    { id: 'p2', color: 'bg-purple-500' }, // Target initially
    { id: 'p3', color: 'bg-emerald-500' },
    { id: 'p4', color: 'bg-amber-500' },
    { id: 'p5', color: 'bg-rose-500' },
    { id: 'p6', color: 'bg-cyan-500' },
  ]);
  
  const [status, setStatus] = useState<'idle' | 'active' | 'dispensed'>('idle');

  useEffect(() => {
    let mounted = true;
    const runSequence = async () => {
      while(mounted) {
        // 0. Idle start
        setStatus('idle');
        await new Promise(r => setTimeout(r, 1000));
        if(!mounted) break;

        // 1. Highlight Row 2 (Index 1)
        setStatus('active');
        await new Promise(r => setTimeout(r, 1500));
        if(!mounted) break;

        // 2. Dispense Action
        setStatus('dispensed');
        await new Promise(r => setTimeout(r, 2500));
        if(!mounted) break;

        // 3. Reorder: Move dispensed item to bottom/remove
        setItems(prev => {
            const newItems = [...prev];
            const [removed] = newItems.splice(1, 1); // Remove item at index 1
            // Add a new item to end to keep list flowing
            newItems.push({ 
                id: `p-${Date.now()}`, 
                color: removed.color 
            });
            return newItems;
        });
        
        // Reset status immediately for the next cycle
        setStatus('idle');
        
        await new Promise(r => setTimeout(r, 1000)); // Pause before next loop
      }
    };
    
    runSequence();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="aspect-square rounded-3xl bg-slate-800 overflow-hidden shadow-2xl border border-slate-700 relative group">
       {/* Content */}
       <div className="absolute inset-4 bg-slate-900 rounded-2xl shadow-inner p-4 md:p-6 flex flex-col gap-3 md:gap-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-1 md:mb-2 border-b border-slate-800 pb-3 md:pb-4">
             <div className="h-4 w-24 md:w-32 bg-slate-700 rounded-full"></div>
             <div className="flex gap-2">
                <div className="h-2 w-2 bg-slate-700 rounded-full"></div>
                <div className="h-2 w-2 bg-slate-700 rounded-full"></div>
             </div>
          </div>
          
          {/* List */}
          <div className="flex-1 space-y-2 md:space-y-3 relative overflow-hidden">
             <AnimatePresence mode='popLayout'>
                {items.slice(0, 5).map((item, index) => (
                   <motion.div key={item.id} layout>
                      <PharmacyRow 
                         item={item} 
                         index={index} 
                         status={index === 1 ? status : 'idle'} 
                      />
                   </motion.div>
                ))}
             </AnimatePresence>
          </div>
          
          {/* Footer / Stats */}
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
             <div className="h-3 w-20 bg-slate-800 rounded-full"></div>
             <div className="h-3 w-12 bg-emerald-900/30 rounded-full"></div>
          </div>
       </div>
    </div>
  );
};

const PharmacyRow = ({ item, index, status }: { item: any, index: number, status: 'idle' | 'active' | 'dispensed' }) => {
   return (
      <motion.div
         initial={{ opacity: 0, y: 20, scale: 0.95 }}
         animate={{ 
             opacity: 1, 
             y: 0, 
             scale: 1,
             borderColor: status === 'active' ? 'rgba(52, 211, 153, 0.3)' : 'rgba(30, 41, 59, 0.5)',
             backgroundColor: status === 'active' ? 'rgba(30, 41, 59, 1)' : 'rgba(30, 41, 59, 0.4)'
         }}
         exit={{ opacity: 0, scale: 0.9, x: -20 }}
         transition={{ duration: 0.5, ease: "backOut" }}
         className={`relative p-3 rounded-xl border flex items-center justify-between z-10`}
      >
         <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${item.color} bg-opacity-20 flex items-center justify-center`}>
               <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
            </div>
            <div className="space-y-1.5">
               <div className="h-2 w-24 bg-slate-700 rounded-full"></div>
               <div className="h-1.5 w-16 bg-slate-800 rounded-full"></div>
            </div>
         </div>
         
         <div className="flex flex-col items-end gap-1">
             <motion.div 
                animate={{
                    backgroundColor: status === 'dispensed' ? '#10b981' : (status === 'active' ? '#34d399' : 'rgba(16, 185, 129, 0.1)'),
                    color: status === 'dispensed' || status === 'active' ? '#ffffff' : '#34d399',
                    scale: status === 'active' ? 1.05 : 1
                }}
                className="px-3 py-1.5 rounded-full text-xs font-medium min-w-[80px] text-center transition-colors duration-300 flex items-center justify-center gap-1"
             >
                {status === 'dispensed' ? (
                    <>
                        <Check className="w-3 h-3" /> Dispensed
                    </>
                ) : 'Dispense'}
             </motion.div>
             
             <AnimatePresence>
                 {status === 'dispensed' && (
                     <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-[10px] text-slate-400 flex items-center gap-1 overflow-hidden"
                     >
                        <Calendar className="w-3 h-3" /> Follow-up
                     </motion.div>
                 )}
             </AnimatePresence>
         </div>
      </motion.div>
   );
};
