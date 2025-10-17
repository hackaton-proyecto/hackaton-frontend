import Modal from "./Modal";

const darkGreenClass = "bg-green-800 hover:bg-green-700";

interface ModalExitoProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalExito({ isOpen, onClose }: ModalExitoProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="¡Publicación Exitosa! "
      message="Tu emprendimiento ha sido subido a la plataforma y está en revisión. Recibirás una notificación por correo electrónico una vez que sea aprobado."
      buttonText="Entendido"
      colorClass={darkGreenClass}
      icon="✓"
    />
  );
}

