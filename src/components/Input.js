import styled from "styled-components";

const InputBlock = styled.input`
  width: 100%;
  height: 100%;

  padding: 10px;
  box-sizing: border-box;

  background-color: black;
  color: white;

  border: none;
`;

export default function Input({
  children,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <InputBlock
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >
      {children}
    </InputBlock>
  );
}
