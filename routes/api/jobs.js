// Express package
const express = require("express");
// router object
const router = express.Router();
// import model
const Job = require("../../models/job"); // Replace with the actual path to your Job model

// pagination
const pageSize = 10;

// POST - Create a new job
router.post("/", async (req, res) => {
  // You might want to validate all the required fields as per your requirements
  let job = new Job({
    id: req.body.id,
    name: req.body.name,
    pay: req.body.pay,
    location: req.body.location,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    imageUrl: req.body.imageUrl,
    tag: req.body.tag,
    rating: req.body.rating
  });

  try {
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET - Retrieve jobs with pagination
router.get("/", async (req, res) => {
  let page = parseInt(req.query.page) || 1; // if page is null, default to 1

  // calculate records to skip
  let skipSize = pageSize * (page - 1);

  try {
    let jobs = await Job.find({})
      .skip(skipSize)
      .limit(pageSize);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET by id - Retrieve a single job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Update a job by ID
router.put("/:id", async (req, res) => {
  try {
    let job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Delete a job by ID
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export
module.exports = router;
