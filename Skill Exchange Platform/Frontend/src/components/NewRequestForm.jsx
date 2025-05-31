import { useState } from "react";
import PropTypes from "prop-types";
import { ArrowRight, Clock, ListChecks } from "lucide-react";

const NewRequestForm = ({ onCreate, onCancel }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [skillNeeded, setSkillNeeded] = useState("Web Development");
  const [skillOffered, setSkillOffered] = useState("Web Development");

  const skillOptions = ["Web Development", "Graphic Design", "Content Writing", "Digital Marketing"];

  const handleSubmit = async () => {
    if (!name || !title || !description || !deadline) {
      alert("All fields are required!");
      return;
    }
  
    const newRequest = {
      title,
      description,
      name,
      date: new Date(deadline).toISOString(),
      skills: [skillNeeded, skillOffered],
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/requests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRequest),
      });

      if (!response.ok) throw new Error("Failed to create request");

      const savedRequest = await response.json();
      onCreate(savedRequest);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit request.");
    }

    // Reset form
    setName("");
    setTitle("");
    setDescription("");
    setDeadline("");
  };

  return (
    <div className="p-8 rounded-lg mb-6 border border-gray-200 shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Request</h2>

      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors" 
        />

        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-600">Skill Needed</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ListChecks className="h-5 w-5 text-blue-500" />
              </div>
              <select 
                value={skillNeeded} 
                onChange={(e) => setSkillNeeded(e.target.value)} 
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
              >
                {skillOptions.map((skill) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-600">Skill Offered</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ListChecks className="h-5 w-5 text-blue-500" />
              </div>
              <select 
                value={skillOffered} 
                onChange={(e) => setSkillOffered(e.target.value)} 
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
              >
                {skillOptions.map((skill) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
        ></textarea>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-600">Deadline</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <input 
              type="date" 
              value={deadline} 
              onChange={(e) => setDeadline(e.target.value)} 
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors" 
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button 
            onClick={onCancel} 
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
          >
            Create Request <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

NewRequestForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default NewRequestForm;