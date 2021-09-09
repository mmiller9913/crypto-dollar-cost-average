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
    'funds': 7, // USD,
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

// Add funds to account
const depositPaymentParamsUSD = {
    amount: '275.00',
    currency: 'USD',
    payment_method_id: 'dcd662fe-f4bf-59c0-9c50-652dfd4dc403', // cap_one_bank_account
  };

setInterval(function () {
    var date = new Date();
    const hour = date.getHours();
    if (hour === 15) {
        console.log('Bought ETH');
        authedClient.buy(ethBuyParams, callback);
    }
}, 3600000) //run every hour

setInterval(function () {
    var date = new Date();
    const day = date.getDay();
    if (day === 10) {
        console.log('Deposited $250');
        authedClient.depositPayment(depositPaymentParamsUSD, callback);
    }
}, 864000000) //run every day

console.log('up and running');

//turorial
//https://github.com/coinbase/coinbase-pro-node