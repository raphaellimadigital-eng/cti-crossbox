/*
 * CTI CrossBox | Informações comerciais em um único lugar.
 * Edite este arquivo no Codex / VS Code quando horários, valores ou condições mudarem.
 * Telefone: DDI (55) + DDD (21) + número, somente dígitos.
 */
window.CTI_CONFIG = {
  whatsappNumero: '5521987557044',
  instagramUsuario: 'cticrossbox',
  instagramUrl: 'https://www.instagram.com/cticrossbox/',
  endereco: {
    linha1: 'Rua Providência, 02',
    linha2: 'Jardim Limeira · Belford Roxo, RJ',
    mapsQuery: 'Rua Providência, 2, Jardim Limeira, Belford Roxo, RJ'
  },
  dias: 'Segunda a sexta',
  horarios: ['07h', '08h', '17h', '18h', '19h', '20h', '21h'],
  planos: [
    { id: 'mensal-3', periodo: 'MENSAL', frequencia: '3x por semana', preco: 100 },
    { id: 'mensal-5', periodo: 'MENSAL', frequencia: '5x por semana', preco: 125 },
    { id: 'trimestral-3', periodo: 'TRIMESTRAL', frequencia: '3x por semana', preco: 250 },
    { id: 'trimestral-5', periodo: 'TRIMESTRAL', frequencia: '5x por semana', preco: 325 }
  ],
  exAlunoDesconto: 20,
  exAlunoCondicao: 'primeiro mês',
  experimental: {
    quantidade: 3,
    apenasNovosAlunos: true,
    precisaAgendar: true,
    compromisso: false
  },
  mensagens: {
    experimental: 'Olá! Vim pelo Instagram do CTI CrossBox e quero agendar minhas 3 aulas experimentais gratuitas. Quais horários estão disponíveis?',
    contato: 'Olá! Vim pelo Instagram do CTI CrossBox e gostaria de tirar uma dúvida.',
    horarios: 'Olá! Gostaria de confirmar as vagas e horários das aulas do CTI CrossBox.',
    exAluno: 'Olá! Já fui aluno do CTI CrossBox e gostaria de saber como utilizar o desconto de 20% no primeiro mês.'
  }
};
