import { useState, type ChangeEvent } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const inputClasses = `w-full p-3 border border-gray-300 rounded-md focus:border-slate-800 focus:ring-1 focus:ring-slate-800 outline-none transition duration-150 ease-in-out placeholder-gray-500 text-gray-800`;

export default function PerfilPage() {
  const [editable, setEditable] = useState(false);

  const [userData, setUserData] = useState({
    nombre: "Lucas Ezequiel Esteche",
    email: "lucas@example.com",
    rol: "inversor",
    riesgo: "5000",
    foto: "https://via.placeholder.com/120",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "riesgo") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setUserData({ ...userData, [name]: numericValue });
    }
  };

  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setUserData({ ...userData, foto: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-10 p-4">
        <div className="w-full max-w-3xl bg-white rounded-xl border border-gray-200 p-8 md:p-12 shadow-lg">
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <img
                src={userData.foto}
                alt="Foto de perfil"
                className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
              />
              {editable && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="absolute inset-0 w-32 h-32 opacity-0 cursor-pointer rounded-full"
                />
              )}
            </div>

            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre y Apellido</label>
              <input type="text" value={userData.nombre} className={inputClasses} disabled />
            </div>

            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={userData.email} className={inputClasses} disabled />
            </div>

            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
              <input type="text" value={userData.rol} className={inputClasses} disabled />
            </div>

            {userData.rol === "inversor" && (
              <div className="w-full mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Riesgo que estás dispuesto a asumir
                </label>
                <input
                  type="text"
                  name="riesgo"
                  value={`$${userData.riesgo}`}
                  onChange={handleChange}
                  className={inputClasses}
                  disabled={!editable}
                />
              </div>
            )}

            <div className="mt-6 flex gap-4">
              {editable ? (
                <>
                  <button
                    className="bg-green-800 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200 ease-in-out"
                    onClick={() => setEditable(false)}
                  >
                    Guardar
                  </button>
                  <button
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold transition duration-200 ease-in-out"
                    onClick={() => setEditable(false)}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200 ease-in-out"
                  onClick={() => setEditable(true)}
                >
                  Editar Perfil
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}