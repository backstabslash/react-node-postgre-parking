import React, { useState, useContext } from "react";
import StateContext from "../../components/context/stateprovider";
import "./slot.css";
import SlotModal from "./modals/slotmodal";
import Booking from "./booking/booking";

function Slot() {
  const [slot, setSlot] = useState({});
  const { slots } = useContext(StateContext);
  const [openSlotModal, setOpenSlotModal] = useState(false);
  const [renderBookingSection, setRenderBookingSection] = useState(false);
  return (
    <>
      {" "}
      {renderBookingSection ? (
        <Booking
          slot={slot}
          setRenderBookingSection={setRenderBookingSection}
        />
      ) : (
        <></>
      )}
      <div className="mainWrapper">
        <SlotModal
          openSlotModal={openSlotModal}
          setOpenSlotModal={setOpenSlotModal}
          slot={slot}
          setSlot={setSlot}
          setRenderBookingSection={setRenderBookingSection}
        />
        {Object.keys(slots).length > 0 ? (
          slots.map(({ slot_id, vehicle_category, price, status }) => (
            <>
              <div
                className={`slots ${
                  status === "Available" ? "" : "slots--taken"
                }`}
                key={slot_id}
                onClick={() => {
                  setSlot({ slot_id, vehicle_category, price, status });
                  if (!renderBookingSection) setOpenSlotModal(true);
                }}
              >
                <div className="slot-top-text">
                  {vehicle_category === "Motorcycle"
                    ? "moto"
                    : vehicle_category}
                </div>
                <div className="slot-text">
                  {status === "Available" ? `a ${slot_id}` : `b ${slot_id}`}
                </div>
              </div>
            </>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default Slot;
