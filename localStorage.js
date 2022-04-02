export class LocalStorage {
  saveInLocalStorage = (personBuilder) => {
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
}
