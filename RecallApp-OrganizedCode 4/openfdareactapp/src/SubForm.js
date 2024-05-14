import React, {useState} from "react";
import "./styles/SubForm.css";

export default function SubForm() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    state: "Select State", 
  });

  const[submitted, setSubmitted] = useState(false);
  const[valid, setValid] = useState(false); 
  
  const handleFristNameInputChange = (event) => {
    setValues({...values, firstName: event.target.values}) 
  }

  const handleLastNameInputChange = (event) => {
    setValues({...values, lastName: event.target.values}) 
  }

  const handleEmailInputChange = (event) => {
    setValues({...values, email: event.target.values}) 
  }

  const handlestateInputChange = (event) => {
    setValues({...values, state: event.target.values}) 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(values.firstName!=="" && values.lastName!=="" && values.email!=="" && values.state!=="Select State"){
        setValid(true); 
    }   
    setSubmitted(true);
  }


  return (
    <div class="form-container">
      <form class="register-form" onSubmit={handleSubmit}>
        {/* https://www.youtube.com/watch?v=8hU0I8rY4u4 */}
        {submitted && valid ? <div class="success-message">Success! Thank you for registering</div> : null} 
        <input
          onChange={handleFristNameInputChange}
          value={values.firstName}
          id="first-name"
          class="form-field"
          type="text"
          placeholder="First Name"
          name="firstName"
        />
        {submitted && values.firstName==="" ? <span id="first-name-error">Please enter a first name</span> : null}
        <input
          onChange={handleLastNameInputChange}
          value={values.lastName}
          id="last-name"
          class="form-field"
          type="text"
          placeholder="Last Name"
          name="lastName"
        />
        {submitted && values.lastName==="" ? <span id="last-name-error">Please enter a last name</span> : null}
        <input
          onChange={handleEmailInputChange}
          value={values.email}
          id="email"
          class="form-field"
          type="text"
          placeholder="Email"
          name="email"
        />
        {submitted && values.email==="" ? <span id="email-error">Please enter an email address</span> : null}

        <select className ="select"
          name="state"
          placeholder="Search by state"
          value={values.state}
          onChange={handlestateInputChange}
        >
          <option value="">Select State</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>

        </select>
        {submitted && values.state==="Select State" ? <span id="email-error">Please enter a state</span> : null}
        <button class="form-field" type="submit">
          Subscribe
        </button>
      </form>
    </div>
  );
}
