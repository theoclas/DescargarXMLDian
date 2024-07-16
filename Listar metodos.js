const soap = require('soap');

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

  console.log('Available methods:', client.describe());

  // Uncomment this part after verifying the available methods
  // client.FtechAction.downloadXMLFile(args, function(err, result) {
  //   if (err) {
  //     console.error('Error calling FtechAction.downloadXMLFile:', err);
  //     return;
  //   }

  //   console.log('Response:', result);
  // });
});
