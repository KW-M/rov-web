// Any comment. You must start the file with a comment!
// This file is used to set Firefox preferences for running firefox headless
// Firefox will read this file and set the preferences accordingly.

// enable needed permissions - Applied to ALL websites:
user_pref("permissions.default.microphone", 1);
user_pref("permissions.default.camera", 1);
user_pref("permissions.default.geo", 1);

// disable webcompatibility shims - Applied to ALL websites:
user_pref("extensions.webcompat.enable_shims", false);
user_pref("extensions.webcompat.perform_injections", false);
user_pref("privacy.antitracking.enableWebcompat", false);
user_pref("extensions.webcompat-reporter.enabled", false);
user_pref("extensions.webcompat.useScriptingAPI", false);

user_pref("devtools.chrome.enabled", true);
user_pref("devtools.debugger.remote-enabled", true);
user_pref("devtools.debugger.prompt-connection", false);

user_pref("devtools.console.stdout.chrome", false);
user_pref("devtools.console.stdout.content", true);

// Enable using linux pipewire for media devices
user_pref("media.webrtc.camera.allow-pipewire", true);

// File modified from:
// https://github.com/microsoft/playwright/blob/main/browser_patches/firefox/preferences/playwright.cfg

user_pref("dom.input_events.security.minNumTicks", 0);
user_pref("dom.input_events.security.minTimeElapsedInMS", 0);

user_pref("dom.iframe_lazy_loading.enabled", false);

user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("datareporting.policy.dataSubmissionPolicyAccepted", false);
user_pref("datareporting.policy.dataSubmissionPolicyBypassNotification", true);

// Force pdfs into downloads.
user_pref("pdfjs.disabled", true);

// This preference breaks our authentication flow.
user_pref("network.auth.use_redirect_for_retries", false);

// Disable cross-process iframes, but not cross-process navigations.
user_pref("fission.webContentIsolationStrategy", 0);

// Disable BFCache in parent process.
// We also separately disable BFCache in content via docSchell property.
user_pref("fission.bfcacheInParent", false);

// Disable first-party-based cookie partitioning.
// When it is enabled, we have to retain "thirdPartyCookie^" permissions
// in the storageState.
user_pref("network.cookie.cookieBehavior", 4);

// Increase max number of child web processes so that new pages
// get a new process by default and we have a process isolation
// between pages from different contexts. If this becomes a performance
// issue we can povide custom '@mozilla.org/ipc/processselector;1'
user_pref("dom.ipc.processCount", 60000);

// Never reuse processes as they may keep previously overridden values
// (locale, timezone etc.).
user_pref("dom.ipc.processPrelaunch.enabled", false);

// Isolate permissions by user context.
user_pref("permissions.isolateBy.userContext", true);

// Allow creating files in content process - required for
// |Page.setFileInputFiles| protocol method.
user_pref("dom.file.createInChild", true);

// Allow uploading directorys in content process.
user_pref("dom.filesystem.pathcheck.disabled", true);

// Do not warn when closing all open tabs
user_pref("browser.tabs.warnOnClose", false);

// Do not warn when closing all other open tabs
user_pref("browser.tabs.warnOnCloseOtherTabs", false);

// Do not warn when multiple tabs will be opened
user_pref("browser.tabs.warnOnOpen", false);

// Do not warn on quitting Firefox
user_pref("browser.warnOnQuit", false);

// Disable popup-blocker
user_pref("dom.disable_open_during_load", false);

// Disable the ProcessHangMonitor
user_pref("dom.ipc.reportProcessHangs", false);
user_pref("hangmonitor.timeout", 0);

// Allow the application to have focus even it runs in the background
user_pref("focusmanager.testmode", true);

// No ICC color correction. We need this for reproducible screenshots.
// See https://developer.mozilla.org/en/docs/Mozilla/Firefox/Releases/3.5/ICC_color_correction_in_Firefox.
user_pref("gfx.color_management.mode", 0);
user_pref("gfx.color_management.rendering_intent", 3);

// Always use network provider for geolocation tests so we bypass the
// macOS dialog raised by the corelocation provider
user_pref("geo.provider.testing", true);




// =================================================================
// THESE ARE NICHE PROPERTIES THAT ARE NICE TO HAVE
// =================================================================

// We never want to have interactive screen capture picker enabled in FF build.
user_pref("media.getdisplaymedia.screencapturekit.enabled", false);
user_pref("media.getdisplaymedia.screencapturekit.picker.enabled", false);

// Enable software-backed webgl. See https://phabricator.services.mozilla.com/D164016
user_pref("webgl.forbid-software", false);

// Disable auto-fill for credit cards and addresses.
// See https://github.com/microsoft/playwright/issues/21393
user_pref("extensions.formautofill.creditCards.supported", "off");
user_pref("extensions.formautofill.addresses.supported", "off");

// Allow access to system-added self-signed certificates. This aligns
// firefox behavior with other browser defaults.
user_pref("security.enterprise_roots.enabled", true);

// There's a security features warning that might be shown on certain Linux distributions & configurations:
// https://support.mozilla.org/en-US/kb/install-firefox-linux#w_security-features-warning
// This notification should never be shown in automation scenarios.
user_pref("security.sandbox.warn_unprivileged_namespaces", false);

// Avoid stalling on shutdown, after "xpcom-will-shutdown" phase.
// This at least happens when shutting down soon after launching.
// See AppShutdown.cpp for more details on shutdown phases.
user_pref("toolkit.shutdown.fastShutdownStage", 3);

// Use light theme by default.
user_pref("ui.systemUsesDarkTheme", 0);

// Only allow the old modal dialogs. This should be removed when there is
// support for the new modal UI (see Bug 1686743).
user_pref("prompts.contentPromptSubDialog", false);

// Do not use system colors - they are affected by themes.
user_pref("ui.use_standins_for_native_colors", true);

// Turn off the Push service.
user_pref("dom.push.serverURL", "");
// Prevent Remote Settings (firefox.settings.services.mozilla.com) to issue non local connections.
user_pref("services.settings.server", "");
// Prevent location.services.mozilla.com to issue non local connections.
user_pref("browser.region.network.url", "");
user_pref("browser.pocket.enabled", false);
user_pref("browser.newtabpage.activity-stream.feeds.topsites", false);
// Disable sponsored tiles from "Mozilla Tiles Service"
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);
// required to prevent non-local access to push.services.mozilla.com
user_pref("dom.push.connection.enabled", false);
// Prevent contile.services.mozilla.com to issue non local connections.
user_pref("browser.topsites.contile.enabled", false);
user_pref("browser.safebrowsing.provider.mozilla.updateURL", "");
user_pref("browser.library.activity-stream.enabled", false);
user_pref("browser.search.geoSpecificDefaults", false);
user_pref("browser.search.geoSpecificDefaults.url", "");
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", false);
user_pref("network.connectivity-service.enabled", false);
user_pref("browser.newtabpage.activity-stream.asrouter.providers.snippets", "");

// Make sure Shield doesn't hit the network.
user_pref("app.normandy.api_url", "");
user_pref("app.normandy.enabled", false);

// Disable updater
user_pref("app.update.enabled", false);
// Disable Firefox old build background check
user_pref("app.update.checkInstallTime", false);
// Disable automatically upgrading Firefox
user_pref("app.update.disabledForTesting", true);

// make absolutely sure it is really off
user_pref("app.update.auto", false);
user_pref("app.update.mode", 0);
user_pref("app.update.service.enabled", false);
// Dislabe newtabpage
user_pref("browser.startup.homepage", "about:blank");
user_pref("browser.startup.page", 0);
user_pref("browser.newtabpage.enabled", false);
// Do not redirect user when a milstone upgrade of Firefox is detected
user_pref("browser.startup.homepage_override.mstone", "ignore");

// Disable topstories
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);
// DevTools JSONViewer sometimes fails to load dependencies with its require.js.
// This spams console with a lot of unpleasant errors.
// (bug 1424372)
user_pref("devtools.jsonview.enabled", false);

// Increase the APZ content response timeout in tests to 1 minute.
// This is to accommodate the fact that test environments tends to be
// slower than production environments (with the b2g emulator being
// the slowest of them all), resulting in the production timeout value
// sometimes being exceeded and causing false-positive test failures.
//
// (bug 1176798, bug 1177018, bug 1210465)
user_pref("apz.content_response_timeout", 60000);

// Indicate that the download panel has been shown once so that
// whichever download test runs first doesn't show the popup
// inconsistently.
user_pref("browser.download.panel.shown", true);
// Background thumbnails in particular cause grief, and disabling
// thumbnails in general cannot hurt
user_pref("browser.pagethumbnails.capturing_disabled", true);
// Disable safebrowsing components.
user_pref("browser.safebrowsing.blockedURIs.enabled", false);
user_pref("browser.safebrowsing.downloads.enabled", false);
user_pref("browser.safebrowsing.passwords.enabled", false);
user_pref("browser.safebrowsing.malware.enabled", false);
user_pref("browser.safebrowsing.phishing.enabled", false);
// Disable updates to search engines.
user_pref("browser.search.update", false);
// Do not restore the last open set of tabs if the browser has crashed
user_pref("browser.sessionstore.resume_from_crash", false);
// Don't check for the default web browser during startup.
user_pref("browser.shell.checkDefaultBrowser", false);

// Disable browser animations (tabs, fullscreen, sliding alerts)
user_pref("toolkit.cosmeticAnimations.enabled", false);

// Close the window when the last tab gets closed
user_pref("browser.tabs.closeWindowWithLastTab", true);

// Do not allow background tabs to be zombified on Android, otherwise for
// tests that open additional tabs, the test harness tab itself might get
// unloaded
user_pref("browser.tabs.disableBackgroundZombification", false);

// Disable first run splash page on Windows 10
user_pref("browser.usedOnWindows10.introURL", "");

// Disable the UI tour.
//
// Should be set in profile.
user_pref("browser.uitour.enabled", false);

// Turn off search suggestions in the location bar so as not to trigger
// network connections.
user_pref("browser.urlbar.suggest.searches", false);

// Do not show datareporting policy notifications which can
// interfere with tests
user_pref("datareporting.healthreport.documentServerURI", "");
user_pref("datareporting.healthreport.about.reportUrl", "");
user_pref("datareporting.healthreport.logging.consoleEnabled", false);
user_pref("datareporting.healthreport.service.enabled", false);
user_pref("datareporting.healthreport.service.firstRun", false);
user_pref("datareporting.healthreport.uploadEnabled", false);

// Automatically unload beforeunload alerts
user_pref("dom.disable_beforeunload", false);

// Disable slow script dialogues
user_pref("dom.max_chrome_script_run_time", 0);
user_pref("dom.max_script_run_time", 0);

// Only load extensions from the application and user profile
// AddonManager.SCOPE_PROFILE + AddonManager.SCOPE_APPLICATION
user_pref("extensions.autoDisableScopes", 0);
user_pref("extensions.enabledScopes", 5);

// Disable metadata caching for installed add-ons by default
user_pref("extensions.getAddons.cache.enabled", false);

// Disable installing any distribution extensions or add-ons.
user_pref("extensions.installDistroAddons", false);

// Turn off extension updates so they do not bother tests
user_pref("extensions.update.enabled", false);
user_pref("extensions.update.notifyUser", false);

// Make sure opening about:addons will not hit the network
user_pref("extensions.webservice.discoverURL", "");

user_pref("extensions.screenshots.disabled", true);
user_pref("extensions.screenshots.upload-disabled", true);

// Disable useragent updates
user_pref("general.useragent.updates.enabled", false);

// Do not scan Wifi
user_pref("geo.wifi.scan", false);

// Show chrome errors and warnings in the error console
user_pref("javascript.options.showInConsole", true);

// Disable download and usage of OpenH264: and Widevine plugins
user_pref("media.gmp-manager.updateEnabled", false);

// Do not prompt with long usernames or passwords in URLs
user_pref("network.http.phishy-userpass-length", 255);

// Do not prompt for temporary redirects
user_pref("network.http.prompt-temp-redirect", false);

// Disable speculative connections so they are not reported as leaking
// when they are hanging around
user_pref("network.http.speculative-parallel-limit", 0);

// Do not automatically switch between offline and online
user_pref("network.manage-offline-status", false);

// Make sure SNTP requests do not hit the network
user_pref("network.sntp.pools", "");

// Disable Flash
user_pref("plugin.state.flash", 0);

user_pref("privacy.trackingprotection.enabled", false);

user_pref("security.certerrors.mitm.priming.enabled", false);

// Local documents have access to all other local documents,
// including directory listings
user_pref("security.fileuri.strict_origin_policy", false);

// Tests do not wait for the notification button security delay
user_pref("security.notification_enable_delay", 0);

// Do not automatically fill sign-in forms with known usernames and
// passwords
user_pref("signon.autofillForms", false);

// Disable password capture, so that tests that include forms are not
// influenced by the presence of the persistent doorhanger notification
user_pref("signon.rememberSignons", false);

// Disable first-run welcome page
user_pref("startup.homepage_welcome_url", "about:blank");
user_pref("startup.homepage_welcome_url.additional", "");

// Prevent starting into safe mode after application crashes
user_pref("toolkit.startup.max_resumed_crashes", -1);
user_pref("toolkit.crashreporter.enabled", false);

user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.server", "");

// Disable downloading the list of blocked extensions.
user_pref("extensions.blocklist.enabled", false);

// Force Firefox Devtools to open in a separate window.
user_pref("devtools.toolbox.host", "window");

// Disable auto translations
user_pref("browser.translations.enable", false);

// Disable spell check
user_pref("layout.spellcheckDefault", 0);

// // disable updates and studies
// user_pref("app.normandy.enabled", false);
// user_pref("app.normandy.first_run", false);
// user_pref("app.shield.optoutstudies.enabled", false);
// user_pref("app.update.auto", false);
// user_pref("app.update.checkInstallTime", false);
// user_pref("app.update.disabledForTesting", true);
// user_pref("app.update.enabled", false);
// // disable telemetry
// user_pref("toolkit.telemetry.enabled", false);
// user_pref("toolkit.telemetry.server", "");
// user_pref("toolkit.telemetry.unified", false);
// user_pref("toolkit.telemetry.archive.enabled", false);
// //disable first run
// user_pref("browser.startup.homepage_override.mstone", "ignore");
// user_pref("browser.startup.homepage_override.buildID", "");
// user_pref("browser.startup.homepage_override.torbrowser.version", "");
// user_pref("browser.uitour.enabled", false);
