let SnapSlider = function (list, options) {
    this.init(list,options);
};

SnapSlider.prototype = {
    
    /* Properties */
    init: function (list, options) {
        this.list = list;
        this.options = options;
        this.list.classList.add(
            "flex",                 // to row
            "gap-8",                // space-betwean
            "py-10",                // add padding that show shadow 
            "-my-10",               // correct margins
            "snap-x",
            "px-break-out",
            "mx-break-out",
            "overflow-x-auto",
            "scrollbar-hide",
            "scroll-px-break-out"
        );
        
        if (this.options.prev) {
            this.options.prev.addEventListener('click', (e) => {
                this.goToPrev()
            }) 
        }
        if (this.options.next) {
            this.options.next.addEventListener('click', (e) => {
                this.goToNext()
            }) 
        }

        this.setObserver();
    },
    goToPrev: function () {
        this.goTo('prev')
    },
    goToNext: function () {
        this.goTo('next')
    },
    goTo: function (slide) {
        let coeffSlide;
        const width = window.getComputedStyle(this.list.querySelector('.show')).width,
              columnGap = window.getComputedStyle(this.list).columnGap,
              step = parseFloat(width) + parseFloat(columnGap);

        const index = [...this.list.querySelectorAll('li')].findIndex((el) => el.classList.contains('show'))
        
        if (slide == 'prev') {
            coeffSlide = index - 1;
        } else if (slide == 'next') {
            coeffSlide = index + 1;
        } else if (typeof slide == 'number') {
            coeffSlide = slide
        }

        const leftPoint = coeffSlide * step

        this.list.scrollTo({
            top: 0,
            left: leftPoint,
            behavior: 'smooth'
        })
    },
    setObserver: function () {
        const observer = new IntersectionObserver(entries => { 
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show')
                } else {
                    entry.target.classList.remove('show')
                }
            })
        },{
            root: this.list,
            threshold: 0.5
        })
        this.list.querySelectorAll('li').forEach(el => observer.observe(el))
    }
};

export default SnapSlider;

// document.querySelectorAll(".wc-block-grid").forEach((el, index) => {
//     const arrowvPrevEl = getProductsSwiperArrow("prev");
//     const arrowNextEl = getProductsSwiperArrow("next");
//     const wcBlockGridProducts = el.querySelector('.wc-block-grid__products')

//     arrowvPrevEl.addEventListener('click', (e) => {
//         const width = window.getComputedStyle(wcBlockGridProducts.querySelector('.show')).width;
//         const columnGap = window.getComputedStyle(wcBlockGridProducts).columnGap;
//         const indexSlide = [...wcBlockGridProducts.querySelectorAll('li')].findIndex((el) => el.classList.contains('show') )
//         const step = parseFloat(width) + parseFloat(columnGap);
//         const leftPoint = (indexSlide - 1) * step

//         wcBlockGridProducts.scrollTo({
//             top: 0,
//             left: leftPoint,
//             behavior: 'smooth'
//         })
//     })
//     arrowNextEl.addEventListener('click', (e) => {
//         const width = window.getComputedStyle(wcBlockGridProducts.querySelector('.show')).width;
//         const columnGap = window.getComputedStyle(wcBlockGridProducts).columnGap;
//         const indexSlide = [...wcBlockGridProducts.querySelectorAll('li')].findIndex((el) => el.classList.contains('show') )
//         const step = parseFloat(width) + parseFloat(columnGap);
//         const leftPoint = (indexSlide + 1) * step

//         wcBlockGridProducts.scrollTo({
//             top: 0,
//             left: leftPoint,
//             behavior: 'smooth'
//         })
//     }) 

//     el.insertAdjacentElement("beforeend", arrowvPrevEl);
//     el.insertAdjacentElement("beforeend", arrowNextEl);

    


// });
