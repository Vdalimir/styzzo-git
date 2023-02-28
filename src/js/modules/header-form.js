export function toggleForm(checkbox, contents = [], titles = []){
    if(checkbox) {
        checkbox.addEventListener('change', ()=> {
            if(contents.length) {
                contents.forEach((c) => {
                    if(c) {
                        c.classList.toggle('hidden')
                    }
                })
            }
            if(titles.length) {
                titles.forEach((t) => {
                    if(t) {
                        t.classList.toggle('active')
                    }
                })
            }
        })
    }
}