/* =========================================================
   QUIZ-DATA.JS — Descubra sua Casa | SON
   Conteúdo do experimento: características, perfis das Casas,
   perguntas e mensagens. Edite este arquivo livremente sem
   tocar na lógica em app.js.

   Estrutura:
     1. TRAITS            - as 10 características avaliadas
     2. HOUSE_PROFILES    - vetor de características por Casa
     3. HOUSES            - conteúdo textual das 4 Casas
     4. QUESTIONS         - as 12 perguntas de discernimento
     5. PROGRESS_MESSAGES - mensagens de progresso do quiz
     6. LOADING_SEQUENCE  - mensagens da revelação
     7. TRAIT_LABELS      - rótulos para a seção de perfil
   ========================================================= */

/* =======================================================
   1. TRAITS
======================================================= */
const TRAITS = [
  "lideranca",
  "comunicacao",
  "missao",
  "iniciativa",
  "espiritualidade",
  "fraternidade",
  "acolhimento",
  "servico",
  "perseveranca",
  "sabedoria"
];

/* =======================================================
   2. HOUSE_PROFILES
   Cada Casa é um vetor com as 10 características de TRAITS,
   de 0 (não representa) a 5 (representa totalmente).
   O algoritmo compara o vetor do jovem com estes perfis por
   similaridade de cosseno (app.js -> computeResult).
======================================================= */
const HOUSE_PROFILES = {

  // Águia — visão, liderança, iniciativa, missão, comunicação
  aguia: {
    lideranca: 5, comunicacao: 5, missao: 5, iniciativa: 5,
    espiritualidade: 3, fraternidade: 2, acolhimento: 2,
    servico: 2, perseveranca: 3, sabedoria: 3
  },

  // Árvore da Vida — enraizamento, fraternidade, acolhimento, sabedoria
  arvore: {
    lideranca: 2, comunicacao: 3, missao: 3, iniciativa: 2,
    espiritualidade: 5, fraternidade: 5, acolhimento: 5,
    servico: 3, perseveranca: 4, sabedoria: 5
  },

  // Grão de Trigo — serviço silencioso, perseverança, entrega
  grao: {
    lideranca: 2, comunicacao: 2, missao: 4, iniciativa: 2,
    espiritualidade: 4, fraternidade: 3, acolhimento: 3,
    servico: 5, perseveranca: 5, sabedoria: 3
  },

  // Cruz — oração, profundidade espiritual, fidelidade, discernimento
  cruz: {
    lideranca: 3, comunicacao: 3, missao: 4, iniciativa: 2,
    espiritualidade: 5, fraternidade: 3, acolhimento: 3,
    servico: 4, perseveranca: 5, sabedoria: 5
  }

};

/* =======================================================
   3. HOUSES
   Ordem das chaves = ordem dos escudos na interface.
======================================================= */
const HOUSES = {

  aguia: {
    name: "Casa Águia",
    shortName: "Águia",
    tagline: "Visão que conduz",
    image: "images/houses/aguia.webp",
    description:
      "Você foi criado para enxergar além e conduzir pelo exemplo. Como a águia, Deus o chama a voar alto na fé e a abrir caminhos para que outros também subam.",
    verse:
      "\u201cMas os que esperam no Senhor renovarão as suas forças e voarão alto como águias.\u201d",
    verseRef: "Isaías 40:31",
    whyFit:
      "Suas respostas revelam alguém que percebe o próximo passo antes dos outros, comunica com clareza e não teme assumir a frente quando é preciso decidir.",
    whatYouWillLive: [
      "Formação em liderança e discernimento vocacional",
      "Oportunidades reais de conduzir projetos e pequenos grupos",
      "Acompanhamento espiritual para lapidar sua visão a serviço da missão"
    ]
  },

  arvore: {
    name: "Casa Árvore da Vida",
    shortName: "Árvore da Vida",
    tagline: "Permanecer para dar frutos",
    image: "images/houses/arvore.webp",
    description:
      "Como a árvore plantada junto às águas, você sustenta, abriga e dá frutos no tempo certo. Sua presença cria raízes de fé em quem caminha ao seu lado.",
    verse:
      "\u201cEle é como a árvore plantada junto às águas, que estende as suas raízes para o ribeiro.\u201d",
    verseRef: "Jeremias 17:8",
    whyFit:
      "Suas respostas revelam alguém que cresce de forma constante, valoriza relações profundas e transmite segurança a quem está por perto.",
    whatYouWillLive: [
      "Formação espiritual contínua e vida de oração",
      "Vida fraterna profunda e amizades que sustentam a fé",
      "Missão vivida com constância, cuidado e escuta"
    ]
  },

  grao: {
    name: "Casa Grão de Trigo",
    shortName: "Grão de Trigo",
    tagline: "Serviço que floresce",
    image: "images/houses/grao.webp",
    description:
      "Você floresce onde é plantado e serve sem precisar ser visto. Como o grão que cai na terra, sua entrega silenciosa gera vida ao seu redor.",
    verse:
      "\u201cSe o grão de trigo não cair na terra e não morrer, fica só; mas, se morrer, dá muito fruto.\u201d",
    verseRef: "João 12:24",
    whyFit:
      "Suas respostas mostram alguém que se doa nas pequenas coisas, ajuda sem esperar reconhecimento e encontra em Deus a força para permanecer.",
    whatYouWillLive: [
      "Experiências práticas de serviço dentro e fora do grupo",
      "Uma comunidade que valoriza cada gesto discreto de cuidado",
      "Crescimento espiritual pela entrega e pela perseverança"
    ]
  },

  cruz: {
    name: "Casa Cruz",
    shortName: "Cruz",
    tagline: "Fidelidade que sustenta",
    image: "images/houses/cruz.webp",
    description:
      "Sua caminhada nasce da oração e se firma na fidelidade. Na Cruz você aprende a permanecer quando é difícil e a transformar entrega em vida nova.",
    verse:
      "\u201cSe alguém quer vir após mim, tome cada dia a sua cruz e siga-me.\u201d",
    verseRef: "Lucas 9:23",
    whyFit:
      "Suas respostas revelam alguém que busca a vontade de Deus antes de agir, escuta com profundidade e permanece fiel mesmo quando o caminho pesa.",
    whatYouWillLive: [
      "Vida de oração, silêncio e escuta da Palavra",
      "Acompanhamento espiritual e discernimento do seu chamado",
      "Missão sustentada pela intercessão e pela fidelidade diária"
    ]
  }

};

/* =======================================================
   4. QUESTIONS
   12 perguntas de discernimento baseadas em situações reais
   vividas dentro do SON (encontros, retiros, missão, oração,
   acolhida, convivência, evangelização, organização, serviço).
   Cada alternativa distribui pesos entre 3 e 4 características,
   sem apontar diretamente para nenhuma Casa.
======================================================= */
const QUESTIONS = [

  {
    text: "Você chegou ao SON pela primeira vez. Enquanto espera o encontro começar, percebe que o ambiente ainda está sendo preparado. O que você faz naturalmente?",
    options: [
      {
        text: "Cumprimento as pessoas e começo a conhecer quem está por perto.",
        weights: { comunicacao: 2, fraternidade: 2, acolhimento: 2, iniciativa: 1 }
      },
      {
        text: "Observo primeiro como tudo funciona antes de decidir onde posso ajudar.",
        weights: { sabedoria: 2, espiritualidade: 2, perseveranca: 2, acolhimento: 1 }
      },
      {
        text: "Percebo que algumas pessoas estão organizando o espaço e me ofereço para colaborar.",
        weights: { servico: 3, perseveranca: 2, iniciativa: 1, fraternidade: 1 }
      },
      {
        text: "Procuro a coordenação para entender como posso contribuir durante o encontro.",
        weights: { lideranca: 2, missao: 2, comunicacao: 1, iniciativa: 2 }
      }
    ]
  },

  {
    text: "Pouco antes do encontro começar acontece um imprevisto. Qual seria sua reação mais natural?",
    options: [
      {
        text: "Organizo rapidamente quem pode resolver a situação.",
        weights: { lideranca: 2, iniciativa: 2, comunicacao: 2, missao: 1 }
      },
      {
        text: "Vou ajudar diretamente a resolver o problema.",
        weights: { servico: 3, perseveranca: 2, iniciativa: 1, missao: 1 }
      },
      {
        text: "Procuro tranquilizar quem ficou preocupado.",
        weights: { acolhimento: 3, fraternidade: 2, sabedoria: 1, espiritualidade: 1 }
      },
      {
        text: "Analiso a situação antes de decidir qual é a melhor solução.",
        weights: { sabedoria: 3, perseveranca: 2, lideranca: 1, iniciativa: 1 }
      }
    ]
  },

  {
    text: "Durante um momento de oração, qual atitude mais representa você?",
    options: [
      {
        text: "Sinto vontade de incentivar outras pessoas a se aproximarem de Deus.",
        weights: { comunicacao: 2, missao: 2, lideranca: 1, espiritualidade: 2 }
      },
      {
        text: "Permaneço em silêncio, buscando ouvir a voz de Deus.",
        weights: { espiritualidade: 3, sabedoria: 2, perseveranca: 2 }
      },
      {
        text: "Rezo especialmente pelas pessoas que estão passando por dificuldades.",
        weights: { acolhimento: 2, fraternidade: 2, espiritualidade: 2, servico: 1 }
      },
      {
        text: "Peço força para viver minha missão com fidelidade.",
        weights: { missao: 3, perseveranca: 2, espiritualidade: 2 }
      }
    ]
  },

  {
    text: "Você percebe um jovem que chegou sozinho e parece tímido. O que faz naturalmente?",
    options: [
      {
        text: "Vou conversar com ele e fazer com que se sinta bem-vindo.",
        weights: { acolhimento: 3, comunicacao: 2, fraternidade: 2 }
      },
      {
        text: "Convido outras pessoas para integrá-lo ao grupo.",
        weights: { lideranca: 2, fraternidade: 2, comunicacao: 2, missao: 1 }
      },
      {
        text: "Observo primeiro para entender como posso ajudá-lo da melhor forma.",
        weights: { sabedoria: 3, acolhimento: 2, espiritualidade: 1, perseveranca: 1 }
      },
      {
        text: "Encontro uma atividade para que ele participe desde o início.",
        weights: { iniciativa: 2, servico: 2, acolhimento: 2, missao: 1 }
      }
    ]
  },

  {
    text: "O SON vai realizar uma ação missionária na comunidade. Qual função mais combina com você?",
    options: [
      {
        text: "Organizar as equipes e definir como a missão acontecerá.",
        weights: { lideranca: 3, missao: 2, iniciativa: 2, comunicacao: 1 }
      },
      {
        text: "Conversar diretamente com as pessoas e anunciar a mensagem.",
        weights: { comunicacao: 3, missao: 2, acolhimento: 1, fraternidade: 1 }
      },
      {
        text: "Acompanhar quem demonstra mais dificuldade ou insegurança.",
        weights: { acolhimento: 2, fraternidade: 2, servico: 2, sabedoria: 1 }
      },
      {
        text: "Fazer qualquer tarefa necessária para que tudo aconteça bem.",
        weights: { servico: 3, perseveranca: 2, iniciativa: 1, missao: 1 }
      }
    ]
  },

  {
    text: "O encontro terminou, mas ainda há bastante trabalho para guardar tudo. Qual atitude mais representa você?",
    options: [
      {
        text: "Ajudo a organizar quem fará cada tarefa.",
        weights: { lideranca: 2, comunicacao: 2, iniciativa: 2, servico: 1 }
      },
      {
        text: "Começo imediatamente a ajudar no que estiver mais urgente.",
        weights: { servico: 3, perseveranca: 2, iniciativa: 2 }
      },
      {
        text: "Percebo quem está cansado e vou ajudá-lo primeiro.",
        weights: { acolhimento: 2, fraternidade: 2, servico: 2, espiritualidade: 1 }
      },
      {
        text: "Permaneço até que tudo esteja finalizado, mesmo que demore.",
        weights: { perseveranca: 3, servico: 2, missao: 1, espiritualidade: 1 }
      }
    ]
  },

  {
    text: "Durante uma reunião surgem opiniões diferentes sobre uma atividade. Como você costuma agir?",
    options: [
      {
        text: "Conduzo a conversa para que o grupo encontre uma decisão.",
        weights: { lideranca: 3, comunicacao: 2, sabedoria: 1, fraternidade: 1 }
      },
      {
        text: "Escuto todos antes de dar minha opinião.",
        weights: { sabedoria: 3, acolhimento: 2, espiritualidade: 1, fraternidade: 1 }
      },
      {
        text: "Busco uma solução que preserve a união entre todos.",
        weights: { fraternidade: 3, acolhimento: 2, comunicacao: 1, sabedoria: 1 }
      },
      {
        text: "Apoio a decisão tomada e ajudo para que ela aconteça.",
        weights: { servico: 2, perseveranca: 2, missao: 2, iniciativa: 1 }
      }
    ]
  },

  {
    text: "Durante um retiro você percebe que um integrante está desanimado. Qual atitude é mais natural para você?",
    options: [
      {
        text: "Converso com ele e procuro motivá-lo.",
        weights: { comunicacao: 2, acolhimento: 2, fraternidade: 2, lideranca: 1 }
      },
      {
        text: "Fico ao lado dele, mesmo sem dizer muitas palavras.",
        weights: { espiritualidade: 2, acolhimento: 2, sabedoria: 2, fraternidade: 1 }
      },
      {
        text: "Chamo outras pessoas para ajudá-lo também.",
        weights: { lideranca: 2, fraternidade: 2, comunicacao: 2, servico: 1 }
      },
      {
        text: "Rezo por ele e continuo acompanhando discretamente.",
        weights: { espiritualidade: 3, servico: 2, perseveranca: 2 }
      }
    ]
  },

  {
    text: "O SON decidiu iniciar um novo projeto de evangelização. Qual papel você assume naturalmente?",
    options: [
      {
        text: "Planejo como tudo será feito e ajudo a coordenar a equipe.",
        weights: { lideranca: 3, iniciativa: 2, missao: 2, comunicacao: 1 }
      },
      {
        text: "Penso em maneiras criativas de aproximar mais jovens do grupo.",
        weights: { comunicacao: 2, missao: 2, sabedoria: 2, iniciativa: 1 }
      },
      {
        text: "Quero garantir que todos se sintam parte do projeto.",
        weights: { acolhimento: 3, fraternidade: 2, servico: 1, espiritualidade: 1 }
      },
      {
        text: "Prefiro trabalhar nos bastidores para que tudo aconteça da melhor forma.",
        weights: { servico: 3, perseveranca: 2, espiritualidade: 1, fraternidade: 1 }
      }
    ]
  },

  {
    text: "Depois de algumas semanas, o projeto enfrenta dificuldades e parte da equipe desanima. O que você faz primeiro?",
    options: [
      {
        text: "Procuro um novo caminho e incentivo todos a continuar.",
        weights: { lideranca: 2, missao: 2, iniciativa: 2, perseveranca: 1 }
      },
      {
        text: "Converso individualmente com quem está desanimado.",
        weights: { acolhimento: 3, fraternidade: 2, comunicacao: 1, sabedoria: 1 }
      },
      {
        text: "Continuo fazendo minha parte com dedicação, dando exemplo.",
        weights: { servico: 3, perseveranca: 3, espiritualidade: 1 }
      },
      {
        text: "Analiso tudo o que aconteceu antes de sugerir mudanças.",
        weights: { sabedoria: 3, espiritualidade: 2, lideranca: 1, perseveranca: 1 }
      }
    ]
  },

  {
    text: "Imagine que Deus lhe confia uma missão importante dentro do SON. Qual atitude mais representa seu coração?",
    options: [
      {
        text: "Aceito o desafio e procuro conduzir outras pessoas pelo exemplo.",
        weights: { lideranca: 3, missao: 2, comunicacao: 2 }
      },
      {
        text: "Quero caminhar junto das pessoas, ajudando cada uma a crescer.",
        weights: { fraternidade: 3, acolhimento: 2, espiritualidade: 2 }
      },
      {
        text: "Estou disposto a servir onde houver necessidade, mesmo sem reconhecimento.",
        weights: { servico: 3, perseveranca: 2, espiritualidade: 2 }
      },
      {
        text: "Antes de qualquer decisão, busco compreender a vontade de Deus.",
        weights: { sabedoria: 3, espiritualidade: 3, missao: 1 }
      }
    ]
  },

  {
    text: "Ao terminar essa experiência, qual frase representa melhor o desejo que existe em seu coração?",
    options: [
      {
        text: "Quero inspirar outras pessoas a caminhar com Cristo.",
        weights: { lideranca: 2, missao: 3, comunicacao: 2 }
      },
      {
        text: "Quero construir amizades que fortaleçam a fé de todos.",
        weights: { fraternidade: 3, acolhimento: 2, espiritualidade: 2 }
      },
      {
        text: "Quero servir com alegria, mesmo nas pequenas tarefas.",
        weights: { servico: 3, perseveranca: 2, espiritualidade: 2 }
      },
      {
        text: "Quero crescer espiritualmente e descobrir cada vez mais meu chamado.",
        weights: { espiritualidade: 3, sabedoria: 2, missao: 2 }
      }
    ]
  }

];

/* =======================================================
   5. PROGRESS_MESSAGES
   Exibidas acima da pergunta conforme o avanço do quiz.
======================================================= */

/* =======================================================
   5. PROGRESS_MESSAGES — durante o quiz
======================================================= */
const PROGRESS_MESSAGES = [
  { until: 0.15, text: "Estamos conhecendo sua caminhada" },
  { until: 0.4,  text: "Cada resposta revela um pouco mais da sua missão" },
  { until: 0.7,  text: "Discernindo seus dons" },
  { until: 0.95, text: "Quase lá" },
  { until: 1.01, text: "Preparando sua Casa" }
];

/* =======================================================
   6. LOADING_SEQUENCE — revelação cinematográfica
   A ordem é exatamente a ordem exibida na tela.
======================================================= */
const LOADING_SEQUENCE = [
  "Analisando sua caminhada...",
  "Comparando seu perfil...",
  "Discernindo sua missão...",
  "Preparando sua Casa..."
];

/* =======================================================
   7. TRAIT_LABELS — usados na seção de perfil
======================================================= */
const TRAIT_LABELS = {
  lideranca:       { name: "Liderança",       phrase: "liderança e visão" },
  comunicacao:     { name: "Comunicação",     phrase: "comunicação clara" },
  missao:          { name: "Missão",          phrase: "compromisso missionário" },
  iniciativa:      { name: "Iniciativa",      phrase: "iniciativa e coragem" },
  espiritualidade: { name: "Espiritualidade", phrase: "profundidade espiritual" },
  fraternidade:    { name: "Fraternidade",    phrase: "espírito fraterno" },
  acolhimento:     { name: "Acolhimento",     phrase: "acolhimento e cuidado" },
  servico:         { name: "Serviço",         phrase: "dedicação ao serviço" },
  perseveranca:    { name: "Perseverança",    phrase: "perseverança e constância" },
  sabedoria:       { name: "Sabedoria",       phrase: "sabedoria e discernimento" }
};
