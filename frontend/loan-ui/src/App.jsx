import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [formData, setFormData] = useState({
    ApplicantIncome: "",
    CoapplicantIncome: "",
    LoanAmount: "",
    Loan_Amount_Term: 360,
    Credit_History: 1,

    Gender_Male: 1,
    Married_Yes: 1,
    Education_Not_Graduate: 0,
    Self_Employed_Yes: 0,

    Dependents_1: 0,
    Dependents_2: 0,
    Dependents_3: 0,

    Property_Area_Urban: 0,
    Property_Area_Semiurban: 1
  });

  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handleDependents = (value) => {
    setFormData({
      ...formData,
      Dependents_1: value === 1 ? 1 : 0,
      Dependents_2: value === 2 ? 1 : 0,
      Dependents_3: value === 3 ? 1 : 0
    });
  };

  const handleProperty = (value) => {
    setFormData({
      ...formData,
      Property_Area_Urban: value === "Urban" ? 1 : 0,
      Property_Area_Semiurban: value === "Semiurban" ? 1 : 0
    });
  };

  const predictLoan = async () => {
  setApiError("");
  setResult(null);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/predict/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      setApiError(
        data.errors
          ? Object.values(data.errors).join(" ")
          : data.error
      );
      return;
    }

    setResult(data);
  } catch {
    setApiError("Server not reachable. Please try again later.");
  }
};


  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
      

      <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
        Loan Approval Prediction
      </h2>

      {apiError && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 font-semibold">
          {apiError}
        </div>
      )}

      {/* Income Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Income Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            name="ApplicantIncome"
            placeholder="Applicant Income"
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="number"
            name="CoapplicantIncome"
            placeholder="Co-applicant Income"
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="number"
            name="LoanAmount"
            placeholder="Loan Amount"
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>
      </div>

      {/* Personal Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Personal Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <select
            className="border rounded-lg p-2"
            onChange={(e) => setFormData({ ...formData, Gender_Male: Number(e.target.value) })}
          >
            <option value={1}>Male</option>
            <option value={0}>Female</option>
          </select>

          <select
            className="border rounded-lg p-2"
            onChange={(e) => setFormData({ ...formData, Married_Yes: Number(e.target.value) })}
          >
            <option value={1}>Married</option>
            <option value={0}>Not Married</option>
          </select>

          <select
            className="border rounded-lg p-2"
            onChange={(e) => setFormData({ ...formData, Education_Not_Graduate: Number(e.target.value) })}
          >
            <option value={0}>Graduate</option>
            <option value={1}>Not Graduate</option>
          </select>

          <select
            className="border rounded-lg p-2"
            onChange={(e) => setFormData({ ...formData, Self_Employed_Yes: Number(e.target.value) })}
          >
            <option value={0}>Salaried</option>
            <option value={1}>Self Employed</option>
          </select>

          <select
            className="border rounded-lg p-2"
            onChange={(e) => handleDependents(Number(e.target.value))}
          >
            <option value={0}>0 Dependents</option>
            <option value={1}>1 Dependent</option>
            <option value={2}>2 Dependents</option>
            <option value={3}>3+ Dependents</option>
          </select>

          <select
            className="border rounded-lg p-2"
            onChange={(e) => handleProperty(e.target.value)}
          >
            <option value="Semiurban">Semi-Urban</option>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
          </select>

          <select
            className="border rounded-lg p-2 md:col-span-2"
            onChange={(e) => setFormData({ ...formData, Credit_History: Number(e.target.value) })}
          >
            <option value={1}>Good Credit History</option>
            <option value={0}>Bad Credit History</option>
          </select>
        </div>
      </div>

      <button
        onClick={predictLoan}
        className="w-full bg-indigo-600 text-white text-lg font-bold py-3 rounded-xl hover:bg-indigo-700 transition"
      >
        Predict Loan Status
      </button>

      {result && (
        <div className="mt-6 text-center bg-gray-50 p-4 rounded-xl">
          <h3
            className={`text-2xl font-bold ${
              result.loan_status === "Approved"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {result.loan_status}
          </h3>

          <p className="mt-2 text-gray-700">
            Approval Probability:
            <span className="font-semibold">
              {" "}{result.approval_probability}%
            </span>
          </p>
        </div>
      )}
    </div>
  </div>
);

}

export default App;
