// Sample investment plans for demonstration purposes
// This will be used as fallback data to show the different fund types

export const sampleInvestmentPlans = [
  // Crypto Plans (existing + samples)
  {
    id: 1,
    name: 'Conservative Plan',
    description: 'Low-risk investment with stable returns. Perfect for beginners or risk-averse investors.',
    minimumInvestment: '1000.00',
    monthlyReturnRate: '0.50',
    durationMonths: 6,
    riskLevel: 'low',
    fundType: 'crypto',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: 'Balanced Growth',
    description: 'Medium-risk investment balancing stability and growth. Ideal for intermediate investors.',
    minimumInvestment: '5000.00',
    monthlyReturnRate: '1.20',
    durationMonths: 12,
    riskLevel: 'medium',
    fundType: 'crypto',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: 'Aggressive Growth',
    description: 'Higher-risk investment strategy focusing on maximum returns. For experienced investors.',
    minimumInvestment: '10000.00',
    monthlyReturnRate: '2.50',
    durationMonths: 18,
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
    minimumInvestment: '25000.00',
    monthlyReturnRate: '0.80',
    durationMonths: 24,
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
    minimumInvestment: '50000.00',
    monthlyReturnRate: '1.10',
    durationMonths: 36,
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
    minimumInvestment: '100000.00',
    monthlyReturnRate: '1.50',
    durationMonths: 48,
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
    minimumInvestment: '15000.00',
    monthlyReturnRate: '2.20',
    durationMonths: 18,
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
    minimumInvestment: '20000.00',
    monthlyReturnRate: '2.80',
    durationMonths: 24,
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
    minimumInvestment: '30000.00',
    monthlyReturnRate: '1.90',
    durationMonths: 30,
    riskLevel: 'medium',
    fundType: 'emerging-tech',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];