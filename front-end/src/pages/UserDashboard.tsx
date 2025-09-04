import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import ConfirmModal from "../components/ConfirmModal";

interface Payment {
  payment_id: number;
  amount: string;
  payment_status: string;
}

interface Move {
  move_id: string;
  status: string;
  origin_address: string;
  destination_address: string;
  tentative_date: string | null;
  total_cost: number | null;
  payment?: Payment[];
}


const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full capitalize";
  let specificClasses = "";

  switch (status.toLowerCase()) {
    case "confirmed":
      specificClasses = "bg-green-100 text-green-800";
      break;
    case "pending":
      specificClasses = "bg-yellow-100 text-yellow-800";
      break;
    case "cancelled":
      specificClasses = "bg-red-100 text-red-800";
      break;
    case "in_progress":
      specificClasses = "bg-blue-100 text-blue-800";
      break;
    case "completed":
      specificClasses = "bg-purple-100 text-purple-800";
      break;
    default:
      specificClasses = "bg-gray-100 text-gray-800";
  }

  return <span className={`${baseClasses} ${specificClasses}`}>{status}</span>;
};

const UserDashboard: React.FC = () => {
  const [moves, setMoves] = useState<Move[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Estados para el modal
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedMoveId, setSelectedMoveId] = useState<string | null>(null);

  const rowsPerPage = 4;

  const fetchMoves = async () => {
    try {
      const response = await api.get("/moves/my-moves");
      setMoves(response.data);
    } catch (error) {
      console.error("Error fetching moves:", error);
    }
  };

  useEffect(() => {
    fetchMoves();
  }, []);

  // 🔹 Cuando el usuario hace clic en "Cancel Move"
  const requestCancelMove = (moveId: string) => {
    setSelectedMoveId(moveId);
    setShowConfirm(true);
  };

  // 🔹 Confirmación desde el modal
  const handleCancelMove = async () => {
    if (!selectedMoveId) return;
    try {
      await api.put(`/moves/${selectedMoveId}`, { status: "cancelled" });
      fetchMoves(); // refrescamos la tabla
    } catch (error) {
      console.error("Error cancelling move:", error);
    } finally {
      setShowConfirm(false);
      setSelectedMoveId(null);
    }
  };

  const handleMakePayment = (moveId: string) => {
    console.log("Make payment for move:", moveId);
    // aquí va la lógica real de pago
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = moves.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(moves.length / rowsPerPage);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="bg-[#0F6F7C] pt-22 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header>
            <h1 className="text-4xl font-bold text-white">My Moves</h1>
            <p className="text-teal-100 mt-1">
              Here you can track the status of your moves and confirm them.
            </p>
          </header>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-16 bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-4">Move Status</th>
                  <th className="px-6 py-4">Origin</th>
                  <th className="px-6 py-4">Destination</th>
                  <th className="px-6 py-4">Tentative Date</th>
                  <th className="px-6 py-4">Reservation Payment</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((move) => {
                  const payment = move.payment?.[0];
                  return (
                    <tr
                      key={move.move_id}
                      className="bg-white border-b hover:bg-teal-50/50 transition-colors"
                    >
                      {/* Status con colores */}
                      <td className="px-6 py-4">
                        <StatusBadge status={move.status} />
                      </td>

                      <td className="px-6 py-4">{move.origin_address}</td>
                      <td className="px-6 py-4">{move.destination_address}</td>
                      <td className="px-6 py-4">
                        {move.tentative_date
                          ? new Date(move.tentative_date).toLocaleDateString(
                              "en-US"
                            )
                          : "N/A"}
                      </td>

                      {/* Pago de reserva */}
                      <td className="px-6 py-4">
                        {payment ? (
                          <div>
                            <p className="font-semibold">
                              ${Number(payment.amount).toLocaleString("en-US")}
                            </p>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                payment.payment_status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : payment.payment_status === "completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {payment.payment_status}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-500">No payment</span>
                        )}
                      </td>

                      {/* Acciones */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-3">
                          {/* Solo mostrar el botón de pago si la mudanza no está cancelada */}
                          {move.status !== "cancelled" && (
                            <button
                              onClick={() => handleMakePayment(move.move_id)}
                              disabled={move.status === "cancelled"}
                              className="font-bold py-2 px-4 rounded-lg bg-[#FFE67B] text-[#0F6F7C] hover:bg-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Make Payment to Confirm
                            </button>
                          )}

                          {/* Solo mostrar cancelar si aún no está cancelada */}
                          {move.status !== "cancelled" && (
                            <button
                              onClick={() => requestCancelMove(move.move_id)}
                              className="font-bold py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                            >
                              Cancel Move
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center p-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      <ConfirmModal
        show={showConfirm}
        title="Cancel Move"
        message="Are you sure you want to cancel this move?"
        onConfirm={handleCancelMove}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default UserDashboard;
