import styled from "styled-components";

const ButtonBlock = styled.button`
  width: 100%;
  height: 100%;

  background-color: ${(backgroundColor) => backgroundColor};
  color: white;

  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
`;

export default function Button({
  children,
  onClick,
  backgroundColor = "black",
}) {
  return (
    <ButtonBlock onClick={onClick} backgroundColor={backgroundColor}>
      {children}
    </ButtonBlock>
  );
}
