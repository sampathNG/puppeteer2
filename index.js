require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const puppeteer = require('puppeteer');
const path = require('path');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
const port = process.env.PORT
app.use(cors({
    "origin" : "*"
  }))
app.get('/', (req, res) => {
        res.send("Hello World!");
        console.log("Hello World!");
})

app.get("/screenshot",async (req, res) =>{
    try {
      //  * const downloadPath = path.resolve('/home/sampath/redis2/src/controller');
        const browser = await puppeteer.launch({ headless: true,
          executablePath: "/opt/google/chrome/google-chrome",
          devtools: false,
            defaultViewport: {
                width             : 390,
                height            : 844,
                deviceScaleFactor : 1
            }
      // *  args: ['--no-sandbox']
      });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.rvngo.com/onthego/outdoor-enjoyment/hiking-with-children-guide/', {waitUntil: 'load',timeout:0});

        await page.screenshot({path: 'rvngo.png'});
        await browser.close();
        res.send("screen shot taken")
        console.log("screen shot taken");
    } catch (error) {
        console.error(error);
        res.send({error: error.message});

    }
})

app.listen(port,console.log(`running on port number ${port}`));