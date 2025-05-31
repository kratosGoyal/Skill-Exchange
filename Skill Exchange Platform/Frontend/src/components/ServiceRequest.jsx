import { useEffect, useState } from "react";
import { User, MessageSquare, Calendar, PlusCircle } from "lucide-react";
import NewRequestForm from "./NewRequestForm";

const ServiceRequestsApp = () => {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState([]);

  const toggleForm = () => setShowForm(!showForm);

  const addNewRequest = (newRequest) => {
    setRequests([...requests, newRequest]);
    setShowForm(false);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/requests");
        if (!response.ok) throw new Error("Failed to fetch requests");

        const data = await response.json();
        console.log("Fetched Requests:", data);
        setRequests(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 pt-24 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Service Requests</h1>
        <button 
          onClick={toggleForm} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition-colors shadow-md"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> New Request
        </button>
      </div>

      {showForm && <NewRequestForm onCreate={addNewRequest} onCancel={() => setShowForm(false)} />}

      {requests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-gray-600">No requests yet</h3>
          <p className="text-gray-500 mt-2 mb-4">Be the first to create a request</p>
          <button 
            onClick={toggleForm} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center mx-auto hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="mr-2 h-5 w-5" /> Create Request
          </button>
        </div>
      ) : (
        requests.map((request) => (
          <div key={request._id} className="p-6 rounded-lg mb-6 border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mr-4">
                <User className="text-blue-600 w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{request.title}</h3>
                <p className="text-gray-600 flex items-center text-sm">
                  <User className="inline mr-1 w-4 h-4" /> {request.name} 
                  <span className="mx-2">•</span> 
                  <Calendar className="inline mr-1 w-4 h-4" /> {new Date(request.date).toLocaleDateString()}
                </p> 
                <p className="my-3 text-gray-700">{request.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {request.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                      {skill}
                    </span>
                  ))}
                </div>

                <button 
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center hover:bg-blue-700 transition-colors"
                  onClick={() => alert('Responded successfully!')}
                >
                  <MessageSquare className="mr-2 h-4 w-4" /> Respond to Request
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ServiceRequestsApp;