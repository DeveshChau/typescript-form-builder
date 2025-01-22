import "./styles.css";
import { FormField } from "./formBuilder"
import { addFormField } from "./addFormField"
import { addRadioGroup } from "./addRadioGroup"
// Get required constants
const selectPrebuilt = document.getElementById("selectPrebuilt");
const addInputButton = document.getElementById("addInput");
const previewButton = document.getElementById("preview");
const addRadioInput = document.getElementById("addRadioInput");
const saveInput = document.getElementById("saveInput") as HTMLElement;
saveInput.style.display = 'none'
const formContainer: HTMLElement = document.getElementById("formDiv") as HTMLElement
const previewContainer: HTMLElement = document.getElementById("previewDiv") as HTMLElement

// setPrebuild form
localStorage.setItem('probuiltForm', JSON.stringify([
  {
    "controlType": "input",
    "labelText": "Name",
    "labelFor": "input-field-0",
    "inputType": "text",
    "inputId": "input-field-0"
  },
  {
    "controlType": "input",
    "labelText": "City",
    "labelFor": "input-field-1",
    "inputType": "text",
    "inputId": "input-field-1"
  }
]))

selectPrebuilt?.addEventListener("click", () => {
  saveInput.style.display = 'inline'
  const formObj: FormField[] = JSON.parse(localStorage.getItem('probuiltForm') as string)
  formObj.forEach(obj => {
    addFormField(obj)
  })
});

addInputButton?.addEventListener("click", () => {
  saveInput.style.display = 'inline'
  addFormField({
    controlType: "",
    labelText: "",
    labelFor: "",
    inputType: "",
    inputId: ""
  })
});

addRadioInput?.addEventListener("click", () => {
  saveInput.style.display = 'inline'
  addRadioGroup("Favorite Color", "favoriteColor", ['Red', 'Blue', 'Yellow'])
})

previewButton?.addEventListener("click", () => {
  // Clear previous preview
  previewContainer.innerHTML = "";

  // Collect all dynamically added divs
  const allDivs = formContainer.querySelectorAll(".form-div");
  if (allDivs.length === 0) {
    alert("No fields to preview!");
    return;
  }

  // Create a form for preview
  const form = document.createElement("form");
  form.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 10px;
  `;

  allDivs.forEach((div: Element) => {
    const clonedDiv = div.cloneNode(true) as HTMLElement;
    clonedDiv.querySelectorAll("input").forEach((input) => {
      input.disabled = true; // Disable inputs for preview
    });
    clonedDiv.querySelectorAll("button").forEach((button) => {
      button.remove();
    });
    form.appendChild(clonedDiv);
  });
  const btn = document.createElement('button')
  btn.type = 'button'
  btn.textContent = 'Submit'
  btn.style.width = "fit-content"
  btn.style.marginLeft = "10px"
  btn.classList.add('preview-submit-button')
  form.appendChild(btn)
  previewContainer.appendChild(form);
  previewContainer.style.display = "block";
});

saveInput?.addEventListener("click", () => {
  const allDivs = formContainer.querySelectorAll("div");
  if (allDivs.length === 0) {
    alert("No fields to save!");
    return;
  }
  let formObjArr: FormField[] = []
  let childDivs = formContainer.querySelectorAll(".form-div");
  // Iterate over each child div and get its elements
  childDivs.forEach((childDiv) => {
    const radioGroup = childDiv.querySelectorAll("div")
    if (radioGroup.length) {
      let options: string[] = []
      radioGroup.forEach(child => {
        const input = child.querySelector("input")?.value
        options.push(input as string)
      })
      const selectedRadio = childDiv.querySelector<HTMLInputElement>('input[type="radio"]:checked');
      formObjArr.push({
        controlType: 'input', 
        labelText: childDiv.querySelector("label")?.textContent as string,
        labelFor: childDiv.id as string,
        inputType: "radio",
        value: selectedRadio?.value,
        options
      })
    }
    // Get the label and input elements within each child div
    const label = childDiv.querySelector("label");
    const input = childDiv.querySelector("input");

    if (label && input) {
      // Read the label and input attributes
      const labelText = label.textContent;
      const labelFor = label.getAttribute("for");
      const inputType = input.getAttribute("type");
      const inputId = input.id;
      if (labelText && labelFor && inputType) {
        formObjArr.push({controlType: 'input' ,labelText, labelFor, inputType, inputId })
      }
    }
    localStorage.setItem('formObj', JSON.stringify(formObjArr))
  });
  alert('Form saved.')
});
