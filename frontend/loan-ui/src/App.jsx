import { useState } from "react";

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
    const response = await fetch("http://127.0.0.1:8000/api/predict/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", maxWidth: "600px" }}>
      <h2>Loan Approval Prediction</h2>

      <h4>Income Details</h4>
      <input type="number" name="ApplicantIncome" placeholder="Applicant Income" onChange={handleChange} /><br /><br />
      <input type="number" name="CoapplicantIncome" placeholder="Co-applicant Income" onChange={handleChange} /><br /><br />
      <input type="number" name="LoanAmount" placeholder="Loan Amount" onChange={handleChange} /><br /><br />

      <h4>Personal Details</h4>

      <label>Gender:</label>
      <select onChange={(e) => setFormData({ ...formData, Gender_Male: Number(e.target.value) })}>
        <option value={1}>Male</option>
        <option value={0}>Female</option>
      </select><br /><br />

      <label>Married:</label>
      <select onChange={(e) => setFormData({ ...formData, Married_Yes: Number(e.target.value) })}>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
      </select><br /><br />

      <label>Education:</label>
      <select onChange={(e) => setFormData({ ...formData, Education_Not_Graduate: Number(e.target.value) })}>
        <option value={0}>Graduate</option>
        <option value={1}>Not Graduate</option>
      </select><br /><br />

      <label>Self Employed:</label>
      <select onChange={(e) => setFormData({ ...formData, Self_Employed_Yes: Number(e.target.value) })}>
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select><br /><br />

      <label>Dependents:</label>
      <select onChange={(e) => handleDependents(Number(e.target.value))}>
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3+</option>
      </select><br /><br />

      <label>Property Area:</label>
      <select onChange={(e) => handleProperty(e.target.value)}>
        <option value="Semiurban">Semi-Urban</option>
        <option value="Urban">Urban</option>
        <option value="Rural">Rural</option>
      </select><br /><br />

      <label>Credit History:</label>
      <select onChange={(e) => setFormData({ ...formData, Credit_History: Number(e.target.value) })}>
        <option value={1}>Good</option>
        <option value={0}>Bad</option>
      </select><br /><br />

      <button onClick={predictLoan}>Predict</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Status: {result.loan_status}</h3>
          <p>Approval Probability: {result.approval_probability}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
