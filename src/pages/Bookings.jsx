import AddGuest from "../features/guests/AddGuest";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import ButtonGroup from "../ui/ButtonGroup";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddBooking from "../features/bookings/AddBooking";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />

      <ButtonGroup $justify="start">
        <AddBooking />
        <AddGuest />
      </ButtonGroup>
    </>
  );
}

export default Bookings;
