const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const { json } = require('express');
const mongoClient = require('mongodb').MongoClient;
const rp = require('request-promise');
const cheerio = require('cheerio');
const PORT = 3000;

app.use(cors());
app.use(json());

app.get('/suggestion', (req, response) => {

var keywordurl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.query.keyword}&apikey=MURG2M4JADY0CNBX`;

request.get({
    url: keywordurl,
    json: true,
    headers: {'User-Agent': 'request'}
}, (err, res, data) => {
    if (err) {
    console.log('Error:', err);
    } else if (res.statusCode !== 200) {
    console.log('Status:', res.statusCode);
    } else {
    response.send(data)  
    // console.log(data.bestMatches[0]['2. name']);
    }
});
})

app.get("/getCompanyName", (req, res) => {
    var options = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/symbol_search',
        params: {symbol: `${req.query.keyword}`, outputsize: '7'},
        headers: {
          'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
          'x-rapidapi-key': 'b697060cf2msh9dbece726f614b4p19ab64jsn16551bb4d43f'
        }
      };
    
      axios.request(options).then(function (response) {
        const data = response.data.data.map(c => {
            return {
                symbol: c.symbol,
                instrument_name: c.instrument_name,
                exchange: c.exchange
            }
        })
        // console.log(data);
        res.json(data);
      }).catch(function (error) {
        console.error(error);
      });
})

app.post("/contactData", (req, res) => {
    //console.log(req.body);
    res.status(200).send('data received');
    const URL= "mongodb://localhost:27017/helputrade";

    mongoClient.connect(URL, async (err, client) => {
        if (err) {
            throw err;
        }
        let dataBase = client.db('helputrade');

        let collection = dataBase.collection("contactData");
        collection.insertOne(req.body, async (error, res) => {
            if(error) {
                throw error;
            }
            console.log('one document inserted');
            client.close();
        })
    })
})

app.post("/subscribe", (req, res) => {

    const URL = "mongodb://localhost:27017/helputrade";
    mongoClient.connect(URL, async (err, client) => {
        if (err) {
            throw err;
        }
        let dataBase = client.db('helputrade');

        let collection = dataBase.collection("subscribers");

        collection.findOne({email : req.body.email}, (err, Res) => {
            if(err) {
                throw err;
            }
            if(Res === null)
            {
                let date = new Date();
                let data = {
                    email : req.body.email,
                    subscriberDate : "" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
                }
        
                collection.insertOne(data, async (error, result) => {
                    if(error) {
                        throw error;
                    }
                    console.log('one document inserted');
                    client.close();
                })

                res.status(200).json({success : true, msg : "subscribed"});
            }
            else {
                res.status(200).json({success : false, msg : "alread subscribed"});
            }
        });
    })
})

app.get('/getScrapedData', (req, response) => {
    console.log(req.query.cName);

    let scrapingUrl = `https://www.screener.in/company/${req.query.cName}`;

    (async() => {
        try
        {
            let res = await rp({
                uri : scrapingUrl,
                headers : {
                    'content-encoding': 'gzip',
                    'vary': 'Accept-Encoding',
                    'vary': 'Cookie',
                    'x-content-type-options': 'nosniff',
                    'x-content-type-options': 'nosniff',
                    'x-frame-options': 'DENY',
                    'x-frame-options': 'SAMEORIGIN'
                },
                gzip : true
            })
            .on('response', function(response) {
                    global.sattusCode = response.statusCode;
                });
            if (global.sattusCode === 200){
                let $ = cheerio.load(res);
                let MarketCapSelector = '#top-ratios > li:nth-child(1) > span.nowrap.value > span';
                let CurrentPriceSelector = '#top-ratios > li:nth-child(2) > span.nowrap.value > span';
                let HighSelector = '#top-ratios > li:nth-child(3) > span.nowrap.value > span:nth-child(1)';
                let LowSelector = '#top-ratios > li:nth-child(3) > span.nowrap.value > span:nth-child(2)';
                let Stock_PESelector = '#top-ratios > li:nth-child(4) > span.nowrap.value > span';
                let BookValueSelector = '#top-ratios > li:nth-child(5) > span.nowrap.value > span';
                let DividendYieldSelector = '#top-ratios > li:nth-child(6) > span.nowrap.value > span';
                let ROCESelector = '#top-ratios > li:nth-child(7) > span.nowrap.value > span';
                let ROESelector = '#top-ratios > li:nth-child(8) > span.nowrap.value > span';
                let FaceValueSelector = '#top-ratios > li:nth-child(9) > span.nowrap.value > span';
                
                let MarketCap = $(MarketCapSelector)
                let CurrentPrice = $(CurrentPriceSelector)
                let High = $(HighSelector)
                let Low = $(LowSelector)
                let Stock_PE = $(Stock_PESelector)
                let BookValue = $(BookValueSelector)
                let DividendYield = $(DividendYieldSelector)
                let ROC = $(ROCESelector)
                let ROE = $(ROESelector)
                let FaceValue = $(FaceValueSelector)

                let data = ({
                    "MarketCap" : MarketCap.text(),
                    "CurrentPrice" : CurrentPrice.text(),
                    "High" : High.text(),
                    "Low" : Low.text(),
                    "BookValue" : BookValue.text(),
                    "Stock_PE" : Stock_PE.text(),
                    "DividendYield" : DividendYield.text(),
                    "ROC" : ROC.text(),
                    "ROE" : ROE.text(),
                    "FaceValue" : FaceValue.text()
                })
                response.send(data)
                console.log('sent');
            }
        }
        catch (er)
        {
            console.log(er);
            response.status(500).send(
            {
                "error" : "data not found"
            }
            )
        }
    })();

})

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})