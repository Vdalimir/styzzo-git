// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

let projectsSliderEl = document.querySelector('.projects-swiper-slider')
if(projectsSliderEl) {
    const projectsSlider = new Swiper(projectsSliderEl, {
        modules: [Navigation],
        navigation: {
            nextEl: ".projects-swiper-button-next",
            prevEl: ".projects-swiper-button-prev",
        },
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 30,
    })

    let filterButtons = document.querySelectorAll('[data-category-filter]')
    let categoryItems = document.querySelectorAll('[data-category-item]')
    filterButtons.forEach(btn => {
        btn.addEventListener('click',(e) => {
            filterButtons.forEach(btnItem => {
                btnItem.classList.remove('bg-white')
                btnItem.classList.remove('text-core-black')
            })
            btn.classList.add('bg-white')
            btn.classList.add('text-core-black')
            if(e.target.dataset.categoryFilter === 'all') {
                categoryItems.forEach(item => {
                    item.classList.remove('!hidden')
                    item.classList.add('all')
                })
            } else {
                categoryItems.forEach(item => {
                    if(item.dataset.categoryItem === e.target.dataset.categoryFilter) {
                        item.classList.remove('!hidden')
                    } else {
                        item.classList.add('!hidden')
                    }
                })
            }
            projectsSlider.update()
            projectsSlider.slideTo(0)
        })
    })
}

