import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBookingForm from "./CreateBookingForm";

function AddBooking() {
  return (
    <Modal>
      <Modal.Open opens="booking">
        <Button>Add new booking</Button>
      </Modal.Open>
      <Modal.Window name="booking">
        <CreateBookingForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddBooking;
