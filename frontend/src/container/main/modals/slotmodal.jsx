import React, { useContext, useState, useEffect } from "react";
import StateContext from "../../../components/context/stateprovider";
import AuthContext from "../../../components/context/authprovider";
import "./slotmodal.scss";

const SlotModal = ({ openSlotModal, setOpenSlotModal, slot }) => {
  const [curSlot, setCurSlot] = useState(slot);
  useEffect(() => {
    setCurSlot(slot);
  }, [slot]);
  const { slots } = useContext(StateContext);
  const { auth } = useContext(AuthContext);
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
                curSlot.status === "Available" ? "" : "slot--taken"
              }`}
            >
              {curSlot.slot_id}
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
            {curSlot.vehicle_category?.toLowerCase()}
          </span>
          <br></br>
          cost per day :{" "}
          <span className="slot-chars-text">{curSlot.price} uah</span>
          <br></br>
          currently :{" "}
          <span
            className={`slot-chars-text ${
              curSlot.status === "Available" ? "" : "slot--taken"
            }`}
          >
            {" "}
            {curSlot.status?.toLowerCase()}
          </span>
        </div>
        <div className="btnWrapper">
          <button
            className="btn"
            onClick={() => {
              curSlot.slot_id === "1"
                ? setCurSlot(slots[slots.length - 1])
                : setCurSlot(
                    slots[(parseInt(curSlot.slot_id) - 2) % slots.length]
                  );
            }}
          >
            prev
          </button>
          {auth.role === "client" || auth.role === "administrator" ? (
            <button className="btn bookbtn"> book </button>
          ) : (
            <></>
          )}
          <button
            className="btn"
            onClick={() => {
              setCurSlot(slots[curSlot.slot_id % slots.length]);
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
