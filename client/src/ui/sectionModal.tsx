"use client";

import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { useSections } from "@/hooks/useSection";

const SectionPopup = ({ onClose }: { onClose: () => void }) => {
    const { addSectionMutation } = useSections();
    const [sectionName, setSectionName] = useState("");

    const handleSubmit = async () => {
        if (sectionName.trim() !== "") {
            await addSectionMutation.mutateAsync({ name: sectionName });
            setSectionName("");
            onClose();
        }
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Add New Section</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Enter section name"
                    variant="outlined"
                    margin="dense"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SectionPopup;
