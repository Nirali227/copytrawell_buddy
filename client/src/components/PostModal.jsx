import { useRef, useState } from "react";
import useSendPost from "./hooks/useSendPost";
import StyledPostModal, {
  PostModalForm,
  PostModalHeader,
} from "./styled/PostModal.styled";

// https://dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el

const PostModal = ({ setModal }) => {
  const [train_id, setTrainId] = useState("");
  const [departure, setDeparture] = useState("");
  const [departure_date, setDepartureDate] = useState("");
  const [arrival, setArrival] = useState("");
  const [arrival_date, setArrivalDate] = useState("");
  const [pnr, setPnr] = useState("");
  const [booking_status, setBookingStatus] = useState("");

  const backgroundRef = useRef();
  const { mutate: sendPost } = useSendPost();

  return (
    <StyledPostModal
      ref={backgroundRef}
      onClick={(e) => {
        if (e.target === backgroundRef.current) setModal(false);
      }}
    >
      "
      <PostModalForm
        onSubmit={(e) => {
          e.preventDefault();
          // send post to api
          sendPost({
            train_id: train_id,
            departure: departure,
            departure_date: departure_date,
            arrival: arrival,
            arrival_date: arrival_date,
            pnr: pnr,
            booking_status: booking_status,
          });
          const reset = () => {
            setTrainId("");
            setDeparture("");
            setDepartureDate("");
            setArrival("");
            setArrivalDate("");
            setArrivalDate("");
            setPnr("");
            setBookingStatus("");
          };
          reset();
          setModal(false);
        }}
      >
        <PostModalHeader>
          <h1>New Journey</h1>
        </PostModalHeader>
        <form>
          <br></br>
          <label>
            Train Id:<td></td>
            <input
              name="train_id"
              type="string"
              value={train_id}
              onChange={(e) => setTrainId(e.target.value)}
            />
          </label>
          <br></br>
          <label>
            Departure:
            <input
              name="departure"
              type="string"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
          </label>

          <br></br>
          <label>
            Departure date:
            <input
              name="departure_date"
              type="date"
              value={departure_date}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </label>

          <br></br>
          <label>
            Arrival:
            <input
              name="arrival"
              type="string"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
            />
          </label>
          <br></br>
          <label>
            Arrival Date:
            <input
              name="arrival_date"
              type="date"
              value={arrival_date}
              onChange={(e) => setArrivalDate(e.target.value)}
            />
          </label>

          <br></br>
          <label>
            PNR:
            <input
              name="pnr"
              type="string"
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
            />
          </label>

          <br></br>
          <label>
            Booking Status:
            <select
              name="booking_status"
              value={booking_status}
              onChange={(e) => setBookingStatus(e.target.value)}
            >
              <option value="Confirmed">Confirmed</option>
              <option value="Planning">Planning</option>
              <option value="Waiting">Waiting</option>
            </select>
          </label>
        </form>
        <button type="submit">
          <p>Submit New Journey</p>
        </button>
      </PostModalForm>
    </StyledPostModal>
  );
};

export default PostModal;
