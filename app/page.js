// app/page.js

'use client'; // Add this line to mark this as a Client Component
import { Button } from "@/components/ui/button";

export default function Home() {
  return (

<main className="relative z-10 bg-white p-4">
<Button variant="default" onClick={() => alert('You clicked me!')}>
  Click Me
</Button>

</main>
  )
}