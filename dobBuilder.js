export class DOBBuilder {
  DOBBuilder = (e, dobInput) => {
    let personalIdNumberInput = e.target.value;
    let fullYearOfBirth = "yyyy";
    let monthNumber = "mm";
    let dayNumber = "dd";
    console.log(personalIdNumberInput);
    if (personalIdNumberInput.length > 1) {
      let yearNumber = this.subStringEachSectionInId(
        personalIdNumberInput,
        0,
        2
      );
      fullYearOfBirth = this.getFullYearOfPerson(yearNumber);
      if (personalIdNumberInput.length > 3) {
        monthNumber = this.subStringEachSectionInId(
          personalIdNumberInput,
          2,
          4
        );
        if (personalIdNumberInput.length > 5) {
          dayNumber = this.subStringEachSectionInId(
            personalIdNumberInput,
            4,
            6
          );
        }
      }
      dobInput.value = fullYearOfBirth + "-" + monthNumber + "-" + dayNumber;
    }
  };
  subStringEachSectionInId = (number, start, stop) => {
    return number.substring(start, stop).padStart(2, "0");
  };
  getFullYearOfPerson = (trimmedYearNumber) => {
    const currentYearLast2Number = new Date()
      .getFullYear()
      .toString()
      .substring(2, 4);
    return trimmedYearNumber > currentYearLast2Number
      ? "19" + trimmedYearNumber
      : "20" + trimmedYearNumber;
  };
}
