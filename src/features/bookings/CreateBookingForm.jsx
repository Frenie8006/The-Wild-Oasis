import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useGuests } from "../guests/useGuests";
import { useCabins } from "../cabins/useCabins";
import { useCreateBooking } from "./useCreateBooking";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FormSelect from "../../ui/FormSelect";

const StyledCheckbox = styled.input`
  height: 2.4rem;
  width: 2.4rem;
  outline-offset: 2px;
  transform-origin: 0;
  accent-color: var(--color-brand-600);

  &[type="checkbox"]:disabled {
    accent-color: var(--color-brand-600);
  }
`;

const StyledTextarea = styled.textarea`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  resize: vertical;
`;

function CreateBookingForm({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "",
    },
  });
  const { guests, isLoading: isLoading1 } = useGuests();
  const { cabins, isLoading: isLoading2 } = useCabins();
  const { createBooking, isCreating } = useCreateBooking();

  function onSubmit(data) {
    const currentCabin = cabins.find((cabin) => cabin.id === data.cabinId);

    createBooking(
      {
        ...data,
        hasBreakfast: Boolean(data.extrasPrice),
        cabinPrice: currentCabin?.regularPrice ?? 0,
        totalPrice:
          currentCabin?.regularPrice * data.numNights + (data.extrasPrice || 0),
        startDate: new Date().toISOString(), // For simplicity, using current date as start date
        endDate: new Date(
          Date.now() + data.numNights * 24 * 60 * 60 * 1000,
        ).toISOString(), // Calculating end date based on number of nights
      },
      {
        onSuccess: () => {
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
      <FormRow
        label="How many nights will you stay"
        error={errors?.numNights?.message}
      >
        <Input
          type="number"
          id="numNights"
          // disabled={isCreating}
          {...register("numNights", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Number should be at least 1 or above",
            },
            valueAsNumber: true, // 👈 converts string to number automatically
          })}
        />
      </FormRow>
      <FormRow
        label="How many guests are there"
        error={errors?.numGuests?.message}
      >
        <Input
          type="number"
          id="numGuests"
          // disabled={isCreating}
          {...register("numGuests", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Number should be at least 1 or above",
            },
            max: {
              value: 30,
              message: "Number should not exceed 5",
            },
            valueAsNumber: true, // 👈 converts string to number automatically
          })}
        />
      </FormRow>
      <FormRow
        label="Extras price (optional)"
        error={errors?.extrasPrice?.message}
      >
        <Input
          type="number"
          id="extrasPrice"
          // disabled={isCreating}
          {...register("extrasPrice", {
            min: {
              value: 1,
              message: "Number should be at least 1 or above",
            },
            valueAsNumber: true, // 👈 converts string to number automatically
          })}
        />
      </FormRow>
      <FormRow label="Select status" error={errors?.status?.message}>
        <FormSelect
          options={[
            { label: "-- Select a status --", value: "" },
            { label: "Unconfirmed", value: "unconfirmed" },
            { label: "Checked In", value: "checked-in" },
            { label: "Checked Out", value: "checked-out" },
          ]}
          id="status"
          register={{
            ...register("status", { required: "This field is required" }),
          }}
        />
      </FormRow>
      <FormRow label="Select guest" error={errors?.guestId?.message}>
        <FormSelect
          options={[
            { label: "-- Select a guest --", value: "" },
            ...(guests ?? []).map((guest) => ({
              label: `Guest #${guest.id} (${guest.fullName?.split(" ")[0]})`,
              value: guest.id,
            })),
          ]}
          id="guests"
          register={{
            ...register("guestId", {
              required: "This field is required",
              valueAsNumber: true, // 👈 converts string to number automatically
            }),
          }}
        />
      </FormRow>
      <FormRow label="Select cabin" error={errors?.cabinId?.message}>
        <FormSelect
          options={[
            { label: "-- Select a cabin --", value: "" },
            ...(cabins ?? []).map((cabin) => ({
              label: `Cabin #${cabin.name}`,
              value: cabin.id,
            })),
          ]}
          id="cabins"
          register={{
            ...register("cabinId", {
              required: "This field is required",
              valueAsNumber: true, // 👈 converts string to number automatically
            }),
          }}
        />
      </FormRow>
      <FormRow
        label="Observations (optional)"
        error={errors?.observations?.message}
      >
        <StyledTextarea
          {...register("observations", {
            maxLength: { value: 150, message: "At most 150 characters" },
          })}
        />
      </FormRow>
      <FormRow label="Is paid" error={errors?.isPaid?.message}>
        <StyledCheckbox type="checkbox" id="isPaid" {...register("isPaid")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating || isLoading1 || isLoading2}>
          Create new booking
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
