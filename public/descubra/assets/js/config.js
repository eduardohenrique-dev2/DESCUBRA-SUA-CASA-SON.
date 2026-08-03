/* =========================================================
   CONFIG.JS — Descubra sua Casa | SON
   Único arquivo que a liderança precisa editar.

   1) HOUSE_LINKS: cole o link real do grupo de WhatsApp de
      cada Casa. Se ficar vazio, o botão abre uma conversa
      direta (wa.me) com a mensagem já escrita.
   2) HOUSE_PHONES: se cada Casa tiver um responsável
      diferente, coloque o número aqui (só dígitos, com país).
      Vazio = usa CONTACT_PHONE.
   3) CONTACT_PHONE: contato padrão da jornada.
   ========================================================= */

const HOUSE_LINKS = {
  aguia:  '',
  arvore: '',
  grao:   '',
  cruz:   ''
};

const HOUSE_PHONES = {
  aguia:  '',
  arvore: '',
  grao:   '',
  cruz:   ''
};

/* Contato padrão (Laura) — só dígitos, com código do país */
const CONTACT_PHONE = '5531996164960';

/* Template da mensagem. Variáveis: {{NOME_DA_CASA}}, {{PERCENTUAL}}
   A montagem final passa por encodeURIComponent (app.js -> joinLink),
   preservando emojis e quebras de linha em todos os navegadores. */
const WHATSAPP_TEMPLATE = [
  'Olá, Laura! Tudo bem? 😊',
  '',
  'Acabei de concluir o Descubra sua Casa do Grupo de Jovens SON.',
  '',
  'Minha Casa foi:',
  '🛡 {{NOME_DA_CASA}}',
  '📊 Compatibilidade: {{PERCENTUAL}}%',
  '',
  'Gostaria de entrar no grupo da minha Casa e receber as próximas orientações.',
  '',
  'Que Deus abençoe! 🙏'
].join('\n');
