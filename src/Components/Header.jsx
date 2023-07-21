import React, { useContext } from "react";
import {
  Container,
  useMediaQuery,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import { logo } from "./SmallComponents/Images";

import { AppContext } from "../utils";

export default function Header() {
  const { account, connect, disconnect } = useContext(AppContext);

  const matches1 = useMediaQuery("(max-width:1279px)");
  const matches2 = useMediaQuery("(max-width:700px)");

  return (
    <>
      <Box
        sx={{
          background: "transparent",
        }}
        p={2.5}
      >
        <Container maxWidth="lg" disableGutters>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* <Link to="/" style={{ textDecoration: "none" }}> */}
            <a href="https://blocksnakes.com/">
              <Stack direction="row" alignItems="center" columnGap={1.3}>
                <img
                  style={{ width: matches2 ? "50px" : "70px" }}
                  src={logo}
                  alt=""
                />
                <Typography
                  sx={{
                    fontSize: matches2 ? "20px" : "24px",
                    fontWeight: 700,
                    color: "#0024FF",
                  }}
                >
                  BlockSnacks
                </Typography>
              </Stack>
            </a>
            {/* </Link> */}
            <Box
              display="flex"
              justifyContent={matches1 ? "end" : "space-between"}
              alignItems="center"
            >
              {account ? (
                <Button
                  variant="contained"
                  sx={{ px: { md: 5, xs: 2 }, py: 1.5 }}
                  onClick={disconnect}
                >
                  {account.slice(0, 4) + "..." + account.slice(-4)}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ px: { md: 5, xs: 2 }, py: 1.5 }}
                  onClick={() => connect()}
                >
                  Connect
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
