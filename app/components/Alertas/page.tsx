
import Footer from "../Footer";
import Navbar from "../Navbar";
import AlertasActivas from "./AlertasActivas";

export default function AlertasPage() {
  return (
    <> 
    
    <Navbar /> 
      <div className="bg-gray-300 p-6 shadow-md">
      </div>
      <div className="min-h-screen bg-gray-300 flex flex-col">
       
        <main>
          <AlertasActivas /> 
        </main>
        <Footer /> 
      </div>
    </>
  );
}