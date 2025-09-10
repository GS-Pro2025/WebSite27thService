import React, { useState } from "react";
import api from "../api/axiosInstance";
import ConfirmModal from "./ConfirmModal";

interface Client {
  full_name: string;
  email: string;
  phone_number: string;
}

interface Item {
  description: string;
  quantity: number;
}

interface Services {
  service_id: string;
  name: string;
  base_price: number;
}

interface Move {
  move_id: string;
  origin_address: string;
  destination_address: string;
  tentative_date: string | null;
  total_cost: number | null;
  status: string;
  client: Client;
  items?: Item[];
  services?: Services[];
}

interface Props {
  move: Move | null;
  onClose: () => void;
  onUpdate: () => void;
}

const MoveDetailsModal: React.FC<Props> = ({ move, onClose, onUpdate }) => {
  const [tentativeDate, setTentativeDate] = useState(
    move?.tentative_date || ""
  );
  const [totalCost, setTotalCost] = useState(move?.total_cost || null);

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);

  if (!move) return null;

  const isEditable = move.status === "pending" || move.status === "confirmed";
  const canCancel = move.status === "pending";
  const canComplete = move.status === "confirmed";

  const handleSave = async () => {
    try {
      const newStatus = move.status === "pending" ? "in_progress" : move.status;

      await api.put(`/moves/${move.move_id}`, {
        tentative_date: tentativeDate,
        total_cost: totalCost,
        status: newStatus,
      });

      if (totalCost && reservationAmount > 0) {
        await api.post(`/payments`, {
          move_id: move.move_id,
          payment_method: "CASH",
          amount: reservationAmount,
          is_partial: true,
          payment_status: "pending",
        });
      }

      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating move:", error);
    }
  };

  const handleCancelMove = async () => {
    try {
      await api.put(`/moves/${move.move_id}`, {
        status: "cancelled",
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error cancelling move:", error);
    }
  };

  const handleMarkCompleted = async () => {
    try {
      await api.put(`/moves/${move.move_id}`, {
        status: "completed",
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error marking move as completed:", error);
    }
  };
  const [reservationPercentage, setReservationPercentage] = useState<
    number | null
  >(20);
  const reservationAmount =
    totalCost !== null ? (totalCost * (reservationPercentage ?? 0)) / 100 : 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="move-title"
          className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col relative"
        >
          {/* Header (fijo) */}
          <div className="px-6 py-4 border-b sticky top-0 bg-white z-10">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              aria-label="Close"
              title="Close"
            >
              ✕
            </button>
            <h2 id="move-title" className="text-2xl font-bold text-[#0F6F7C]">
              Move Details
            </h2>
          </div>

          {/* Contenido desplazable */}
          <div
            className="px-6 py-4 space-y-4 overflow-y-auto overscroll-contain"
            style={{ scrollbarWidth: "thin" }}
          >
            {/* Datos del cliente */}
            <div className="text-black space-y-1">
              <p>
                <span className="font-semibold">Client:</span>{" "}
                {move.client.full_name}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {move.client.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {move.client.phone_number}
              </p>
              <p>
                <span className="font-semibold">Origin:</span>{" "}
                {move.origin_address}
              </p>
              <p>
                <span className="font-semibold">Destination:</span>{" "}
                {move.destination_address}
              </p>
              <p>
                <span className="font-semibold">Current Status:</span>{" "}
                {move.status}
              </p>
            </div>

            {/* Lista de items */}
            {move.items && move.items.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-[#0F6F7C] mb-2">
                  Items
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {move.items.map((item, idx) => (
                    <li key={idx}>
                      {item.description}{" "}
                      <span className="font-semibold">x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Services */}
            {move.services && move.services.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-[#0F6F7C] mb-2">
                  Services
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {move.services.map((svc) => (
                    <li key={svc.service_id} className="flex justify-between">
                      <span>{svc.name}</span>
                      <span className="font-semibold">
                        $
                        {Number(svc.base_price).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Campos editables */}
            <div className="text-black space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Estimated Cost
                </label>
                <input
                  type="number"
                  value={totalCost ?? ""}
                  onChange={(e) => setTotalCost(Number(e.target.value))}
                  className="w-full border rounded-lg p-2"
                  disabled={!isEditable}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Tentative Date
                </label>
                <input
                  type="date"
                  value={tentativeDate ?? ""}
                  onChange={(e) => setTentativeDate(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  disabled={!isEditable}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Reservation Percentage
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={
                    reservationPercentage === null ? "" : reservationPercentage
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setReservationPercentage(null);
                    } else {
                      let num = Number(value);
                      if (num < 0) num = 0;
                      if (num > 100) num = 100;
                      setReservationPercentage(num);
                    }
                  }}
                  className="w-full border rounded-lg p-2"
                  disabled={!isEditable}
                />
                <p className="text-sm text-gray-600 mt-1">
                  Reservation Amount:{" "}
                  <span className="font-semibold">
                    ${reservationAmount.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Footer (fijo) */}
          <div className="px-6 py-4 border-t sticky bottom-0 bg-white z-10">
            <div className="flex justify-between gap-3">
              {canCancel && (
                <button
                  onClick={() => setShowCancelConfirm(true)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                >
                  Cancel Move
                </button>
              )}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
                {isEditable && (
                  <button
                    onClick={() => setShowEditConfirm(true)}
                    className="px-4 py-2 bg-[#0F6F7C] text-white rounded-lg hover:bg-teal-700"
                  >
                    Save
                  </button>
                )}
                {canComplete && (
                  <button
                    onClick={() => setShowCompleteConfirm(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modales de confirmación */}
      <ConfirmModal
        show={showCancelConfirm}
        title="Cancel Move"
        message="Are you sure you want to cancel this move?"
        onConfirm={handleCancelMove}
        onCancel={() => setShowCancelConfirm(false)}
      />

      <ConfirmModal
        show={showCompleteConfirm}
        title="Complete Move"
        message="Do you want to mark this move as completed?"
        onConfirm={handleMarkCompleted}
        onCancel={() => setShowCompleteConfirm(false)}
      />

      <ConfirmModal
        show={showEditConfirm}
        title="Save Changes"
        message="Do you want to save the changes made to this move?"
        onConfirm={handleSave}
        onCancel={() => setShowEditConfirm(false)}
      />
    </>
  );
};

export default MoveDetailsModal;
