import './icons/style.css'
import './src/css/app.css'
import 'fullpage.js/dist/fullpage.min.css'
import 'aos/dist/aos.css';
import fullPage from 'fullpage.js'
import AOS from "aos";
import logoBlack from './src/img/logo-black.svg';
import logoWhite from './src/img/logo.svg';

import './src/js/projects'


let preloader = document.getElementById('preloader')
window.onload = ()=> {
    setTimeout(()=> {
        preloader.classList.add('opacity-0')
    }, 1000)
    setTimeout( () => {
        preloader.classList.add('hidden')
        AOS.init();
    }, 1500)
}
let mainMenu = document.getElementById('main-menu')
let navList = mainMenu.querySelector('ul')
let btnOpenMenu = document.getElementById('btn-open-menu')
let bodyEl = document.querySelector('body')
let navLogoImg = document.getElementById('nav-logo-img')
let borderForAnimate = document.getElementById('border-for-animate')
let nav = document.getElementById('nav')
function initializeFullPage() {
    let fullPageScroll = new fullPage('#fullPage', {
        css3: false,
        beforeLeave: function(origin, destination, direction, trigger){
            nav.classList.remove('duration-500')
            nav.classList.add('duration-300')
            nav.classList.add('-translate-y-full')
            nav.classList.add('opacity-0')

            nav.classList.remove('translate-y-0')
            nav.classList.remove('opacity-100')
        },
        onLeave: function(origin, destination, direction, trigger){
            if (destination.item.classList.contains('bg-white')){
                bodyEl.classList.add('dark')
                navLogoImg.src = logoBlack
            }else {
                bodyEl.classList.remove('dark')
                navLogoImg.src = logoWhite
            }

           /* if (destination.item.classList.contains('footer')){
                nav.classList.add('backdrop-blur-2xl')
            }else {
                nav.classList.remove('backdrop-blur-2xl')
            }*/
        },
        afterLoad: function(origin, destination, direction, trigger){
            AOS.refresh()
            nav.classList.remove('duration-300')
            nav.classList.add('duration-500')
            nav.classList.add('translate-y-0')
            nav.classList.add('opacity-100')
            nav.classList.remove('opacity-0')
            nav.classList.remove('-translate-y-full')
            setTimeout(()=> {
                document.querySelectorAll('.fp-table.active .aos-init').forEach((el) => {
                    el.classList.add('aos-animate')
                })
            }, 2000)
        },
        onScrollOverflow: function( section, slide, position, direction){
            if(position > 0) {
                nav.classList.add('backdrop-blur-2xl')
            } else {
                nav.classList.remove('backdrop-blur-2xl')
            }
        }
    });
}
initializeFullPage()

btnOpenMenu.addEventListener('click', (e) => {

    let activeSection = fullpage_api.getActiveSection()
    setTimeout(()=> {
        e.target.classList.toggle('active')
    },300)
    if (e.target.dataset.openMenu !== 'open') {
        setTimeout(()=> {
            mainMenu.classList.toggle('h-screen')
            mainMenu.classList.toggle('h-0')
            navList.classList.toggle('show')
        },300)

        borderForAnimate.classList.toggle('w-full')
        borderForAnimate.classList.toggle('w-0')
        borderForAnimate.classList.toggle('right-3')
        borderForAnimate.classList.toggle('right-0')

        setTimeout(()=> {
            borderForAnimate.classList.toggle('!top-[100vh]')
        },300)


        e.target.dataset.openMenu = 'open'
        if (activeSection.item.classList.contains('bg-white')){
            bodyEl.classList.remove('dark')
            navLogoImg.src = logoWhite
        }
        fullpage_api.setAllowScrolling(false)
    } else {
        navList.classList.toggle('show')
        mainMenu.classList.toggle('h-screen')
        mainMenu.classList.toggle('h-0')
        borderForAnimate.classList.toggle('!top-[100vh]')
        e.target.dataset.openMenu = ''
        setTimeout(()=> {
            borderForAnimate.classList.toggle('w-0')
            borderForAnimate.classList.toggle('w-full')
            borderForAnimate.classList.toggle('right-3')
            borderForAnimate.classList.toggle('right-0')
        },500)

        if (activeSection.item.classList.contains('bg-white')){
            bodyEl.classList.add('dark')
            navLogoImg.src = logoBlack
        }
        fullpage_api.setAllowScrolling(true)
    }
})