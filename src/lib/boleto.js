const ejs = require('ejs');
const path = require('path');
const moment = require('moment');
const formatters = require('./formatters');
const barcode = require('./barcode');
const boletoUtil = require('../utils/boletoUtil')

class Boleto {
  constructor(options) {
    console.log(options)

    if (!options) {
      // eslint-disable-next-line no-throw-literal
      throw 'No options provided initializing Boleto.';
    }
    this.options = options;
    this.options.data_emissao = moment(options.data_emissao).format("DD/MM/YYYY");
    this.options.data_vencimento = moment(options.data_vencimento).format("DD/MM/YYYY")

    Object.keys(this.options).forEach((key) => {
      this[key] = this.options[key];
    });

    this.pagador = formatters.htmlString(this.pagador);
    this.instrucoes = formatters.htmlString(this.instrucoes);
    this._calculate();
  }

  _calculate() {
    this.codigo_banco = `${this.options.codigo}-${formatters.mod11(this.options.codigo)}`;
    this.nosso_numero_dv = formatters.mod11(this.nosso_numero.toString());
    this.barcode_data = this.options.barcode_data ? this.options.barcode_data : boletoUtil.barcodeData(this);
    this.linha_digitavel = this.options.linha_digitavel ? this.options.linha_digitavel : boletoUtil.linhaDigitavel(this.barcode_data);
  }

  hashString(string) {
    let hash = 0;
    let i;
    let chr;
    let len;

    if (string.length === 0) return hash;
    for (i = 0, len = string.length; i < len; i += 1) {
      chr = string.charCodeAt(i);
      // eslint-disable-next-line no-bitwise
      hash = ((hash << 5) - hash) + chr;
      // eslint-disable-next-line no-bitwise
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  renderHTML(callback) {
    const self = this;

    const renderOptions = self.options;
    renderOptions.boleto = self;

    Object.keys(formatters).forEach((key) => {
      renderOptions[key] = formatters[key];
    });

    renderOptions.barcode_render_engine = self.options?.barcodeRenderEngine ? self.options.barcodeRenderEngine : 'img';
    renderOptions.barcode_height = '50';

    if (renderOptions.barcode_render_engine === 'bmp') {
      renderOptions.barcode_data = barcode.bmpLineForBarcodeData(self.options.barcode_data);
    } else if (renderOptions.barcode_render_engine === 'img') {
      renderOptions.barcode_data = barcode.binaryRepresentationForBarcodeData(self.options.barcode_data);
    }

    // eslint-disable-next-line max-len
    console.log(renderOptions)
    renderOptions.boleto.linha_digitavel_hash = this.hashString(renderOptions.boleto.linha_digitavel).toString();

    ejs.renderFile(path.join(__dirname, '/../assets/layout.ejs'), renderOptions, {
      cache: true,
    }, (err, html) => {
      if (err) {
        throw new Error(err);
      }

      callback(html);
    });
  }


}


module.exports = Boleto
