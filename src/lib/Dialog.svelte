<script>
    import { ConnectionManager } from "./connectionManager.js";
    import { getROVName } from "./rovUtil.js"
    let cm = new ConnectionManager();
    cm.start()

    const rovPeerId = getROVName(0);

    let connectToRov = () => {
        cm.connectToRov(rovPeerId)
    }

    let sendMessage = ()=>{
        let success = cm.sendMessageToRov(msgValue,rovPeerId);
        if(success)
        console.info("Msg Sent Successfully!")
        else
        console.info("Msg NOT Sent!")
    }

    let msgValue = "";

</script>
<br/>
<button class="btn" on:click={connectToRov}>Connect</button>
<br/>
<input type="text" placeholder="Type here" class="input input-bordered input-error w-full max-w-xs" bind:value={msgValue} />
<button class="btn" on:click={sendMessage}>Send</button>
