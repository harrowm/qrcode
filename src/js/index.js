import 'bootstrap';
import '../scss/index.scss';

import QrCodeWithLogo from 'qr-code-with-logo'
import crc16ccitt from 'crc/crc16ccitt'

import LocalImage from '../public/treelogo.jpg'
 
function calcqr(FPSid, ccy, amount) {

  const payloadFormatIndicator = '000201';
  const pointOfInitiationMethod = '010212';
  const globallyUniqueId = '0012hk.com.hkicl';
  const fpsAccount = '02' + FPSid.length.toString().padStart(2, '0') + FPSid;

  const hkPaymentInfo = globallyUniqueId + fpsAccount;
  const hkPaymentCode = '26' + hkPaymentInfo.length.toString().padStart(2, '0');

  const merchantCategoryCode = '52040000';
  const transactionCurrency = '5303' + ccy;
  const transactionAmount = '54' + amount.length.toString().padStart(2, '0') + amount;

  const countryCode = '5802HK';
  const merchantName = '5902NA';
  const merchantCity = '6002HK';
  const billNo = '010898756383'; // Not sure we use this
  const additionalInfo = '62' + billNo.length.toString().padStart(2, '0');
  const crcValue = '6304';

  const qrTempStr = payloadFormatIndicator +
                    pointOfInitiationMethod + 
                    hkPaymentCode +
                    hkPaymentInfo + merchantCategoryCode +
                    transactionCurrency +
                    transactionAmount +
                    countryCode + 
                    merchantName + 
                    merchantCity +
                    additionalInfo +
                    billNo +
                    crcValue;

  const crcRes = crc16ccitt(qrTempStr).toString(16);
  const finalQRStr = qrTempStr + crcRes;
  
  QrCodeWithLogo.toCanvas({
    canvas: document.getElementById('qrcanvas'),
    content: finalQRStr,
    width: 300,
    errorCorrectionLevel: 'H',
    logo: {
      src: LocalImage,
      logoSize: 0.15
    }
  })
}

// https://stackoverflow.com/questions/35781579/basic-webpack-not-working-for-button-click-function-uncaught-reference-error
window.calcqr = calcqr;


