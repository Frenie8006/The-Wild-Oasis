import styled from "styled-components";

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: ${(props) => `flex-${props ? props.$justify : "end"}`};
`;

export default ButtonGroup;
