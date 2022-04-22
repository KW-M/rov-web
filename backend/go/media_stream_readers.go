package main

import (
	"errors"
	"io"
	"time"

	"github.com/pion/webrtc/v3/pkg/media"
	"github.com/pion/webrtc/v3/pkg/media/h264reader"
	"github.com/pion/webrtc/v3/pkg/media/ivfreader"
	"github.com/pion/webrtc/v3/pkg/media/oggreader"
	log "github.com/sirupsen/logrus"
)

///https://github.com/edaniels/gostream/blob/master/codec/x264/encoder.go
// https://github.com/pion/mediadevices/blob/08a396571f87ee2888fc855964a5442f2a163879/track.go#L314

func read_h264(pipe *NamedPipeMediaSource) error {

	// from https://github.com/ashellunts/ffmpeg-to-webrtc/blob/master/src/main.go
	// Send our video a frame at a time. Pace our sending so we send it at the same speed it should be played back as.
	// This isn't required since the video is timestamped, but we will such much higher loss if we send all at once.
	//
	// It is important to use a time.Ticker instead of time.Sleep because
	// * avoids accumulating skew, just calling time.Sleep didn't compensate for the time spent parsing the data
	// * works around latency issues with Sleep (see https://github.com/golang/go/issues/44343)

	h264, h264Err := h264reader.NewReader(pipe.pipeFile)
	if h264Err != nil {
		log.Println("h264reader Initilization Error")
		return h264Err
	}

	spsAndPpsCache := []byte{}
	ticker := time.NewTicker(h264FrameDuration)
	for ; true; <-ticker.C {
		nal, h264Err := h264.NextNAL()
		if h264Err == io.EOF {
			cameraLog.Println("All video frames parsed and sent")
			return nil
		} else if h264Err != nil {
			cameraLog.Println("h264reader Decode Error: ", h264Err)
			return h264Err
		}
		nal.Data = append([]byte{0x00, 0x00, 0x00, 0x01}, nal.Data...)

		if nal.UnitType == h264reader.NalUnitTypeSPS || nal.UnitType == h264reader.NalUnitTypePPS {
			spsAndPpsCache = append(spsAndPpsCache, nal.Data...)
			continue
		} else if nal.UnitType == h264reader.NalUnitTypeCodedSliceIdr {
			nal.Data = append(spsAndPpsCache, nal.Data...)
			spsAndPpsCache = []byte{}
		}

		if h264WriteErr := cameraLivestreamVideoTrack.WriteSample(media.Sample{Data: nal.Data, Duration: time.Second}); h264WriteErr != nil {
			cameraLog.Println("Error writing h264 video track sample: ", h264WriteErr)
		}
	}
	return nil
}

func read_ivf(pipe *NamedPipeMediaSource) error {

	// from https://github.com/ashellunts/ffmpeg-to-webrtc/blob/master/src/main.go
	// Send our video a frame at a time. Pace our sending so we send it at the same speed it should be played back as.
	// This isn't required since the video is timestamped, but we will such much higher loss if we send all at once.
	//
	// It is important to use a time.Ticker instead of time.Sleep because
	// * avoids accumulating skew, just calling time.Sleep didn't compensate for the time spent parsing the data
	// * works around latency issues with Sleep (see https://github.com/golang/go/issues/44343)

	ivfReader, ivfHeader, ivfErr := ivfreader.NewWith(pipe.pipeFile)
	if ivfErr != nil {
		log.Println("ivfReader Initilization Error")
		return ivfErr
	}
	print(ivfReader, ivfHeader)

	return nil
}

func read_ogg(pipe *NamedPipeMediaSource) error {

	// only works with opus codec in the ogg container
	// https://github.com/pion/webrtc/issues/2181
	oggReader, oggHeader, oggErr := oggreader.NewWith(pipe.pipeFile)
	if oggErr != nil {
		log.Println("oggReader Initilization Error")
		return oggErr
	}
	print(oggReader, oggHeader)

	return nil
}

//https://stackoverflow.com/questions/41739837/all-mime-types-supported-by-mediarecorder-in-firefox-and-chrome
func startMediaStream(pipe *NamedPipeMediaSource) error {
	mimeType := pipe.WebrtcTrack.Codec().MimeType
	if mimeType == "video/h264" {
		return read_h264(pipe)
	} else if mimeType == "video/x-ivf" || mimeType == "video/x-indeo" {
		return read_ivf(pipe)
	} else if mimeType == "audio/ogg" {
		return read_ogg(pipe)
	} else {
		return errors.New("Unsupported Media Source MimeType: " + mimeType)
	}
}

// // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs#avc_h.264
// // Find the H264 codec in the list of codecs supported by the remote peer (aka the pilot's browser)
// var h264PayloadType uint8 = 0
// for _, videoCodec := range mediaEngine.GetCodecsByKind(webrtc.RTPCodecTypeVideo) {
// 	if videoCodec.Name == "H264" {
// 		h264PayloadType = videoCodec.PayloadType
// 		break
// 	}
// }
// // if the payloadTypeNumber from never changed, the broswer doesn't support H264 (highly unlikely)
// if h264PayloadType == 0 {
// 	fmt.Println("Remote peer does not support H264")
// 	continue
// }
