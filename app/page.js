'use client'; // This is a client component
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, status } = useSession(); // Get session status
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>; // If session is loading

  if (!session) {
    router.push("/auth/signin"); // Redirect to sign-in page if not signed in // Don't render anything until redirected
    return null;
  }

  return (
    
      <>
      <h1>Welcome to HomePage</h1>
      </>
    
  );
}
