import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App1() {
  const [step, setStep] = useState(1);
  const [isopen, setIsopen] = useState(true);

  function handlePrevious() {
    // we should never update the state manually we should always use setter function (tool given by react) to update the state .
    if (step > 1) setStep((s)=>s-1);
  }

  function handleNext() {
    if (step < 3) setStep((s)=>s+1);
  }
  function handleClose(){
    setIsopen((is)=>!is) // here we are updating state based on current state which we should not do we should always pass a callback function which will recieves the current state as an argument in the callback function
  }
  return (
    <>
    <button className="close" onClick={handleClose}>&times;</button>
      {/* entering the JAVASCRIPT MODE*/}
      {isopen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}> 1</div>{" "}
            {/* we use template literal and we have to use js mode {} to  do this*/}
            <div className={step >= 2 ? "active" : ""}> 2</div>
            <div className={step >= 3 ? "active" : ""}> 3</div>
          </div>
          <div className="message">
            step {step} :{messages[step - 1]}
          </div>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              {" "}
              {/* style props passed*/}
              Previous
            </button>

            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
