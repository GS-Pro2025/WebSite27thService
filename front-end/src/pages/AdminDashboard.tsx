import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import MoveDetailsModal from "../components/MoveDetailsModal";
import { sendPaymentLinkEmail } from "../hooks/EmailJSService";
import SuccessModal from "../components/SuccessModal";

interface Client {
  full_name: string;
  email: string;
  phone_number: string;
}
interface Item {
  description: string;
  quantity: number;
}
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
  client: Client;
  items?: Item[];
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

const AdminDashboard: React.FC = () => {
  const [moves, setMoves] = useState<Move[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const rowsPerPage = 4;

  const fetchMoves = async () => {
    try {
      const response = await api.get("/moves"); // Solo admins
      setMoves(response.data);
    } catch (error) {
      console.error("Error fetching moves:", error);
    }
  };

  useEffect(() => {
    fetchMoves();
  }, []);

  const handleSendPaymentLink = async (moveId: string) => {
    const move = moves.find((m) => m.move_id === moveId);
    if (!move) return;

    const itemsHtml =
      move.items && move.items.length > 0
        ? `<ul>${move.items
            .map(
              (item) =>
                `<li>${item.description} (Cantidad: ${item.quantity})</li>`
            )
            .join("")}</ul>`
        : "<p>No hay items detallados.</p>";

    const reservationPayment = move.payment?.[0];
    const reservationAmount = reservationPayment?.amount ?? "0.00";
    const reservationStatus = reservationPayment?.payment_status ?? "N/A";

    const templateParams = {
      to_email: move.client.email, // ← Añadir esta línea
      client_name: move.client.full_name,
      client_email: move.client.email,
      client_phone: move.client.phone_number,
      tentative_date: move.tentative_date
        ? new Date(move.tentative_date).toLocaleDateString("es-ES")
        : "No definida",
      origin_address: move.origin_address,
      destination_address: move.destination_address,
      total_cost: move.total_cost ?? 0,
      items_html: itemsHtml,
      reservation_amount: reservationAmount,
      reservation_status: reservationStatus,
      register_link: `https://tusitio.com/register?email=${move.client.email}`,
    };

    try {
      const result = await sendPaymentLinkEmail(templateParams);
      if (result.success) {
        setShowSuccessModal(true);
      } else {
        console.error('Email service returned error:', result.error);
        setShowErrorModal(true);
      }
    } catch (err) {
      console.error('Unexpected error sending payment link email:', err);
      setShowErrorModal(true);
    }
  };

  const handleViewDetails = (moveId: string) => {
    const move = moves.find((m) => m.move_id === moveId) || null;
    setSelectedMove(move);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = moves.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(moves.length / rowsPerPage);
  useEffect(() => {
    console.log("📌 Página actual:", currentPage);
    console.log("📌 Filas que se están mostrando:", currentRows);
  }, [currentPage, moves]);

  return (
    <>
      <div className="bg-gray-100 min-h-screen font-sans">
        <div className="bg-[#0F6F7C] pt-22 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header>
              <h1 className="text-4xl font-bold text-white">Moving Panel</h1>
              <p className="text-teal-100 mt-1">
                Manage and monitor all your clients moves.
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
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Origin and Destination</th>
                    <th className="px-6 py-4">Tentative Date</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((move) => (
                    <tr
                      key={move.move_id}
                      className="bg-white border-b hover:bg-teal-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <StatusBadge status={move.status} />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <div>{move.client.full_name}</div>
                        <div className="text-xs text-gray-500">
                          {move.client.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {move.origin_address} to {move.destination_address}
                      </td>
                      <td className="px-6 py-4">
                        {move.tentative_date
                          ? new Date(move.tentative_date).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleSendPaymentLink(move.move_id)}
                            className="font-bold py-2 px-4 rounded-lg bg-[#FFE67B] text-[#0F6F7C] hover:bg-yellow-400 transition-all duration-300"
                          >
                            Send Payment Link
                          </button>
                          <button
                            onClick={() => handleViewDetails(move.move_id)}
                            className="font-bold py-2 px-4 rounded-lg bg-[#0F6F7C] text-white hover:bg-teal-700 transition-all duration-300"
                          >
                            View Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center p-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {" "}
                  Previous{" "}
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {" "}
                  Next{" "}
                </button>
              </div>
            </div>
          </div>
        </main>

        {selectedMove && (
          <MoveDetailsModal
            move={selectedMove}
            onClose={() => setSelectedMove(null)}
            onUpdate={fetchMoves}
          />
        )}
      </div>

      <SuccessModal
        show={showSuccessModal}
        title="Success!"
        message="Email sent to customer successfully"
        onClose={() => window.location.reload()}
      />

      <SuccessModal
        show={showErrorModal}
        title="Error"
        message="An error occurred while sending the email."
        onClose={() => window.location.reload()}
      />
    </>
  );
};

export default AdminDashboard;
