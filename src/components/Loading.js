import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, LinearProgress } from '@mui/material';

export default function Loading({  isModalOpen }) {
    return (
        <Dialog open={isModalOpen}>
            <DialogTitle sx={{ mt: 2, ml: 2, mr: 2, width: 500 }}>LOADING</DialogTitle>
            <DialogContent>
                <Box sx={{ p: 2, width: 500 }}>
                    <LinearProgress />
                </Box>
            </DialogContent>
        </Dialog>
    );
}
