// Sample investment plans for demonstration purposes
// This will be used as fallback data to show the different fund types

export const sampleInvestmentPlans = [
  // Crypto Plans
  {
    id: 1,
    name: 'Bitcoin Starter',
    description: 'Ideal para iniciantes. Exposição segura ao Bitcoin com gestão profissional de risco.',
    minimumInvestment: 1000,
    monthlyReturnRate: 4.17,
    durationMonths: 12,
    riskLevel: 'low',
    fundType: 'crypto',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: 'Crypto Growth',
    description: 'Carteira diversificada de top 10 criptomoedas para crescimento acelerado.',
    minimumInvestment: 5000,
    monthlyReturnRate: 6.25,
    durationMonths: 12,
    riskLevel: 'medium',
    fundType: 'crypto',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: 'DeFi High Yield',
    description: 'Estratégias avançadas em Finanças Descentralizadas para retornos máximos.',
    minimumInvestment: 10000,
    monthlyReturnRate: 8.33,
    durationMonths: 12,
    riskLevel: 'high',
    fundType: 'crypto',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Real Estate Plans
  {
    id: 4,
    name: 'Imóvel Residencial',
    description: 'Investimento em propriedades residenciais com retorno estável através de aluguel e valorização.',
    minimumInvestment: 25000,
    monthlyReturnRate: 0.80,
    durationMonths: 6,
    riskLevel: 'low',
    fundType: 'real-estate',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    name: 'Imóvel Comercial',
    description: 'Portfolio diversificado de propriedades comerciais em localizações premium.',
    minimumInvestment: 50000,
    monthlyReturnRate: 1.10,
    durationMonths: 9,
    riskLevel: 'medium',
    fundType: 'real-estate',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    name: 'Desenvolvimento Imobiliário',
    description: 'Investimento em projetos de desenvolvimento imobiliário com alto potencial de retorno.',
    minimumInvestment: 100000,
    monthlyReturnRate: 1.50,
    durationMonths: 12,
    riskLevel: 'high',
    fundType: 'real-estate',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Emerging Tech Plans
  {
    id: 7,
    name: 'Inteligência Artificial',
    description: 'Investimento em empresas de IA e machine learning com potencial disruptivo.',
    minimumInvestment: 15000,
    monthlyReturnRate: 2.20,
    durationMonths: 3,
    riskLevel: 'high',
    fundType: 'emerging-tech',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    name: 'Blockchain & Web3',
    description: 'Portfolio diversificado em tecnologias blockchain e aplicações descentralizadas.',
    minimumInvestment: 20000,
    monthlyReturnRate: 2.80,
    durationMonths: 6,
    riskLevel: 'high',
    fundType: 'emerging-tech',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 9,
    name: 'IoT e Smart Cities',
    description: 'Investimento em tecnologias de Internet das Coisas e cidades inteligentes.',
    minimumInvestment: 30000,
    monthlyReturnRate: 1.90,
    durationMonths: 9,
    riskLevel: 'medium',
    fundType: 'emerging-tech',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];