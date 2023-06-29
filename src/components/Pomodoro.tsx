import { Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Break from "./Break";
import Session from "./Session";
import Timer from "./Timer";

export default function Pomodoro() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [mode, setMode] = useState("session");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [beep] = useState(
    new Audio("https://freesound.org/data/previews/523/523960_350703-lq.mp3")
  );
  const [beepPlaying, setBeepPlaying] = useState(false);

  /* ########## USE EFFECT HOOKS ########## */
  useEffect(() => {
    setTimeLeft(mode === "session" ? sessionLength * 1000 : breakLength * 1000);
  }, [sessionLength, breakLength]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 1) {
      setTimeLeft(
        mode === "session"
          ? sessionLength * 1000 - timeSpent
          : breakLength * 1000 - timeSpent
      );
    } else {
      clearInterval(interval);
    }
    if (timeLeft === 0) {
      //beep.play();
      setBeepPlaying(true);
      setTimeSpent(0);
      setMode((mode) => (mode === "session" ? "break" : "session"));
      setTimeLeft(
        mode == "session" ? sessionLength * 1000 : breakLength * 1000
      );
    }
    return () => clearInterval(interval);
  }, [isActive, timeSpent]);

  useEffect(() => {
    beep.addEventListener("ended", () => setBeepPlaying(false));
    return () => {
      beep.addEventListener("ended", () => setBeepPlaying(false));
    };
  }, []);

  /* ########## FUNCTIONS ########## */
  function decrementBreakLength() {
    setBreakLength(breakLength - 1);
  }

  function incrementBreakLength() {
    setBreakLength(breakLength + 1);
  }

  function decrementSessionLength() {
    setSessionLength(sessionLength - 1);
  }

  function incrementSessionLength() {
    setSessionLength(sessionLength + 1);
  }

  function reset() {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(mode === "session" ? sessionLength * 1000 : breakLength * 1000);

    if (isActive) {
      setIsActive(false);
      setTimeSpent(0);
    }

    if (beepPlaying) {
      beep.pause();
      beep.currentTime = 0;
      setBeepPlaying(false);
    }
  }

  function toggleIsActive() {
    chrome.runtime.sendMessage({ type: "startTimer", minutes: sessionLength, seconds: 59 });
    setIsActive(!isActive);
  }

  return (
    <Container maxWidth="md">
      <h1>Pomodoro Clock</h1>

      <Timer time={timeLeft} mode={mode} />
      <div className="buttons">
        <Button onClick={toggleIsActive} id="start_stop">
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button onClick={reset} id="reset" variant="contained">
          Reset
        </Button>
      </div>
      <Container maxWidth="md">
        <Break
          length={breakLength}
          decrement={decrementBreakLength}
          increment={incrementBreakLength}
        />
        <Session
          length={sessionLength}
          decrement={decrementSessionLength}
          increment={incrementSessionLength}
        />
      </Container>
    </Container>
  );
}
