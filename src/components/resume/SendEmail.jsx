"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const SendEmail = ({ report }) => {
  const { data: session } = useSession();
  const [loading, setIsLoading] = useState(false);

  const handleSend = async () => {
    setIsLoading(true);
    if (!report || !session?.user?.email) {
      alert("Missing report or user email");
      setIsLoading(false);
      return;
    }

    await fetch("/api/email/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        report,
        email: session.user.email,
      }),
    });
    setIsLoading(false);
    toast.success(
      "Email Sent to the Registered User Email",
      session.user.email
    );
  };

  return (
    <Button onClick={handleSend}>
      {loading ? (
        <>
          <Loader className="animate-spin h-4 w-4" />
          <p>Sending...</p>
        </>
      ) : (
        <>Send Report To Email</>
      )}
    </Button>
  );
};

export default SendEmail;
