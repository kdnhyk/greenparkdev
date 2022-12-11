import styled from "styled-components";

const MenuBlock = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 26px;
  right: 1px;
  background-color: black;
  color: #d9d9d9;
  border: 0.5px solid #d9d9d9;
  p {
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    margin: 0;

    border-top: 1px solid #d9d9d9;

    cursor: pointer;
  }
`;

export default function Menu({ editAlbum, deleteAlbum }) {
  return (
    <MenuBlock className="Menu">
      <p onClick={editAlbum}>Edit</p>
      <p onClick={deleteAlbum}>Del</p>
    </MenuBlock>
  );
}
