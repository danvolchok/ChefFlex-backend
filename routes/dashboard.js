var express = require('express');
var router = express.Router();

const user = {
    name: "John Doe",
    email: "john@example.com",
    profilePicture: "/images/Musk.jpg",
    skills: ["Server", "Bartender", "Customer Service"],
    bio: "Experienced server with over 5 years of experience in the restaurant industry.",
    location: "Barrie, Ontario"
}

const jobPostings = [
    {
        title: "Server at XYZ Restaurant",
        location: "City, State",
        description: "We are seeking a skilled server to join our team...",
        responsibilities: ["Greet and seat customers", "Take food and beverage orders", "Deliver orders to tables", "Ensure customer satisfaction"],
        requirements: ["Previous experience as a server", "Excellent communication skills", "Ability to work well in a team"],
        salary: "Competitive",
        contact: "jobs@example.com"
    },
    {
        title: "Bartender Needed",
        location: "City, State",
        description: "We are looking for an experienced bartender to join our team...",
        responsibilities: ["Mix and serve drinks", "Provide exceptional customer service", "Maintain cleanliness of the bar area"],
        requirements: ["Previous experience as a bartender", "Knowledge of cocktail recipes", "Excellent interpersonal skills"],
        salary: "Negotiable",
        contact: "hr@example.com"
    }
];

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('dashboard', {
        user: user,
        jobPostings: jobPostings
    });
});

module.exports = router;