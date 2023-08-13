const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// first page animation
function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

//jab mouse move ho to  hum log skew kar paye
//  aur maximum skew and maximum skew define  kar  p aye ,
// jab mouse move ho to chapta ki value badhe ,
// aur jab mouse chalna band ho jaye  to chapta hata lo

var timeout;

function circleChaptaKaro() {
  //define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);
    (xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev)),
      (yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev));

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollwer(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px)  scale(1,1) `;
    }, 100);
  });
}

circleChaptaKaro();

function circleMouseFollwer(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px)  scale(${xscale},${yscale}) `;
  });
}

circleMouseFollwer();
firstPageAnim();

//teeno element ko select karo,uske baad
// teeno par ek mousemove lagao,jab
// mousemove ho to ye pata karo ki mouse
// kaha par hai ,jiska matlab hai mouse ki
// x and y position pata karo ,ab mouse ki x y
//  position ke bdle us image ko show karo us image
//   ko move karo,move karte waqt rotate karo,and jaise
//   jaise mouse tez chale waise waise rotation bhi tez ho jaye

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power4,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;

    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power4,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});
