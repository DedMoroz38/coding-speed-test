import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Styles from "./Main.module.scss";
import InputBox from "../components/InputBox";
import { connected } from "process";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main: React.FC = () => {
  const [templateString, setTemplateString] = useState<string>("Hello world!");
  const [string, setString] = useState<string>("");
  const [position, setPosition] = useState<{
    position: number;
    state: "backtrace" | "moveOn";
  }>({
    position: -1,
    state: "moveOn",
  });
  const inputRef = useRef<HTMLDivElement>(null);

  const changeLetterToUndone = () => {
    const currentChild = inputRef.current?.children[position.position + 1];
    currentChild?.classList.remove(Styles.incorrect);
    currentChild?.classList.remove(Styles.correct);
  };

  const returnState = () => {
    setString((prevString) => {
      return prevString.slice(0, -1);
    });
    setPosition((prevPosition) => {
      return {
        position: prevPosition.position - 1,
        state: "backtrace",
      };
    });
  };

  const updateState = (keyPressed: string) => {
    setString((prevString) => {
      return prevString + keyPressed;
    });
    setPosition((prevPosition) => {
      return {
        position: prevPosition.position + 1,
        state: "moveOn",
      };
    });
  };

  const updateString = (event: any) => {
    const keyPressed = event.key;
    if (keyPressed.length > 1 && keyPressed !== "Backspace") {
      return;
    }
    if (keyPressed == "Backspace") {
      returnState();
    } else {
      updateState(keyPressed);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", updateString);
    return () => {
      window.removeEventListener("keydown", updateString);
    };
  }, []);

  useEffect(() => {
    console.log(position);
    if (position.position < -1) return;
    if (position.state === "backtrace") {
      changeLetterToUndone();
    } else {
      const p: number = position.position;
      const currentChild = inputRef.current?.children[p];
      if (string[p] !== templateString[p]) {
        currentChild?.classList.add(Styles.incorrect);
      } else {
        currentChild?.classList.add(Styles.correct);
      }
    }
  }, [position]);

  return (
    <>
      <InputBox inputRef={inputRef} templateString={templateString} />
    </>
  );
};

export default Main;
