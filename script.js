// *********** LOCOMOTIVE SECTION *************
loco = ()=>{
    gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,

  // for tablet smooth
  tablet: { smooth: true },

  // for mobile
  smartphone: { smooth: true }
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();
}

// *************** GSAP SECTION ****************

// *************** Responsive Section ***************
// console.log(window.innerWidth)
var ctrh, ctrw;

if (window.innerWidth <= 500) {
  ctrh = .7;
  ctrw = 2.5;
}
else {
  ctrh = 1;
  ctrw = 1;
}


// *************** FirstScreen Animation ***************
firstscreen = ()=>{
    textAnimation();
    gsap.from("#firstScreen nav",{
        x: "-100%",
        duration: 5,
        ease: Circ.easeInOut
    })
    gsap.to("#box img",{
        opacity: 1,
        duration: 2,
        stagger: 1,
        ease: Expo.easeInOut
    })
    liftUp = ()=>{
        gsap.to("h1 span",{
            opacity: 0,
            y: "-150%",
            ease: Expo.easeInOut,
            duration: 1
        })
    }
    var tl = gsap.timeline();
    tl
    .from("#box",{
        opacity: 0,
        height: "0vh",
        width: "0vw",
        duration: 2,
        ease: Expo.easeInOut,
        stagger: .1,
    })
    .to("#box",{
        height: `${45 * ctrh}vh`,
        width: `${37.5 * ctrw}vw`,
        duration: 1,
        ease: Expo.easeInOut,
        stagger: 1,
    })
    .to("#box",{
        height: `${50 * ctrh}vh`,
        width: `${20 * ctrw}vw`,
        duration: 1,
        ease: Expo.easeInOut,
        stagger: 1,
        onComplete: ()=>{
            liftUp();
        }
    })
    .to("#box",{
        height: "100vh",
        width: "100vw",
        duration: 1,
        ease: Circ.easeInOut,
        stagger: .5,
        onComplete: ()=>{
            document.querySelector("#firstScreen").style.display = "none";
            navLineAnimation();
        }
    })
}

// *************** firstscreen text animation ***************
textAnimation = ()=>{
    let cluster = "";
    let h1 =  document.querySelector("#firstScreen h1");
    let j = 0;
    for(let i=0; i <= Math.floor(h1.textContent.length/2); i++){
        cluster += `<span data-delay="${i}">${h1.textContent.charAt(j) === " "? "&nbsp;" : h1.textContent.charAt(j)}</span>`
        j++;
    }
    for(let i = Math.floor(h1.textContent.length/2)-1; i >= 0; i--){
        cluster += `<span data-delay="${i}">${h1.textContent.charAt(j) === " "? "&nbsp;" : h1.textContent.charAt(j)}</span>`
        j++;
    }
    h1.innerHTML = cluster
    document.querySelectorAll("h1 span")
    .forEach((elem)=>{
        gsap.from(elem,{
            y: "100%",
            duration: 2,
            delay: elem.dataset.delay*.1,
            ease: Expo.easeInOut
        })
    })
}

// *************** Nav Coverinng Animation ****************

navLineAnimation = ()=>{
    gsap.from("#navCover1",{
        x: "-100%",
        duration: 2,
        ease: Expo.easeInOut
    })
    harh1Animation();
}
navHoverAnimation= ()=>{
    let nav = document.querySelector("#navMain");
    nav.addEventListener('mouseenter',()=>{
        gsap.to('.navCover',{
            height: "100%",
            duration: .5,
            ease: Expo.easeOut
        })
        gsap.to(".navCover>span",{
            opacity: 1,
            duration: .1
        })
    })
    nav.addEventListener('mouseleave',()=>{
        gsap.to('.navCover',{
            height: "0",
            duration: .5,
            ease: Expo.easeOut
        })
        gsap.to('#navCover1',{
            height: "3px",
            duration: .5,
            ease: Expo.easeOut
        })
        gsap.to(".navCover>span",{
            opacity: 0,
            duration: .1
        })
    })
}

underline_Popup = ()=>{
    let section = document.querySelectorAll(".section");
    section.forEach(function(elem){
        // *************** h1 down movement animation ****************
        gsap.from(elem.children[1],{
            y: -400,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: elem.children[1],
                scroller : "#main",
                starts: "top 50%",
                // markers: true,
                scrub: true
            }
        })
        // *************** underline animation ****************
        elem.children[1].children[0].addEventListener("mouseenter",(dets)=>{
            gsap.to(dets.target.children[1],{
                width:"100%",
                ease: Expo.easeInOut,
                duration: .5
            })
            gsap.to(elem.children[1].children[1],{
                opacity: .7
            })
        })
        elem.children[1].children[0].addEventListener("mouseleave",(dets)=>{
            gsap.to(dets.target.children[1],{
                width:"0%",
                left: "100%",
                ease: Expo.easeInOut,
                duration: .5,
                onComplete: ()=>{
                    dets.target.children[1].style.left = "0";
                }
            })
            gsap.to(elem.children[1].children[1],{
                opacity: 0
            })
        })
    })
}

harh1Animation = ()=>{
    let cluster = "";
    let harh1 =  document.querySelectorAll(".text h1");
    let j = 0;
    harh1.forEach((char)=>{
        for(let i=0; i <= Math.floor(char.textContent.length/2); i++){
            cluster += `<span data-delay="${i}">${char.textContent.charAt(j) === " "? "&nbsp;" : char.textContent.charAt(j)}</span>`
            j++;
        }
        for(let i = Math.floor(char.textContent.length/2)-1; i >= 0; i--){
            cluster += `<span data-delay="${i}">${char.textContent.charAt(j) === " "? "&nbsp;" : char.textContent.charAt(j)}</span>`
            j++;
        }
        char.innerHTML = cluster
        cluster = "";
        j = 0;
    })
    
    harh1.forEach((elem)=>{
        elem.querySelectorAll("span")
        .forEach((span)=>{
            gsap.from(span,{
                scrollTrigger: {
                    scroller: "#main",
                    trigger: elem,
                    start: "top 80%"
                },
                y: "100%",
                duration: 1,
                delay: span.dataset.delay*.1,
                ease: Expo.easeInOut
            })
        })
    })
}

// *************** functions Initialisation ***************
loco();
firstscreen();
navHoverAnimation();
underline_Popup();