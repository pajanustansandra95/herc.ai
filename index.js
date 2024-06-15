"use strict";
const express = require('express');
const axios = require('axios');
const packs = require('./package.json');

const app = express();
const port = process.env.PORT || 3000; // Use environment port or default to 3000

// Version control function
async function versionControl(version) {
    try {
        const response = await axios.get(`https://registry.npmjs.com/-/v1/search?text=hercai`);
        const pack = response.data;
        
        if (pack && pack.objects && pack.objects.length > 0) {
            const latestVersion = pack.objects[0].package.version;
            if (latestVersion !== version) {
                console.log(`\x1b[38;5;215mYou are using an outdated version of Hercai. Run 'npm i hercai@${latestVersion}' for the current version.\x1B[0m`);
            }
        }
    } catch (err) {
        console.error('Error fetching version information from npm:', err.message);
    }
}

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    versionControl(packs.version); // Call version control function on server start
});

module.exports = {
    Hercai: require('./hercai'),
    version: packs.version,
};
