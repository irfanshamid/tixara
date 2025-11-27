import { useState, useEffect } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
}

export function useUser(userId?: number) {
  const [users, setUsers] = useState<User[]>([]);
  const [detailUser, setDetailUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ===========================
  // GET LIST USER
  // ===========================
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Fetch users failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // GET DETAIL USER (optional)
  // ===========================
  const fetchUserById = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`);
      const data: User = await res.json();
      setDetailUser(data);
    } catch (err) {
      console.error("Fetch user failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Auto fetch detail jika userId dikirim
  useEffect(() => {
    if (userId) fetchUserById(userId);
  }, [userId]);

  // ===========================
  // CREATE USER
  // ===========================
  const createUser = async (payload: CreateUserPayload) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create user");

      await fetchUsers();
      return true;
    } catch (err) {
      console.error("Create error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // UPDATE USER
  // ===========================
  const updateUser = async (id: number, payload: UpdateUserPayload) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update user");

      await fetchUsers();
      return true;
    } catch (err) {
      console.error("Update error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // DELETE USER
  // ===========================
  const deleteUser = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      await fetchUsers();
      return true;
    } catch (err) {
      console.error("Delete error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // LOGIN
  // ===========================
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return null;

      const data = await res.json();
      return data; // biasanya token + user
    } catch (err) {
      console.error("Login error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    users,
    detailUser,

    fetchUsers,
    fetchUserById,

    createUser,
    updateUser,
    deleteUser,

    login,
  };
}
