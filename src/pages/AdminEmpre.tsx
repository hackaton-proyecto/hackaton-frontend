import { useState } from 'react';

import ModalRegistrarVenta from './../components/RegistroVenta'; 

interface Investor {
    id: string;
    name: string;
    agreedShare: number;
}
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

interface Sale {
    id: string;
    amount: number;
    date: string;
  
    distribution: SaleDistribution[]; 
    description: string; 
}

interface FinancialData {
    fundsReceived: number;
    expenses: number;
    totalSales: number;
    inflowDetails: { name: string; amount: number; note: string }[];
    outflowDetails: { name: string; amount: number; note: string }[];
    sales: Sale[]; 
}


const INVERSORES_BASE: Investor[] = [
    { id: 'I001', name: 'Inversor Beta', agreedShare: 40 },
    { id: 'I002', name: 'Inversor Alpha', agreedShare: 35 },
    { id: 'I003', name: 'Socio Minoritario', agreedShare: 25 },
];




const primaryColorClass = "bg-slate-700 hover:bg-slate-600";
const primaryTextColorClass = "text-slate-800";
const logSaleButtonClass = "bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out w-full shadow-md";


const initialData: FinancialData = {
    fundsReceived: 1550000,
    expenses: 720000,
    totalSales: 1280000, 
    inflowDetails: [
        { name: "Monto requerido", amount: 100000000, note: "Inversión capital semilla" },
       
    ],
    outflowDetails: [
        { name: "Materiales", amount: 200000, note: "Compra de materias primas" },
        { name: "Inventario", amount: 180000, note: "Stock inicial de productos" },
        { name: "Campaña Marketing", amount: 300000, note: "Publicidad digital" },
        { name: "Suscripción Software", amount: 40000, note: "Licencias SaaS" },
    ],
   
    sales: [
        { 
            id: "VTA001", 
            amount: 200000, 
            date: "26/10", 
            description: "Venta Mayorista Cliente 1",
            distribution: [
                { investorId: 'I001', amountShare: 40 },
                { investorId: 'I002', amountShare: 35 },
                { investorId: 'I003', amountShare: 25 },
            ]
        },
        { 
            id: "VTA002", 
            amount: 120000, 
            date: "25/10", 
            description: "Venta Minorista E-commerce",
            distribution: [
                { investorId: 'I001', amountShare: 35 }, 
                { investorId: 'I002', amountShare: 30 },
                { investorId: 'I003', amountShare: 20 },
            ]
        },
    ]
};


const formatCurrency = (amount: number) => {
  
    return amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 });
};

export default function FinancialOverview() {
    const [showNewSaleModal, setShowNewSaleModal] = useState(false);
    const [financeData, setFinanceData] = useState<FinancialData>(initialData);
    
    const [paymentsHistory, setPaymentsHistory] = useState<any[]>([]); 

    const calculateButtonClass = `${primaryColorClass} text-white px-4 py-2 rounded-md font-semibold transition duration-200 ease-in-out w-full shadow-md`;

    const handleNewSale = (newSaleData: NewSaleData) => {
        const totalShare = newSaleData.distribution.reduce((sum, d) => sum + d.amountShare, 0);
        
       
        const newSale: Sale = {
            id: `VTA${(financeData.sales.length + 1).toString().padStart(3, '0')}`,
            amount: newSaleData.amount,
           
            date: newSaleData.date.substring(8), 
            distribution: newSaleData.distribution,
            description: newSaleData.description
        };

        setFinanceData(prevData => ({
            ...prevData,
            totalSales: prevData.totalSales + newSaleData.amount,
            sales: [...prevData.sales, newSale],
        }));
        
      
        alert(`Venta de ${formatCurrency(newSaleData.amount)} registrada. Participación a distribuir: ${totalShare.toFixed(2)}%.`);
    };

    const handleDistributeProfits = () => {
        const salesToDistribute = financeData.sales;
        
        if (salesToDistribute.length === 0) {
            alert("No hay ventas pendientes de distribución.");
            return;
        }
        
        const newPayments: any[] = [];
        let totalDistributedAmount = 0;
        let totalSalesAmountDistributed = 0;

        salesToDistribute.forEach((sale) => {
          
            
            totalSalesAmountDistributed += sale.amount; 
            
            
            sale.distribution.forEach((saleDist) => {
                const investor = INVERSORES_BASE.find(inv => inv.id === saleDist.investorId);
                if (!investor) return; 

                
                const investorPayout = (sale.amount * saleDist.amountShare) / 100;

                totalDistributedAmount += investorPayout;
                
                if (investorPayout > 0) {
                    newPayments.push({
                        saleId: sale.id,
                        investorId: investor.id,
                        investorName: investor.name,
                        amount: investorPayout,
                        date: new Date().toLocaleDateString('es-AR'),
                    });
                }
            });
        });
        
        setPaymentsHistory(prev => [...prev, ...newPayments]);
        
        setFinanceData(prev => ({
            ...prev,
            sales: [], 
            totalSales: prev.totalSales - totalSalesAmountDistributed, 
        }));

        alert(`¡Distribución completada! Se calcularon ${newPayments.length} pagos por un total de ${formatCurrency(totalDistributedAmount)} ARS.`);
    };
    
    const renderPaymentsHistory = () => (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold text-slate-700 mb-4 border-b border-gray-300 pb-2">Historial de Pagos y Distribuciones</h3>
            <ul className="text-sm text-gray-700 space-y-2">
                {paymentsHistory.length === 0 ? (
                    <li className="text-gray-500">No hay distribuciones registradas aún.</li>
                ) : (
                    paymentsHistory.map((p, index) => (
                        <li key={index} className="border-b border-gray-200 pb-2 last:border-b-0">
                            El inversor **{p.investorName}** recibió **{formatCurrency(p.amount)} ARS** correspondiente a la Venta {p.saleId}. (Fecha de Pago: {p.date})
                        </li>
                    ))
                )}
            </ul>
        </div>
    );

   
    const getInvestorSharePercentage = (sale: Sale) => {
        return sale.distribution.reduce((sum, d) => sum + d.amountShare, 0);
    };
    
    const salesTotalAmount = financeData.sales.reduce((sum, sale) => sum + sale.amount, 0);

    return (
        <div className="flex justify-center mt-10 p-4">
            <div className="w-full max-w-5xl bg-white rounded-xl border border-gray-200 p-8 md:p-12 shadow-2xl">
                
                <h1 className={`${primaryTextColorClass} text-3xl font-extrabold mb-10 text-center`}>
                    Panel de Resumen Financiero
                </h1>
                
                <div className="flex flex-col lg:flex-row gap-8">
                   
                    <div className="flex flex-col gap-8 lg:w-2/3">
                        
                        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
                            <h2 className="text-xl font-bold text-gray-700 mb-6">Fondos Recibidos (ARS)</h2>
                            <div className="mb-4">
                                <p className="text-5xl font-extrabold text-green-700">
                                    {formatCurrency(financeData.fundsReceived)}
                                </p>
                                <p className="text-sm text-gray-500 mt-2">Ingreso Total de Capital (Histórico)</p>
                            </div>
                            
                            <hr className="my-4 border-gray-100" />
                            
                            <ul className="space-y-2 text-gray-700 text-sm">
                                {financeData.inflowDetails.map((item, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>{item.name}:</span> 
                                        <span className="font-semibold text-green-600">{formatCurrency(item.amount)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

            s
                        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
                            <h2 className="text-xl font-bold text-gray-700 mb-6">Gastos (ARS)</h2>
                            <div className="mb-4">
                                <p className="text-5xl font-extrabold text-red-700">
                                    {formatCurrency(financeData.expenses)}
                                </p>
                                <p className="text-sm text-gray-500 mt-2">Egreso Total de Capital (Histórico)</p>
                            </div>
                            
                            <hr className="my-4 border-gray-100" />
                            
                            <ul className="space-y-2 text-gray-700 text-sm">
                                {financeData.outflowDetails.map((item, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>{item.name}:</span> 
                                        <span className="font-semibold text-red-600">{formatCurrency(item.amount)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <div className="lg:w-1/3 bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-lg">
                        <h2 className="text-xl font-bold text-slate-700 mb-6 border-b border-gray-200 pb-3">Gestión de Distribución</h2>
                        
                        <p className="text-lg font-bold text-gray-800 mb-4">
                            Ventas Pendientes: <span className="font-extrabold text-orange-600">{formatCurrency(salesTotalAmount)}</span>
                        </p>
                        
                      
                        <button 
                            className={logSaleButtonClass}
                            onClick={() => setShowNewSaleModal(true)}
                        >
                            + Registrar Nueva Venta
                        </button>
                        
                        <div className="mt-6">
                            <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">Detalle de Ventas ({financeData.sales.length})</h3>
                            <div className="overflow-x-auto border border-gray-200 rounded-md shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200 bg-white">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Monto</th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">% Inversor</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        
                                        {financeData.sales.map((sale) => (
                                            <tr key={sale.id} className="hover:bg-gray-50">
                                                <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{sale.id}</td>
                                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 font-semibold">{formatCurrency(sale.amount)}</td>
                                                <td className="px-3 py-2 whitespace-nowrap text-sm font-bold text-slate-700">{getInvestorSharePercentage(sale).toFixed(2)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div className="mt-6">
                         
                            <button 
                                className={calculateButtonClass}
                                onClick={handleDistributeProfits}
                                disabled={financeData.sales.length === 0}
                            >
                                Distribuir Ganancias de {financeData.sales.length} Ventas
                            </button>
                        </div>
                    </div>
                </div>
                
                {renderPaymentsHistory()}

            </div>

       
            <ModalRegistrarVenta 
                isOpen={showNewSaleModal}
                onClose={() => setShowNewSaleModal(false)}
          
                onSubmit={handleNewSale} 
            />
        </div>
    );
}