import React, { useState } from "react";
import "./slot.css";
import SlotModal from "./modals/slotmodal";
import Booking from "./booking/booking";
import { useAppSelector } from "../../redux/hooks";

function Slot() {
  const [slot, setSlot] = useState({});
  const slots = useAppSelector((state) => state.slot);
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
        {slots.slots.length > 0 ? (
          slots.slots.map(({ slot_id, vehicle_category, price, status }) => (
            <>
              <div
                className={`slots ${
                  status === "available" ? "" : "slots--taken"
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
                  {status === "available" ? `a ${slot_id}` : `b ${slot_id}`}
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
