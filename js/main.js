/* Colégio Helena — main.js v3 (Tailwind) */
(function () {
  "use strict";

  /* ---------- Scroll Progress ---------- */
  var progressBar = document.querySelector(".scroll-progress");
  if (progressBar) {
    window.addEventListener("scroll", function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = "scaleX(" + (docHeight > 0 ? scrollTop / docHeight : 0) + ")";
    }, { passive: true });
  }

  /* ---------- Nav scrolled state ---------- */
  var nav = document.getElementById("main-nav");
  var navLogo = document.getElementById("nav-logo");
  var onScroll = function () {
    var scrolled = window.scrollY > 80;
    var cta = document.getElementById("nav-cta");
    if (nav) {
      if (scrolled) {
        nav.style.height = "";
        nav.classList.add("bg-white", "backdrop-blur-xl", "shadow-sm");
      } else {
        nav.style.height = "";
        nav.classList.remove("bg-white", "backdrop-blur-xl", "shadow-sm", "border-b", "border-line");
      }
    }
    if (navLogo) {
      navLogo.style.height = scrolled ? "48px" : "100px";
      navLogo.style.marginTop = scrolled ? "" : "50px";
      if (scrolled) {
        navLogo.classList.remove("brightness-0", "invert");
      } else {
        navLogo.classList.add("brightness-0", "invert");
      }
    }
    if (cta) {
      if (scrolled) {
        cta.classList.remove("bg-white/10", "border-white/20", "backdrop-blur-md", "text-white", "hover:bg-white/20");
        cta.classList.add("bg-brand/10", "border-brand", "text-brand", "hover:bg-brand/20");
      } else {
        cta.classList.remove("bg-brand/10", "border-brand", "text-brand", "hover:bg-brand/20");
        cta.classList.add("bg-white/10", "border-white/20", "backdrop-blur-md", "text-white", "hover:bg-white/20");
      }
    }
    document.querySelectorAll(".nav__link").forEach(function (link) {
      if (scrolled) {
        link.classList.remove("text-white/80", "hover:text-white");
        link.classList.add("text-ink", "hover:text-brand");
      } else {
        link.classList.add("text-white/80", "hover:text-white");
        link.classList.remove("text-ink", "hover:text-brand");
      }
    });
    document.querySelectorAll("#nav-burger span").forEach(function (span) {
      span.classList.remove("bg-ink", "bg-white");
      span.classList.add(scrolled ? "bg-ink" : "bg-white");
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("nav-burger");
  var menu = document.getElementById("nav-menu");
  var overlay = document.getElementById("nav-overlay");

  function closeMenu() {
    if (!menu) return;
    if (!menu.classList.contains("open")) return;
    menu.classList.remove("open");
    menu.classList.remove("lg:flex");
    menu.classList.add("hidden");
    menu.style.cssText = "";
    if (burger) {
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
    if (overlay) overlay.classList.add("opacity-0", "invisible");
    document.body.style.overflow = "";
    document.querySelectorAll(".nav__item.is-open").forEach(function (it) {
      it.classList.remove("is-open");
    });
    if (typeof onScroll === "function") onScroll();
  }

  if (burger && menu) {
    burger.addEventListener("click", function () {
      var isOpen = menu.classList.contains("open");
      if (isOpen) {
        closeMenu();
      } else {
        menu.classList.add("open");
        menu.classList.remove("hidden");
        menu.classList.add("lg:flex");
        menu.style.cssText = "display:flex;position:fixed;top:0;left:0;width:100%;height:100dvh;background:white;flex-direction:column;align-items:stretch;padding:6.5rem 1.5rem 2rem;gap:0;z-index:1000;overflow-y:auto;";
        burger.classList.add("open");
        burger.setAttribute("aria-expanded", "true");
        if (overlay) overlay.classList.add("opacity-0", "invisible");
        document.body.style.overflow = "hidden";
        // drawer branco: forçar links e burger escuros
        document.querySelectorAll(".nav__link").forEach(function (l) {
          l.classList.remove("text-white/80", "hover:text-white");
          l.classList.add("text-ink", "hover:text-brand");
        });
        document.querySelectorAll("#nav-burger span").forEach(function (s) {
          s.classList.remove("bg-white");
          s.classList.add("bg-ink");
        });
      }
    });
    if (overlay) overlay.addEventListener("click", closeMenu);
  }

  /* ---------- Dropdowns ---------- */
  (function () {
    var items = document.querySelectorAll(".nav__item.has-dropdown");
    function closeAll() {
      items.forEach(function (it) {
        it.classList.remove("is-open");
        var dd = it.querySelector(".nav__dropdown");
        if (dd) dd.style.display = "";
      });
    }
    items.forEach(function (item) {
      var link = item.querySelector(".nav__link");
      if (!link) return;
      link.addEventListener("click", function (e) {
        var isMobile = window.matchMedia("(max-width: 1023px)").matches;
        var wasOpen = item.classList.contains("is-open");
        if (isMobile) {
          e.preventDefault();
          closeAll();
          if (!wasOpen) {
            item.classList.add("is-open");
            var dd = item.querySelector(".nav__dropdown");
            if (dd) dd.style.display = "block";
          }
          return;
        }
        if (!wasOpen) {
          e.preventDefault();
          closeAll();
          item.classList.add("is-open");
        } else {
          closeAll();
        }
      });
    });
    document.querySelectorAll(".nav__dropdown a").forEach(function (a) {
      a.addEventListener("click", function () { closeAll(); closeMenu(); });
    });
    document.addEventListener("click", function (e) {
      var inside = false;
      items.forEach(function (it) { if (it.contains(e.target)) inside = true; });
      if (!inside) closeAll();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeAll(); closeDock(); }
    });
  })();

  if (menu) {
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function (e) {
        var isDropdownParent = a.closest(".has-dropdown") && a.classList.contains("nav__link");
        if (!isDropdownParent) closeMenu();
      });
    });
  }

  /* ---------- Quick Access Dock ---------- */
  var dock = document.getElementById("quick-dock");

  function closeDock() {
    if (dock) {
      dock.setAttribute("aria-hidden", "true");
      var trigger = dock.querySelector(".quick-dock__trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
      var panel = dock.querySelector(".quick-dock__panel");
      if (panel) panel.style.cssText = "";
      var backdrop = dock.querySelector(".quick-dock__backdrop");
      if (backdrop) backdrop.classList.add("opacity-0", "invisible");
    }
  }

  if (dock) {
    var trigger = dock.querySelector(".quick-dock__trigger");
    var closeBtn = dock.querySelector(".quick-dock__close");
    var backdrop = dock.querySelector(".quick-dock__backdrop");

    function toggleDock() {
      var hidden = dock.getAttribute("aria-hidden") === "true";
      dock.setAttribute("aria-hidden", String(!hidden));
      if (trigger) trigger.setAttribute("aria-expanded", String(hidden));
      var panel = dock.querySelector(".quick-dock__panel");
      if (panel) {
        if (hidden) {
          panel.style.cssText = "opacity:1;visibility:visible;transform:translateY(0) scale(1);position:absolute;bottom:calc(100% + 12px);right:0;width:320px;background:white;border-radius:24px;box-shadow:0 25px 50px rgba(0,0,0,0.25);border:1px solid #e5e7eb;overflow:hidden;";
        } else {
          panel.style.cssText = "";
        }
      }
      if (backdrop) {
        backdrop.classList.toggle("opacity-0", !hidden);
        backdrop.classList.toggle("invisible", !hidden);
      }
    }

    if (trigger) trigger.addEventListener("click", toggleDock);
    if (closeBtn) closeBtn.addEventListener("click", closeDock);
    if (backdrop) backdrop.addEventListener("click", closeDock);
  }

  /* ---------- Trust strip + hero scroll parallax ---------- */
  var trustStrip = document.getElementById("trust-strip");
  var heroScrollWrap = document.getElementById("hero-scroll-wrap");
  if (trustStrip || heroScrollWrap) {
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      var offset = Math.min(y * 0.6, 120);
      if (trustStrip) trustStrip.style.transform = "translateY(" + (-offset) + "px)";
      if (heroScrollWrap) heroScrollWrap.style.transform = "translateY(" + (-offset) + "px)";
    }, { passive: true });
  }

  /* ---------- Scroll Reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Animated Counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var counterIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.dataset.count, 10);
          var suffix = el.dataset.suffix || "";
          var prefix = el.dataset.prefix || "";
          var duration = 1600;
          var startTime = null;
          function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = prefix + Math.floor(eased * target).toLocaleString("pt-BR") + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
          counterIo.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterIo.observe(el); });
  }

  /* ---------- Ripple ---------- */
  document.querySelectorAll(".btn, a[href].inline-flex").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      if (btn.tagName === "A" && !btn.classList.contains("inline-flex")) return;
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement("span");
      ripple.className = "ripple";
      var size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.style.position = "relative";
      btn.style.overflow = "hidden";
      btn.appendChild(ripple);
      ripple.addEventListener("animationend", function () { ripple.remove(); });
    });
  });

  /* ---------- Tabs ---------- */
  function activateTab(wrap, id) {
    var btns = wrap.querySelectorAll("[data-tab]");
    var panels = wrap.querySelectorAll("[data-panel]");
    var target = Array.prototype.find.call(btns, function (b) { return b.dataset.tab === id; });
    if (!target) return;
    btns.forEach(function (b) {
      b.classList.remove("bg-ink", "text-white");
      b.classList.add("bg-mist", "text-ink-soft");
    });
    target.classList.add("bg-ink", "text-white");
    target.classList.remove("bg-mist", "text-ink-soft");
    panels.forEach(function (p) {
      if (p.dataset.panel === id) {
        p.classList.remove("hidden");
        p.classList.add("block");
      } else {
        p.classList.add("hidden");
        p.classList.remove("block");
      }
    });
  }
  document.querySelectorAll("[data-tabs]").forEach(function (wrap) {
    wrap.querySelectorAll("[data-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () { activateTab(wrap, btn.dataset.tab); });
    });
  });
  if (window.location.hash) {
    var targetId = window.location.hash.slice(1);
    document.querySelectorAll("[data-tabs]").forEach(function (wrap) {
      if (wrap.querySelector("#" + targetId)) activateTab(wrap, targetId);
    });
  }

  /* ---------- Forms ---------- */
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    var msgEl = form.querySelector(".form-msg");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var ok = field.value.trim() !== "";
        field.style.borderColor = ok ? "" : "#c0442e";
        field.style.boxShadow = ok ? "" : "0 0 0 3px rgba(192,68,46,0.1)";
        if (!ok) valid = false;
      });
      if (!msgEl) return;
      if (!valid) {
        msgEl.className = "form-msg show";
        msgEl.style.cssText = "display:block;padding:0.75rem 1rem;border-radius:12px;font-size:0.85rem;font-weight:500;margin-top:1rem;background:#fef2f2;color:#991b1b;border:1px solid #fecaca;";
        msgEl.textContent = "Preencha todos os campos obrigatórios.";
        return;
      }
      msgEl.className = "form-msg show";
      msgEl.style.cssText = "display:block;padding:0.75rem 1rem;border-radius:12px;font-size:0.85rem;font-weight:500;margin-top:1rem;background:#f0fdf4;color:#166534;border:1px solid #bbf7d0;";
      msgEl.textContent = "Mensagem recebida! Em breve entraremos em contato.";
      form.reset();
      setTimeout(function () { msgEl.classList.remove("show"); msgEl.style.display = "none"; }, 6000);
    });
    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("input", function () {
        field.style.borderColor = "";
        field.style.boxShadow = "";
      });
    });
  });

  /* ---------- Accordion ---------- */
  document.querySelectorAll(".accordion").forEach(function (acc) {
    acc.querySelectorAll(":scope > .acc-item > .acc-head").forEach(function (head) {
      head.addEventListener("click", function () {
        var item = head.parentElement;
        var isOpen = item.classList.contains("open");
        acc.querySelectorAll(":scope > .acc-item.open").forEach(function (other) {
          if (other !== item) other.classList.remove("open");
        });
        item.classList.toggle("open", !isOpen);
      });
    });
  });

  /* ---------- Hero Scroll Fade ---------- */
  var hero = document.querySelector(".hero");
  if (hero) {
    var heroContent = hero.querySelector(".hero__content");
    var heroScroll = hero.querySelector(".hero__scroll");
    window.addEventListener("scroll", function () {
      var scrollY = window.scrollY;
      var heroH = hero.offsetHeight;
      if (scrollY < heroH) {
        var pct = scrollY / heroH;
        if (heroContent) heroContent.style.opacity = 1 - pct * 1.8;
        if (heroScroll) heroScroll.style.opacity = 1 - pct * 4;
      }
    }, { passive: true });
  }

  /* ---------- Lightbox / Gallery Carousel ---------- */
  (function () {
    var lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
    var lightboxImg = lightbox.querySelector(".lightbox-img");
    var lightboxDots = lightbox.querySelector(".lightbox-dots");
    var lightboxCounter = lightbox.querySelector(".lightbox-counter");
    var currentIndex = 0;

    function getImages() {
      return Array.prototype.slice.call(document.querySelectorAll(".gallery-mosaic .gallery-item img"));
    }

    function render() {
      var imgs = getImages();
      if (!imgs.length) return;
      currentIndex = (currentIndex + imgs.length) % imgs.length;
      var img = imgs[currentIndex];
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      lightboxCounter.textContent = (currentIndex + 1) + " / " + imgs.length;
      lightboxDots.innerHTML = "";
      imgs.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.className = "w-2.5 h-2.5 rounded-full transition-colors " +
          (i === currentIndex ? "bg-brand" : "bg-white/40 hover:bg-white/70");
        dot.setAttribute("aria-label", "Ir para foto " + (i + 1));
        dot.addEventListener("click", function () { currentIndex = i; render(); });
        lightboxDots.appendChild(dot);
      });
    }

    function open(index) {
      currentIndex = index;
      render();
      lightbox.classList.remove("hidden");
      lightbox.classList.add("flex");
      document.body.style.overflow = "hidden";
    }

    function close() {
      lightbox.classList.add("hidden");
      lightbox.classList.remove("flex");
      document.body.style.overflow = "";
    }

    function next() { currentIndex++; render(); }
    function prev() { currentIndex--; render(); }

    document.querySelectorAll(".gallery-item").forEach(function (item) {
      item.addEventListener("click", function () {
        open(parseInt(item.dataset.index, 10) || 0);
      });
    });

    var closeBtn = lightbox.querySelector(".lightbox-close");
    var prevBtn = lightbox.querySelector(".lightbox-prev");
    var nextBtn = lightbox.querySelector(".lightbox-next");
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (prevBtn) prevBtn.addEventListener("click", prev);
    if (nextBtn) nextBtn.addEventListener("click", next);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (lightbox.classList.contains("hidden")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });
  })();

  /* ---------- Regimento search ---------- */
  (function () {
    var input = document.getElementById("reg-search");
    var clearBtn = document.getElementById("reg-clear");
    var resultEl = document.getElementById("reg-result");
    if (!input || !resultEl) return;
    var accordion = document.querySelector(".reg-accordion");
    var items = accordion ? accordion.querySelectorAll(".acc-item") : [];
    var origPanels = {};
    var nextBtn = document.getElementById("reg-next");
    var marks = [];
    var currentMark = -1;

    function normalize(s) {
      return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function escapeRegExp(s) {
      return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function clearHighlights(panel) {
      if (origPanels[panel.dataset.idx]) {
        panel.innerHTML = origPanels[panel.dataset.idx];
      }
    }

    function highlight(panel, term) {
      if (!term) return;
      var re = new RegExp("(" + escapeRegExp(term) + ")", "gi");
      var walker = document.createTreeWalker(panel, NodeFilter.SHOW_TEXT);
      var nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(function (tn) {
        var text = tn.nodeValue;
        if (!text || !re.test(text)) return;
        re.lastIndex = 0;
        var frag = document.createDocumentFragment();
        var last = 0, m;
        while ((m = re.exec(text)) !== null) {
          frag.appendChild(document.createTextNode(text.slice(last, m.index)));
          var mark = document.createElement("mark");
          mark.className = "bg-brand/20 text-brand rounded px-0.5";
          mark.textContent = m[0];
          frag.appendChild(mark);
          last = m.index + m[0].length;
        }
        frag.appendChild(document.createTextNode(text.slice(last)));
        tn.parentNode.replaceChild(frag, tn);
      });
    }

    // armazena HTML original dos painéis para resetar highlight
    items.forEach(function (item, idx) {
      var panel = item.querySelector(".acc-panel");
      if (panel) {
        panel.dataset.idx = idx;
        origPanels[idx] = panel.innerHTML;
      }
    });

    var topItems = accordion ? Array.prototype.slice.call(accordion.querySelectorAll(":scope > .acc-item")) : [];

    function run() {
      var term = normalize(input.value).trim();
      var count = 0;
      // limpa highlights de todos os painéis
      items.forEach(function (item) {
        clearHighlights(item.querySelector(".acc-panel"));
      });
      if (!term) {
        items.forEach(function (item) {
          item.style.display = "";
          item.classList.remove("is-open", "search-match");
          item.classList.remove("open");
        });
        resultEl.textContent = "";
        marks = [];
        currentMark = -1;
        if (nextBtn) { nextBtn.classList.add("hidden"); nextBtn.classList.remove("inline-flex"); }
        return;
      }

      topItems.forEach(function (titulo) {
        var tPanel = titulo.querySelector(".acc-panel");
        var chapters = titulo.querySelectorAll(":scope .acc-item");
        if (normalize(titulo.textContent).indexOf(term) === -1) {
          titulo.style.display = "none";
          return;
        }
        titulo.style.display = "";
        titulo.classList.add("is-open", "search-match", "open");

        var foundChapter = false;
        chapters.forEach(function (ch) {
          var p = ch.querySelector(".acc-panel");
          var hit = normalize(ch.textContent).indexOf(term) !== -1;
          if (hit) {
            ch.style.display = "";
            ch.classList.add("is-open", "search-match", "open");
            if (p) highlight(p, input.value);
            foundChapter = true;
            count++;
          } else {
            ch.style.display = "none";
          }
        });
        // se o termo está apenas no preâmbulo do título
        if (!foundChapter) {
          highlight(tPanel, input.value);
          count++;
        }
      });

      resultEl.textContent = count + (count === 1 ? " resultado encontrado" : " resultados encontrados");
      marks = accordion ? Array.prototype.slice.call(accordion.querySelectorAll("mark")) : [];
      currentMark = -1;
      if (nextBtn) {
        if (marks.length) {
          nextBtn.classList.remove("hidden");
          nextBtn.classList.add("inline-flex");
        } else {
          nextBtn.classList.add("hidden");
          nextBtn.classList.remove("inline-flex");
        }
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (!marks.length) return;
        currentMark = (currentMark + 1) % marks.length;
        marks[currentMark].scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }

    input.addEventListener("input", run);
    if (clearBtn) clearBtn.addEventListener("click", function () { input.value = ""; run(); input.focus(); });
  })();

  /* ---------- Currículo upload ---------- */
  (function () {
    var zone = document.getElementById("upload-zone");
    var input = document.getElementById("t-curriculo");
    if (!zone || !input) return;
    var defaultEl = document.getElementById("upload-default");
    var fileEl = document.getElementById("upload-file");
    var nameEl = document.getElementById("upload-name");
    var sizeEl = document.getElementById("upload-size");
    var removeBtn = document.getElementById("upload-remove");
    var errorEl = document.getElementById("upload-error");
    var allowed = ["pdf", "doc", "docx"];
    var maxSize = 5 * 1024 * 1024;

    function formatSize(bytes) {
      if (bytes < 1024) return bytes + " B";
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    }

    function resetError() {
      if (errorEl) errorEl.classList.add("hidden");
      if (zone) {
        zone.classList.remove("border-red", "bg-red-soft/30");
        zone.classList.add("border-line");
      }
    }

    function showError() {
      if (errorEl) errorEl.classList.remove("hidden");
      if (zone) {
        zone.classList.remove("border-line");
        zone.classList.add("border-red", "bg-red-soft/30");
      }
      if (defaultEl) defaultEl.classList.remove("hidden");
      if (fileEl) fileEl.classList.add("hidden");
    }

    function handleFile(file) {
      if (!file) return;
      var ext = (file.name.split(".").pop() || "").toLowerCase();
      if (allowed.indexOf(ext) === -1 || file.size > maxSize) {
        showError();
        input.value = "";
        return;
      }
      resetError();
      if (nameEl) nameEl.textContent = file.name;
      if (sizeEl) sizeEl.textContent = formatSize(file.size);
      if (defaultEl) defaultEl.classList.add("hidden");
      if (fileEl) fileEl.classList.remove("hidden");
      fileEl.classList.add("flex");
    }

    input.addEventListener("change", function () { handleFile(input.files[0]); });

    ["dragenter", "dragover"].forEach(function (ev) {
      zone.addEventListener(ev, function (e) { e.preventDefault(); zone.classList.add("border-brand", "bg-brand-soft/40"); });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      zone.addEventListener(ev, function (e) { e.preventDefault(); zone.classList.remove("border-brand", "bg-brand-soft/40"); });
    });
    zone.addEventListener("drop", function (e) { handleFile(e.dataTransfer.files[0]); });

    if (removeBtn) removeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      input.value = "";
      if (defaultEl) defaultEl.classList.remove("hidden");
      if (fileEl) { fileEl.classList.add("hidden"); fileEl.classList.remove("flex"); }
      resetError();
    });
  })();

  /* ---------- Extracurricular carousel ---------- */
  (function () {
    var track = document.getElementById("extra-track");
    var prev = document.getElementById("extra-prev");
    var next = document.getElementById("extra-next");
    var dots = document.getElementById("extra-dots");
    if (!track) return;
    var slides = track.children;
    var index = 0;
    var timer = null;

    function buildDots() {
      dots.innerHTML = "";
      for (var i = 0; i < slides.length; i++) {
        var dot = document.createElement("button");
        dot.className = "w-2.5 h-2.5 rounded-full transition-colors " + (i === index ? "bg-brand" : "bg-gray-300 hover:bg-gray-400");
        dot.setAttribute("aria-label", "Ir para o projeto " + (i + 1));
        dot.addEventListener("click", function () { go(parseInt(this.dataset.i, 10)); });
        dot.dataset.i = i;
        dots.appendChild(dot);
      }
    }

    function go(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + (index * 100) + "%)";
      buildDots();
    }

    if (prev) prev.addEventListener("click", function () { go(index - 1); });
    if (next) next.addEventListener("click", function () { go(index + 1); });

    function start() {
      if (timer) return;
      timer = setInterval(function () { go(index + 1); }, 6000);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    var carousel = document.getElementById("extra-carousel");
    if (carousel) {
      carousel.addEventListener("mouseenter", stop);
      carousel.addEventListener("mouseleave", start);
      carousel.addEventListener("touchstart", stop, { passive: true });
    }
    buildDots();
    start();
  })();

  /* ---------- Document request modal ---------- */
  (function () {
    var modal = document.getElementById("doc-modal");
    if (!modal) return;
    var title = modal.querySelector("#doc-modal-title");
    var desc = modal.querySelector("#doc-modal-desc");
    var closeBtn = modal.querySelector("#doc-modal-close");

    function open(doc, d) {
      if (title) title.textContent = doc;
      if (desc) desc.textContent = d || "";
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.style.overflow = "hidden";
    }
    function close() {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "";
    }

    document.querySelectorAll(".doc-request").forEach(function (btn) {
      btn.addEventListener("click", function () {
        open(btn.dataset.doc, btn.dataset.desc);
      });
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) close();
    });
  })();

  /* ---------- WhatsApp chat widget ---------- */
  (function () {
    var PHONE = "5519989502031";
    var waFloat = document.querySelector(".whatsapp-float");
    if (!waFloat) return;

    var widget = document.createElement("div");
    widget.id = "wa-widget";
    widget.className = "fixed bottom-24 left-6 z-[2000] w-[340px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl border border-line flex flex-col overflow-hidden opacity-0 invisible translate-y-3 scale-95 transition-all duration-300 origin-bottom-left";
    widget.innerHTML =
      '<div class="flex items-center justify-between bg-[#075E54] px-4 py-3">' +
        '<div class="flex items-center gap-3">' +
          '<span class="relative w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0"><ion-icon name="logo-whatsapp" class="text-white text-xl"></ion-icon></span>' +
          '<div><p class="text-white font-semibold text-[0.9rem] leading-tight">Colégio Helena</p><p class="text-[#b3e5a8] text-[0.72rem]">online</p></div>' +
        '</div>' +
        '<button class="wa-close w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition-colors" aria-label="Fechar chat"><ion-icon name="close-outline" class="text-xl"></ion-icon></button>' +
      '</div>' +
      '<div class="flex-1 px-3 py-3 space-y-2 bg-[#e5ddd5] min-h-[200px] max-h-[260px] overflow-y-auto">' +
        '<div class="text-center"><span class="inline-block text-[0.68rem] text-ink-faint bg-white/70 rounded-full px-2.5 py-0.5">Hoje</span></div>' +
        '<div class="flex justify-start">' +
          '<div class="bg-white rounded-xl rounded-tl-none px-3 py-2 shadow-sm max-w-[85%]"><p class="text-[0.82rem] text-ink leading-relaxed">Olá! 👋<br/>Sou a Secretaria do Colégio Helena. Como podemos ajudar?</p></div>' +
        '</div>' +
        '<div class="flex justify-end">' +
          '<div class="bg-[#dcf8c6] rounded-xl rounded-tr-none px-3 py-2 shadow-sm max-w-[85%]"><p class="text-[0.82rem] text-ink leading-relaxed">Digite sua mensagem abaixo 👇</p></div>' +
        '</div>' +
      '</div>' +
      '<div class="bg-mist border-t border-line p-2 flex items-center gap-2">' +
        '<textarea rows="1" placeholder="Digite sua mensagem..." class="flex-1 px-4 py-2.5 bg-white border border-line rounded-full text-[0.85rem] text-ink outline-none transition-all focus:border-[#075E54] resize-none max-h-24 min-h-[44px]" style="line-height:1.4"></textarea>' +
        '<button class="wa-send w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:brightness-95 transition-all flex-shrink-0" aria-label="Enviar"><ion-icon name="send" class="text-lg"></ion-icon></button>' +
      '</div>' +
      '<p class="bg-[#075E54] text-white/70 text-center text-[0.68rem] py-1.5 px-3">Atendimento: seg. a sex., 7h às 17h</p>';
    var backdrop = document.createElement("div");
    backdrop.id = "wa-backdrop";
    backdrop.className = "fixed inset-0 bg-black/30 backdrop-blur-sm z-[1999] opacity-0 invisible transition-all duration-300";
    document.body.appendChild(backdrop);
    document.body.appendChild(widget);

    var textarea = widget.querySelector("textarea");
    var sendBtn = widget.querySelector(".wa-send");
    var closeBtn = widget.querySelector(".wa-close");

    function openWidget() {
      backdrop.classList.remove("opacity-0", "invisible");
      widget.classList.remove("opacity-0", "invisible", "translate-y-3", "scale-95");
      textarea.focus();
    }
    function closeWidget() {
      backdrop.classList.add("opacity-0", "invisible");
      widget.classList.add("opacity-0", "invisible", "translate-y-3", "scale-95");
    }
    function send() {
      var msg = textarea.value.trim();
      if (!msg) { textarea.focus(); return; }
      var url = "https://api.whatsapp.com/send/?phone=" + PHONE + "&text=" + encodeURIComponent(msg);
      window.open(url, "_blank");
      textarea.value = "";
      closeWidget();
    }

    waFloat.addEventListener("click", function (e) {
      e.preventDefault();
      if (widget.classList.contains("invisible")) openWidget();
      else closeWidget();
    });
    document.querySelectorAll('.quick-dock__item[href*="api.whatsapp.com"]').forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); openWidget(); });
    });
    if (closeBtn) closeBtn.addEventListener("click", closeWidget);
    if (backdrop) backdrop.addEventListener("click", closeWidget);
    if (sendBtn) sendBtn.addEventListener("click", send);
    textarea.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
    });
  })();

  /* ---------- Blog: filtros + paginação ---------- */
  (function () {
    var grid = document.getElementById("blog-grid");
    if (!grid) return;
    var posts = Array.prototype.slice.call(grid.querySelectorAll(".blog-post"));
    var pagination = document.getElementById("blog-pagination");
    var perPage = 10 + Math.floor(Math.random() * 3);
    var currentCat = "todas";
    var currentPage = 1;

    function filtered() {
      if (currentCat === "todas") return posts;
      return posts.filter(function (p) { return p.dataset.category === currentCat; });
    }

    var layouts3 = [[5,4,3],[4,5,3],[3,5,4],[6,3,3],[3,6,3],[4,4,4],[3,4,5],[5,3,4],[4,3,5],[3,3,6]];
    var layouts2 = [[7,5],[5,7],[6,6],[8,4],[4,8],[9,3],[3,9]];
    var layouts4 = [[3,3,3,3]];
    var heights = {3:"h-40",4:"h-48",5:"h-52",6:"h-56",7:"h-64",8:"h-72",9:"h-80",12:"h-80"};

    function pick(layouts) {
      return layouts[Math.floor(Math.random() * layouts.length)];
    }

    function buildSpans(n) {
      var rowSizes = [];
      var rem = n;
      while (rem > 0) {
        var candidates = [4, 3, 2].filter(function (t) {
          return t <= rem && (rem - t !== 1);
        });
        if (!candidates.length) candidates = [rem];
        var take = candidates[Math.floor(Math.random() * candidates.length)];
        rowSizes.push(take);
        rem -= take;
      }
      var spans = [];
      rowSizes.forEach(function (sz) {
        if (sz === 4) spans = spans.concat(pick(layouts4));
        else if (sz === 3) spans = spans.concat(pick(layouts3));
        else if (sz === 2) spans = spans.concat(pick(layouts2));
        else spans = spans.concat([12]);
      });
      return spans;
    }

    function render() {
      var list = filtered();
      var pages = Math.max(1, Math.ceil(list.length / perPage));
      if (currentPage > pages) currentPage = pages;
      if (currentPage < 1) currentPage = 1;
      posts.forEach(function (p) { p.style.display = "none"; });
      var start = (currentPage - 1) * perPage;
      var slice = list.slice(start, start + perPage);
      var spans = buildSpans(slice.length);
      slice.forEach(function (p, i) {
        p.style.display = "";
        p.classList.remove("md:col-span-3","md:col-span-4","md:col-span-5","md:col-span-6","md:col-span-7","md:col-span-8","md:col-span-9","md:col-span-12");
        p.classList.add("md:col-span-" + spans[i]);
        var img = p.querySelector(".blog-img");
        if (img) {
          img.className = "blog-img overflow-hidden " + heights[spans[i]];
        }
      });

      if (!pagination) return;
      pagination.innerHTML = "";
      function btn(label, action, disabled, active) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "w-10 h-10 rounded-full text-[0.85rem] font-semibold transition-all border-none cursor-pointer " +
          (active ? "bg-ink text-white" : "bg-white border border-line text-ink-soft hover:text-brand") +
          (disabled ? " opacity-40 cursor-not-allowed" : "");
        b.textContent = label;
        b.disabled = !!disabled;
        b.addEventListener("click", action);
        pagination.appendChild(b);
      }
      btn("‹", function () { currentPage--; render(); }, currentPage === 1);
      for (var i = 1; i <= pages; i++) {
        (function (pg) {
          btn(String(pg), function () { currentPage = pg; render(); }, false, pg === currentPage);
        })(i);
      }
      btn("›", function () { currentPage++; render(); }, currentPage === pages);
    }

    document.querySelectorAll("#blog-filters [data-filter]").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll("#blog-filters [data-filter]").forEach(function (x) {
          x.classList.remove("bg-ink", "text-white");
          x.classList.add("bg-mist", "text-ink-soft");
        });
        b.classList.add("bg-ink", "text-white");
        b.classList.remove("bg-mist", "text-ink-soft");
        currentCat = b.dataset.filter;
        currentPage = 1;
        render();
      });
    });

    render();
  })();

  /* ---------- Vídeo institucional modal ---------- */
  (function () {
    var openBtn = document.getElementById("video-open");
    var modal = document.getElementById("video-modal");
    var frame = document.getElementById("video-frame");
    if (!openBtn || !modal || !frame) return;
    // TROQUE VIDEO_ID pelo ID real do vídeo institucional no YouTube
    var src = "https://www.youtube.com/embed/VIDEO_ID?autoplay=1&rel=0";
    function open() {
      frame.src = src;
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.style.overflow = "hidden";
    }
    function close() {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      frame.src = "";
      document.body.style.overflow = "";
    }
    openBtn.addEventListener("click", open);
    document.getElementById("video-close").addEventListener("click", close);
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) close();
    });
  })();

  /* ---------- Current year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
