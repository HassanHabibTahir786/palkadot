import React from "react";

import { Box, Typography } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";
import CustomInput from "./CustonInput";
import ButtonMain from "./ButtonMain";

const Locked = ({
  account,
  connect,
  userEnterAmount,
  setUserEnterAmount,
  stake,
}) => {
  return (
    <Box align="center" mt={2}>
      <CustomInput
        value={userEnterAmount}
        type="number"
        placeholder="5555"
        onChange={(e) => setUserEnterAmount(e.target.value)}
      />
      <ArrowDownward sx={{ my: 1, fontSize: "40px", color: "#fff" }} />
      <Box
        display="flex"
        backgroundColor="#fff"
        maxWidth="180px"
        width="100%"
        borderRadius="5px"
        py={1}
        justifyContent="center"
        alignItems="center"
      >
        <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>
          48%APR
        </Typography>
      </Box>
      <ArrowDownward sx={{ my: 1, fontSize: "40px", color: "#fff" }} />

      <CustomInput readOnly value={userEnterAmount * 1.48} />

      <ButtonMain
        sx={{ width: "100%", py: 1.3, mt: 5, backgroundColor: "#FF7250" }}
        onClick={account ? stake : connect}
      >
        {account ? "Stake" : "Connect Wallet"}
      </ButtonMain>
    </Box>
  );
};

export default Locked;
