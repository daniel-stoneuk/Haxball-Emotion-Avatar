// ==UserScript==
// @name         Hax Emotion Avatars
// @version      0.3
// @description  Tap a button to show your emotion!
// @author       You
// @match        https://www.haxball.com/play
// @grant        none
// ==/UserScript==

(function() {
  "use strict"; // SET DURATION FOR AVATAR TO APPEAR
  var defaultDuration = 800;
  // SET DEFAULT AVATAR
  var def = "🚶";

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
        avatar = "💩";
        break;
      case "9":
        avatar = "😨";
        break;
      }
    if (avatar != "") {
      setAvatar(avatar);
      setTimeout(function() {
        setAvatar(def);
      }, duration);
    }
  }

  // code to change the avatar
  function setAvatar(avatar) {
    console.log("avatar: " + avatar);
    iframe.querySelectorAll("[data-hook='input']")[0].value =
      "/avatar " + avatar;
    iframe.querySelectorAll("[data-hook='send']")[0].click();
  }

  // listens to key presses.
  var listener = function(event) {
    const key = event.key;
    process(key);
  };

  // when we find a new game pitch
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      for (var i = 0; i < mutation.addedNodes.length; i++) {
        if (
          mutation.addedNodes[i].className == "game-state-view" ||
          mutation.addedNodes[i].className == "game-view"
        ) {
          var canvas = mutation.addedNodes[i].querySelector("canvas");
          canvas.tabIndex = 1;
          canvas.focus();
          canvas.removeEventListener("keydown", listener, true);
          canvas.addEventListener("keydown", listener, true);
        } else if (mutation.addedNodes[i].innerHTML == "Avatar set") {
          mutation.addedNodes[i].parentNode.removeChild(mutation.addedNodes[i]);
        }
      }
    });
  });
  var iframe;
  setTimeout(function() {
    iframe = document.querySelector("iframe").contentWindow.document.body;
    // register for element updates.
    observer.observe(
      document.querySelector("iframe").contentWindow.document.body,
      {
        childList: true,
        subtree: true
      }
    );
    console.log("Setup complete");
  }, 3000);
})();
