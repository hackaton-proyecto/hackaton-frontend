import React, { useState } from 'react';


interface Investor {
    id: string;
    name: string;

    agreedShare: number;
}


const INVERSORES_BASE: Investor[] = [
    { id: 'I001', name: 'Inversor Beta', agreedShare: 40 },
    { id: 'I002', name: 'Inversor Alpha', agreedShare: 35 },
    { id: 'I003', name: 'Socio Minoritario', agreedShare: 25 },
];

const accentColor = "slate";
const inputFocusClass = `focus:ring-1 focus:ring-${accentColor}-600 focus:border-${accentColor}-600`;
const inputClasses = `w-full p-3 border border-gray-300 rounded-md ${inputFocusClass} outline-none transition duration-150 ease-in-out placeholder-gray-500 text-gray-800 shadow-sm`;
const primaryButtonClass = `bg-${accentColor}-700 hover:bg-${accentColor}-600 text-white px-6 py-2 rounded-md font-semibold transition duration-200 ease-in-out tracking-wide shadow-md`;
const secondaryButtonClass = "bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-semibold transition duration-200 ease-in-out shadow-sm";
const headerColorClass = `text-${accentColor}-800`;


interface SaleDistribution {
    investorId: string;
    amountShare: number; 
}

interface NewSaleData {
    amount: number;
    date: string;
    distribution: SaleDistribution[];
    description: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
   
    onSubmit: (saleData: NewSaleData) => void;
}

export default function RegistroVenta({ isOpen, onClose, onSubmit }: ModalProps) {


    const initialDistribution: SaleDistribution[] = INVERSORES_BASE.map(inv => ({
        investorId: inv.id,
       
        amountShare: inv.agreedShare
    }));

    const [saleData, setSaleData] = useState<NewSaleData>({
        amount: 0,
        date: new Date().toISOString().substring(0, 10),
        distribution: initialDistribution,
        description: "",
    });
    
  
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    if (!isOpen) return null;

    const totalShare = saleData.distribution.reduce((sum, item) => sum + item.amountShare, 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

    
        setErrorMessage(null);

        if (name === "amount") {
            const numericValue = value.replace(/[^0-9.]/g, '');
            setSaleData(prev => ({ ...prev, [name]: parseFloat(numericValue) || 0 }));
        } else if (name === "date" || name === "description") {
            setSaleData(prev => ({ ...prev, [name]: value }));
        }
    };
    const handleDistributionChange = (id: string, value: string) => {
        const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;

        setErrorMessage(null);

        setSaleData(prev => ({
            ...prev,
            distribution: prev.distribution.map(item =>
                item.investorId === id ? { ...item, amountShare: numericValue } : item
            ),
        }));
    };

    const handleClose = () => {
      
        setSaleData({
            amount: 0,
            date: new Date().toISOString().substring(0, 10),
            distribution: initialDistribution,
            description: ""
        });
        setErrorMessage(null);
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (saleData.amount <= 0) {
            setErrorMessage("Por favor, ingrese un monto de venta válido (mayor a 0).");
            return;
        }
        
        if (totalShare > 100) {
            setErrorMessage("La suma de las Participaciones excede el 100%. Por favor, ajústela.");
            return;
        }

        if (totalShare <= 0) {
            setErrorMessage("La suma de las Participaciones debe ser mayor a 0% para registrar una distribución.");
            return;
        }
        
        setErrorMessage(null); 
        onSubmit(saleData);
        
       
        handleClose();
    };


    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-70 backdrop-blur-sm flex justify-center items-start pt-12 sm:items-center sm:pt-4 p-4">
            <div className="bg-white rounded-lg w-full max-w-lg shadow-2xl transform transition-all duration-300">

                <div className="p-6 border-b border-gray-200">
                    <h2 className={`text-xl font-bold ${headerColorClass}`}>
                        Registro de Nueva Venta
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Complete los detalles de la transacción y la distribución de participación.
                    </p>
                </div>
                
        
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    
                 
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Monto de la Venta (ARG) *</label>
                            <input
                                id="amount"
                                type="number"
                                name="amount"
                                value={saleData.amount === 0 ? '' : saleData.amount}
                                onChange={handleChange}
                                placeholder="Ej: 1500.00"
                                className={inputClasses}
                                required
                                min="0.01"
                                step="0.01"
                            />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
                            <input
                                id="date"
                                type="date"
                                name="date"
                                value={saleData.date}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                            />
                        </div>
                    </div>

                 
                    <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                        <h3 className="font-semibold text-base text-gray-700 mb-4 border-b border-gray-200 pb-2">Distribución de Participación de la Venta (%)</h3>
                        
                        {INVERSORES_BASE.map((investor) => {
                            const currentShare = saleData.distribution.find(d => d.investorId === investor.id)?.amountShare || 0;
                            return (
                                <div key={investor.id} className="flex items-center justify-between gap-4 py-2 border-b border-gray-100 last:border-b-0">
                                    <label className="text-sm font-normal text-gray-700 w-1/2">{investor.name}</label>
                                    <div className="flex items-center w-28">
                                        <input
                                            type="number"
                                            value={currentShare}
                                            onChange={(e) => handleDistributionChange(investor.id, e.target.value)}
                                            className={`${inputClasses} py-2 px-3 w-full text-center`}
                                            min="0"
                                            max="100"
                                            step="0.01"
                                        />
                                        <span className="ml-2 font-medium text-gray-600">%</span>
                                    </div>
                                </div>
                            );
                        })}
                        
              
                        <div className={`mt-4 pt-3 border-t ${totalShare > 100 ? 'border-red-500' : 'border-gray-300'}`}>
                            <p className="font-bold text-sm flex justify-between">
                                <span className="text-gray-800">Total a Repartir:</span>
                                <span className={`${totalShare > 100 ? 'text-red-600' : (totalShare === 100 ? 'text-green-600' : 'text-gray-800')}`}>{totalShare.toFixed(2)}%</span>
                            </p>
                            {totalShare > 100 && <p className="text-xs text-red-500 mt-1">Error: La participación excede el 100%.</p>}
                            {totalShare > 0 && totalShare < 100 && <p className="text-xs text-amber-700 mt-1">Advertencia: Falta asignar participación.</p>}
                            {totalShare === 0 && <p className="text-xs text-red-500 mt-1">Error: No se ha asignado participación.</p>}
                        </div>
                    </div>

           
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción (Opcional)</label>
                        <textarea
                            id="description"
                            name="description"
                            value={saleData.description}
                            onChange={handleChange}
                            placeholder="Detalles de la transacción, cliente, etc."
                            className={`${inputClasses} h-20 resize-none`}
                        />
                    </div>
                    
                
                    {errorMessage && (
                        <div className="p-3 bg-red-50 border border-red-300 text-red-700 rounded-md text-sm font-medium">
                            {errorMessage}
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleClose}
                            className={secondaryButtonClass}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={primaryButtonClass}
                            disabled={saleData.amount <= 0 || totalShare > 100 || totalShare === 0}
                        >
                            Registrar Venta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}