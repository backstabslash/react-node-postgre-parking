import React, { useContext } from "react";
import StateContext from "../../../components/context/stateprovider";
import "./slotmodal.scss";
import { useAppSelector } from "../../../redux/hooks";

const SlotModal = ({
  openSlotModal,
  setOpenSlotModal,
  slot,
  setRenderBookingSection,
  setSlot,
}) => {
  const { slots } = useContext(StateContext);
  const auth = useAppSelector((state) => state.auth);
  return (
    <div
      className={`overlay animated ${openSlotModal ? "show" : ""}`}
      onClick={() => setOpenSlotModal(false)}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="headWrapper">
          <div className="headerTDiv">
            slot n{" "}
            <span
              className={`slot-chars-text ${
                slot.status === "Available" ? "" : "slot--taken"
              }`}
            >
              {slot.slot_id}
            </span>
          </div>
          <div className="headerIDiv">
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={() => setOpenSlotModal(false)}
            ></i>
          </div>
        </div>
        <div className="slot-chars">
          suitable for :{" "}
          <span className="slot-chars-text">
            {slot.vehicle_category?.toLowerCase()}
          </span>
          <br></br>
          cost per day :{" "}
          <span className="slot-chars-text">{slot.price} uah</span>
          <br></br>
          currently :{" "}
          <span
            className={`slot-chars-text ${
              slot.status === "Available" ? "" : "slot--taken"
            }`}
          >
            {" "}
            {slot.status?.toLowerCase()}
          </span>
        </div>
        <div className="btnWrapper">
          <button
            className="btn"
            onClick={() => {
              slot.slot_id === "1"
                ? setSlot(slots[slots.length - 1])
                : setSlot(slots[(parseInt(slot.slot_id) - 2) % slots.length]);
            }}
          >
            prev
          </button>
          {auth.role === "client" || auth.role === "administrator" ? (
            <button
              className="btn bookbtn"
              onClick={() => {
                setRenderBookingSection(true);
                setOpenSlotModal(false);
              }}
            >
              {" "}
              book{" "}
            </button>
          ) : (
            <></>
          )}
          <button
            className="btn"
            onClick={() => {
              setSlot(slots[slot.slot_id % slots.length]);
            }}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlotModal;
