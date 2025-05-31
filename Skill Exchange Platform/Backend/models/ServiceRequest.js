import mongoose from "mongoose";

const ServiceRequestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    skills: { type: [String], required: true }
});

const ServiceRequest = mongoose.model("ServiceRequest", ServiceRequestSchema);

export default ServiceRequest;
