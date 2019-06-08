// SET DURATION FOR AVATAR TO APPEAR
var duration;
// SET DEFAULT AVATAR & change emojis - can be extended
// and changed by following the same syntax.
var avatars;

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    switch (key) {
      case "avatarOptions": {
        avatars = storageChange.newValue;
        break;
      }
      case "duration":
        duration = storageChange.newValue;
        break;
    }
    console.log(
      'Storage key "%s" in namespace "%s" changed. ' +
        'Old value was "%s", new value is "%s".',
      key,
      namespace,
      storageChange.oldValue,
      storageChange.newValue
    );
  }
});

function process(key) {
  var avatar = avatars[key];
  if (avatar) {
    setAvatar(avatar);
    if (reset != undefined) {
      clearTimeout(reset);
    }
    reset = setTimeout(function() {
      setAvatar(avatars["default"]);
    }, duration);
  }
}

var reset;

// code to change the avatar
function setAvatar(avatar) {
  console.log("avatar: " + avatar);
  iframe.body.querySelectorAll("[data-hook='input']")[0].value =
    "/avatar " + avatar;
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
  if (
    iframe.activeElement != iframe.querySelectorAll("[data-hook='input']")[0]
  ) {
    const key = event.key;
    process(key);
  }
};

chrome.storage.sync.get("avatarOptions", function(data) {
  if (data.avatarOptions != undefined) avatars = data.avatarOptions;
  console.log("Using avatar set " + JSON.stringify(avatars));
});
chrome.storage.sync.get("duration", function(data) {
  if (data.duration != undefined) duration = data.duration;
  console.log("Using duration " + JSON.stringify(duration));
});

//document.activeElement
var iframe;
setTimeout(function() {
  iframe = document.querySelector("iframe").contentWindow.document;
  iframe.body.addEventListener("keydown", listener, true);
  console.log("Ready");
}, 2000);
