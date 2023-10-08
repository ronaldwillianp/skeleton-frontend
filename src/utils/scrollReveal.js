import ScrollReveal from "scrollreveal";

 window.sr = ScrollReveal({
    reset: true,
    duration: 2000
})

 sr.reveal('.title', {
    origin: 'top',
    distance: '55px',
  })

sr.reveal('.subtitle', {
    origin: 'top',
    distance: '60px',
  })

 sr.reveal('.list', {
    origin: 'left',
    distance: '50px',
  })

sr.reveal('.listWithInterval', {
   origin: 'top right',
    distance: '-50px',
    interval: 200
  })
