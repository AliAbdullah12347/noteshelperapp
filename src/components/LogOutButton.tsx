"use client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

function LogOutButton() {
    
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogOut = async () => {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a logout delay
        const errorMessage = "Could not access the server. Please try again later."; // Simulated error message

        if (!errorMessage)  {
            toast.success("Logged out successfully!");
            router.push("/");
        }
        else {
            toast.error("Logout failed:", errorMessage);
            setLoading(false);
        }
        
        setLoading(false);
        console.log("Logging out...");
        
    };

    return <Button className="w-24" 
    variant = "outline" 
    onClick={handleLogOut}
    disabled={loading}  >

        {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
        
        </Button>
}

export default LogOutButton;