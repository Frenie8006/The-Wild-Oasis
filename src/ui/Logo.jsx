import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 10.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
