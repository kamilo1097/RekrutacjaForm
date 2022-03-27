const mainMethodExecuter = () => {
  let submitBtn = getDocumentElement("#btn");
  let dobInput = getDocumentElement("#dobInput");
  let personalIdNumber = getDocumentElement("#peselInput");
  personalIdNumber.addEventListener("keyup", (e) => {
    DOBBuilder(e, dobInput);
  });
  submitBtn.addEventListener("click", (e) => {
    validate();
  });
};
const DOBBuilder = (e, dobInput) => {
  let personalIdNumberInput = e.target.value;
  let fullYearOfBirth = "yyyy";
  let monthNumber = "mm";
  let dayNumber = "dd";

  if (personalIdNumberInput.length > 1) {
    let yearNumber = subStringEachSectionInId(personalIdNumberInput, 0, 2);
    fullYearOfBirth = getFullYearOfPerson(yearNumber);
    if (personalIdNumberInput.length > 3) {
      monthNumber = subStringEachSectionInId(personalIdNumberInput, 2, 4);
      if (personalIdNumberInput.length > 5) {
        dayNumber = subStringEachSectionInId(personalIdNumberInput, 4, 6);
      }
    }
    dobInput.value = fullYearOfBirth + "-" + monthNumber + "-" + dayNumber;
  }
};
const subStringEachSectionInId = (number, start, stop) => {
  return number.substring(start, stop).padStart(2, "0");
};

const getFullYearOfPerson = (trimmedYearNumber) => {
  const currentYearLast2Number = new Date()
    .getFullYear()
    .toString()
    .substring(2, 4);
  return trimmedYearNumber > currentYearLast2Number
    ? "19" + trimmedYearNumber
    : "20" + trimmedYearNumber;
};

const validate = () => {
  let regName = /^[a-zA-Z]+$/;
  let firstName = getDocumentElement("#nameInput").value;
  let lastName = getDocumentElement("#lastNameInput").value;
  let personalIdNumber = getDocumentElement("#peselInput").value;

  if (!regName.test(firstName) || firstName.length > 20) {
    showCloseModal("Proszę podać prawidłowe imię");
    return false;
  }
  if (!regName.test(lastName) || lastName.length > 30) {
    showCloseModal("Proszę podać prawidłowe nazwisko");
    return false;
  }
  if (!isValidPesel(personalIdNumber)) {
    showCloseModal("Proszę podać prawidłowy pesel");
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
  saveInLocalStorage(personBuilder);
};
const saveInLocalStorage = (personBuilder) => {
  try {
    localStorage.setItem(
      personBuilder.key,
      JSON.stringify(personBuilder.person)
    );
    alert("Pomyślnie zapisano");
  } catch (err) {
    alert("Ups coś poszło nie tak");
  }
};
const isValidPesel = (pesel) => {
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

const showCloseModal = (textInModal) => {
  let modal = getDocumentElement("#myModal");
  let close = getDocumentElement(".close");
  let textInsideModal = modal.querySelector(".textInsideModal");
  textInsideModal.innerText = textInModal;
  modal.style.display = "block";
  close.addEventListener("click", () => {
    modal.style.display = "none";
  });
};

const getDocumentElement = (element) => {
  return document.querySelector(element);
};
mainMethodExecuter();
