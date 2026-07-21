// ============================================================
// GG TECH — Configuração central do site
// Troque os valores abaixo para atualizar o site inteiro.
// ============================================================

const SITE_CONFIG = {
  empresa: {
    nome: "GG Tech",
    nomeCompleto: "GG Tech Soluções Digitais",
    slogan: "Engenharia digital para negócios que querem crescer de verdade",
    cidade: "Vargem Grande Paulista",
    estado: "SP",
    endereco: "Vargem Grande Paulista, SP — atendimento em todo o Brasil (remoto)",
    cnpj: "00.000.000/0001-00", // TODO: inserir CNPJ real
  },

  contato: {
    whatsapp: "5511999999999", // TODO: inserir número real (formato DDI+DDD+numero, só dígitos)
    whatsappDisplay: "(11) 99999-9999",
    email: "contato@ggtech.com.br", // TODO: e-mail real
    telefone: "(11) 99999-9999",
    instagram: "https://instagram.com/ggtech", // TODO: link real
    linkedin: "https://linkedin.com/company/ggtech", // TODO: link real
  },

  seo: {
    tituloBase: "GG Tech — Sites e Sistemas sob Medida | Vargem Grande Paulista, SP",
    descricao:
      "GG Tech desenvolve sites institucionais, landing pages e sistemas sob medida (SaaS, CRMs, automações) com identidade visual exclusiva para cada negócio. Performance, SEO técnico e conversão real.",
    palavrasChave:
      "desenvolvimento de sites, sistemas sob medida, SaaS, CRM personalizado, automação, cibersegurança, landing page, sites para clínicas, sites para advogados, agência digital Vargem Grande Paulista",
    urlCanonica: "https://www.ggtech.com.br/",
    imagemOG: "assets/icons/og-image.png", // TODO: gerar imagem 1200x630
  },

  formulario: {
    // TODO: trocar pelo endpoint real do Formspree (ou outro serviço) para ativar o envio
    endpoint: "https://formspree.io/f/SEU_ID_AQUI",
  },

  mapa: {
    // TODO: trocar pelo embed real do Google Maps da região de atendimento
    embedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58649.0!2d-47.02!3d-23.60!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM2JzAwLjAiUyA0N8KwMDInMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v0000000000000",
  },
};
