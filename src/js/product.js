import Gallery from "./modules/gallery";
import QuantityController from "./modules/quantity";

window.addEventListener("load", () => {
    // Галерея
    new Gallery(productGall);

    // Лічильник товарів
    document
        .querySelectorAll("[data-counter]")
        .forEach((counter) => new QuantityController(counter));
});
