// Sample investment plans for demonstration purposes
// This will be used as fallback data to show the different fund types

export const sampleInvestmentPlans = [
  // Crypto Plans - Planos atualizados
  {
    id: 1,
    name: 'Plano Bronze',
    description: 'Plano de entrada com investimento acessível e retornos estáveis. Ideal para iniciantes.',
    minimumInvestment: '1000.00',
    monthlyReturnRate: '4.17',
    durationMonths: 12,
    riskLevel: 'low',
    fundType: 'crypto',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: 'Plano Prata',
    description: 'Plano intermédio com equilíbrio entre risco e retorno. Para investidores com experiência.',
    minimumInvestment: '1500.00',
    monthlyReturnRate: '6.25',
    durationMonths: 12,
    riskLevel: 'medium',
    fundType: 'crypto',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: 'Plano Ouro',
    description: 'Plano premium com os maiores retornos. Para investidores experientes e com maior tolerância ao risco.',
    minimumInvestment: '3000.00',
    monthlyReturnRate: '8.33',
    durationMonths: 12,
    riskLevel: 'high',
    fundType: 'crypto',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Real Estate Plans - Em desenvolvimento
  // Os planos imobiliários estão atualmente em desenvolvimento
  
  // Emerging Tech Plans - Em desenvolvimento  
  // Os planos de tecnologias emergentes estão atualmente em desenvolvimento
];