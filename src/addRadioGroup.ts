// Select the container where the radio group will be added

// Function to add a group of radio buttons with a label
export function addRadioGroup(groupLabel: string, groupName: string, options: string[]) {
  // groupLabel = prompt('Provide label value') as string
  // options = prompt('Give comma separated values')?.split(',') as string[]
  const formContainer: HTMLElement = document.getElementById("formDiv") as HTMLElement
  const container = document.createElement("div");
  container.id = `${groupName}-${Math.ceil(Math.random()*10)}`
  container.classList.add("form-div")
  // Create a fieldset to group radio buttons

  // Create a legend as the group label
  const legend = document.createElement("label");
  legend.textContent = groupLabel; // Set the group label text
  container.appendChild(legend);


  legend.addEventListener("click", () => {
    // Create an input field to replace the label
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = legend.textContent || "";
    editInput.style.width = "auto";

    // Replace the label with the input field
    container.replaceChild(editInput, legend);

    // Focus on the input field and select its text
    editInput.focus();
    editInput.select();

    // Save changes on blur or Enter key press
    const saveChanges = () => {
      if (editInput.value.trim() !== "") {
        legend.textContent = editInput.value;
      }
      container.replaceChild(legend, editInput); // Replace input with label
    };
    editInput.addEventListener("blur", saveChanges);
  });

  // Add radio buttons to the fieldset
  options.forEach((optionText, index) => {
    const div = document.createElement("div"); // Create a div to group label and radio button
    div.className = "radio-group";

    // Create the radio button
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = groupName; // Group all radios with the same name
    radio.id = `${groupName}-${Math.ceil(Math.random()*10)}`; // Unique ID ${Math.ceil(Math.random()*10)
    radio.value = optionText; // Set the value of the radio button

    // Create the label
    const label = document.createElement("label");
    label.htmlFor = radio.id; // Associate the label with the radio button
    label.textContent = optionText; // Set the label text

    // Append radio and label to the div
    div.appendChild(radio);
    div.appendChild(label);
    // Append the div to the fieldset
    container.appendChild(div);
  });
  const btn = document.createElement("button")
  btn.type = "button"
  btn.textContent = "Remove"
  btn.classList.add('remove-btn')
  btn.addEventListener("click", () => {
    formContainer?.removeChild(container)
  })
  container.appendChild(btn);

  // Append the fieldset to the container
  formContainer.appendChild(container)
}

// Add a radio group dynamically
