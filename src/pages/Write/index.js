import styled from "styled-components";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate, useParams } from "react-router";
import ImgageUploader from "../../components/ImageUploader";
import { useCollection } from "../../hooks/useCollection";

const WriteBlock = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 20px;

  .WriteBlockInner {
    padding: 10px 10px;
    background: rgba(20, 20, 20, 0.5);
    display: flex;
    flex-direction: column;
    gap: 15px;
    .TitleInputWrapper {
      width: 100%;
      height: 36px;
    }
    .ContentInputForm {
      position: relative;
      height: fit-content;
      width: 100%;
      display: flex;
      justify-content: end;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 2px;
      .TitleInput {
        width: calc(50% - 1px);
      }
      .VocalInput {
        width: calc(50% - 1px);
      }
      .UrlInput {
        width: 100%;
      }
      .AddBtnWrapper {
        position: absolute;
        bottom: -40px;
        // 개선
        width: 44px;
        height: 36px;
        button {
          font-size: 12px;
        }
      }
    }

    .ContentListWrapper {
      height: 300px;
      overflow-y: auto;
      // scroll del
    }
    .EnterBtnWrapper {
      height: 30px;
      width: 80px;
      position: absolute;
      right: 30px;
      bottom: 30px;
      button {
        font-size: 12px;
      }
    }
  }
`;

const ContentWrapper = styled.ul`
  // drag & drop
  width: fit-content;
  font-size: 12px;
  padding: 4px 6px 4px 12px;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 0px 0px 6px 0px;
  background: black;
  display: flex;
  gap: 4px;
  li {
    color: #bfbfbf;
    a {
    }
  }
  button {
    right: -8px;
    width: 16px;
    background-color: transparent;
    color: #bfbfbf;
    border: none;
  }
`;

export default function Write() {
  const [input, setInput] = useState({
    title: "",
    url: "",
    currentTitle: "",
    currentVocal: "",
    currentUrl: "",
    content: [],
  });

  const { id } = useParams();
  const { documents } = useCollection("Board", id);
  const [isUpload, setIsUpload] = useState(false);

  useEffect(() => {
    console.log(documents);
    if (id && documents && documents.length > 0) {
      console.log(id);
      const doc = documents[0];
      setInput((prev) => ({
        ...prev,
        title: doc.title,
        url: doc.url,
        content: doc.content,
      }));
      console.log(doc);
    }
  }, [documents, id]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name + ": " + value);
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const addContent = (e) => {
    e.preventDefault();
    if (
      input.currentTitle === "" ||
      input.currentVocal === "" ||
      input.currentUrl === ""
    )
      return;
    setInput((prev) => {
      return {
        ...prev,
        content: [
          ...prev.content,
          {
            title: prev.currentTitle,
            vocal: prev.currentVocal,
            url: prev.currentUrl,
          },
        ],
        currentTitle: "",
        currentVocal: "",
        currentUrl: "",
      };
    });
  };

  const delContent = (e) => {
    const { id } = e.target;
    console.log(id);
    setInput((prev) => {
      return {
        ...prev,
        content: prev.content.filter((element) => element.url !== id),
      };
    });
  };

  const { addDocument } = useFirestore("Board");
  // const ListStorage = useFirestore("List");
  const nav = useNavigate();

  const onSubmit = () => {
    addDocument({ title: input.title, url: input.url, content: input.content });
    // input.content.map((element) => {
    //   ListStorage.addDocument({ text: element.text, url: element.url });
    // });
    nav("/");
  };

  const setImageURL = (url) => {
    setInput((prev) => {
      return { ...prev, url: url };
    });
    console.log(input);
  };

  return (
    <WriteBlock>
      <div className="WriteBlockInner">
        <div className="TitleInputWrapper">
          <Input
            name="title"
            placeholder="Title"
            value={input.title || ""}
            onChange={onChangeInput}
          />
        </div>

        <ImgageUploader
          defaultImageUrl={input.url}
          setImageURL={setImageURL}
          isUpload={isUpload}
        />
        <form className="ContentInputForm">
          <div className="TitleInput">
            <Input
              name="currentTitle"
              placeholder="Title"
              value={input.currentTitle}
              onChange={onChangeInput}
            />
          </div>
          <div className="VocalInput">
            <Input
              name="currentVocal"
              placeholder="Vocal"
              value={input.currentVocal}
              onChange={onChangeInput}
            />
          </div>
          <div className="UrlInput">
            <Input
              name="currentUrl"
              placeholder="Url"
              value={input.currentUrl}
              onChange={onChangeInput}
            />
          </div>
          <div className="AddBtnWrapper">
            <Button onClick={addContent}>+</Button>
          </div>
        </form>

        <div className="ContentListWrapper">
          {input.content &&
            input.content
              .slice(0)
              .reverse()
              .map((element) => {
                return (
                  <ContentWrapper>
                    <li>
                      <a href={element.url}>
                        {element.title} - {element.vocal}
                      </a>
                    </li>
                    <button id={element.url} onClick={delContent}>
                      x
                    </button>
                  </ContentWrapper>
                );
              })}
        </div>
        <div className="EnterBtnWrapper">
          <Button onClick={onSubmit}>Enter</Button>
        </div>
      </div>
    </WriteBlock>
  );
}
