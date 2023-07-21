import React from "react";
import {
  Button,
  Container,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import { AppContext } from "../utils";
import { useStakingContract } from "../ConnectivityAssets/hooks";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { formatUnits } from "@ethersproject/units";
import Loading from "../ConnectivityAssets/Loading";
import { Toastify } from "../ConnectivityAssets/Toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "#FF7250",
    color: theme.palette.common.white,
    fontWeight: "600",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    borderBottom: "none",
    color: theme.palette.common.white,
    border: 0,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    background: "#0A5EF5",
    borderRadius: "44px",
    color: "#fff",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#001068",
    borderRadius: "44px",
    color: "#fff",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  borderBottom: "none",
}));

const tableRow = [
  "View On BSC",
  "Amount",
  "Total",
  "Claimable Reward",
  "Locked/Flexible",
  "Active Status",
  "Claimed Reward",
  "Unsatke",
  "ClaimApr",
];

const ViewStackingTable = () => {
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  const [loading, setLoading] = useState(false);

  //connectivity
  const { account, signer } = useContext(AppContext);
  const stackingContract = useStakingContract(signer);
  const [stackingData, setStackingData] = useState([]);
  const [currentClaimableAmmount, setcurrentClaimableAmmount] = useState([]);
  const initAccount = useCallback(async () => {
    try {
      if (account) {
        setLoading(true);
        const user = await stackingContract.users(account);
        console.log(+user.stakingCount);

        let stakingData = [];

        for (let i = 0; i < +user.stakingCount; i++) {
          let data = await stackingContract.viewStaking(i.toString(), account);
          let temp = {
            amount: data.amount,
            totalAmount: formatUnits(data.totalAprAmount),
            remainingAmount: formatUnits(data.remainingAprAmount),
            startTime: data.startTime,
            lastWithdrawTime: data.lastWithdrawTime,
            isActive: data.isActive,
            locked: data.locked,
          };
          // console.log(temp);
          stakingData.push(temp);
        }
        setStackingData(stakingData);

        let currentAmount = [];
        for (let i = 0; i < +user.stakingCount; i++) {
          const data = await stackingContract.getCurrentClaimableAmount(
            account,
            i.toString()
          );
          // console.log(+data);
          currentAmount.push(data);
        }
        setcurrentClaimableAmmount(currentAmount);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, stackingContract]);

  useEffect(() => {
    initAccount();
  }, [initAccount]);

  // const getTime = (unix) => {
  //   let date = new Date(unix).toLocaleDateString("en-US");
  //   let time = new Date(unix).toLocaleTimeString("en-US");
  //   return date + " " + time;
  // };

  // =========== un stake ================

  const unstake = async (index) => {
    try {
      setLoading(true);

      let tx = await stackingContract.unstake(index);
      await tx.wait();

      setLoading(false);
      initAccount();
    } catch (error) {
      setLoading(false);
      if (error?.data?.message) {
        setAlertState({
          open: true,
          message: error?.data?.message,
          severity: "error",
        });
      } else if (error?.reason) {
        setAlertState({
          open: true,
          message: error?.reason,
          severity: "error",
        });
      } else {
        setAlertState({
          open: true,
          message: error?.message,
          severity: "error",
        });
      }

      console.log(error);
    }
  };

  // =========== unstakeFlexible ================

  // const unstakeFlexible = async (index) => {
  //   try {
  //     setLoading(true);

  //     let tx = await stackingContract.unstakeFlexible(index);
  //     await tx.wait();

  //     setLoading(false);
  //     initAccount();
  //   } catch (error) {
  //     setLoading(false);
  //     if (error?.data?.message) {
  //       setAlertState({
  //         open: true,
  //         message: error?.data?.message,
  //         severity: "error",
  //       });
  //     } else if (error?.reason) {
  //       setAlertState({
  //         open: true,
  //         message: error?.reason,
  //         severity: "error",
  //       });
  //     } else {
  //       setAlertState({
  //         open: true,
  //         message: error?.message,
  //         severity: "error",
  //       });
  //     }

  //     console.log(error);
  //   }
  // };

  // =========== withdraw ================

  const withdraw = async (index) => {
    try {
      setLoading(true);

      let tx = await stackingContract.claimApr(index);
      await tx.wait();

      setLoading(false);
      initAccount();
    } catch (error) {
      setLoading(false);
      if (error?.data?.message) {
        setAlertState({
          open: true,
          message: error?.data?.message,
          severity: "error",
        });
      } else if (error?.reason) {
        setAlertState({
          open: true,
          message: error?.reason,
          severity: "error",
        });
      } else {
        setAlertState({
          open: true,
          message: error?.message,
          severity: "error",
        });
      }

      console.log(error);
    }
  };

  return (
    <Container>
      <Loading isLoading={loading} />
      <Toastify alertState={alertState} setAlertState={setAlertState} />
      <Typography
        variant="h2"
        sx={{ textAlign: "center", mt: "50px", color: "#001068" }}
      >
        History
      </Typography>

      <TableContainer
        sx={{
          my: "30px",
          "& .MuiPaper-root ": {
            backgroundColor: "#001068",
          },
          // background: "transparent",
          borderRadius: "0px",
          maxWidth: { xs: "700px", sm: "100%", md: "100%" },
          maxHeight: "500px",
          width: "100%",
          overflowX: "scroll",
          "&::-webkit-scrollbar": {
            width: "0 !important",
          },
          "&::-webkit-scrollbar:horizontal": {
            height: "4px !important",
          },
          "&::-webkit-scrollbar:verticle": {
            width: "4px !important",
          },

          "&::-webkit-scrollbar-thumb": {
            background: "#0A5EF5",
          },
        }}
        elevation={0}
        component={Paper}
      >
        <Table aria-label="customized table" sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow>
              {tableRow.map((data, ind) => (
                <StyledTableCell
                  align="left"
                  sx={{ minWidth: ind === 0 ? "150px" : "none" }}
                  key={ind}
                >
                  {data}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          {account && (
            <>
              {stackingData?.length > 0 && (
                <TableBody>
                  {stackingData?.map(
                    (
                      {
                        amount,
                        totalAmount,
                        // startTime,
                        locked,
                        isActive,
                        // lastWithdrawTime,
                        remainingAmount,
                      },
                      i
                    ) => (
                      <StyledTableRow key={i} sx={{ minWidth: "150px" }}>
                        <StyledTableCell component="th" scope="row">
                          <a
                            style={{ color: "white", fontWeight: "bold" }}
                            href="https://bscscan.com/address/0xd45287765D0202bA4910eF1d2582505FbfD98ED1"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Transaction <ArrowOutwardIcon />
                          </a>
                        </StyledTableCell>

                        <StyledTableCell component="th" scope="row">
                          {formatUnits(amount)}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {totalAmount}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {currentClaimableAmmount?.length > 0 &&
                            Number(
                              formatUnits(currentClaimableAmmount[i])
                            ).toFixed(2)}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {locked ? "locked" : "Flexible"}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {isActive ? "Active" : "Not Active"}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {(totalAmount - remainingAmount).toFixed(2)}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {locked ? (
                            <Button
                              disabled={!isActive}
                              variant="contained"
                              onClick={() => unstake(i)}
                              sx={{ backgroundColor: "#FF7250" }}
                            >
                              UnStake
                            </Button>
                          ) : (
                            <Button
                              disabled={!isActive}
                              variant="contained"
                              onClick={() => unstake(i)}
                              sx={{ backgroundColor: "#FF7250" }}
                            >
                              UnStake
                            </Button>
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Button
                            disabled={!isActive}
                            variant="contained"
                            onClick={() => withdraw(i)}
                            sx={{ backgroundColor: "#FF7250" }}
                          >
                            ClaimApr
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  )}
                </TableBody>
              )}
            </>
          )}
        </Table>
      </TableContainer>

      {stackingData.length < 1 && (
        <Stack direction="row" justifyContent="center">
          <Typography variant="h3"> NO HISTORY YET </Typography>
        </Stack>
      )}
    </Container>
  );
};

export default ViewStackingTable;
