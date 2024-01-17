import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isopen, setIsopen] = useState(true);

  function handlePrevious() {
    // we should never update the state manually we should always use setter function (tool given by react) to update the state .
    if (step > 1) setStep(step - 1);
  }

  function handleNext() {
    if (step < 3) setStep(step + 1);
  }
  function handleClose(){
    setIsopen(!isopen)
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
