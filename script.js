import { data, scrolImges } from "./data.js";

var mouse = document.querySelector(".mouse");
var scales = document.querySelectorAll(".hvr-scale");

var isAnimating = false;
var playId;
var intervalTime = 5000;

var isLoading = false;

function loader() {
  function over() {
    const slides = document.querySelectorAll(".loader .loader-slide");
    slides.forEach((slide, i) => {
      gsap.to(slide, {
        delay: 0.16 * i,
        y: "-100%",
        duration: 0.7,
      });
    });
  }
  function addSpans(elem, val) {
    const parent = document.querySelector(elem);
    var text = parent.textContent;
    if (text.length <= 0) {
      text = val;
    }
    var clutter = "";
    text.split("").forEach((e) => {
      clutter += `<span>${e}</span>`;
    });
    parent.innerHTML = clutter;
  }

  function text(elem, reverse, wantText, val) {
    const parent = document.querySelector(elem);
    if (wantText) {
      addSpans(elem);
    }
    const spans = parent.querySelectorAll(" span");
    var half = spans.length / 2;

    half += half % 2 == 0 ? 0 : 1;
    half = Math.floor(half);

    spans.forEach((span, i) => {
      var idx = half - i - 1;
      if (idx < 0) {
        idx *= -1;
      }
      if (!reverse) {
        span.style.opacity = 1;
        gsap.from(span, {
          delay: (half - idx) * 0.06,
          top: 150 - (idx / half) * 70,
          opacity: 0,
          duration: 1,
        });
      } else {
        if (spans.length % 2 == 0) {
          gsap.to(span, {
            delay: 0.1 * i,
            top: 150,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          });
        } else {
          gsap.to(span, {
            delay: (half - idx) * 0.2,
            top: (150 + (idx / half) * 70) * val,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          });
        }
      }
    });
  }

  function getRandom() {
    return Math.floor(Math.random() * 20);
  }
  function startLoading() {
    const fill = document.querySelector(".line .fill");
    const loadingPara = document.querySelector(".loadingPara");
    var loading = 0;
    var id;
    gsap.set(fill, {
      x: "-100%",
    });
    id = setInterval(() => {
      var wantToClear = false;
      if (loading > 80) {
        wantToClear = true;
        loading = 100;
      } else {
        loading += getRandom();
      }
      gsap.to(fill, {
        x: (100 - loading) * -1 + "%",
      });
      loadingPara.innerHTML = `${loading}%`;
      if (wantToClear) {
        clearInterval(id);
        closeLoading();
      }
    }, 400);
  }
  function closeLoading() {
    setTimeout(() => {
      text(".loadingPara", true, true, 1);
      gsap.to(".loading .line", {
        width: 0,
        duration: 0.8,
        onComplete() {
          addSpans(".loader .text h1", "RE-IMAGINE");
          text(".loader .text h1", false, false, 1);
        },
      });
      gsap.to(".fill", {
        display: "none",
      });
    }, 600);
    setTimeout(() => {
      reveal();
    }, 3000);
  }
  function reveal() {
    gsap.to(".text h1 span", {
      top: -200,
      duration: 1,
      ease: "power4.out",
    });
    gsap.to(".loader-slide", {
      y: "-100%",
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
    });
    setTimeout(() => {
      gsap.to(".loader", {
        display: "none",
      });
      isLoading = false;
      main();
    }, 800);
  }
  startLoading();
}

//  1 => loader display none to flex done
//  2 => uncomment this loader fnc  done
//  3 => dont call main outside lader done
//  4 => change body theme to white done

loader();

function main() {
  const tl = gsap.timeline();
  gsap.to("nav", {
    delay:.5,
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: "power3.in",
  });
  tl.to(".hero-heading", {
    opacity: 1,
    y: 0,
    scale: 1,
    stagger: 0.2,
    duration: 0.7,
    ease: "power3.in",
  });
  tl.to(".tags .tags-bg", {
    left: 0,
    durations: 1,
  });
  tl.to(".animation-tag", {
    y: 0,
    opacity: 1,
    stagger: 0.1,
    durations: 0.7,
    ease: "power4.Out",
  });
  var hovers = document.querySelectorAll(".hvr-scale");

  hovers.forEach((elem) => {
    const text = elem.getAttribute("hvr-text");
    elem.addEventListener("mouseover", () => {
      gsap.to(mouse, {
        scale: 3,
        backgroundColor: "#ffffc5",
      });
    });
    elem.addEventListener("mouseleave", () => {
      gsap.to(mouse, {
        scale: 1,
      });
    });
  });

  document.addEventListener("mousemove", (e) => {
    var x = e.clientX;
    var y = e.clientY;
    gsap.to(mouse, {
      x,
      y,
      duration: 0.6,
    });
  });
  function textToSpan(elem) {
    var elems = document.querySelectorAll(elem);
    elems.forEach((element) => {
      var text = element.textContent;
      let splitText = text
        .split("")
        .filter((e) => e.length > 0 && e !== " ")
        .map((e) => `<span>${e == " " ? "" : e}</span>`)
        .join("");
      element.innerHTML = splitText;
    });
  }

  function initializeCards() {
    const cards = document.querySelectorAll(".slidder .card");
    gsap.to(cards, {
      y: (i) => -15 + 15 * i + "%",
      z: (i) => 15 * i,
      duration: 1,
      ease: "ease.out",
      stagger: -0.1,
    });
  }

  textToSpan(".card-text");
  initializeCards();

  gsap.set(".card .card-text span", {
    y: 200,
  });
  gsap.set(".card:last-child .card-text span", {
    y: 0,
  });

  document
    .querySelector(".page2 .page2-parts-con .page2-parts:nth-child(1)")
    .addEventListener("click", () => {
      clearTimeout(playId);
      cardsAnimate();
    });

  document
    .querySelector(".page2 .page2-parts-con .page2-parts:nth-child(1)")
    .addEventListener("mouseenter", () => {
      mouse.innerHTML = `<p>click</p>`;
    });
  document
    .querySelector(".page2 .page2-parts-con .page2-parts:nth-child(1)")
    .addEventListener("mouseleave", () => {
      mouse.innerHTML = ``;
    });

  playId = setTimeout(() => {
    cardsAnimate();
  }, intervalTime);

  const cardsAnimate = () => {
    if (isAnimating) return;
    const slidder = document.querySelector(".slidder");
    const cards = Array.from(document.querySelectorAll(".card"));
    const lastCard = cards.pop();
    const nextCard = cards[cards.length - 1];

    var tl = gsap.timeline();

    gsap.to(lastCard.querySelectorAll(".card-text span"), {
      delay: (i) => i * 0.05,
      y: 200,
      duration: 1,
      ease: "ease.out",
    });
    var cid;
    gsap.to(lastCard, {
      delay: 0.8,
      y: "+=150%",
      duration: 1,
      ease: "cubic",
      // width:0,
      onComplete() {
        slidder.prepend(lastCard);
        initializeCards();
        gsap.to(lastCard.querySelector(".card-text span"), {
          delay: 0.6,
          y: 200,
        });
        gsap.to(nextCard.querySelectorAll(".card-text span"), {
          delay: 0.8,
          y: 0,
          stagger: -0.05,
          duration: 0.7,
          onComplete() {
            isAnimating = false;
            clearTimeout(playId);
            playId = setTimeout(() => {
              // isAnimating = true;
              cardsAnimate();
            }, intervalTime);
          },
        });
      },
    });
  };

  gsap.to(".page2-parts-con", {
    x: "-50%",
    delay: 1,
    scrollTrigger: {
      trigger: ".page2-parts-con",
      start: "top 0",
      end: "bottom top",
      scrub: 1,
      pin: true,
      ease: "circ.inOut",
    },
    // duration: 1,
  });

  var currentThemerIndex = 0;
  const themers = document.querySelectorAll(".themer");
  var isNavUp = false;
  themers.forEach((themer, i) => {
    var theme = themer.getAttribute("theme");
    gsap.to(themer, {
      scrollTrigger: {
        trigger: themer,
        start: "-30% top",
        end: "60% top",
        merkers: true,
        onEnter() {
          currentThemerIndex = i;
          if (i > 0 && !isNavUp) {
            const nav = document.querySelector("nav");
            gsap.to(nav, {
              y: -10,
              duration: 1,
              ease: "power4.out",
            });
            isNavUp = true;
          }
          document.body.setAttribute("theme", theme);
        },
        onEnterBack() {
          if (i == 0 && isNavUp) {
            const nav = document.querySelector("nav");
            gsap.to(nav, {
              y: 0,
              duration: 1,
              ease: "power4.out",
            });
            isNavUp = false;
          }
          document.body.setAttribute("theme", theme);
          currentThemerIndex = i;
        },
        onUpdate() {
          if (
            document.body.getAttribute("theme") !== theme &&
            currentThemerIndex == i
          ) {
            document.body.setAttribute("theme", theme);
          }
        },
      },
    });
  });

  // make this funtion dynamic
  function changingTextAnimation() {
    var data = "SHERYIANS EXPERIENCE";
    const parent = document.querySelector(".changing-text");
    var clutter = "";
    var i = 0;
    function addSpans() {
      var item = data[i];
      clutter += `<span class='changing-span'>${
        item == " " ? "&nbsp;" : item
      }</span>`;

      if (i < data.length - 1) {
        i++;
        addSpans();
      }
    }
    addSpans();
    parent.innerHTML = clutter;
    function startChanging() {
      const spans = parent.querySelectorAll("span");
      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";
      spans.forEach((span, i) => {
        var intervals = 0;
        const maxIntervals = 15 + i;
        var original = span.innerHTML;
        var id;
        function randomText() {
          var text = chars[Math.floor(Math.random() * chars.length)];
          span.innerHTML = text;
        }
        id = setInterval(() => {
          if (intervals == maxIntervals) {
            clearInterval(id);
            intervals = 0;
            span.innerHTML = original;
            gsap.to(span, {
              scale: 1,
            });
            if (i == spans.length - 1) {
              setTimeout(() => {
                startChanging();
              }, 1000);
            }
            return;
          }
          gsap.to(span, {
            scale: 0.85,
            duration: 0.4,
            ease: "power4.out",
            transform: "rotateY(360deg)",
          });
          intervals++;
          randomText();
        }, 100);
      });
    }
    startChanging();
  }

  changingTextAnimation();

  function creteSpans(elem, data) {
    var clutter = "";
    data.split("").forEach((e) => {
      clutter += `<span>${e}</span>`;
    });
    return clutter;
  }

  function imgSectionAnimation() {
    function changeText(elem, text, dets) {
      function up(elems, obj) {
        tl.to(prevSpans, {
          y: -100,
          duration: 0.7,
          stagger: 0.035,
          ease: "power3.out",
          onComplete() {
            if (obj.isDown) {
              elem.innerHTML = creteSpans(elem, text);
              down(elem.querySelectorAll("span"), obj);
            }
          },
        });
      }
      function down(elems, obj) {
        gsap.from(elems, {
          y: -100,
          duration: 0.4,
          stagger: 0.035,
          ease: "expo.out",
        });
      }

      const prevSpans = elem.querySelectorAll("span");
      const tl = gsap.timeline({});
      up(prevSpans, { ...dets });
    }

    const float_text = document.querySelector(".floating-text");
    float_text.innerHTML = creteSpans(
      float_text || "sheryians experience",
      "SHERIANS"
    );
    gsap.set(float_text.querySelectorAll("span"), {
      y: -100,
    });
    const image_setions = document.querySelectorAll(".img-section");
    const page3 = document.querySelector(".page3");

    gsap.to(page3, {
      scrollTrigger: {
        trigger: page3,
        start: "0 top",
        end: "bottom 40%",
        onEnter() {
          // callback while entering
          gsap.to(".floating-text", {
            display: "flex",
            duration: 0.7,
          });
        },
        onLeave() {
          // callback while leaving or ending
          gsap.to(".floating-text", {
            display: "none",
            duration: 0.7,
          });
        },
        onLeaveBack() {
          // callback while living the start
          gsap.to(".floating-text", {
            display: "none",
            duration: 0.7,
          });
        },
        onEnterBack() {
          // callBack while entering back after ending
          gsap.to(".floating-text", {
            display: "flex",
            duration: 0.7,
          });
        },
      },
    });

    image_setions.forEach((section, i) => {
      const text = section.getAttribute("text").toUpperCase();
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "clamp(top 20%)",
          end: "clamp(bottom 65%)",
          onEnter() {
            // gsap.to(section.querySelector('img'),{
            //   scale:1.07,
            //   ease:'power3.inOut'
            // })
            changeText(float_text, text, { isUp: true, isDown: true });
          },
          onEnterBack() {
            changeText(float_text, text, { isUp: true, isDown: true });
            // gsap.to(section.querySelector('img'),{
            //   scale:1.07,
            //   ease:'power3.in'
            // })
          },
          onLeave() {
            if (i == image_setions.length - 1) {
              changeText(float_text, text, { isUp: true, isDown: false });
            }
            gsap.to(section.querySelector("img"), {
              scale: 1,
              ease: "power3.inOut",
            });
          },
          onLeaveBack() {
            if (i == 0) {
              changeText(float_text, text, { isUp: true, isDown: false });
            }
            gsap.to(section.querySelector("img"), {
              scale: 1,
              ease: "power3.inOut",
            });
          },
        },
      });
    });
  }
  imgSectionAnimation();

  const lenis = new Lenis();

  lenis.on("scroll", (e) => {});

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  const mouse = document.querySelector(".mouse");
  const btn = document.querySelector(".fun-btn");

  function exiteMeBtn() {
    btn.addEventListener("mouseenter", () => {
      gsap.to(".excite-bg", {
        left: 0,
        duration: 0.4,
      });
      mouse.innerHTML = `<p>click</p>`;
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(".excite-bg", {
        left: "-100%",
        duration: 0.4,
        onComplete() {
          gsap.set(".excite-bg", {
            left: "100%",
          });
        },
      });
      mouse.innerHTML = ``;
    });
  }

  exiteMeBtn();

  lenis.on("scroll", ScrollTrigger.update);

  function parrallexImages() {
    var isParrallexShowen = false;
    const gallery = document.querySelector(".page4 .gallery");
    const content = document.querySelector(".page4 .gallery .content");
    const page4 = document.querySelector(".page4");
    const nav = document.querySelector("nav");

    function showGallery() {
      const tl = gsap.timeline();
      gsap.to(".gallery-text", {
        opacity: 1,
        duration: 0.6,
      });
      tl.to(gallery, {
        display: "flex",
        opacity: 1,
        duration: 0.3,
        ease: "power4.out",
      });
      tl.to(".gallery .content .wrapper", {
        opacity: 1,
        stagger: 0.1,
        ease: "power3.in",
      });
      gsap.to(nav, {
        opacity: 0,
        duration: 0.6,
        ease: "power4.out",
        onComplete() {
          gsap.to(nav, {
            display: "none",
          });
        },
      });
      mouse.innerHTML = `<p>close</p>`;
    }
    function hideGallery() {
      const tl = gsap.timeline();
      gsap.to(".gallery-text", {
        opacity: 0,
        duration: 0.6,
      });
      tl.to(".gallery .content .wrapper", {
        opacity: 0,
        ease: "power3.out",
        stagger: 0.1,
      });
      tl.to(gallery, {
        display: "none",
        opacity: 0,
        duration: 0.1,
      });
      gsap.to(nav, {
        opacity: 1,
        duration: 0.1,
        onComplete() {
          gsap.to(nav, {
            display: "flex",
          });
        },
      });
      mouse.innerHTML = ``;
    }

    btn.addEventListener("click", (e) => {
      if (isParrallexShowen) {
        isParrallexShowen = false;
        hideGallery();
      } else {
        isParrallexShowen = true;
        showGallery();
      }
    });
    gallery.addEventListener("click", (e) => {
      isParrallexShowen = false;
      hideGallery();
    });

    function showElements() {
      data.forEach((e) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("shery-img-wrapper");
        wrapper.classList.add("wrapper");
        const img = document.createElement("img");
      
        img.setAttribute("src", e.img);
        wrapper.appendChild(img);
        content.appendChild(wrapper);

        wrapper.style.top = e.y + "%";
        wrapper.style.left = e.x + "%";
        wrapper.setAttribute("text", e.text);
        wrapper.addEventListener("mouseenter", () => {
          document.querySelector(".gallery-text").innerHTML = e.text;
        });
      });
    }
    showElements();
    gsap.set(gallery, {
      display: "none",
      opacity: 0,
      duration: 0.1,
    });
    var parrallexTimeId = null;
    function parrallex() {
      page4.addEventListener("mousemove", (e) => {
        if (mouse.innerHTML !== "close" && isParrallexShowen) {
          mouse.innerHTML = `<p>close</p>`;
        }
        clearTimeout(parrallexTimeId);
        if (isParrallexShowen) {
          const x = e.clientX;
          const y = e.clientY;
          const rect = page4.getBoundingClientRect();
          const width = rect.width;
          const height = rect.height;
          const deltaY = ((y - height / 2) / height / 1) * -100;
          const deltaX = ((x - width / 2) / width / 1) * -100;
          gsap.to(content, {
            x: deltaX + "vw",
            y: deltaY + "vh",
            duration: 0.6,
            ease: "power3.out",
          });
          gsap.to(".page4 .gallery .content .wrapper", {
            scale: 1.1,
            duration: 0.4,
            ease: "power3.out",
          });
          parrallexTimeId = setTimeout(() => {
            gsap.to(".page4 .gallery .content .wrapper", {
              scale: 1,
              duration: 0.4,
            });
          }, 500);
        }
      });
    }
    parrallex();

    gsap.to(".page4", {
      scrollTrigger: {
        trigger: ".page4",
        start: "top top",
        end: "bottom 95%",
        scrub: true,
        onLeave() {
          hideGallery();
        },
        onLeaveBack() {
          hideGallery();
        },
      },
    });

    lenis.on("scroll", (e) => {
      const page4 = document.querySelector(".page4");
      const rect = page4.getBoundingClientRect();
      const top = rect.top;
      if (
        (top > 0 || rect.top + rect.height < rect.height) &&
        isParrallexShowen
      ) {
        hideGallery();
      }
    });
  }
  parrallexImages();
  const page5Content = document.querySelector(".page5 .page5-content");
  var clutter = "";
  function addElems() {
    [...scrolImges].forEach((img) => {
      clutter += `
    <div class="elem">
          <img src="${img}" alt="">
    </div>
    `;
    });
    page5Content.innerHTML = clutter;
  }
  addElems();
  const elems = document.querySelectorAll(".page5-content .elem");
  const centerX = innerWidth / 2;

  elems.forEach((elem) => {
    elem.addEventListener("mouseenter", (e) => {
      elem.style.left = "-100px";
    });
    elem.addEventListener("mouseleave", (e) => {
      elem.style.left = "0";
    });
  });

  function page5Images() {
    gsap.to(page5Content, {
      scrollTrigger: {
        trigger: ".page5",
        start: "top top",
        end: "bottom -400vh",
        pin: true,
        scrub: 1,
        onUpdate(e) {
          const offsetY = e.progress * 100;
          const initialTransfrom = `translate3d(-50%, -50%, 0) rotateX(0deg) rotateY(-25deg) rotateZ(-120deg) `;
          page5Content.style.transform = `${initialTransfrom} translateY(${
            offsetY - 50
          }%)`;
        },
      },
    });
  }
  page5Images();

  function page6Andpage7Animation() {
    const page6CardsCon = document.querySelector(".page6-cards");

    var prevX = 0;
    var prevY = 0;
    var rotateId = null;

    const page6Cards = document.querySelectorAll(".page6-card");

    page6Cards.forEach((card) => {
      const src = card.getAttribute("img");
      const imgCon = document.createElement("div");
      imgCon.classList.add("page6-image");
      imgCon.innerHTML = `<img src="${src}" alt="">`;
      card.appendChild(imgCon);
    });

    page6Cards.forEach((card, i) => {
      const imgCon = card.querySelector(".page6-image ");
      card.addEventListener("mouseenter", (e) => {
        gsap.to(imgCon, {
          scale: 1,
          opacity: 1,
        });
      });

      card.addEventListener("mousemove", (e) => {
        clearTimeout(rotateId);
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const moveX = prevX - x,
          moveY = prevY - y;
        prevX = x;
        prevY = y;
        gsap.to(imgCon, {
          top: y,
          left: x,
          rotate: moveX > 25 ? 25 : moveX < -25 ? -25 : moveX,
        });
        rotateId = setTimeout(() => {
          gsap.to(imgCon, {
            rotate: 0,
          });
        }, 600);
      });

      card.addEventListener("mouseleave", (e) => {
        gsap.to(imgCon, {
          scale: 0,
          opacity: 0,
        });
      });
    });

    const underlineParents = document.querySelectorAll(".underline-parent");

    underlineParents.forEach((parent) => {
      var isChildMoving = false;

      const rect = parent.getBoundingClientRect();
      const div = document.createElement("div");
      div.classList.add("underline-child");
      div.style = `
   width: ${rect.width}px;
   height:1px;
   position:absolute;
   bottom:0;
   left:0;
   overflow:hidden;
  `;

      const underlineChildMove = document.createElement("div");
      underlineChildMove.style = `
    height:1px;
    width:100%;
    background:white;
    transform:translateX(-100%)
  `;

      parent.style.cursor = "pointer";

      div.appendChild(underlineChildMove);
      parent.appendChild(div);

      const tl = gsap.timeline();

      parent.addEventListener("mouseenter", (e) => {
        if (!isChildMoving) {
          isChildMoving = true;
          tl.to(underlineChildMove, {
            x: 0,
          });
        }
      });
      parent.addEventListener("mouseleave", (e) => {
        const tl2 = gsap.timeline();
        tl2.to(underlineChildMove, {
          x: "110%",
        });
        tl2.set(underlineChildMove, {
          x: "-110%",
          onComplete() {
            isChildMoving = false;
          },
        });
      });
    });

    const navItems = document.querySelectorAll(".nav-item");
    const nav_links = document.querySelectorAll(".mover a ");

    var itemMovers = [];

    navItems.forEach((item) => {
      const itemMover = item.querySelector(".item-mover");
      itemMovers.push(itemMover);
    });
    navItems.forEach((item, i) => {
      item.addEventListener("mouseenter", (e) => {
        gsap.to(itemMovers[i], {
          top: "-100%",
          duration: 0.5,
          ease: "power3.out",
        });
      });
      item.addEventListener("mouseleave", (e) => {
        gsap.to(itemMovers[i], {
          top: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      });
    });

    function nav() {
      const nav = document.querySelector(".nav-items");
      const showBtn = document.querySelector(".hamburger");
      const closeBtn = document.querySelector(".nav-items .close");
      showBtn.addEventListener("click", (e) => {
        const navRect = nav.getBoundingClientRect();
        gsap.to(nav, {
          right: navRect.width,
        });
      });
      closeBtn.addEventListener("click", (e) => {
        const navRect = nav.getBoundingClientRect();
        gsap.to(nav, {
          right: 0,
        });
      });
    }

    nav();
  }

  page6Andpage7Animation();

  lenis.on("scroll", (e) => {
    const { progress } = e;
    gsap.to(".scroll-progress", {
      width: progress * 100 + "vw",
    });
  });
}
