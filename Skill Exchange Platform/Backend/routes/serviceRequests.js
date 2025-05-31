import express from "express";
import ServiceRequest from "../models/ServiceRequest.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const requests = await ServiceRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/", async (req, res) => {
    try {
        console.log("Received request:", req.body);  

        const { title, description, name, date, skills } = req.body;

        if (!title || !description || !name || !date || !skills) {
            console.log("Validation failed:", { title, description, name, ate, skills }); 
            return res.status(400).json({ message: "All fields are required" });
        }

        const newRequest = new ServiceRequest({
            title,
            description,
            name,
            date: new Date(date), 
            skills
        });

        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (err) {
        console.error("Error saving request:", err); 
        res.status(500).json({ message: err.message });
    }
});

router.get("/top-skills", async (req, res) => {
  try {
    const requests = await ServiceRequest.find({}, "skills");
    const skillCount = {};

    requests.forEach(request => {
      request.skills.forEach(skill => {
        skillCount[skill] = (skillCount[skill] || 0) + 1;
      });
    });

    const topSkills = Object.entries(skillCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([skill, count]) => ({ skill, count }));

    res.json(topSkills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
