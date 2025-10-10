
import Link from 'next/link';import Footer from "../Footer";
import Navbar from "../Navbar";
import AlertasActivas from "./AlertasActivas";

export default function AlertasPage() {
  return (
    <> 
    
    <div className="min-h-screen bg-gray-300 flex flex-col">
      <Navbar />        
        <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
          <AlertasActivas /> 
        </main>
      <Footer />
    </div>
    </>
  );
}