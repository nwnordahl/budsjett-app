import { useRef } from "react";
import { Modal, Form, Stack, Button } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetsContext";

export default function AddBudgetModal({ show, handleClose }) {
  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudgets();

  function handleSubmit(event) {
    event.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Legg til kategori</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Navn:</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maksbeløp:</Form.Label>
            <Form.Control
              type="number"
              ref={maxRef}
              min={0}
              step={0.01}
              required
            />
          </Form.Group>
          <Stack>
            <Button variant="primary" type="submit" className="ms-auto">
              Legg til
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
