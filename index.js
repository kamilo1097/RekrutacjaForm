const mainMethodExecuter = () => {
  let submitBtn = document.querySelector("#btn");
  let personalIdNumber = document.querySelector("#peselInput");
  personalIdNumber.addEventListener("keyup", dobUpdate);
  submitBtn.addEventListener("click", (e) => {
    validate();
  });
};
const dobUpdate = (e) => {
  let dobInput = document.querySelector("#dobInput");
  let fullYearOfBirth = "yyyy";
  let monthNumber = "mm";
  let dayNumber = "dd";
  let personalIdNumberInput = e.target.value;
  if (personalIdNumberInput.length > 1) {
    let yearNumber = personalIdNumberInput.substring(0, 2).padStart(2, "0");
    fullYearOfBirth = getFullYearOfPerson(yearNumber);
    if (personalIdNumberInput.length > 3) {
      monthNumber = personalIdNumberInput.substring(2, 4).padStart(2, "0");
      if (personalIdNumberInput.length > 5) {
        dayNumber = personalIdNumberInput.substring(4, 6).padStart(2, "0");
      }
    }
    dobInput.value = fullYearOfBirth + "-" + monthNumber + "-" + dayNumber;
  }
};

const getFullYearOfPerson = (yearNumber) => {
  const currentYearLast2Number = new Date()
    .getFullYear()
    .toString()
    .substring(2, 4);
  return yearNumber > currentYearLast2Number
    ? "19" + yearNumber
    : "20" + yearNumber;
};

const validate = () => {
  let regName = /^[a-zA-Z]+$/;
  let firstName = document.querySelector("#nameInput").value;
  let lastName = document.querySelector("#lastNameInput").value;
  let personalIdNumber = document.querySelector("#peselInput").value;

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
  alert("Pomyślnie zapisano");
  const objectBuilder = {
    key: Math.random(100),
    person: {
      firstName: firstName,
      lastName: lastName,
      personalIdNumber: personalIdNumber,
      DOB: getDOB(),
    },
  };
  localStorage.setItem(objectBuilder.key, JSON.stringify(objectBuilder.person));
  return true;
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
  let modal = document.querySelector("#myModal");
  let close = document.querySelector(".close");
  let textInsideModal = modal.querySelector(".textInsideModal");
  textInsideModal.innerText = textInModal;
  modal.style.display = "block";
  close.addEventListener("click", () => {
    modal.style.display = "none";
  });
};
const getDOB = () => {
  return document.querySelector("#dobInput").value;
};

mainMethodExecuter();
