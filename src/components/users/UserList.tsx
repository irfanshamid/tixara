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

// =============================
// Types
// =============================
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  status: "Active" | "Blocked";
}

interface UserPayload {
  name: string;
  email: string;
  password?: string;
}

// =============================
// Main Component
// =============================
export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form state
  const [form, setForm] = useState<UserPayload>({
    name: "",
    email: "",
    password: "",
  });

  // =============================
  // Fetch Users
  // =============================
  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // =============================
  // Handlers
  // =============================
  const openCreate = () => {
    setIsEdit(false);
    setForm({ name: "", email: "", password: "" });
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const openEdit = (user: User) => {
    setIsEdit(true);
    setSelectedUser(user);
    setForm({ name: user.name, email: user.email, password: "" });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this user?")) return;

    await fetch(`/api/users`, {
      method: "DELETE",
      body: JSON.stringify({ id }),   // <- HARUS stringify
    });

    loadUsers();
  };


  const handleSubmit = async () => {
    const payload = {
      id: selectedUser?.id,        // <- tambahkan ID
      name: form.name,
      email: form.email,
      ...(form.password ? { password: form.password } : {}),
    };

    if (isEdit) {
      await fetch("/api/users", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    setIsModalOpen(false);
    loadUsers();
  };

  // =============================
  // Render
  // =============================
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Users
        </h3>

        <button
          onClick={openCreate}
          className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm hover:bg-brand-600"
        >
          + Add User
        </button>
      </div>

      {loading ? (
        <p className="text-center py-6 text-gray-600">Loading...</p>
      ) : (
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell isHeader className="w-[280px] min-w-[240px] py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">User</TableCell>
                <TableCell isHeader className="w-[280px] min-w-[240px] py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Email</TableCell>
                <TableCell isHeader className="w-[280px] min-w-[240px] py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Created At</TableCell>
                <TableCell isHeader className="w-[280px] min-w-[240px] py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {users.map((user) => (
                <TableRow key={user.id}>
                  {/* User Column */}
                  <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                    {user.name}
                  </TableCell>

                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {user.email}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {formatToWIB(user.createdAt)}
                  </TableCell>

                  <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                    <button
                      onClick={() => openEdit(user)}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
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

      {/* =============================
          Modal Create / Edit
      ============================= */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="p-6">
        <h2 className="text-lg font-semibold mb-4">
          {isEdit ? "Edit User" : "Add User"}
        </h2>

        <div className="flex flex-col gap-4 mt-10">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded-lg"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-lg"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder={isEdit ? "New password (optional)" : "Password"}
            className="border p-2 rounded-lg"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
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
