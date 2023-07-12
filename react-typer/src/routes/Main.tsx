import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Styles from "./Main.module.scss";
import InputBox from "../components/InputBox";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main: React.FC = () => {
  const stringToChange: Array<string> =
    `const changeCharacterToUndone = (): void => {
    const currentChild = inputRef.current?.children[position.position + 1];
    currentChild?.classList.remove(Styles.incorrect);
    currentChild?.classList.remove(Styles.correct);
    currentChild?.classList.remove(Styles.incorrectSpace);
  };`.split("\n");
  const [templateString, setTemplateString] =
    useState<Array<string>>(stringToChange);

  const [string, setString] = useState<string>("");
  const [position, setPosition] = useState<{
    stringPosition: number;
    charPosition: number;
    state: "backtrace" | "moveOn";
  }>({
    stringPosition: 0,
    charPosition: -1,
    state: "moveOn",
  });
  const inputRef = useRef<HTMLDivElement>(null);

  const changeCharacterToUndone = (): void => {
    // const currentChild = inputRef.current?.children[position.position + 1];
    // currentChild?.classList.remove(Styles.incorrect);
    // currentChild?.classList.remove(Styles.correct);
    // currentChild?.classList.remove(Styles.incorrectSpace);
  };

  const returnState = (): void => {
    const { stringPosition, charPosition } = position;
    setString((prevString) => {
      return prevString.slice(0, -1);
    });
    // if (charPosition - 1 === 0) {
    //   setPosition((prevPosition) => {
    //     return {
    //       charPosition: 0,
    //       stringPosition: prevPosition.stringPosition - 1,
    //       state: "backtrace",
    //     };
    //   });
    // } else {
    //   setPosition((prevPosition) => {
    //     return {
    //       charPosition: prevPosition.charPosition - 1,
    //       stringPosition: prevPosition.stringPosition,
    //       state: "backtrace",
    //     };
    //   });
    // }
    setPosition((prevPosition) => {
      return {
        charPosition: prevPosition.charPosition - 1,
        stringPosition: prevPosition.stringPosition,
        state: "backtrace",
      };
    });
  };

  const updateState = (keyPressed: string): void => {
    const { stringPosition, charPosition } = position;
    setString((prevString) => {
      return prevString + keyPressed;
    });
    if (charPosition === templateString[stringPosition].length - 1) {
      setPosition((prevPosition) => {
        return {
          charPosition: 0,
          stringPosition: prevPosition.stringPosition + 1,
          state: "moveOn",
        };
      });
      setString("");
    } else {
      setPosition((prevPosition) => {
        return {
          charPosition: prevPosition.charPosition + 1,
          stringPosition: prevPosition.stringPosition,
          state: "moveOn",
        };
      });
    }
  };

  const reflectChanges = (): void => {
    const { stringPosition, charPosition } = position;
    const currentChild =
      inputRef.current?.children[stringPosition].children[charPosition];
    console.log(string);
    console.log(templateString[stringPosition]);
    if (string[charPosition] !== templateString[stringPosition][charPosition]) {
      if (currentChild?.innerHTML === "&nbsp;&nbsp;") {
        currentChild?.classList.add(Styles.incorrectSpace);
        currentChild.nodeValue = "";
      } else {
        currentChild?.classList.add(Styles.incorrect);
      }
    } else {
      currentChild?.classList.add(Styles.correct);
    }
  };

  useEffect(() => {
    const updateString = (event: any): void => {
      const keyPressed = event.key;
      if (keyPressed.length > 1 && keyPressed !== "Backspace") {
        return;
      }
      if (keyPressed == "Backspace") {
        // if (position.position === -1) {
        //   return;
        // }
        returnState();
      } else {
        updateState(keyPressed);
      }
    };

    window.addEventListener("keydown", updateString);
    return () => {
      window.removeEventListener("keydown", updateString);
    };
  }, [position]);

  useEffect(() => {
    if (position.charPosition < -1 && position.stringPosition) {
      return;
    } else if (position.state === "backtrace") {
      changeCharacterToUndone();
    } else {
      reflectChanges();
    }
  }, [position]);

  return (
    <>
      <InputBox inputRef={inputRef} templateString={templateString} />
    </>
  );
};

export default Main;
