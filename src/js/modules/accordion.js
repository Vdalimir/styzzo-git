var Accordion = function (element) {
    this.element = element;
    this.init();
};

Accordion.prototype = {
    /* Properties */
    init: function () {
        var self = this;
        this.subjects = this.element.children;
        this.last_open = undefined;
        this.openListener = function () {
            self.open(this, self);
        };
        this.closeListener = function () {
            self.close(this, self);
        };
        this.setupHeight();
    },

    setupHeight: function () {
        var self = this;
        var x;
        var len = self.subjects.length;

        for (x = 0; x < len; x++) {
            var subject = self.subjects[x];
            var h3 = subject.firstElementChild;
            h3.addEventListener("click", self.openListener, false);
            subject.style.height = h3.clientHeight + "px";
        }
    },

    open: function (th, self) {
        var subject = th.parentElement;
        var p = th.nextElementSibling;
        subject.style.height = th.clientHeight + p.clientHeight + "px";
        subject.classList.add("open");
        th.removeEventListener("click", self.openListener);
        th.addEventListener("click", self.closeListener, false);
        if (self.last_open !== undefined) {
            if (self.last_open !== this) {
                self.close(self.last_open, self);
            }
        }
        self.last_open = th;
    },

    close: function (th, self) {
        var subject = th.parentElement;
        subject.style.height = th.clientHeight + "px";
        subject.classList.remove("open");
        th.removeEventListener("click", self.closeListener);
        th.addEventListener("click", self.openListener, false);
        if (self.last_open === th) {
            self.last_open = undefined;
        }
    },
};

export default Accordion;