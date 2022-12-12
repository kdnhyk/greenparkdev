import styled from "styled-components";
import { useFirestore } from "../../hooks/useFirestore";
import { useParams } from "react-router";
import { useCollection } from "../../hooks/useCollection";
import WriteForm from "./WriteForm";

const WriteBlock = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 20px;
`;

export default function Write() {
  const { id } = useParams();
  const { documents } = useCollection("Board", id);
  console.log(documents);
  const { addDocument } = useFirestore("Board");

  return (
    <WriteBlock>
      {documents && (
        <WriteForm id={id} documents={documents} addDocument={addDocument} />
      )}
    </WriteBlock>
  );
}
