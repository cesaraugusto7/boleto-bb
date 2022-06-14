/* const Boleto = require('../index').Boleto */
const Boleto = require('../src/lib/boleto');
var pdf = require('html-pdf')
/* var html = fs.readFileSync('./boleto.html', 'utf8'); */
var options = {
  format: 'Letter',
  'border': {
    'right': '20px',
    'left': '20px'
  }
}

var boleto = new Boleto({
  'codigo': "001", // código do Banco do Brasil
  'cedente': "Nome do beneficiário", // nome do beneficiário
  'cedente_cnpj': "18727053000174", // sem pontos e traços
  'local_de_pagamento': 'Pagável em qualquer agência bancária até o vencimento', // local de pagamento
  'codigo_cedente': "6404154", // codigo da carteira do beneficiário
  'carteira': "102", // carteira do beneficiário
  'agencia': "3978", // agência do beneficiário
  'nosso_numero': "1234567",
  'numero_documento': "123123",
  'barcode_data': "1231231238987837181987238123123123",
  'linha_digitavel': "1231809718723018723871287301827381723817",
  'data_emissao': '2022-04-23', // data em que o boleto está sendo emitido/gerado
  'data_vencimento': '2022-04-25', //data de vencimento do boleto
  'sacado': 'César Augusto Quinteiro de Carvalho', // inforamções relacionadas ao pagador
  'aceite': '', // S-SIM ou N-Não, caso não informado o campo ficará como String vazia.
  'especie_doc': '', //  caso não informado o campo ficará como String vazia.
  'valor': 1500, // R$ 15,00 (valor em centavos) valor do boleto
  'desconto': 500, // R$ 5,00 (valor em centavos) desconto do boleto
  'deducoes': 100, // R$ 1,00 (valor em centavos) deduções no valor do boleto
  'mora_multa': 100, // R$ 1,00 (valor em centavos) mora/multa do boleto
  'acrescimo': 100, // R$ 1,00 (valor em centavos) acrescimo no valor do boleto
  'valor_cobrado': 1100, // R$ 11,00 (valor em centavos) valor a ser cobrado ja feita as deduções,acrescimos,mutas,descontos
  'instrucoes': `Boleto sem desconto. Considerar o v alor do documento.\nPara pagamentos com cheque, o título de capitalização será gerado apos a compensação do cheque.\nNão pagar apos a data de v encimento. Ultrapassado o v encimento, a proposta é cancelada.\nEm caso de dúv idas, entre em contato com a Central de Atendimento Brasilcap pelo 08007290929`,
  'emv': '00020101021226920014br.gov.bcb.pix2570qrcodepix-h.bb.com.br/pix/v2/cobv/cd817af0-ad49-4b19-a8de-e532b478cbee5204000053039865406120.005802BR5925EMPRORT AMBIENTAL        6008BRASILIA62070503***6304A95B', //String gerada para pagamento via pix, quando informada gera uma seção com QRCode para pagamento via PIX
  'titulo_pix': 'Lorem ipsum dolor sit amet', // Título da seção  PIX (42 caracteres)
  'texto1_pix': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod', // Texto 1 da seção  PIX (120 caracteres)
  'texto2_pix': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod', // Texto 2 da seção  PIX (120 caracteres)
  'texto3_pix': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod', // Texto 3 da seção  PIX (120 caracteres)
})

boleto.renderHTML((html) => {
  console.log(html)
  pdf.create(html, options).toFile('./businesscard.pdf', (err, res) => {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
});



/* console.log('Linha digitável: ' + boleto['linha_digitavel'])

boleto.renderHTML(function (html) {
  pdf.create(html, options).toFile('./businesscard.pdf', function (err, res) {
    if (err) return console.log(err)
    console.log(res) // { filename: '/app/businesscard.pdf' }
  })
}) */
