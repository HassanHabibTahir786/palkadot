!(function () {
  var e;
  ["scroll", "resize"].forEach((o) => {
    document.addEventListener(o, (o) => {
      clearTimeout(e),
        (e = setTimeout(function () {
          !(function (e) {
            "resize" === e.type &&
              (document.body.classList.remove("navbar-dropdown-open"),
              document
                .querySelector(".navbar-dropdown")
                .querySelector(".navbar-collapse")
                .classList.remove("show"),
              document
                .querySelector(".navbar-dropdown")
                .classList.remove("opened"),
              Array.from(
                document
                  .querySelector(".navbar-dropdown")
                  .querySelectorAll('.navbar-toggler[aria-expanded="true"]')
              ).forEach((e) => {
                let o = e.querySelector(e.getAttribute("data-target"));
                o &&
                  (o.classList.remove("in"),
                  o.setAttribute("aria-expanded", "false"),
                  e.setAttribute("aria-expanded", "false"));
              }));
            let o = document.documentElement.scrollTop;
            Array.from(document.querySelectorAll(".navbar-dropdown")).forEach(
              (e) => {
                e.matches(".navbar-fixed-top") &&
                  (e.matches(".transparent") &&
                    !e.classList.contains("opened") &&
                    (o > 0
                      ? e.classList.remove("bg-color")
                      : e.classList.add("bg-color")),
                  o > 0
                    ? e.classList.add("navbar-short")
                    : e.classList.remove("navbar-short"));
              }
            );
          })(o);
        }, 10));
    });
  });
  ["show.bs.collapse", "hide.bs.collapse"].forEach((e) => {
    document.addEventListener(e, ({ target: o }) => {
      const a = o.closest(".navbar-dropdown");
      a &&
        ("show.bs.collapse" === e
          ? (document.body.classList.add("navbar-dropdown-open"),
            a.classList.add("opened"))
          : (document.body.classList.remove("navbar-dropdown-open"),
            a.classList.remove("opened"),
            window.dispatchEvent(
              new CustomEvent("scroll.bs.navbar-dropdown.data-api")
            ),
            a.dispatchEvent(new CustomEvent("collapse.bs.navbar-dropdown"))));
    });
  }),
    document.addEventListener("collapse.bs.nav-dropdown", (e) => {
      let o = e.relatedTarget.closest(".navbar-dropdown");
      if (o) {
        let e = o.querySelector('.navbar-toggler[aria-expanded="true"]');
        e && e.dispatchEvent(new CustomEvent("click"));
      }
    });
})();
