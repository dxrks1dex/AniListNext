import { MediaConnection } from "~/gql/types.g";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import css from "styled-jsx/css";

interface props {
  name: string | undefined;
  titleImage: string | null | undefined;
}

export default function Watch({ name, titleImage }: props) {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const urlName = name?.replace(/ /g, "-");
  return (
    <Container>
      <img src={titleImage ?? ""} onClick={handleToggle} alt={""} />

      <WithBlockInformation isOpen={isOpen}>
        AniLibria:
        <Link href={`https://www.anilibria.tv/release/${urlName}.html`}>
          {urlName}
        </Link>
        ClanchRoll:
        <Link href={"https://www.crunchyroll.com/"}></Link>
      </WithBlockInformation>
    </Container>
  );
}

const slider = keyframes`
  form {
    margin-right: 102px
  }
  to {
    padding: 0
  }
`;

const Container = styled.div`
  position: relative;
  display: inline-block;

  margin: 0 0 0 0;
  padding: 0 0 0 0;
`;

const ToggleButton = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

const WithBlockInformation = styled.section<{ isOpen: boolean }>`
  position: absolute;

  border-radius: 10px;

  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-50%")};
  width: 40%;
  height: 100%;

  background-color: #151f2e;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  overflow: hidden;

  transition:
    transform 0.5s ease,
    right 0.5s ease,
    visibility 0.1s ease;

  animation: ${({ isOpen }) => isOpen && slider} 0.5s ease;
  visibility: ${({ isOpen }) => (isOpen ? "hidden" : "visible")};

  z-index: 1;
`;
