import React, { useState } from "react";
import { Box, Typography, Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { motion } from "framer-motion";

import { ROUTES } from "@/constants/routes";
import { SERVICE_CONTENT } from "@/constants/services";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useCallDialog } from "@/hooks/useCallDialog";
import { initiateVapiCall, endVapiCall } from "@/services/vapiService";
import { startCall as startPlayHTCall, stopCall as stopPlayHTCall } from "@/services/playhtService";

import { PageContainer } from "@/components/shared/PageContainer";
import { ServiceHeader } from "@/components/shared/ServiceHeader";
import { ServiceDescription } from "@/components/shared/ServiceDescription";
import { CallDialog } from "@/components/shared/CallDialog";
import { ServiceFeatures } from "@/components/shared/ServiceFeatures";

const service = "mercedes";
const content = SERVICE_CONTENT[service];

export function MercedesDealer() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isOpen, openDialog, closeDialog } = useCallDialog();
  const [isCallActive, setIsCallActive] = useState(false);
  const [usePlayHT, setUsePlayHT] = useState(false);

  usePageTitle("Mercedes Dealer Service");

  const handleStartCall = async () => {
    try {
      if (usePlayHT) {
        await startPlayHTCall();
      } else {
        await initiateVapiCall('mercedes');
      }
      setIsCallActive(true);
      openDialog();
    } catch (error) {
      console.error("Failed to start call:", error);
      enqueueSnackbar("Failed to start call. Please try again.", {
        variant: "error",
      });
    }
  };

  const handleEndCall = async () => {
    try {
      if (usePlayHT) {
        await stopPlayHTCall();
      } else {
        await endVapiCall();
      }
      setIsCallActive(false);
      closeDialog();
    } catch (error) {
      console.error("Failed to end call:", error);
      enqueueSnackbar("Failed to end call. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <PageContainer>
      <ServiceHeader
        title={content.title}
        logo={content.logo}
        onBack={() => navigate(ROUTES.HOME)}
      />

      <Box sx={{ mt: 4 }}>
        <ServiceDescription description={content.description} />
      </Box>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <ButtonGroup>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setUsePlayHT(false);
                handleStartCall();
              }}
              disabled={isCallActive}
            >
              Speak with us now
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setUsePlayHT(true);
                handleStartCall();
              }}
              disabled={isCallActive}
              sx={{ ml: 1 }}
            >
              Try Beta Voice
            </Button>
          </motion.div>
        </ButtonGroup>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Features
        </Typography>
        <ServiceFeatures features={content.features} />
      </Box>

      <CallDialog
        open={isOpen}
        onClose={handleEndCall}
        title="Mercedes Dealer Service"
        description={`Speaking with our Mercedes Dealer ${usePlayHT ? 'PlayHT' : 'VAPI'} Assistant`}
      />
    </PageContainer>
  );
}

export default MercedesDealer;
