import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";

interface Client {
  user_id: number;
  full_name: string;
  email: string;
}

interface Move {
  move_id: string;
  status: string;
  total_cost: string;
  client: Client;
  tentative_date: Date;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full capitalize";
  let specificClasses = "";

  switch (status.toLowerCase()) {
    case "completed":
      specificClasses = "bg-green-100 text-green-800";
      break;
    case "pending":
      specificClasses = "bg-yellow-100 text-yellow-800";
      break;
    case "cancelled":
      specificClasses = "bg-red-100 text-red-800";
      break;
    default:
      specificClasses = "bg-gray-100 text-gray-800";
  }

  return <span className={`${baseClasses} ${specificClasses}`}>{status}</span>;
};

const Dashboard: React.FC = () => {
  const [moves, setMoves] = useState<Move[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const response = await api.get("/moves");
        if (response.data.length === 0) {
          setMoves([
            {
              move_id: "1",
              status: "Completed",
              total_cost: "1200",
              client: {
                user_id: 101,
                full_name: "Ana García",
                email: "ana.garcia@email.com",
              },
              tentative_date: new Date("2025-09-15"),
            },
            {
              move_id: "2",
              status: "Pending",
              total_cost: "850",
              client: {
                user_id: 102,
                full_name: "Carlos Rodriguez",
                email: "carlos.r@email.com",
              },
              tentative_date: new Date("2025-09-22"),
            },
            {
              move_id: "3",
              status: "Cancelled",
              total_cost: "2100",
              client: {
                user_id: 103,
                full_name: "Sofia Martinez",
                email: "sofia.m@email.com",
              },
              tentative_date: new Date("2025-09-18"),
            },
            {
              move_id: "4",
              status: "Pending",
              total_cost: "950",
              client: {
                user_id: 104,
                full_name: "Luis Hernandez",
                email: "luis.h@email.com",
              },
              tentative_date: new Date("2025-10-05"),
            },
          ]);
        } else {
          setMoves(response.data);
        }
      } catch (error) {
        console.error("Error fetching moves:", error);
      }
    };
    fetchMoves();
  }, []);

  const handleSendPaymentLink = (moveId: string) => {
    alert(`Sending payment link for move: ${moveId}`);
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
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Estimated Cost
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Tentative Date
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    Actions
                  </th>
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
                      ${move.total_cost}
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
                      <button
                        onClick={() => handleSendPaymentLink(move.move_id)}
                        className="font-bold py-2 px-4 rounded-lg bg-[#FFE67B] text-[#0F6F7C] hover:bg-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                      >
                        Send Payment Link
                      </button>
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
    </div>
  );
};

export default Dashboard;
