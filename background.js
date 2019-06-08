// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.get(['avatarOptions'], function(result) {
    if (result.avatarOptions == undefined) {
      // We need to set defaults
      var defaultOptions = {
        'default': "🤠",
        '5': "👏",
        '6': "👋",
        "7": "👀",
        "8": "🤬",
        "9": "😨"
      };
      chrome.storage.sync.set({"avatarOptions": defaultOptions}, function() {
        console.log('Avatar options set to ' + JSON.stringify(defaultOptions));
      });
    }
  });
  chrome.storage.sync.get(['duration'], function(result) {
    if (result.duration == undefined) {
      // We need to set defaults
      var duration = 800;
      chrome.storage.sync.set({"duration": duration}, function() {
        console.log('duration option set to ' + duration);
      });
    }
  });
  
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.haxball.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
