// script.js - Portfólio Tomás Amaral

document.addEventListener("DOMContentLoaded", function () {

  // ------------------------------------------------------
  // LOGÓTIPO: scroll para o topo se já estiver na home
  // ------------------------------------------------------
  var logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("click", function (event) {
      var isHomePage = window.location.pathname.endsWith("index.html") ||
                        window.location.pathname === "/" ||
                        window.location.pathname.endsWith("/");
      if (isHomePage) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
	

	
// ------------------------------------------------------
// GALERIA DE PROJETOS DA HOME: scroll horizontal manual
// Apenas via roda do rato, trackpad e toque nativo.
// Arrasto com o rato foi removido a pedido do utilizador.
// ------------------------------------------------------

	
	
	
	const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', () => {
    setTimeout(() => {
      contactForm.hidden = true;
      formSuccess.hidden = false;
    }, 800);
  });
}
	
	
	
const projectsScroller = document.querySelector('.home-projects-scroll');

if (projectsScroller) {
  projectsScroller.addEventListener('wheel', (event) => {
    const canScrollHorizontally =
      projectsScroller.scrollWidth > projectsScroller.clientWidth;
    if (!canScrollHorizontally) return;
    event.preventDefault();
    projectsScroller.scrollLeft += event.deltaY + event.deltaX;
  }, { passive: false });
}
  // ------------------------------------------------------
  // LIGHTBOX: abrir, fechar e navegar entre imagens
  // (usado em photography-project-XX.html e design-project-XX.html)
  // ------------------------------------------------------
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  var lightboxPrev = document.getElementById("lightboxPrev");
  var lightboxNext = document.getElementById("lightboxNext");
  var galleryGrid = document.getElementById("galleryGrid");

  if (lightbox && lightboxImg && galleryGrid) {

    var galleryButtons = Array.prototype.slice.call(
      galleryGrid.querySelectorAll(".gallery-btn")
    );
    var currentIndex = 0;
    var lastFocusedElement = null;

    function openLightbox(index) {
      currentIndex = index;
      var img = galleryButtons[currentIndex].querySelector(".gallery-img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lastFocusedElement = galleryButtons[currentIndex];
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      lightboxClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    }

    function showImage(index) {
      var total = galleryButtons.length;
      currentIndex = (index + total) % total;
      var img = galleryButtons[currentIndex].querySelector(".gallery-img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    }

    galleryButtons.forEach(function (btn, index) {
      btn.addEventListener("click", function () {
        openLightbox(index);
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    lightboxPrev.addEventListener("click", function () {
      showImage(currentIndex - 1);
    });

    lightboxNext.addEventListener("click", function () {
      showImage(currentIndex + 1);
    });

    document.addEventListener("keydown", function (event) {
      if (!lightbox.classList.contains("is-open")) {
        return;
      }
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        showImage(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        showImage(currentIndex + 1);
      }
    });

    lightbox.addEventListener("keydown", function (event) {
      if (event.key !== "Tab") {
        return;
      }
      var focusable = [lightboxPrev, lightboxNext, lightboxClose];
      var firstEl = focusable[0];
      var lastEl = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    });
  }
	
	
	
	
const siteHeader = document.querySelector('.site-header');
const mainContent = document.querySelector('main');
const pageScroll = document.querySelector('.page-scroll');
const isHomePage = document.body.classList.contains('home-page');
	
if (siteHeader && mainContent) {
  function setHeaderOffset() {
    const headerPosition = window.getComputedStyle(siteHeader).position;
    if (headerPosition === 'fixed') {
      mainContent.style.paddingTop = `${siteHeader.offsetHeight}px`;
    } else {
      mainContent.style.paddingTop = '';
    }
  }

  setHeaderOffset();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setHeaderOffset);
  }
  window.addEventListener('load', setHeaderOffset);
  window.addEventListener('resize', setHeaderOffset);

  function updateScrolledState(scrollTop) {
    if (scrollTop > 40) {
      siteHeader.classList.add('site-header--scrolled');
    } else {
      siteHeader.classList.remove('site-header--scrolled');
    }
  }

  if (pageScroll) {
    pageScroll.addEventListener('scroll', () => {
      updateScrolledState(pageScroll.scrollTop);
    });
  } else {
    window.addEventListener('scroll', () => {
      updateScrolledState(window.scrollY);
    }, { passive: true });
  }
}	
	
	
	
/*const siteHeader = document.querySelector('.site-header');
const mainContent = document.querySelector('main');
const pageScroll = document.querySelector('.page-scroll');
const isHomePage = document.body.classList.contains('home-page');

if (siteHeader && mainContent && pageScroll && !isHomePage) {
  function setHeaderOffset() {
    const headerHeight = siteHeader.offsetHeight;
    mainContent.style.paddingTop = `${headerHeight}px`;
  }

  setHeaderOffset();
  window.addEventListener('resize', setHeaderOffset);

  pageScroll.addEventListener('scroll', () => {
    if (pageScroll.scrollTop > 40) {
      siteHeader.classList.add('site-header--scrolled');
    } else {
      siteHeader.classList.remove('site-header--scrolled');
    }
  });
}*/
	

});
