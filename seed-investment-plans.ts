import { storage } from './server/storage';

const samplePlans = [
  // Real Estate Plans
  {
    name: 'Imóvel Residencial',
    description: 'Investimento em propriedades residenciais com retorno estável através de aluguel e valorização.',
    minimumInvestment: 25000,
    monthlyReturnRate: 0.80,
    durationMonths: 24,
    riskLevel: 'low',
    fundType: 'real-estate',
    isActive: true
  },
  {
    name: 'Imóvel Comercial',
    description: 'Portfolio diversificado de propriedades comerciais em localizações premium.',
    minimumInvestment: 50000,
    monthlyReturnRate: 1.10,
    durationMonths: 36,
    riskLevel: 'medium',
    fundType: 'real-estate',
    isActive: true
  },
  {
    name: 'Desenvolvimento Imobiliário',
    description: 'Investimento em projetos de desenvolvimento imobiliário com alto potencial de retorno.',
    minimumInvestment: 100000,
    monthlyReturnRate: 1.50,
    durationMonths: 48,
    riskLevel: 'high',
    fundType: 'real-estate',
    isActive: true
  },
  
  // Emerging Tech Plans
  {
    name: 'Inteligência Artificial',
    description: 'Investimento em empresas de IA e machine learning com potencial disruptivo.',
    minimumInvestment: 15000,
    monthlyReturnRate: 2.20,
    durationMonths: 18,
    riskLevel: 'high',
    fundType: 'emerging-tech',
    isActive: true
  },
  {
    name: 'Blockchain & Web3',
    description: 'Portfolio diversificado em tecnologias blockchain e aplicações descentralizadas.',
    minimumInvestment: 20000,
    monthlyReturnRate: 2.80,
    durationMonths: 24,
    riskLevel: 'high',
    fundType: 'emerging-tech',
    isActive: true
  },
  {
    name: 'IoT e Smart Cities',
    description: 'Investimento em tecnologias de Internet das Coisas e cidades inteligentes.',
    minimumInvestment: 30000,
    monthlyReturnRate: 1.90,
    durationMonths: 30,
    riskLevel: 'medium',
    fundType: 'emerging-tech',
    isActive: true
  }
];

async function seedInvestmentPlans() {
  try {
    console.log('Adding sample investment plans...');
    
    for (const plan of samplePlans) {
      try {
        const created = await storage.createInvestmentPlan(plan as any);
        console.log(`✓ Added: ${created.name} (${plan.fundType})`);
      } catch (error) {
        console.log(`✗ Failed to add: ${plan.name} - ${error}`);
      }
    }
    
    console.log('✅ Sample investment plans seeding completed!');
    
  } catch (error) {
    console.error('❌ Error seeding investment plans:', error);
  }
}

seedInvestmentPlans().catch(console.error);