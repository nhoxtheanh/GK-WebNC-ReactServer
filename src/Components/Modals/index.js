import React, { useState, useEffect } from "react";
import { CustomDialog, useDialog, Prompt, Alert } from "react-st-modal";

// The element to be shown in the modal window
export default function CustomDialogContent() {
  // use this hook to control the dialog
  const dialog = useDialog();

  const [value, setValue] = useState();

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          // Сlose the dialog and return the value
          dialog.close(value);
        }}
      >
        Create
      </button>
      <button
        onClick={() => {
          dialog.close();
        }}
      >
        Cancel
      </button>
    </div>
  );
}


function PromptExample() {
  return (
    <div>
      <button
        onClick={async () => {
          const age = await Prompt('How old are you?', {
            isRequired: true,
            defaultValue: 100,
          });

          if (age) {
            Alert(`You are ${age} years old!`, 'Your age');
          }
        }}
      >
        Confirm
      </button>
    </div>
  );
}

function CustomExample() {
  return (
    <div>
      <button
        onClick={async () => {
          const result = await CustomDialog(<CustomDialogContent />, {
            title: "Custom Dialog",
            showCloseIcon: true,
          });
        }}
      >
        Custom
      </button>
    </div>
  );
}
