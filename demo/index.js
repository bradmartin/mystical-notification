function note1() {
  mystical.Mystical
    .confirm({
      position: "bottom",
      positiveText: "Hell yeah",
      negativeText: "No Dammit",
      template: `
          <p> Are you sure you want another beer? </p>
    `
    })
    .then(result => {
      console.log(result);
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
