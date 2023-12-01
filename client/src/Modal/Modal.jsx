import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const ModalComponent = ({ textButton, title, body, buttons, openButton}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {openButton?
        <button onClick={onOpen} className="flex">
          {openButton}
        </button>:
        <Button onPress={onOpen}>
          {textButton}
        </Button>
      }
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{body({ onClose })}</ModalBody>
              {buttons === undefined ? null : (
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Enviar
                  </Button>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
