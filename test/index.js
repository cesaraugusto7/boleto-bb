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
  'logoURL': 'https://www.bb.com.br/pbb/img.ImgWriter?codigo=40846&origem=CCI&v=202005051_',
  'codigo': '001',
  'banco': 'bb', // nome do banco dentro da pasta 'banks'
  'data_emissao': new Date(),
  'data_vencimento': new Date(new Date().getTime() + 5 * 24 * 3600 * 1000), // 5 dias futuramente
  'valor': 12000, // R$ 15,00 (valor em centavos)
  'nosso_numero': '1234567',
  'numero_documento': '123123',
  'cedente': 'Pagar.me Pagamentos S/A',
  'cedente_cnpj': '18727053000174', // sem pontos e traços
  'agencia': '3978',
  'codigo_cedente': '6404154', // PSK (código da carteira)
  'carteira': '102',
  'barcodeRenderEngine': 'img',
  'local_de_pagamento': 'Pagável em qualquer banco.'
})

boleto.renderHTML((html) => {
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
