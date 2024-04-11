// Import required modules
const { log } = require('console');
const express = require('express');
const http = require('http');
const router = express.Router();

// Set up default username and password
const username = 'admin';
const password = 'default';

// Define route to fetch jobs data
router.get('/', (req, res) => {
    // Define options for the HTTP request
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/jobs',
        method: 'GET',
        auth: `${username}:${password}` // Basic authentication
    };

    // Make HTTP request to fetch jobs data
    const apiRequest = http.request(options, apiResponse => {
        let data = '';

        apiResponse.on('data', chunk => {
            data += chunk;
        });

        apiResponse.on('end', () => {
            try {
                // Parse JSON data received from the API
                const jobsData = JSON.parse(data);

                var allRequirements = [];
                jobsData.forEach(function(job) {
                    allRequirements = allRequirements.concat(job.requirements);
                });

                // console.log(allRequirements);

                // Render the 'jobs' view passing the jobsData
                res.render('jobsPostings', {                     
                    jobs: jobsData,
                    allRequirements: allRequirements
                });

            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).send('Error parsing API response');
            }
        });
    });

    // Handle request errors
    apiRequest.on('error', error => {
        console.error('Error:', error);
        res.status(500).send('Error accessing API');
    });

    // End the request
    apiRequest.end();
});

module.exports = router;
