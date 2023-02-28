class QuantityController {
    constructor(counter) {
        this.counter = counter;
        this.init();
    }
    init() {
        const parent = this.counter.closest("[data-product]");
        const prices = parent.querySelectorAll("[data-price]");
        const increment = parent.querySelector("[data-increment]");
        const decrement = parent.querySelector("[data-decrement]");
        const input = parent.querySelector("[data-quantity]");

        decrement.addEventListener("click", () => {
            input.value = +input.value - 1;
            if (input.value == "" || input.value == "0") {
                input.value = 1;
                return false;
            }

            this.main(input, prices);
        });
        increment.addEventListener("click", () => {
            input.value = +input.value + 1;
            this.main(input, prices);
        });
        input.addEventListener("input", (e) => {
            // addToCartBtn.dataset.quantity = +input.value + 1;
            if (input.value == "" || input.value == "0") {
                input.value = 1;
                return false;
            }
            if (input.value.length > input.max.length) {
                let priceArr = input.value.split("");
                priceArr.pop();

                input.value = priceArr.join("");
                return false;
            }
            this.main(input, prices);
        });
    }
    main(element, prices) {
        prices.forEach((price) => {
            this.setPrice(price, element.value);
        });
    }
    calcPrice(count, price) {
        return +count * +price;
    }
    setPrice(element, count) {
        const start = parseFloat(element.innerHTML.split("&nbsp;").join(""));
        const end = this.calcPrice(count, element.dataset.price);
        // element.innerHTML = price;
        this.animateValue(element, start, end, 1000);
    }
    animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        start = parseFloat(start);
        end = parseFloat(end);
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min(
                (timestamp - startTimestamp) / duration,
                1
            );
            // console.log(start, end);
            obj.innerHTML = Math.floor(
                progress * (end - start) + start
            ).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

export default QuantityController;