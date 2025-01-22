import { FormField } from "./formBuilder";
export function addFormField(obj: FormField) {
  const formContainer: HTMLElement = document.getElementById("formDiv") as HTMLElement
  const div = document.createElement("div");
  div.classList.add('form-div');

  // Create a label element
  const label = document.createElement("label");
  label.textContent = obj?.labelText || "Click to Edit Label: ";
  label.htmlFor = obj.labelFor || "input-field-" + document.body.querySelectorAll("input").length;
  label.style.cursor = "pointer";

  // Add inline edit functionality
  label.addEventListener("click", () => {
    // Create an input field to replace the label
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = label.textContent || "";
    editInput.style.width = "auto";

    // Replace the label with the input field
    div.replaceChild(editInput, label);

    // Focus on the input field and select its text
    editInput.focus();
    editInput.select();

    // Save changes on blur or Enter key press
    const saveChanges = () => {
      if (editInput.value.trim() !== "") {
        label.textContent = editInput.value;
      }
      div.replaceChild(label, editInput); // Replace input with label
    };
    editInput.addEventListener("blur", saveChanges);
  });

  // Create an input element
  const input = document.createElement("input");
  input.type = "text";
  input.id = label.htmlFor;

  const btn = document.createElement("button")
  btn.type = "button"
  btn.textContent = "Remove"
  btn.classList.add('remove-btn')

  btn.addEventListener("click", () => {
    formContainer?.removeChild(div)
  })
  // Append label and input to the div
  div.appendChild(label);
  div.appendChild(input);
  div.appendChild(btn);
  formContainer.appendChild(div)
}   