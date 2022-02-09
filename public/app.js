window.addEventListener("load", () => {
  // app is load

  const selecatbles = Array.from(
    document.querySelectorAll("[data-navigatable]")
  );

  for (let s of selecatbles) {
    s.addEventListener("click", (e) => {
      const pathToNavigate = e.currentTarget.dataset.navigatable;
      window.location.href = pathToNavigate;
    });
  }
});
