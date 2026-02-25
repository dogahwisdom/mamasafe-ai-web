import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const ClinicAnimation = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [listItems, setListItems] = useState([
    { id: 1, priority: false, name: "J. Doe", time: "09:00", type: "Check-up" },
    { id: 2, priority: false, name: "A. Smith", time: "09:30", type: "Lab Review" },
    { id: 3, priority: false, name: "B. Lee", time: "10:00", type: "Follow-up" },
    { id: 4, priority: false, name: "C. Ray", time: "10:15", type: "Vaccine" },
    { id: 5, priority: false, name: "D. Kim", time: "10:45", type: "Consult" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Highlight a card
      setActiveCard(prev => (prev === 0 ? 1 : 0));

      // 2. Simulate AI triage & reorder
      setTimeout(() => {
        setListItems(prev => {
          const newItems = [...prev];
          // Mark the second item as priority
          newItems[1] = { ...newItems[1], priority: true };
          return newItems;
        });
      }, 1000);

      setTimeout(() => {
        setListItems(prev => {
          const newItems = [...prev];
          // Swap item 1 and 2 to simulate priority reorder
          const temp = newItems[0];
          newItems[0] = newItems[1];
          newItems[1] = temp;
          return newItems;
        });
      }, 2500);

      setTimeout(() => {
        setListItems(prev => {
           // Reset priority visual but keep order
           return prev.map(item => ({ ...item, priority: false }));
        });
      }, 4500);
      
    }, 8000); // 8s loop

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="aspect-square rounded-3xl bg-slate-50 overflow-hidden shadow-xl border border-slate-200 relative group">
      {/* Abstract Clinic UI */}
      <div className="absolute inset-4 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]">
        
        {/* Header */}
        <div className="h-12 md:h-14 border-b border-slate-100 flex items-center px-4 md:px-6 justify-between bg-white z-20">
          <div className="flex items-center gap-3">
             <div className="h-6 w-6 rounded bg-indigo-600 flex items-center justify-center">
                <div className="h-3 w-3 border-2 border-white rounded-full"></div>
             </div>
             <div className="h-3 w-20 md:w-24 bg-slate-200 rounded-full"></div>
          </div>
          <div className="flex gap-2">
             <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100"></div>
             <div className="h-8 w-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
             </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-12 md:w-16 border-r border-slate-100 flex flex-col gap-4 pt-6 items-center bg-slate-50/50">
             {[1,2,3,4,5].map(i => (
                 <div key={i} className={`h-8 w-8 rounded-lg flex items-center justify-center ${i === 1 ? 'bg-white shadow-sm border border-slate-200' : ''}`}>
                    <div className={`h-1 w-4 rounded-full ${i === 1 ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
                 </div>
             ))}
          </div>

          {/* Main Area */}
          <div className="flex-1 flex flex-col bg-slate-50/30 p-4 md:p-6 gap-4 md:gap-6 overflow-hidden">
             {/* Top Row: Patient Cards */}
             <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[0, 1].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      borderColor: activeCard === i ? 'rgba(99, 102, 241, 0.4)' : 'rgba(226, 232, 240, 1)',
                      backgroundColor: activeCard === i ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.6)',
                      boxShadow: activeCard === i ? '0 4px 20px rgba(99, 102, 241, 0.1)' : 'none',
                      scale: activeCard === i ? 1.02 : 1
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-28 rounded-xl border border-slate-200 p-4 flex flex-col justify-between relative overflow-hidden bg-white"
                  >
                     <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                           <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold ${activeCard === i ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                              {i === 0 ? 'JD' : 'AS'}
                           </div>
                           <div className="space-y-1.5">
                              <div className="h-2.5 w-20 bg-slate-800 rounded-full opacity-80"></div>
                              <div className="h-2 w-12 bg-slate-400 rounded-full opacity-60"></div>
                           </div>
                        </div>
                        {activeCard === i && (
                           <motion.div 
                             initial={{ opacity: 0, scale: 0.5 }}
                             animate={{ opacity: 1, scale: 1 }}
                             className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-medium text-indigo-600 flex items-center gap-1"
                           >
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                              Active
                           </motion.div>
                        )}
                     </div>
                     <div className="flex gap-2 mt-2">
                        <div className="h-6 flex-1 bg-slate-50 rounded-md border border-slate-100"></div>
                        <div className="h-6 w-12 bg-slate-50 rounded-md border border-slate-100"></div>
                     </div>
                  </motion.div>
                ))}
             </div>

             {/* Vertical List: Visits */}
             <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                <div className="h-10 border-b border-slate-100 flex items-center px-4 gap-4 bg-slate-50/50">
                   <div className="h-2 w-24 bg-slate-300 rounded-full"></div>
                   <div className="h-2 w-12 bg-slate-200 rounded-full ml-auto"></div>
                </div>
                
                <div className="flex-1 p-2 space-y-1 overflow-hidden relative">
                   <AnimatePresence initial={false}>
                     {listItems.map((item) => (
                       <motion.div
                         layout
                         key={item.id}
                         transition={{ type: "spring", stiffness: 120, damping: 20 }}
                         className={`h-12 rounded-lg border flex items-center px-3 gap-4 ${
                            item.priority 
                              ? 'bg-indigo-50/30 border-indigo-100 shadow-sm z-10' 
                              : 'bg-white border-transparent hover:bg-slate-50'
                         }`}
                       >
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold ${item.priority ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                             {item.name.charAt(0)}
                          </div>
                          
                          <div className="flex-1 space-y-1.5">
                             <div className={`h-2 w-24 rounded-full ${item.priority ? 'bg-indigo-900/70' : 'bg-slate-700/70'}`}></div>
                             <div className="h-1.5 w-16 bg-slate-300 rounded-full"></div>
                          </div>

                          <div className="hidden sm:block h-1.5 w-12 bg-slate-200 rounded-full"></div>
                          
                          {item.priority ? (
                             <motion.div
                               initial={{ opacity: 0, scale: 0.8 }}
                               animate={{ opacity: 1, scale: 1 }}
                               className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-[10px] font-bold"
                             >
                                PRIORITY
                             </motion.div>
                          ) : (
                             <div className="h-1.5 w-1.5 rounded-full bg-slate-200"></div>
                          )}
                       </motion.div>
                     ))}
                   </AnimatePresence>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
