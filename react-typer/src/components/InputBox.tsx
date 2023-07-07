import React, { RefObject } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  display: flex;
  align-items: start;
  justify-content: start;
  width: 1000px;
  border-radius: 4px;
  height: 300px;
  box-shadow: grey 0px -2px 6px 0px inset;
`;

const Letter = styled.p`
  color: #59eabd;
  opacity: 0.4;
  font-size: 22px;
`;

interface InputBox {
  inputRef: RefObject<HTMLDivElement>;
  templateString: string;
}

const InputBox: React.FC<InputBox> = ({ inputRef, templateString }) => {
  return (
    <Container ref={inputRef}>
      {templateString.split("").map((char, index) => {
        if (char == " ") {
          return <Letter key={index}>&nbsp;</Letter>;
        } else {
          return <Letter key={index}>{char}</Letter>;
        }
      })}
    </Container>
  );
};
export default InputBox;
