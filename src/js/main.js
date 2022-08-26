import { ROV_PEERID_BASE } from "./consts.js";
import { inspect } from "@xstate/inspect";
import { GamepadController } from "./gamepad.js";
import { emojiOfTheDay, getURLQueryStringVariable } from "./util.js";
import { hideLoadingUi, setCurrentRovName, setupConnectBtnClickHandler, setupDisconnectBtnClickHandler, setupSwitchRovBtnClickHandlers, showROVDisconnectedUi, showToastMessage } from "./ui.js";
import { globalContext } from "./globalContext.js"

globalContext.debugXstateMode = !!getURLQueryStringVariable("debug");
globalContext.rovPeerIdEndNumber = parseInt(localStorage.getItem("rovPeerIdEndNumber") || 0);
globalContext.gpadCtrl = new GamepadController();/* init gamepad support */

// Show the rov name in the ui:
setCurrentRovName(ROV_PEERID_BASE + emojiOfTheDay() + globalContext.rovPeerIdEndNumber, globalContext.rovPeerIdEndNumber);

// Show the xstate inspector if the debug query string is present
if (globalContext.debugXstateMode) {
    inspect({
        iframe: false,
    });
}

// import { stop } from "xstate/lib/actions";
import { runSiteInitMachine } from "./siteInit";
import { startRovConnectionMachine } from "./rovConnectionMachine";
import { startThisPeerSetupMachine } from "./thisPeerSetupMachine.js";
import { startRovMediaChannelMachine } from "./rovMediaChannelMachine";
import { RovActions } from "./rovActions";


runSiteInitMachine((eventName) => {
    hideLoadingUi("internet-check");

    const RovMediaChannelMachine = globalContext.RovMediaChannelMachine = startRovMediaChannelMachine();
    const RovConnectionMachine = globalContext.RovConnectionMachine = startRovConnectionMachine((eventName) => {
        console.log("rovConnectionMachine: ", eventName);
        if (eventName === "ROV_CONNECTION_FAILED") {
            showToastMessage("ROV Connection Failed");
            showROVDisconnectedUi();
        } else if (eventName === "ROV_DATACHANNEL_OPEN") {
            RovMediaChannelMachine.send("ROV_CONNECTION_READY");
        }
    })

    const ThisPeerSetupMachine = startThisPeerSetupMachine((eventName) => {
        console.log("ThisPeerSetupMachine: ", eventName);
        RovConnectionMachine.send(eventName); // EventName WILL BE EITHER: "THIS_PEER_DESTROYED", "THIS_PEER_READY";
    });

    setupConnectBtnClickHandler(RovActions.connectToRov);
    setupDisconnectBtnClickHandler(RovActions.disconnectFromRov);

    const switchToNextRovPeerId = () => {
        globalContext.rovPeerIdEndNumber++;
        setCurrentRovName(ROV_PEERID_BASE + emojiOfTheDay() + globalContext.rovPeerIdEndNumber, globalContext.rovPeerIdEndNumber);
        localStorage.setItem("rovPeerIdEndNumber", globalContext.rovPeerIdEndNumber);
        RovActions.disconnectFromRov();
    }

    const switchToPrevRovPeerId = () => {
        globalContext.rovPeerIdEndNumber = Math.max(0, globalContext.rovPeerIdEndNumber - 1);
        setCurrentRovName(ROV_PEERID_BASE + emojiOfTheDay() + globalContext.rovPeerIdEndNumber, globalContext.rovPeerIdEndNumber);
        localStorage.setItem("rovPeerIdEndNumber", globalContext.rovPeerIdEndNumber);
        RovActions.disconnectFromRov();
    }

    setupSwitchRovBtnClickHandlers(switchToPrevRovPeerId, switchToNextRovPeerId);
})
