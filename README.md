boleto-bb
=============


Geração de boleto bancário do Banco do Brasil em Node.js. Essa logica foi copiada e adaptada de [node-boleto](https://github.com/pagarme/node-boleto).


## Instalação

```
npm install boleto-bb
```

## Exemplo de uso

Emitindo um boleto:

```javascript
var Boleto = require('boleto-bb');  
var boleto = new Boleto({
  'logoURL': "https://www.bb.com.br/pbb/img.ImgWriter?codigo=40846&origem=CCI&v=202005051_", // logo do Banco do Brasil para o boleto
  'codigo': "001", // código do Banco do Brasil
  'cedente': "Nome do beneficiário", // nome do beneficiário
  'cedente_cnpj': "18727053000174", // sem pontos e traços
  'codigo_cedente': "6404154" // codigo da carteira do beneficiário
  'carteira':"102" // carteira do beneficiário
  'agencia': "3978", // agência do beneficiário
  'nosso_numero': "1234567",
  'numero_documento': "123123",
  'barcode_data': "1231231238987837181987238123123123",
  'linha_digitavel': "1231809718723018723871287301827381723817"
  'data_emissao': new Date(), // data em que o boleto está sendo emitido/gerado
  'data_vencimento': new Date(new Date().getTime() + 5 * 24 * 3600 * 1000), // 5 dias futuramente
  'valor': 1500, // R$ 15,00 (valor em centavos) valor do boleto
  'desconto': 500, // R$ 5,00 (valor em centavos) desconto do boleto
  'deducoes': 100, // R$ 1,00 (valor em centavos) deduções no valor do boleto
  'mora_multa': 100, // R$ 1,00 (valor em centavos) mora/multa do boleto
  'acrescimo': 100, // R$ 1,00 (valor em centavos) acrescimo no valor do boleto
  'valor_cobrado': 1100, // R$ 11,00 (valor em centavos) valor a ser cobrado ja feita as deduções,acrescimos,mutas,descontos
});
console.log("Linha digitável: " + boleto['linha_digitavel'])
boleto.renderHTML(function(html){
  console.log(html);
});
```



## Renderização do código de barras

Atualmente, há duas maneiras de renderizar o código de barras: `img` e `bmp`.

A engine `img` utiliza imagens brancas e pretas intercaladas para gerar o código de barras. Dessa forma, todos os browsers desde o IE6 são suportados. Esse modo de renderização, porém, é um pouco mais pesado, já que muitas `divs` são inseridas no HTML para a renderização.

A engine `bmp` aproveita da característica monodimensional dos códigos de barra e gera apenas a primeira linha de pixels do boleto, repetindo as outras linhas por CSS. É mais leve e funciona na maioria dos browser - IE apenas a partir da versão 8.

Para alterar a engine de renderização padrão:

```javascript
Boleto.barcodeRenderEngine = 'bmp';
```

## Licença

(The MIT License)

Copyright (c) 2013-2017 Pagar.me Pagamentos S/A

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
