import { createMachine, interpret } from "xstate";
import { isInternetAvailable } from "./util"
import { showToastMessage } from "./ui";

import { LOADING_MESSAGE, peerServerCloudOptions, peerServerLocalOptions } from "./consts";
import { debugPageModeActive, peerServerConfig, rovIpAddr } from "./globalContext";
import { showLoadingUi, hideLoadingUi } from "../components/LoadingIndicator.svelte";
import { get } from "svelte/store";

export const runSiteInitMachine = (sendParentCallback) => {
  function sendEventToMachine(eventName) {
    if (runningMachine) {
      runningMachine.send(eventName)
    }
  }

  const siteInitMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5SwJYBcwEkB26B0AwgBZgDGA1itlAPo4YBO2YaNAgqaXLAMQCqAJQAydAMo0BAeQBqdAAoBtAAwBdRKAAOAe1RoUW7OpAAPRAEYAHAHY8ZswGZ7AFmtKAbO4dWANCACeiAC0Vkp4Sk5OVgCsTvZmUQBMllFRAL6pvrpYuGiEJBRUtPRgTCzsnNw8mAByACoAogLV9bXs0myYQmwAQkL1ympIINq6+oZDpghmAJz2eJFRZlbO7gluzha+AQhW03jTCUoWbhb24W6xTumZ6Nn4xGSU1HTYjMysHFywvDUNTS00SQAMSBQhq-VURhG6DGRkmgTMSTwCXsyzWXhOZgiW3Mbj2jms8TcIQuF2uICyOHwAHUAIYw55ArQMGh8WAlGiiUi07A0boAVzQaAMNDkDEqogIbGqfL4tVqkhlBDBBAA0vUACIDKE6GEGOFBLEJfZRWbxaZRewWKJWKybfyIJxRNx4GK2pSIg4OJxucmUnJ4Lk83CM5kSGTyHhSWSYOQ0IGSPjVLWQobQvT6iaIG1mfZKZxuBIuKxY9Y4hA+vbWpzTQs2q3rCx+25U3JB7Ah2hMlnRyOxzlS6rVGoAcRojSkAm1ad1GfGoEmCWmTjw9lN1o8MwsEWm5bONgsFks03zkUL9mm6QyIGwWggcCM-vQOtGmYXQSLoTtHssdgSUSUJQEntbYERtV0zliKILHzS0LAOZsMFbPJHkKF43jKT5uBfPV5xMQ0Djwb87CPREAKAkCgnApwEmiH1rHgmtl0Qu5cjpBkuzDNkOXbPlBWFXkxWwmdXzw+EZlzaYDkSewEjkmI3DcKI93-V1DkLC5bWsWsWOQ9tO3jMNe1jHC5wNBAlxsTxNPgy1oiLctK1sC5rSLCwixmS9ryfXIBEgFBxVIVhugYLQAHd2RZWotHDGM5FM2EswQGCvxSM45PsFyHIdCs8WclxEhcIsEl0gNRFuCQwFpCBtk0WdEvfZK1jwY5EjcLE4g85ScsOVcLxiSJYmtE8myvIA */
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
          peerServerConfig.set(peerServerCloudOptions);
        },
        setLocalPeerServerConfig: () => {
          peerServerConfig.set(peerServerLocalOptions);
        },
        setRovIpAddr: (_, event) => {
          rovIpAddr.set(event.data);
        },
        showIpScanButton: () => {
          showToastMessage("Click scan to find the ROV locally.");
          showToastMessage("No internet connection.");
          // showScanIpBtn();
        },
        hideIpScanButton: () => {
          // hideScanIpButton();
        },
        hideLoadingUi: () => {
          hideLoadingUi(LOADING_MESSAGE.ipScan);
          hideLoadingUi(LOADING_MESSAGE.internetCheck);
        },
        showIpScanningUi: () => {
          showLoadingUi(LOADING_MESSAGE.ipScan);
        },
        redirectBrowserToRovIp: (_, event) => {
          window.location.href = `http://${event.data}`;
        },
        siteReady: () => { sendParentCallback("SITE_READY") },

        checkInternetAvailable: () => {
          showLoadingUi(LOADING_MESSAGE.internetCheck)

          const config = peerServerCloudOptions;
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
          // showScanIpBtn();

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
          showLoadingUi(LOADING_MESSAGE.ipScan)
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


  const runningMachine = interpret(siteInitMachine, { devTools: debugPageModeActive.get() }).start();
  return runningMachine;
}
