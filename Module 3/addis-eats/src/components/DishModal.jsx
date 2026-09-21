import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function DishModal({ dish, onClose, triggerRef }) {
  const closeButton = useRef(null);

  useEffect(() => {
    closeButton.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef?.current?.focus();
    };
  }, [onClose, triggerRef]);

  if (!dish) {
    return null;
  }

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <img
          className="modal-image"
          src={dish.image}
          alt={dish.name}
          onError={(event) => {
            event.target.src =
              "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80";
          }}
        />

        <div className="modal-content">
          <h2>{dish.name}</h2>

          <p>{dish.price} ETB</p>

          <button ref={closeButton} type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default DishModal;
