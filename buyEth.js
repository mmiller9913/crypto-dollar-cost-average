//NOTE: This script currently runs via crontab on AWS

const CoinbasePro = require('coinbase-pro');
require('dotenv').config({ path: '.env' });

const key = process.env.COINBASE_API_KEY;
const secret = process.env.COINBASE_API_SECRET;
const passphrase = process.env.COINBASE_API_PASSPHRASE;

const apiURI = 'https://api.pro.coinbase.com';

const authedClient = new CoinbasePro.AuthenticatedClient(
    key,
    secret,
    passphrase,
    apiURI
);

const ethBuyParams = {
    'funds': process.env.BUY_AMOUNT, // USD,
    'currency': 'ETH',
    'type': 'market',
    'product_id': 'ETH-USD'
};

const callback = (err, response, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(`Bought ETH`);

    }
}

authedClient.buy(ethBuyParams, callback);


//turorial is here:
//https://github.com/coinbase/coinbase-pro-node