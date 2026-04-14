import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const PaymentVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!reference) {
      setStatus("failed");
      setMessage("No payment reference found.");
      return;
    }

    const verify = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("paystack-verify", {
          body: { reference },
        });

        if (error) throw error;

        if (data?.verified) {
          setStatus("success");
          setMessage("Payment successful! You are now enrolled.");
        } else {
          setStatus("failed");
          setMessage(data?.message || "Payment verification failed.");
        }
      } catch (err: any) {
        setStatus("failed");
        setMessage(err.message || "Verification error.");
      }
    };

    verify();
  }, [reference]);

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-serif text-2xl font-bold text-primary">Donguanella</Link>
        </div>
        <Card className="shadow-elegant border-border/50 text-center">
          <CardHeader>
            {status === "verifying" && <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin" />}
            {status === "success" && <CheckCircle className="mx-auto h-12 w-12 text-accent" />}
            {status === "failed" && <XCircle className="mx-auto h-12 w-12 text-destructive" />}
            <CardTitle className="font-serif text-xl mt-4">
              {status === "verifying" && "Verifying Payment..."}
              {status === "success" && "Payment Confirmed!"}
              {status === "failed" && "Payment Failed"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{message}</p>
            {status === "success" && (
              <Button onClick={() => navigate("/lms/dashboard")} className="w-full">
                Go to Dashboard
              </Button>
            )}
            {status === "failed" && (
              <Button onClick={() => navigate("/lms/courses")} variant="outline" className="w-full">
                Back to Courses
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentVerify;
