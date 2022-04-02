import { getDocumentElement } from "/component.js";
export class ModalClass {
  showCloseModal = (textInModal) => {
    let modal = getDocumentElement("#myModal");
    let close = getDocumentElement(".close");
    let textInsideModal = modal.querySelector(".textInsideModal");
    textInsideModal.innerText = textInModal;
    modal.style.display = "block";
    close.addEventListener("click", () => {
      modal.style.display = "none";
    });
  };
}
