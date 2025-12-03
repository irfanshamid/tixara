"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatToWIB } from "@/utils/helper";
import Badge from "../ui/badge/Badge";

// =============================
// Types
// =============================
interface Token {
  id: string;
  code: string;
  value: string;
  status: number;
  updatedAt: string;
}

interface TokenPayload {
  id?: string;
  code: string;
  value: string;
  status: number;
}

// =============================
// Main Component
// =============================
export default function TokenTable() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  // Form
  const [form, setForm] = useState<TokenPayload>({
    id: "",
    code: "",
    value: "",
    status: 1,
  });

  // =============================
  // Load Tokens
  // =============================
  const loadTokens = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/tokens");
      const data = await res.json();
      setTokens(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTokens();
  }, []);

  // =============================
  // Handlers
  // =============================
  const openCreate = () => {
    setIsEdit(false);
    setSelectedToken(null);
    setForm({ id: "", code: "", value: "", status: 1 });
    setIsModalOpen(true);
  };

  const openEdit = (token: Token) => {
    setIsEdit(true);
    setSelectedToken(token);
    setForm({
      id: token.id,
      code: token.code,
      value: token.value,
      status: token.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this token?")) return;

    await fetch(`/api/tokens`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    loadTokens();
  };

  const handleSubmit = async () => {
    const payload: TokenPayload = {
      id: selectedToken?.id,
      code: form.code,
      value: form.value,
      status: 1,
    };

    if (isEdit) {
      await fetch("/api/tokens", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/tokens", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    setIsModalOpen(false);
    loadTokens();
  };

  // =============================
  // Render
  // =============================
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold">Tokens</h3>

        <button
          onClick={openCreate}
          className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-blue-600 hover:bg-blue-700"
        >
          + Add Token
        </button>
      </div>

      {loading ? (
        <p className="text-center py-6">Loading...</p>
      ) : (
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-y">
              <TableRow>
                <TableCell isHeader className="w-[280px] min-w-[240px] py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Code</TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Updated At</TableCell>
                <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y">
              {tokens.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{t.code}</TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge variant="solid">{t.status === 1 ? 'Active' : 'Nonactive'}</Badge>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{formatToWIB(t.updatedAt)}</TableCell>

                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <button
                      onClick={() => openEdit(t)}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="p-6">
        <h2 className="text-lg font-semibold mb-4">
          {isEdit ? "Edit Token" : "Add Token"}
        </h2>

        <div className="flex flex-col gap-4 mt-10">

          {/* ID hanya untuk CREATE */}
          {isEdit && (
            <input
              type="number"
              disabled
              value={form.id}
              className="border p-2 rounded-lg bg-gray-100"
            />
          )}
          
          <input
            type="text"
            placeholder="Code"
            className="border p-2 rounded-lg"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />

          <input
            type="text"
            placeholder="Value"
            className="border p-2 rounded-lg"
            value={form.value}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
          />

          <button
            onClick={handleSubmit}
            className="mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
