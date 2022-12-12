import styled from "styled-components";
import Album from "../../components/Album";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";

const HomeBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 10px;
  gap: 8px;

  .AlbumWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .BtnWrapper {
    width: 72px;
    height: 30px;
  }
`;

export default function Home() {
  const nav = useNavigate();

  const onWrite = () => {
    console.log("click!");
    // scroll to top ??
    nav("/write/default");
  };
  const { documents } = useCollection("Board");

  return (
    <HomeBlock>
      <div className="AlbumWrapper">
        {documents &&
          documents.map((doc) => {
            return (
              <Album
                key={doc.id}
                id={doc.id}
                url={doc.url}
                title={doc.title}
                content={doc.content}
                isViewd={doc.isViewd}
              />
            );
          })}
      </div>
      <div className="BtnWrapper">
        <Button onClick={onWrite}>Write</Button>
      </div>
    </HomeBlock>
  );
}
