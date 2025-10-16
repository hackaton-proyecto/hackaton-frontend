


import Modal from "./Modal";


const errorColorClass = "bg-red-700 hover:bg-red-600";

interface ModalAlertaProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalAlerta({ isOpen, onClose }: ModalAlertaProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Campos Requeridos"
      message="Por favor, completa todos los campos obligatorios marcados con un '*' antes de avanzar al siguiente paso."
      buttonText="Aceptar"
      colorClass={errorColorClass}
      icon="!"
    />
  );
}