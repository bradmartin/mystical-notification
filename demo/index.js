function note1() {
  mystical.Mystical.alert({
    position: "bottom",
    template: `
          <p>You deserve a beer Gabe </p>
    `
  });
}

function note2() {
  var txt = document.getElementById("notificationText").value;
  mystical.Mystical.alert({
    color: "#333",
    backgroundColor: "#fff000",
    template: `
      <div style="padding: 5px">
          <h3> What </h3>
          <label> ${txt} </label>
      </div>
    `
  });
}
