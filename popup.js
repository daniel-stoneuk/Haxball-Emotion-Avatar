// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

let save = document.getElementById("save");
let config = document.getElementById("config");
let duration = document.getElementById("duration");

chrome.storage.sync.get("avatarOptions", function(data) {
  if (data.avatarOptions != undefined) {
    var avatars = data.avatarOptions;
    config.value = JSON.stringify(avatars);
  }
});
chrome.storage.sync.get("duration", function(data) {
  if (data.duration != undefined) {
    duration.value = data.duration;
  }
});

save.onclick = function(element) {
  try {
    var configValue = JSON.parse(config.value);
    if (configValue.default == undefined) {
      alert("You need to set a default avatar");
      return;
    } else {
      chrome.storage.sync.set({ avatarOptions: configValue }, function() {
        console.log("Avatar options set to " + JSON.stringify(configValue));
        if (!Number.isNaN(duration.value)) {
          chrome.storage.sync.set({ duration: duration.value }, function() {
            console.log("Duration options set to " + duration.value);
            window.close();
          });
        } else {
          alert("Duration was not a valid integer in milliseconds");
          return;
        }
      });
    }
  } catch (e) {
    alert("Avatar configuration was invalid JSON");
    return;
  }
};
