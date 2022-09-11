import { createMachine, interpret } from "xstate";
import { isInternetAvailable } from "./util"
import { showToastMessage, showScanIpBtn, hideScanIpButton, showLoadingUi, hideLoadingUi } from "./ui";

import * as consts from "./consts";
import { debugXstateMode, peerServerConfig, rovIpAddr } from "./globalContext";
import { get } from "svelte/store";

export const runSiteInitMachine = (sendParentCallback) => {
  function sendEventToMachine(eventName) {
    if (runningMachine) {
      runningMachine.send(eventName)
    }
  }

  const siteInitMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5SwJYBcwEkB26B0AwgBZgDGA1itlAPo4YBO2YaNAgqaXLAMQCqAJQAydAMo0BAeQBqdAAqJQABwD2qNChXZFIAB6IATAFYADHgBsADhMBOACxGAzOYCMJgw-MAaEAE9ELgDslnhGdo5GLkYGLpZGToEGAL5JPupYuGiEJBRUtPRgTCzsnNw8mAByACoAogIVNVXs0myYQmwAQkI1OqrqmtpIeoaWdhbBdpaBto52NoE2Rj7+CEY2eIEuLnYm0Zb2Jnbmiylp6Bn4xGSU1HTYjMysHFywvJW19Y00kgBiP0KVHpDProAY6fQIAC0bkCeH2LnMBlGNkO5kCdjsy0MYTwzhsCKCNkcBhMpOSqRA6Rw+AA6gBDUG3H4qBg0PiwQo0USkOnYGgdACuaDQWhocgYZVEBDYFX5fCqVUksoIAIIAGkagARXpqUFacGIRwmELxayRAyOBEGFGBLEIRyBWGORyWIIOywWzaWU6U87UrLc3m4JksiQyeQ8KSyTByGg-SR8Cra4G6jT6oYQzYuXGuWbBSxoozmbx+Q2TOGLV2k2ymGzeilUzJ4QPYYO0ZmsqMRmNc6UVCqVADiNDqUgEOv66dAEMt5jhLiNro8RkSBnRduic5MrhcdecrsRjhSFOwKggcB0jcuORu+XuhUeJRe8BTk8G08QkJJjjhTncxhMS0rQMO04jwOwoniaZAIxI1zB9K8snpRl21DdlORbfkhRFPlxW4Cc9XfYYoRJMYkU2YxFxdBFHDtOxjFCAxEUCWYbCYlxjAQv0mxbNs41DLsYwItMiIhIwCw2dx0RibZLDkyw6OOPAEUmaJJg8XcbC4jB-TwARIBQCVSFYDoGBUAB3DlWSqFQw2jBRX0Ig0EHMSJcTWTYbCsUxZhLFYDCYvATAXSiPXCRwbCJbSLgDc4JDAOkIBWZRUzBDNEGLMZTECcTAlcgsLSWUsEHmPA2I9FcPGCIkjwbbj0GEtKPxIpE8HIji-0sajzFo4roR-YxHTy45xN3fZyRSIA */
    createMachine({
      context: {
        peerServerConfig: {},
        rovIpAddr: null,
      },
      predictableActionArguments: true,
      preserveActionOrder: true,
      id: "siteInit",
      initial: "Checking_Internet_Access",
      states: {
        Checking_Internet_Access: {
          entry: "checkInternetAvailable",
          on: {
            URL_IS_ROV_IP: {
              actions: [
                "setLocalPeerServerConfig",
                "showHttpGamepadSupportDisabledAlert",
              ],
              target: "#siteInit.Site_Ready",
            },
            INTERNET_AVAILABLE: {
              actions: "setCloudPeerServerConfig",
              target: "#siteInit.Site_Ready",
            },
            INTERNET_OFFLINE: {
              actions: ["showIpScanButton", "hideLoadingUi"],
              target: "#siteInit.Waiting_For_User_Scan_Button_Press",
            },
          },
        },
        Waiting_For_User_Scan_Button_Press: {
          // description:  "We need this because of browser popup blocking w/o user interaction",
          entry: "setupWaitForUserScanButtonPress",
          on: {
            SCAN_BUTTON_CLICKED: {
              actions: ["showIpScanningUi", "hideIpScanButton"],
              target: "#siteInit.Scanning_For_ROV_IP",
            },
          },
        },
        Scanning_For_ROV_IP: {
          entry: "scanForRovIP",
          on: {
            ROV_IP_FOUND: {
              actions: "setRovIpAddr",
              target: "#siteInit.Redirect_Browser_To_ROV_IP",
            },
            IP_SCANNING_ERROR: {
              actions: ["showIpScanButton", "hideLoadingUi"],
              target: "#siteInit.Waiting_For_User_Scan_Button_Press",
            },
          },
        },
        Redirect_Browser_To_ROV_IP: {
          entry: "redirectBrowserToRovIp",
        },
        Site_Ready: {
          entry: "siteReady",
          type: "final",
        },
      },
    }, {
      actions: {
        setCloudPeerServerConfig: () => {
          peerServerConfig.set(consts.peerServerCloudOptions);
        },
        setLocalPeerServerConfig: () => {
          peerServerConfig.set(consts.peerServerLocalOptions);
        },
        setRovIpAddr: (_, event) => {
          rovIpAddr.set(event.data);
        },
        showIpScanButton: () => {
          showToastMessage("Click scan to find the ROV locally.");
          showToastMessage("No internet connection.");
          showScanIpBtn();
        },
        hideIpScanButton: () => {
          hideScanIpButton();
        },
        hideLoadingUi: () => {
          hideLoadingUi("ip-scan");
          hideLoadingUi("internet-check");
        },
        showIpScanningUi: () => {
          showLoadingUi("ip-scan");
        },
        redirectBrowserToRovIp: (_, event) => {
          window.location.href = `http://${event.data}`;
        },
        siteReady: () => { sendParentCallback("SITE_READY") },

        checkInternetAvailable: () => {
          showLoadingUi("internet-check")

          const config = consts.peerServerCloudOptions;
          isInternetAvailable((config.secure ? "https://" : "http://") + config.host + ":" + config.port).then((internetOnline) => {
            if (internetOnline) {
              sendEventToMachine("INTERNET_AVAILABLE");
            } else {
              // INTERNET OFFLINE
              // check if we are viewing this site at an IP ADDRESS or .local domain
              // indicating this page was served directly from the rov (presumably)
              const urlHostParts = window.location.host.split(".");
              if (
                (urlHostParts.length == 4 && !isNaN(Number(urlHostParts[3]))) ||
                (urlHostParts.length == 2 && urlHostParts[1] == "local")
              ) {
                // in which case we are viewing this site at the rov's ip (presumably)
                sendEventToMachine("URL_IS_ROV_IP");
              } else {
                // otherwise the internet is just offline
                sendEventToMachine("INTERNET_OFFLINE");
              }
            }
          })
        },
        setupWaitForUserScanButtonPress: () => {
          showScanIpBtn();

          const onBtnClick = () => {
            sendEventToMachine("SCAN_BUTTON_CLICKED");
          };

          const btnElem = document.getElementById("scan_for_ip_btn");
          btnElem.addEventListener("click", onBtnClick);

          // cleanup function on state exit:
          return () => {
            btnElem.removeEventListener("click", onBtnClick)
            // hideBtnElem()
          };
        },
        scanForRovIP: () => {
          showLoadingUi("ip-scan")
          // setTimeout(() => {
          // hideLoadingUi()
          //   sendEventToMachine({
          //     type: "ROV_IP_FOUND",
          //     data: "UHhh the ip address man!",
          //   });
          // }, 3000);
        },
      },
      guards: {},
    });


  const runningMachine = interpret(siteInitMachine, { devTools: get(debugXstateMode) }).start();
  return runningMachine;
}
