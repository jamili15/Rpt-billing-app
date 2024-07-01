import React from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

interface ModalsProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modals: React.FC<ModalsProps> = ({
  open,
  onClose,
  children,
  className,
}) => {
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box
          className={`fixed flex flex-col gap-3 items-center justify-start top-1/2 left-1/2 w-64 h-60 bg-white shadow-xl p-4 transform -translate-x-1/2 -translate-y-1/2 rounded-sm ${className}`}
        >
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default Modals;
