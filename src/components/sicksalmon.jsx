import React from "react";
import { Modal } from '@mui/material';



export default function handleSickSalmon() {
  return (
 <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <Box sx={{ ...style, width: 400 }}>
    <h2 id="parent-modal-title">Text in a modal</h2>
    <p id="parent-modal-description">
      67!
    </p>
    <ChildModal />
  </Box>
</Modal>
  )
}