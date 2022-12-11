import styled from "styled-components";

const MenuBlock = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 26px;
  right: 0px;
  background-color: #bfbfbf;
  color: black;

  hr {
    width: 42px;
    margin: 0;
  }
  p {
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    margin: 0;
    cursor: pointer;
  }
`;

export default function Menu({ editAlbum, deleteAlbum }) {
  return (
    <MenuBlock className="Menu">
      <p onClick={editAlbum}>Edit</p>
      <hr />
      <p onClick={deleteAlbum}>Del</p>
    </MenuBlock>
  );
}
