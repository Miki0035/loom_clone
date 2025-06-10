"use client";
import { ICONS } from "@/constants";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useScreenRecording } from "@/lib/hooks/useScreenRecording";

const RecordScreen = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const {
    resetRecording,
    stopRecording,
    startRecording,
    recordedBlob,
    recordedVideoUrl,
    recordingDuration,
    isRecording,
  } = useScreenRecording();

  const closeModal = () => {
    resetRecording();
    setIsOpen(false);
  };

  const handleStart = async () => {
    await startRecording();
  };

  const recordAgain = async () => {
    resetRecording();
    await startRecording();

    if (recordedVideoUrl && videoRef.current) {
      videoRef.current.src = recordedVideoUrl;
    }
  };

  const goToUpload = () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    sessionStorage.setItem(
      "recordedVideo",
      JSON.stringify({
        url,
        name: "screen-recording.webm",
        type: recordedBlob.type,
        size: recordedBlob.size,
        duration: recordingDuration || 0,
      })
    );
    router.push("/upload");
    closeModal();
  };

  return (
    <div className="record">
      <button className="primary-btn" onClick={() => setIsOpen(true)}>
        <Image src={ICONS.record} alt="record" width={16} height={16} />
        <span>Record a video</span>
      </button>
      {isOpen && (
        <section className="dialog">
          <div className="overlay-record" onClick={closeModal} />
          <div className="dialog-content">
            <figure>
              <h3>Screen Recording</h3>
              <button onClick={closeModal}>
                <Image src={ICONS.close} width={20} height={20} alt="close" />
              </button>
            </figure>
            <section>
              {isRecording ? (
                <article>
                  <div />
                  <span>Recording in progress</span>
                </article>
              ) : recordedVideoUrl ? (
                <video ref={videoRef} src={recordedVideoUrl} controls />
              ) : (
                <p>Click record to start capturing your screen</p>
              )}
            </section>
            <div className="record-box">
              {!isRecording && !recordedVideoUrl && (
                <button className="record-start" onClick={handleStart}>
                  <Image
                    src={ICONS.record}
                    alt="record"
                    width={16}
                    height={16}
                  />
                  Record
                </button>
              )}
              {isRecording && (
                <button className="record-stop" onClick={stopRecording}>
                  <Image
                    src={ICONS.record}
                    alt="record"
                    width={16}
                    height={16}
                  />
                  Stop recording
                </button>
              )}
              {recordedVideoUrl && (
                <>
                  <button onClick={recordAgain} className="record-again">
                    Record Again
                  </button>
                  <button onClick={goToUpload} className="record-upload">
                    <Image
                      src={ICONS.upload}
                      width={16}
                      height={16}
                      alt="upload"
                    />
                    Continue to upload
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default RecordScreen;
