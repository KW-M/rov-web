// +build linux

package main

import (
	// "encoding/json"
	// "io/ioutil"
	// "errors"
	"log"
	// "flag"
	"fmt"
	"net"
	// "strconv"
	// "os"
	// "os/signal"
	// "sync"
	"os/exec"
	"syscall"
	"time"

	peerjs "github.com/muka/peerjs-go"
	webrtc "github.com/pion/webrtc/v3"
	"github.com/pion/webrtc/v3/pkg/media"
)

var (
	videoTrack = &webrtc.TrackLocalStaticSample{}
)

// func handleMediaCall(remoteSDP) {
// 	mediaEngine := webrtc.MediaEngine{}
// 	if err := mediaEngine.PopulateFromSDP(remoteSdp); err != nil {
// 		fmt.Println("pion could not create webrtc media engine from remote SDP.", err)
// 		return
// 	}

// 	// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs#avc_h.264

// 	// Find the H264 codec in the list of codecs supported by the remote peer (aka the pilot's browser)
// 	var h264PayloadType uint8 = 0
// 	for _, videoCodec := range mediaEngine.GetCodecsByKind(webrtc.RTPCodecTypeVideo) {
// 		if videoCodec.Name == "H264" {
// 			h264PayloadType = videoCodec.PayloadType
// 			break
// 		}
// 	}

// 	// if the payloadTypeNumber never changed, the broswer doesn't support H264 (highly unlikely)
// 	if h264PayloadType == 0 {
// 		fmt.Println("Remote peer does not support H264")
// 		continue
// 	}

// 	fmt.Println("received offer")
// 	peerConnection, err := c.NewPeerConnection(mediaEngine)
// 	if err != nil {
// 		fmt.Println(err)
// 		continue
// 	}
// }



func pipeVideoToStream(done chan bool) error {
	// Startup libcamera-vid command to get the video data from the camera exposed (locally) on a http/tcp port
	cmd := exec.Command("libcamera-vid", "--width", "640", "--height", "480", "--framerate", "20", "--bitrate", "8000000", "--codec", "h264",  "--inline", "1", "--flush", "1", "--timeout", "0", "--listen", "1",  "--output", "tcp://0.0.0.0:8585")
	fmt.Println(cmd.Args)

	// dataPipe, err := cmd.StdoutPipe()
	// if err != nil {
	// 	log.Fatal("could not create named pipe. ", err)
	// }

	if err := cmd.Start(); err != nil {
		return err
	}

	time.Sleep(time.Second * 5)
	fmt.Println("Hello, playground")

	// connect to site
	conn, err := net.Dial("tcp", "127.0.0.1:8585")
	if err != nil {
		fmt.Printf("failed to connect to video tcp: %s\n", err)
		return err
	}

	fmt.Printf("connected to video tcp\n")

	framebuffer := make(chan []byte, 60)

	// continuously read from the tcp connection and write the video data to the framebuffer variable in a separate goroutine
	go func() {
		for {
			select {
			case <-done: // stop the goroutine because a signal was sent on the 'done' channel from the main.go file to clean up because program is exiting or somthin.
				return
			default:
				framebytes := make([]byte, 600000)
				// n, err := dataPipe.Read(framebytes)
				// if err != nil {
				// 	log.Println("could not read pipe. ", err)
				// }

				nread, err := conn.Read(framebytes)
				if err != nil {
					fmt.Printf("failed to read from socket: %s\n", err)
					return
				}
				// fmt.Printf("bytes read: %d\n", nread)

				framebuffer <- framebytes[:nread]
			}
		}
	}()

	// continuously sample video data from framebuffer (if present) and write it to the webrtc track in a separate goroutine
	go func() {
		for {
			select {
			case <-done: // stop the goroutine because a signal was sent on the 'done' channel from the main.go file to clean up because program is exiting or somthin.
				if err := cmd.Process.Signal(syscall.SIGTERM); err != nil {
					log.Println("Failed to kill camera process. ", err)
				}
				return
			case frame := <-framebuffer: // if new data is in the framebuffer, grab it, (delete from buffer?), and use it in the media sample

				if err := videoTrack.WriteSample(media.Sample{ Data: frame, Duration: time.Second }); err != nil {
					log.Fatal("could not write rtp sample. ", err)
					return
				}
			}
		}
	}()

	return nil
}

func newAnswerOptions() *peerjs.AnswerOption {
		return &peerjs.AnswerOption{}
}

func setupWebrtcConnection(done chan bool) {

	// setup peerjs-go
	peerjsOpts := peerjs.NewOptions()
	peerjsOpts.Debug = 3
	// peerjsOpts.Host = "/"
	peerjsOpts.Host = "0.peerjs.com"
	// peerjsOpts.Port = 9000
	peerjsOpts.Port = 443
	peerjsOpts.Path = "/"
	// peerjsOpts.reliable = true // < this option may change from "reliable" to "ordered" in a future version
	peerjsOpts.Secure = true
	// peerjsOpts.Key = "peerjs"

	// peer1, _ := peerjs.NewPeer("peer1", peerjsOpts)
	// defer peer1.Close()

	// peer2, _ := peerjs.NewPeer("peer2", peerjsOpts)
	// defer peer2.Close()

	// peer2.On("connection", func(data interface{}) {
	// 	conn2 := data.(*peerjs.DataConnection)
	// 	conn2.On("data", func(data interface{}) {
	// 		// Will print 'hi!'
	// 		log.Printf("Received: %#v: %s\n", data, data)
	// 	})
	// })

	// conn1, _ := peer1.Connect("peer2", nil)
	// conn1.On("open", func(data interface{}) {
	// 	for {
	// 		conn1.Send([]byte("hi!"), false)
	// 		<-time.After(time.Millisecond * 1000)
	// 	}
	// })

	rovWebsocketPeer, _ := peerjs.NewPeer("SROV", peerjsOpts)
	defer rovWebsocketPeer.Close() // close the websocket connection when this function exits

	// conn1, _ := rovWebsocketPeer.Connect("SPilot", nil)
	// conn1.On("open", func(data interface{}) {
	// 	for {
	// 		conn1.Send([]byte("hi B!"), false)
	// 		<-time.After(time.Millisecond * 1000)
	// 	}
	// })

	// rovWebsocketPeer.On("connection", func(data interface{}) {
	// 	conn2 := data.(*peerjs.DataConnection)
	// 	conn2.On("data", func(data interface{}) {
	// 		// Will print 'hi!'
	// 		log.Printf("Received: %#v: %s\n", data, data)
	// 	})
	// })

	rovWebsocketPeer.On("connection", func(dataConn interface{}) {

		log.Println("Got connection!")

		// handle the datachannel
		dataChannelConnection := dataConn.(*peerjs.DataConnection)
		dataChannelConnection.On("data", func(data interface{}) {
			// Will print recived message like 'hi!'
			log.Printf("Received: %#v: %s\n", data, data)
		})

		dataChannelConnection.Send([]byte("Hello from rov!"), false)

		// handle the video stream

		// var err error
		// videoTrack, err = webrtc.NewTrackLocalStaticSample(webrtc.RTPCodecCapability{MimeType: "video/h264"}, "rov-front-cam", "rov-front-cam-stream")
		// if err != nil {
		// 	log.Fatal(err)
		// }
		// _, err = rovWebsocketPeer.Call("SPilot", videoTrack, peerjs.NewConnectionOptions());
		// if err != nil {
		// 	log.Println("error calling SPilot")
		// 	log.Fatal(err)
		// }
		// // pipeVideoToStream(done)
	})

	rovWebsocketPeer.On("call",func(mediaConn interface{}) {
		mediaConnection := mediaConn.(*peerjs.MediaConnection)
		log.Println("Got Call!")

		var err error
		videoTrack, err = webrtc.NewTrackLocalStaticSample(webrtc.RTPCodecCapability{MimeType: "video/h264"}, "rov-front-cam", "rov-front-cam-stream")
		if err != nil {
			log.Fatal(err)
		}
		log.Println("Answering call")
		var answerOptss interface{}
		answerOpts := answerOptss.(*peerjs.AnswerOption)
		_, err = mediaConnection.Answer(videoTrack,answerOpts);
		if err != nil {
			log.Println("error answering SPilot")
			log.Fatal(err)
		}

		pipeVideoToStream(done)

	})

	select {
		case <-done: // stop the goroutine because a signal was sent on the 'done' channel from the main.go file to clean up because program is exiting or somthin.
			return
	}
}