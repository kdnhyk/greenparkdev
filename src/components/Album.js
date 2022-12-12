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
  border-radius: 12px 0 0 12px;
  .ImageWrapper {
    position: relative;
    img {
      border-radius: 12px 0 0 12px;
      width: 160px;
      height: 160px;
      object-fit: cover;
    }
    svg {
      position: absolute;
      right: 4px;
      bottom: 4px;
      cursor: pointer;
    }
  }

  .TextArea {
    width: 100%;
    padding: 4px 4px 4px 10px;
    box-sizing: border-box;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(20, 20, 20, 0.5);
    .Title {
      font-size: 15px;
      margin: 6px 0;
    }
    .Content {
      height: 100%;
      font-size: 13px;
      color: #e6e6e6;
      li {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
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

export default function Album({ id, url, title, content, isViewd }) {
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

  const { addDocument, deleteDocument } = useFirestore("Board");
  const { deleteImage } = useStorage();
  const deleteAlbum = () => {
    if (isViewd) {
      addDocument({
        title: title,
        isViewd: false,
      });
    } else if (!isViewd) {
      deleteDocument(id);
      deleteImage(url);
    }
  };

  const reViewd = () => {
    addDocument({
      title: title,
      isViewd: true,
    });
  };

  return (
    <AlbumBlock>
      <div className="ImageWrapper" onClick={onClick}>
        <img alt="IMG" src={url}></img>
        {!isViewd && (
          <svg
            width="33"
            height="27"
            viewBox="0 0 33 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 1.905L3.42 0L28.5 25.08L26.595 27L21.975 22.38C20.25 22.95 18.42 23.25 16.5 23.25C9 23.25 2.595 18.585 0 12C1.035 9.36 2.685 7.035 4.785 5.19L1.5 1.905ZM16.5 7.5C17.6935 7.5 18.8381 7.97411 19.682 8.81802C20.5259 9.66193 21 10.8065 21 12C21.0008 12.5108 20.9145 13.0181 20.745 13.5L15 7.755C15.4819 7.58547 15.9892 7.49924 16.5 7.5M16.5 0.75C24 0.75 30.405 5.415 33 12C31.7758 15.1098 29.6954 17.8091 27 19.785L24.87 17.64C26.9443 16.2051 28.6173 14.2636 29.73 12C28.5173 9.52491 26.6346 7.43965 24.2959 5.98126C21.9572 4.52286 19.2562 3.74982 16.5 3.75C14.865 3.75 13.26 4.02 11.76 4.5L9.45 2.205C11.61 1.275 13.995 0.75 16.5 0.75ZM3.27 12C4.48266 14.4751 6.36536 16.5603 8.70409 18.0187C11.0428 19.4771 13.7438 20.2502 16.5 20.25C17.535 20.25 18.555 20.145 19.5 19.935L16.08 16.5C15.0362 16.3881 14.0622 15.9223 13.32 15.18C12.5777 14.4378 12.1119 13.4638 12 12.42L6.9 7.305C5.415 8.58 4.17 10.17 3.27 12V12Z"
              fill="#FF5555"
            />
          </svg>
        )}
      </div>
      <div className="TextArea">
        <h3 className="Title" onClick={onClick}>
          {title} | {content.length}
        </h3>
        <ul className="Content">
          {content
            .slice(0)
            .reverse()
            .slice(0, 4)
            .map((element) => (
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
