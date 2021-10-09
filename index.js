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
    }
};

//Made this a cron job using Heroku Scheduler, so commented out the below setInterval function
// setInterval(function () {
//     var date = new Date();
//     const hour = date.getHours();
//     if (hour === 15) {
//         console.log('Bought ETH');
//         authedClient.buy(ethBuyParams, callback);
//     }
// }, 3600000) //run every hour

//added the below for use with Heroku Scheduler
//this script will run every day at X time
authedClient.buy(ethBuyParams, callback);
console.log('Bought eth');

//turorial
//https://github.com/coinbase/coinbase-pro-node