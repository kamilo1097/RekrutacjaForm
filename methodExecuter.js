import { getDocumentElement } from "/component.js";
import { DOBBuilder } from "./dobBuilder.js";
import { Validator } from "./validator.js";

export class MainMethodExecuter {
  builder = new DOBBuilder();
  validate = new Validator();
  submitBtn = getDocumentElement("#btn");

  dobInput = getDocumentElement("#dobInput");
  personalIdNumber = getDocumentElement("#peselInput");

  eventListeners = () => {
    this.personalIdNumber.addEventListener("keyup", (e) => {
      this.builder.DOBBuilder(e, this.dobInput);
    });
    this.submitBtn.addEventListener("click", (e) => {
      this.validate.validate();
    });
  };
}
