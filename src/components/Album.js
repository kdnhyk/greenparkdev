import { useState } from "react";
import styled from "styled-components";
import { useFirestore } from "../hooks/useFirestore";
import { useStorage } from "../hooks/useStorage";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

const AlbumBlock = styled.div`
  position: relative;
  width: 100%;
  height: 160px;
  display: flex;
  background-color: #1e1e1e;
  border-radius: 12px 0 0 12px;
  .ImageWrapper {
    cursor: pointer;
    img {
      border-radius: 12px 0 0 12px;
      width: 160px;
      height: 160px;
      object-fit: cover;
    }
  }

  .TextArea {
    padding: 4px 4px 4px 10px;
    box-sizing: border-box;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .Title {
      font-size: 15px;
      cursor: pointer;
      margin: 6px 0;
    }
    .Content {
      height: 100%;
      font-size: 13px;
      color: #bfbfbf;
      li {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        margin: 2px 0px;
      }
    }
  }
  .MenuBtnWrapper {
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0px;
    right: 0px;

    cursor: pointer;
  }
`;

export default function Album({ id, url, title, content }) {
  const [isMenu, setIsMenu] = useState(false);

  const nav = useNavigate();
  const onClick = () => {
    console.log(id);
    // nav(`/${id}`);
  };

  const onClickMenu = () => {
    setIsMenu((prev) => !prev);
  };

  const editAlbum = () => {
    nav(`/write/${id}`);
  };

  const { deleteDocument } = useFirestore("Board");
  const { deleteImage } = useStorage();
  const deleteAlbum = () => {
    deleteDocument(id);
    deleteImage(url);
  };

  return (
    <AlbumBlock>
      <div className="ImageWrapper" onClick={onClick}>
        <img alt="IMG" src={url}></img>
      </div>
      <div className="TextArea">
        <h3 className="Title" onClick={onClick}>
          {title} | {content.length}
        </h3>
        <ul className="Content">
          {content.slice(0, 4).map((element) => (
            <li onClick={onClick}>
              {element.title} - {element.vocal}
            </li>
          ))}
        </ul>
      </div>
      <div className="MenuBtnWrapper" onClick={onClickMenu}>
        <svg
          width="10"
          height="2"
          viewBox="0 0 10 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="2" height="2" fill="#BFBFBF" />
          <rect x="4" width="2" height="2" fill="#BFBFBF" />
          <rect x="8" width="2" height="2" fill="#BFBFBF" />
        </svg>
      </div>
      {isMenu && <Menu editAlbum={editAlbum} deleteAlbum={deleteAlbum} />}
    </AlbumBlock>
  );
}
