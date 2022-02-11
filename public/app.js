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
const isCustomerPage = document.querySelector("#customer-page");
if (isCustomerPage) {
  $("#submit-transfer-form").click(() => {
    $("#transferForm").submit();
  });
}
