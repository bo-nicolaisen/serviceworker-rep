/* serviceworker registration */

if ("serviceWorker" in navigator) {

  navigator.serviceWorker.register("sw.js")

    .then(registration => {
      console.log("sw registered");


    }).catch(error => {
      console.log("sw reg fail");
      console.log(error);

    })

} else {

  //browser does not support service worker
  alert("pwa not supported");
  /* do non pwa stuff here*/
}
