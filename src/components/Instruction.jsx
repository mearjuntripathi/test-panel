import React from 'react';
import '../css/instruction.css'; // Make sure to create corresponding CSS file for styling

export default function Instruction({ setStep }) {
  function proceedToTest() {
    setStep(2);
  }

  return (
    <div className="instructions-container">
      <h1>Exam Instructions</h1>
      <ul>
        <li>You can view each question along with four options.</li>
        <li>Use the <kbd>Clear Response</kbd> button to clear your current selection.</li>
        <li>Navigate through questions using <kbd>Next</kbd> and <kbd>Previous</kbd> buttons.</li>
        <li>The sidebar shows the status of each question: attempted or not attempted.</li>
        <li>A timer at the top center tracks your remaining time. If time runs out, your responses will be automatically submitted.</li>
        <div>
          <table>
            <tr>
              <th className='one'>Red</th>
              <td>Not answered/<b>Not Attempted</b> Question</td>
            </tr>
            <tr>
              <th className='two'>Green</th>
              <td>Answered/<b>Attempted</b> Question</td>
            </tr>
            <tr>
              <th className='three'>Blue</th>
              <td><b>Answered</b> & Marked for Review</td>
            </tr>

          </table>

        </div>
        <li>Your submit Button and Response is in side nav <kbd>&#60;</kbd> .</li>
        <li>Once you finish the test, click the <kbd>Submit</kbd> button.</li>
      </ul>
      <h2>Restrictions</h2>
      <ul>
        <li>You cannot copy any content from this page.</li>
        <li>If you refresh or change tabs, you will be automatically suspended.</li>
        <li>If your internet connection goes down, you will be automatically suspended.</li>
      </ul>
      <br />
      <br />
      <hr />
      <button onClick={proceedToTest} className="proceed-button">Proceed to Test</button>
    </div>
  );
};