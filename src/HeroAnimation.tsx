import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

export const HeroAnimation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const runSequence = async () => {
        while(isMounted) {
            setStep(0);
            await new Promise(r => setTimeout(r, 500));
            if(!isMounted) break;
            
            // 1: Reminder sent
            setStep(1);
            await new Promise(r => setTimeout(r, 2000));
            if(!isMounted) break;
            
            // 2: Typing...
            setStep(2);
            await new Promise(r => setTimeout(r, 1200));
            if(!isMounted) break;
            
            // 3: Confirmed (User reply + Dashboard update)
            setStep(3);
            await new Promise(r => setTimeout(r, 2000));
            if(!isMounted) break;
            
            // 4: Final reply
            setStep(4);
            await new Promise(r => setTimeout(r, 4000)); // Hold
        }
    };
    runSequence();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[450px] md:h-[500px]">
       {/* Dashboard Background */}
       <div className="absolute inset-0 z-0 pr-0 md:pr-24 pb-12">
         <Dashboard step={step} />
       </div>
       
       {/* Phone Foreground */}
       <div className="absolute right-0 bottom-0 md:right-8 md:-bottom-8 z-10 transform scale-[0.65] sm:scale-75 md:scale-100 origin-bottom-right">
         <Phone step={step} />
       </div>
    </div>
  );
};

const Dashboard = ({ step }: { step: number }) => {
  const isConfirmed = step >= 3;
  
  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden flex flex-col transition-all duration-700">
        {/* Header */}
        <div className="h-14 border-b border-slate-100 flex items-center px-6 justify-between bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">M</div>
                <div className="h-4 w-32 bg-slate-100 rounded-full"></div>
            </div>
            <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-50"></div>
                <div className="w-8 h-8 rounded-full bg-slate-50"></div>
            </div>
        </div>
        
        <div className="flex-1 flex bg-slate-50/50 overflow-hidden">
            {/* Sidebar */}
            <div className="w-48 lg:w-64 border-r border-slate-100 p-4 hidden md:flex flex-col gap-3">
                {[1,2,3,4].map(i => (
                    <div key={i} className={`h-8 rounded-lg w-full ${i===2 ? 'bg-indigo-50' : 'bg-transparent'}`}></div>
                ))}
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-6 md:p-8 overflow-hidden">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">Appointments</h3>
                        <p className="text-sm text-slate-500">Today, Feb 25</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm min-w-[100px] hidden sm:block">
                            <div className="text-xs text-slate-500 mb-1">Pending</div>
                            <div className="text-2xl font-semibold text-slate-900">
                                {isConfirmed ? 4 : 5}
                            </div>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm min-w-[100px]">
                            <div className="text-xs text-slate-500 mb-1">Confirmed</div>
                            <div className="text-2xl font-semibold text-emerald-600 flex items-center gap-2">
                                <motion.span
                                    key={isConfirmed ? "conf" : "pend"}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="block"
                                >
                                    {isConfirmed ? 13 : 12}
                                </motion.span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-100 text-xs font-medium text-slate-400 uppercase tracking-wider">
                        <div className="col-span-6 md:col-span-4">Patient</div>
                        <div className="col-span-3 hidden md:block">Time</div>
                        <div className="col-span-3 hidden md:block">Type</div>
                        <div className="col-span-6 md:col-span-2 text-right">Status</div>
                    </div>
                    
                    {/* Rows */}
                    <div className="divide-y divide-slate-50">
                        <Row name="Sarah M." time="09:30 AM" type="Check-up" status="Confirmed" />
                        
                        {/* Target Row */}
                        <div className="grid grid-cols-12 gap-4 p-4 items-center transition-colors duration-500 bg-white">
                             <div className="col-span-6 md:col-span-4 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">JD</div>
                                <span className="text-sm font-medium text-slate-900">Jane Doe</span>
                             </div>
                             <div className="col-span-3 text-sm text-slate-500 hidden md:block">10:00 AM</div>
                             <div className="col-span-3 text-sm text-slate-500 hidden md:block">Prenatal</div>
                             <div className="col-span-6 md:col-span-2 flex justify-end">
                                <motion.div
                                    layout
                                    className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors duration-500 ${
                                        isConfirmed 
                                        ? 'bg-emerald-100 text-emerald-700' 
                                        : 'bg-amber-50 text-amber-700'
                                    }`}
                                >
                                    {isConfirmed && <Check className="w-3 h-3" />}
                                    {isConfirmed ? 'Confirmed' : 'Pending'}
                                </motion.div>
                             </div>
                        </div>
                        
                        <Row name="Amara K." time="10:30 AM" type="Lab Test" status="Pending" />
                        <Row name="Lydia O." time="11:00 AM" type="Follow-up" status="Pending" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

const Row = ({ name, time, type, status }: any) => (
    <div className="grid grid-cols-12 gap-4 p-4 items-center">
        <div className="col-span-6 md:col-span-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">{name.charAt(0)}</div>
            <span className="text-sm font-medium text-slate-900">{name}</span>
        </div>
        <div className="col-span-3 text-sm text-slate-500 hidden md:block">{time}</div>
        <div className="col-span-3 text-sm text-slate-500 hidden md:block">{type}</div>
        <div className="col-span-6 md:col-span-2 flex justify-end">
            <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                {status}
            </div>
        </div>
    </div>
);

const Phone = ({ step }: { step: number }) => {
    return (
        <div className="w-[280px] md:w-[300px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden relative">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-b-xl z-20"></div>
            
            <div className="bg-white h-[550px] flex flex-col">
                {/* Header */}
                <div className="bg-slate-50/80 backdrop-blur-md border-b border-slate-100 pt-10 pb-3 px-4 flex items-center gap-3 sticky top-0 z-10">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">M</div>
                    <div>
                        <div className="text-xs font-semibold text-slate-900">MamaSafe AI</div>
                        <div className="text-[10px] text-slate-500">Business Account</div>
                    </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-white flex flex-col">
                    <div className="text-center text-[10px] text-slate-400 my-2">Today 9:41 AM</div>
                    
                    {/* Message 1: Reminder */}
                    <AnimatePresence>
                        {step >= 1 && (
                            <motion.div 
                                key="msg1"
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="flex justify-start"
                            >
                                <div className="bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs leading-relaxed max-w-[85%] shadow-sm">
                                    Hello! This is a reminder for your appointment tomorrow at 10:00 AM.
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Typing Indicator */}
                    <AnimatePresence>
                        {step === 2 && (
                            <motion.div 
                                key="typing"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex justify-end"
                            >
                                <div className="bg-emerald-50 text-emerald-600 rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                                    <div className="flex gap-1">
                                        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1 h-1 bg-emerald-400 rounded-full" />
                                        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }} className="w-1 h-1 bg-emerald-400 rounded-full" />
                                        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1 h-1 bg-emerald-400 rounded-full" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Message 2: Confirmation */}
                    <AnimatePresence>
                        {step >= 3 && (
                            <motion.div 
                                key="msg2"
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="flex justify-end"
                            >
                                <div className="bg-emerald-500 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-xs leading-relaxed max-w-[80%] shadow-md shadow-emerald-500/20">
                                    Confirmed. I'll be there.
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    {/* Message 3: Final Reply */}
                    <AnimatePresence>
                        {step >= 4 && (
                            <motion.div 
                                key="msg3"
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex justify-start"
                            >
                                <div className="bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs leading-relaxed max-w-[85%] shadow-sm">
                                    Great. Please remember to bring your ID.
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                {/* Input Area (Static) */}
                <div className="p-3 bg-slate-50 border-t border-slate-100">
                    <div className="h-9 bg-white border border-slate-200 rounded-full w-full flex items-center px-3 text-slate-300 text-xs">
                        Type a message...
                    </div>
                </div>
            </div>
        </div>
    );
};
