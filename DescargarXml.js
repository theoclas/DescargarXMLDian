const soap = require('soap');
const fs = require('fs');
const path = require('path');
const atob = require('atob');

const url = 'https://ws.facturatech.co/v2/pro/index.php?wsdl';
const args = {
  username: '890941638',
  password: 'd63e3771ae7cba422236949ea5826f984e8ea626331104a8a822c9a7333dc04e',
  prefijo: 'CCID',
  folio: '19154'
};

soap.createClient(url, function(err, client) {
  if (err) {
    console.error('Error creating SOAP client:', err);
    return;
  }

  client['SERVICES-FACTURATECH']['SERVICES-FACTURATECHPort']['FtechAction.downloadXMLFile'](args, function(err, result) {
    if (err) {
      console.error('Error calling FtechAction.downloadXMLFile:', err);
      return;
    }
    // console.log ({result});
   // var prueba = result.return.resourceData;
    // console.log (prueba.$value);


    if (result && result.return.resourceData.$value) {
      // Decodificar el contenido Base64
      const base64Data = result.return.resourceData.$value;
      const xmlData = atob(base64Data);

      // Guardar el contenido decodificado en un archivo XML
      const filePath = path.join(__dirname, `${args.folio}_file.xml`);
    //   const filePath = path.join(__dirname, 'downloaded_file.xml');
      fs.writeFile(filePath, xmlData, { encoding: 'utf8' }, function(err) {
        if (err) {
          console.error('Error guardando archivo XML:', err);
        } else {
          console.log('Archivo XML guardado exitosamente:', filePath);
        }
      });
    } else {
      console.log('No se recibió ningún dato válido del servicio.');
    }
  });
});

