"use client";

import LoginForm from "@/Components/AdminLogin";
import { useState } from "react";
export default function AdminLogin() {
  const [reg, setReg] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const registerAdmin = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/AdminRegister", {
        method: "POST",
        body: JSON.stringify({
          name: reg.name,
          username: reg.username,
          password: reg.password,
        }),
      });
      if (res.ok) {
        console.log("okay");
      }
      if (res.status == 409) {
        alert("username already in use, try different one");
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <LoginForm
        reg={reg}
        setReg={setReg}
        submitting={setSubmitting}
        handleSubmit={registerAdmin}
        what="admin"
      />
    </div>
  );
}
