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
    backdrop: false,
    duration: 3000,
    template: `
      <div style="padding: 5px">
          <h3> What </h3>
          <label> ${txt} </label>
      </div>
    `
  });
}

function info() {
  mystical.Mystical.info(`<p>Just some info text. </p>`);
}

function success() {
  mystical.Mystical.success(`<p>Saved $500 by switching to Geico</p>`);
}

function warning() {
  mystical.Mystical.warning(
    `<p>Oh no! You just did something really bad. You should quit coding for life. </p>`
  );
}
