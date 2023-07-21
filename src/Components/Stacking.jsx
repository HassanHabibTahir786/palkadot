import React, { useContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

import {
  Tab,
  Box,
  Tabs,
  Container,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import Locked from "./Locked";
import Unlocked from "./Unlocked";
import { AppContext } from "../utils";

import {
  useStakingContract,
  useTokenContract,
} from "../ConnectivityAssets/hooks";
import { useEffect } from "react";
import { stakingAddress } from "../ConnectivityAssets/environment";
import { formatUnits, parseUnits } from "@ethersproject/units";
import Loading from "../ConnectivityAssets/Loading";
import { Toastify } from "../ConnectivityAssets/Toastify";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabStyle = {
  width: "50%",
  fontSize: "20px",
  textTransform: "none",
  color: "#fff",
  fontWeight: "700",
  "&:hover": {
    color: "#FF7250",
  },
  "&.Mui-selected": {
    color: "#FF7250",
  },
};

export default function Stacking() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { account, connect, signer, toggleTableRefres } =
    useContext(AppContext);
  const [userEnterAmount, setUserEnterAmount] = useState(0);
  const [allownce, setAllownce] = useState(null);
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState(" ");
  const [staked, setStaked] = useState(0);
  const [totalSubbply, setTotalSubbply] = useState(0);

  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  const [loading, setLoading] = useState(false);

  //connectivty setup

  const tokenContract = useTokenContract(signer);
  const stackingContract = useStakingContract(signer);

  const initAccount = useCallback(async () => {
    try {
      if (account) {
        const sup = await tokenContract.totalSupply();
        setTotalSubbply(formatUnits(sup));

        const namet = await tokenContract.name();
        setName(namet);

        const allownce = await tokenContract.allowance(account, stakingAddress);
        setAllownce(+allownce);

        const bal = await tokenContract.balanceOf(account);
        setBalance(+formatUnits(bal));

        const users = await stackingContract.users(account);
        setStaked(+formatUnits(users.totalStaked));
      }
    } catch (error) {
      console.log(error);
    }
  }, [account, stackingContract, tokenContract]);

  useEffect(() => {
    initAccount();
    console.log("initAccount");
  }, [initAccount]);

  const stake = async () => {
    if (userEnterAmount < 100) {
      setAlertState({
        open: true,
        message: "The minimum amount to stake is 100",
        severity: "error",
      });
    } else {
      try {
        setLoading(true);
        if (allownce === 0) {
          let tx = await tokenContract.approve(
            stakingAddress,
            parseUnits("100000000000000000000000000000")
          );
          await tx.wait();
        }
        const isLocked = value === 0 ? true : false;

        let tx1 = await stackingContract.stake(
          parseUnits(userEnterAmount.toString()),
          isLocked
        );
        await tx1.wait();

        initAccount();
        setLoading(false);
        toggleTableRefres();
        setAlertState({
          open: true,
          message: `${userEnterAmount} tokens staked `,
          severity: "success",
        });
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
      }
    }
  };
  return (
    <Container maxWidth="sm">
      {/* <Grid container spacing={{ md: 5, xs: 2 }} mt="30px"> */}
      {/* <Grid item md={6} xs={12}> */}
      <Typography variant="h3" sx={{ textAlign: "center", mb: 2 }}>
        BST STAKING
      </Typography>
      <Box
        sx={{
          py: 3,
          background: "#001068",
        }}
      >
        <Loading isLoading={loading} />
        <Toastify alertState={alertState} setAlertState={setAlertState} />

        <Box px={5}>
          <Box>
            <Tabs
              centered
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              TabIndicatorProps={{
                style: {
                  display: "none",
                },
              }}
            >
              <Tab sx={tabStyle} label="Locked" {...a11yProps(0)} />
              <Tab sx={tabStyle} label="Flexible" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Locked
              account={account}
              connect={connect}
              userEnterAmount={userEnterAmount}
              setUserEnterAmount={setUserEnterAmount}
              stake={stake}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Unlocked
              account={account}
              connect={connect}
              userEnterAmount={userEnterAmount}
              setUserEnterAmount={setUserEnterAmount}
              stake={stake}
            />
          </TabPanel>
        </Box>
      </Box>
      <Typography
        sx={{ color: "#FF7250", mt: 2, fontWeight: "700" }}
        textAlign="center"
      >
        Terms and conditions
      </Typography>
      <Typography sx={{ color: "#FF7250", mt: 1 }}>
        (1). 4% tax per transaction will be applicable as per T&C*
      </Typography>
      <Typography sx={{ color: "#FF7250" }}>
        (2).Flexible Staking If a user unstakes his BST token first withdraw and
        then unstake it, If the user directly unstake User will not get the
        claimable reward, only get principle tokens amount.
      </Typography>
      <Typography sx={{ color: "#FF7250" }}>
        (3). Locked Staking If a user withdraws staking prematurely, User will
        receive only the principle BST tokens amount plus an additional
        deduction of 20%.
      </Typography>
      {/* <Typography sx={{ color: "#FF7250", textAlign: "center" }}>
        Note:- total 4% tax on buy and sale will be applicable on per
        transaction as per terms and conditions.
      </Typography> */}
    </Container>
  );
}
