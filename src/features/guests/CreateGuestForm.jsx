import { useForm } from "react-hook-form";
import { countries } from "countries-list";
import styled from "styled-components";
import { useCreateGuest } from "./useCreateGuest";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.$type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

// Transform the countries object into an array of options
const countryOptions = Object.entries(countries).map(([code, data]) => ({
  code: code.toLowerCase(),
  name: data.name,
  native: data.native,
}));

function CreateGuestForm({ onCloseModal }) {
  const { createGuest, isCreating } = useCreateGuest();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const nationality = JSON.parse(data.nationality);

    createGuest(
      {
        ...data,
        nationality: nationality.name,
        countryFlag: `https://flagcdn.com/${nationality.code}.svg`,
      },
      {
        onSuccess: (data) => {
          reset();
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isCreating}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isCreating}
          {...register("email", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalID"
          disabled={isCreating}
          {...register("nationalID", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <StyledSelect
          // value={selected}
          disabled={isCreating}
          id="nationality"
          {...register("nationality", { required: "This field is required" })}
        >
          {countryOptions.map(({ code, name }) => (
            <option key={code} value={JSON.stringify({ name, code })}>
              {name}
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          // onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button>Create guest</Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
