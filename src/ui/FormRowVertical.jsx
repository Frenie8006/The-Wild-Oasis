import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  /* grid-template-columns: 1fr 1fr; */
  grid-template-rows: repeat(1fr, 2);
  gap: 1.4rem;
  font-size: 1.6rem;
  padding: 1.2rem 0;

  /* &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  } */

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
    width: 100%;

    button {
      width: 100%;
    }
  }

  & > input {
    font-size: 1.5rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ children, label, error }) {
  return (
    <StyledFormRow>
      {label ? (
        <>
          <Label htmlFor={children.props.id}>{label}</Label>
          {children}
          {error && <Error>{error}</Error>}
        </>
      ) : (
        children
      )}
    </StyledFormRow>
  );
}

export default FormRow;
