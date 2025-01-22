import "./styles.css";
import { FormField } from "./formBuilder"

const previewContainer: HTMLElement = document.getElementById("previewDiv") as HTMLElement
const formObj: FormField[] = JSON.parse(localStorage.getItem('formObj') as string)
previewContainer.innerHTML = "";
// Create a form for preview
const form = document.createElement("form");
form.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const div = document.createElement("div");
div.appendChild(form)
formObj.forEach(obj => {
  if (obj.inputType == 'radio') {
    const label = document.createElement("label");
    label.textContent = obj.labelText;
    const div = document.createElement("div");
    div.className = "form-div";
    div.appendChild(label);

    // Create the radio button
    obj.options?.forEach(val => {
      const radiogroup = document.createElement("div");
      radiogroup.className = "radio-group";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = obj.labelFor as string;
      radio.id = `${obj.labelFor}`; 
      radio.value = val;
      const radioLabel = document.createElement("label");
      radioLabel.textContent = val;
      if (val == obj.value) {
        radio.checked = true
      }
      radiogroup.appendChild(radioLabel);
      radiogroup.appendChild(radio);
      div.appendChild(radiogroup)
    })

    // Append radio and label to the div
    form.appendChild(div);
  } else {
    const div = document.createElement("div");
    div.className = "form-div";
    const label = document.createElement("label");
    label.textContent = obj.labelText;
    label.htmlFor = obj.labelFor as string;
    label.style.cursor = "pointer";
    const input = document.createElement("input");
    input.type = obj.inputType as string;
    input.id = label.htmlFor;
    if (obj.value) {
      input.value = obj.value
    }
  
    // Append label and input to the div
    div.appendChild(label);
    div.appendChild(input); 
    form.appendChild(div)
  }
})
const btn = document.createElement("button")
btn.type = "submit"
btn.textContent = "Submit"
btn.style.width = "fit-content"
btn.classList.add('preview-button')
form.appendChild(btn)
previewContainer.appendChild(div)
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default submission
  const values: Record<string, string> = {};

  for (const child of Array.from(form.children)) {
    const selectedRadio = child.querySelector<HTMLInputElement>('input[type="radio"]:checked');
    if (selectedRadio?.value) {
      const elementIndex = formObj.findIndex(obj => obj.labelFor == selectedRadio.name)
      formObj[elementIndex].value = selectedRadio?.value
    }
    const selectedText = child.querySelector<HTMLInputElement>('input[type="text"]');
    if (selectedText?.value) {
      const elementIndex = formObj.findIndex(obj => obj.inputId == selectedText.id)
      formObj[elementIndex].value = selectedText?.value
    }
  }

  console.log("Form Data:", values);
  localStorage.setItem('formObj', JSON.stringify(formObj))
  alert('Thanks for submitting response.')
});