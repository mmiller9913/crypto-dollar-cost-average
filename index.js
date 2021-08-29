const CoinbasePro = require('coinbase-pro');
require('dotenv').config({ path: 'variables.env' });

const key = process.env.COINBASE_API_KEY;
const secret = process.env.COINBASE_API_SECRET;
const passphrase = process.env.COINBASE_API_PASSPHRASE;

const apiURI = 'https://api.pro.coinbase.com';
// const sandboxURI = 'https://api-public.sandbox.pro.coinbase.com';

const authedClient = new CoinbasePro.AuthenticatedClient(
    key,
    secret,
    passphrase,
    apiURI
);

const ethBuyParams = {
    'funds': 5, // USD,
    'currency': 'ETH',
    'type': 'market',
    'product_id': 'ETH-USD'
};


const callback = (err, response, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
};

setInterval(function () {
    var date = new Date();
    const hour = date.getHours();
    // const minutes = date.getMinutes();
    if (hour === 15) {
        console.log('Bought ETH');
        authedClient.buy(ethBuyParams, callback);
    }
}, 3600000) //run every hour

// console.log(authedClient);

//turorial
//https://github.com/coinbase/coinbase-pro-node