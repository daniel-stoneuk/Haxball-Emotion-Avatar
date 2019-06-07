// ==UserScript==
// @name         Hax Emotion Avatars
// @version      0.4
// @description  Tap a button to show your emotion!
// @author       You
// @match        https://www.haxball.com/play
// @grant        none
// ==/UserScript==

(function() {
  "use strict"; // SET DURATION FOR AVATAR TO APPEAR
  var defaultDuration = 800;
  // SET DEFAULT AVATAR
  var def = "🤠";

  // USE THE SWITCH STATEMENT TO CHANGE THE EMOJIS
  function process(key) {
    var avatar = "";
    var duration = defaultDuration;
    switch (key) {
      case "5":
        avatar = "👏";
        break;
      case "6":
        avatar = "👋";
        break;
      case "7":
        avatar = "👀";
        break;
      case "8":
        avatar = "🤬";
        break;
      case "9":
        avatar = "😨";
        break;
    }
    if (avatar != "") {
      setAvatar(avatar);
      if (reset != undefined) {
        clearTimeout(reset);
      }
      reset = setTimeout(function() {
        setAvatar(def);
      }, duration);
    }
  }

  var reset;

  // code to change the avatar
  function setAvatar(avatar) {
    console.log("avatar: " + avatar);
    iframe.body.querySelectorAll("[data-hook='input']")[0].value = "/avatar " + avatar;
    iframe.body.querySelectorAll("[data-hook='send']")[0].click();

    var notices = iframe.body.getElementsByClassName("notice");
    for (var i = 0; i < notices.length; i++) {
      var notice = notices[i];
      if (notice.innerHTML == "Avatar set") {
        notice.parentNode.removeChild(notice);
      }
    }
  }

  // listens to key presses.
  var listener = function(event) {
    if (iframe.activeElement != iframe.querySelectorAll("[data-hook='input']")[0]) {
      const key = event.key;
      process(key);
    }
  };

  //document.activeElement
  var iframe;
  setTimeout(function() {
    iframe = document.querySelector("iframe").contentWindow.document;
    iframe.body.addEventListener("keydown", listener, true);
    console.log("Setup complete");
  }, 3000);
})();
