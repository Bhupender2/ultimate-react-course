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
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }
  function handleClose() {
    setIsopen((is) => !is); // here we are updating state based on current state which we should not do we should always pass a callback function which will recieves the current state as an argument in the callback function
  }
  return (
    <>
      <button className="close" onClick={handleClose}>
        &times;
      </button>
      {/* entering the JAVASCRIPT MODE*/}
      {isopen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}> 1</div>{" "}
            {/* we use template literal and we have to use js mode {} to  do this*/}
            <div className={step >= 2 ? "active" : ""}> 2</div>
            <div className={step >= 3 ? "active" : ""}> 3</div>
          </div>
          <StepMessage step={step}>
            {messages[step - 1]}
            <Button
              bgColor="#7950f2"
              textColor="#fff"
              onClick={() => alert("are you sure to delete the data")}
            >
              {" "}
              learn how
            </Button>{" "}
            {/* this whole Button component and  {messages[step - 1]} the will be the children props */}
          </StepMessage>

          {/* we made a reusable component using children props */}
          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              {/* style props passed*/}
              Previous <span>👈</span>
              {/* we need to pass them as children props*/}
            </Button>

            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage({ step, children }) {
  //we recive chidren props here and use it to make a lot of reusable components
  return (
    <div className="message">
      <h3> step {step} </h3>
      {children}
    </div>
  );
}

function Button({ bgColor, textColor, onClick, children }) {
  //this is where we recieve the props and childreb props also
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
