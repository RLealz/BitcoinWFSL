import { neon } from "@neondatabase/serverless";

async function addFundTypes() {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    // Add fundType column if it doesn't exist
    await sql`
      ALTER TABLE investment_plans 
      ADD COLUMN IF NOT EXISTS fund_type VARCHAR(50) NOT NULL DEFAULT 'crypto';
    `;

    console.log('Added fund_type column');

    // Insert sample real estate plans
    await sql`
      INSERT INTO investment_plans (name, description, minimum_investment, monthly_return_rate, duration_months, risk_level, fund_type, is_active, created_at, updated_at)
      VALUES 
        ('Imóvel Residencial', 'Investimento em propriedades residenciais com retorno estável através de aluguel e valorização.', 25000.00, 0.80, 24, 'low', 'real-estate', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('Imóvel Comercial', 'Portfolio diversificado de propriedades comerciais em localizações premium.', 50000.00, 1.10, 36, 'medium', 'real-estate', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('Desenvolvimento Imobiliário', 'Investimento em projetos de desenvolvimento imobiliário com alto potencial de retorno.', 100000.00, 1.50, 48, 'high', 'real-estate', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT DO NOTHING;
    `;

    console.log('Added real estate plans');

    // Insert sample emerging tech plans
    await sql`
      INSERT INTO investment_plans (name, description, minimum_investment, monthly_return_rate, duration_months, risk_level, fund_type, is_active, created_at, updated_at)
      VALUES 
        ('Inteligência Artificial', 'Investimento em empresas de IA e machine learning com potencial disruptivo.', 15000.00, 2.20, 18, 'high', 'emerging-tech', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('Blockchain & Web3', 'Portfolio diversificado em tecnologias blockchain e aplicações descentralizadas.', 20000.00, 2.80, 24, 'high', 'emerging-tech', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('IoT e Smart Cities', 'Investimento em tecnologias de Internet das Coisas e cidades inteligentes.', 30000.00, 1.90, 30, 'medium', 'emerging-tech', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT DO NOTHING;
    `;

    console.log('Added emerging tech plans');

    console.log('Successfully added fund types and sample data!');
    
  } catch (error) {
    console.error('Error adding fund types:', error);
    throw error;
  }
}

addFundTypes().catch(console.error);