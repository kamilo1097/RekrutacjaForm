import { getDocumentElement } from "/component.js";
import { LocalStorage } from "./localStorage.js";
import { ModalClass } from "./modalClass.js";

export class Validator {
  validate = () => {
    let ls = new LocalStorage();
    let modal = new ModalClass();
    let regName = /^[a-zA-Z]+$/;
    let firstName = getDocumentElement("#nameInput").value;
    let lastName = getDocumentElement("#lastNameInput").value;
    let personalIdNumber = getDocumentElement("#peselInput").value;

    if (!regName.test(firstName) || firstName.length > 20) {
      modal.showCloseModal("Proszę podać prawidłowe imię");
      return false;
    }
    if (!regName.test(lastName) || lastName.length > 30) {
      modal.showCloseModal("Proszę podać prawidłowe nazwisko");
      return false;
    }
    if (!this.isValidPesel(personalIdNumber)) {
      modal.showCloseModal("Proszę podać prawidłowy pesel");
      return false;
    }

    const personBuilder = {
      key: Math.random(1) * 1000,
      person: {
        firstName: firstName,
        lastName: lastName,
        personalIdNumber: personalIdNumber,
        DOB: getDocumentElement("#dobInput").value,
      },
    };
    ls.saveInLocalStorage(personBuilder);
  };

  isValidPesel = (pesel) => {
    if (typeof pesel !== "string") return false;

    let weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    let controlNumber = parseInt(pesel.substring(10, 11));

    for (let i = 0; i < weight.length; i++) {
      sum += parseInt(pesel.substring(i, i + 1)) * weight[i];
    }
    sum = sum % 10;
    return (10 - sum) % 10 === controlNumber;
  };
}
