import { useEffect } from "react";
import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { useStorage } from "../hooks/useStorage";

const ImgageUploaderBlock = styled.div`
  position: relative;
`;

const ImageBoxWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  z-index: 1;

  background: #d9d9d9;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  input {
    display: none;
  }
`;

const ImgWrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: ${({ attachment }) => attachment && "2"};
  width: 100px;
  height: 100px;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;

export default function ImgageUploader({ defaultImageUrl, setImageURL }) {
  const inputRef = useRef(null);
  const { upload, deleteImage } = useStorage();

  const [attachment, setAttachment] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    if (defaultImageUrl) {
      console.log("default Image Load");
      setAttachment(defaultImageUrl);
    }
  }, [defaultImageUrl]);

  // useEffect(() => {
  //   if (isUpload) {
  //     console.log("Image Upload!: " + file);

  //   }
  // }, [attachment, deleteImage, file, isUpload, setImageURL, upload]);

  const onUploadImage = useCallback(
    (event) => {
      const { files, value } = event.target;
      console.log(files);
      if (!files) {
        return;
      }
      console.log(files[0].name);
      const theFile = files[0];

      if (theFile.size > 1 * 1024 * 1024) {
        alert("이미지 파일 용량이 너무 큽니다.");
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);

      // 개선
      setFile(theFile);
      upload(theFile, setImageURL);
    },
    [setImageURL, upload]
  );

  const onClearAttachment = () => {
    deleteImage(attachment);
    setAttachment(null);
    setFile("");
    inputRef.current.value = "";
  };

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  return (
    <ImgageUploaderBlock>
      <ImageBoxWrapper onClick={onUploadImageButtonClick}>
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={onUploadImage}
        />
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100" height="100" fill="black" />
          <path
            d="M55 46.6667C55.9889 46.6667 56.9556 46.3734 57.7779 45.824C58.6001 45.2746 59.241 44.4937 59.6194 43.5801C59.9978 42.6665 60.0969 41.6611 59.9039 40.6912C59.711 39.7213 59.2348 38.8304 58.5355 38.1312C57.8363 37.4319 56.9454 36.9557 55.9755 36.7628C55.0055 36.5698 54.0002 36.6689 53.0866 37.0473C52.173 37.4257 51.3921 38.0666 50.8427 38.8888C50.2932 39.7111 50 40.6778 50 41.6667C50 42.9928 50.5268 44.2645 51.4645 45.2022C52.4021 46.1399 53.6739 46.6667 55 46.6667V46.6667ZM55 40C55.3296 40 55.6519 40.0978 55.926 40.2809C56.2 40.464 56.4137 40.7243 56.5398 41.0289C56.6659 41.3334 56.699 41.6685 56.6346 41.9918C56.5703 42.3151 56.4116 42.6121 56.1785 42.8452C55.9454 43.0783 55.6485 43.237 55.3252 43.3013C55.0019 43.3656 54.6667 43.3326 54.3622 43.2065C54.0577 43.0803 53.7974 42.8667 53.6142 42.5926C53.4311 42.3186 53.3333 41.9963 53.3333 41.6667C53.3333 41.2247 53.5089 40.8007 53.8215 40.4882C54.134 40.1756 54.558 40 55 40Z"
            fill="#1E1E1E"
          />
          <path
            d="M66.6667 30H33.3333C32.4493 30 31.6014 30.3512 30.9763 30.9763C30.3512 31.6014 30 32.4493 30 33.3333V66.6667C30 67.5507 30.3512 68.3986 30.9763 69.0237C31.6014 69.6488 32.4493 70 33.3333 70H66.6667C67.5507 70 68.3986 69.6488 69.0237 69.0237C69.6488 68.3986 70 67.5507 70 66.6667V33.3333C70 32.4493 69.6488 31.6014 69.0237 30.9763C68.3986 30.3512 67.5507 30 66.6667 30V30ZM66.6667 66.6667H33.3333V56.6667L41.6667 48.3333L50.9833 57.65C51.6079 58.2708 52.4527 58.6193 53.3333 58.6193C54.214 58.6193 55.0588 58.2708 55.6833 57.65L58.3333 55L66.6667 63.3333V66.6667ZM66.6667 58.6167L60.6833 52.6333C60.0588 52.0125 59.214 51.664 58.3333 51.664C57.4527 51.664 56.6079 52.0125 55.9833 52.6333L53.3333 55.2833L44.0167 45.9667C43.3921 45.3458 42.5473 44.9974 41.6667 44.9974C40.786 44.9974 39.9412 45.3458 39.3167 45.9667L33.3333 51.95V33.3333H66.6667V58.6167Z"
            fill="#1E1E1E"
          />
        </svg>
      </ImageBoxWrapper>
      <ImgWrapper attachment={attachment} onClick={onClearAttachment}>
        <img alt="a" src={attachment}></img>
      </ImgWrapper>
    </ImgageUploaderBlock>
  );
}
