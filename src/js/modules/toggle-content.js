let ToggleContent = function (btn, content) {
    this.btn = btn;
    this.content = content;
    this.contentHeight = this.content.clientHeight;
    this.init();
};

ToggleContent.prototype = {
    /* Properties */
    init: function () {
        this.content.classList.add(
            "max-h-0",
            "overflow-hidden",
            "w-full",
            "transition-[max-height]"
        );
        this.btn.addEventListener("click", () => {
            if (this.btn.classList.contains("open")) {
                this.close();
            } else {
                this.open();
            }
        });
    },
    open: function () {
        this.content.style.maxHeight = this.contentHeight + "px";
        this.btn.classList.add("open");
        this.content.classList.add("open");
    },
    close: function () {
        this.content.style.maxHeight = "";
        this.btn.classList.remove("open");
        this.content.classList.remove("open");
    },
};

export default ToggleContent;
