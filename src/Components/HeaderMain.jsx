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
import { HashLink } from "react-router-hash-link";

import logo from "./../Images/logo.png";

import { AppContext } from "../utils";

export function HeaderMain() {
  const { account, connect, disconnect } = useContext(AppContext);

  const matches1 = useMediaQuery("(max-width:1279px)");

  return (
    <>
      <section
        data-bs-version="5.1"
        class="menu cid-s48OLK6784"
        once="menu"
        id="menu1-h"
      >
        <nav class="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
          <div class="container-fluid">
            <div class="navbar-brand">
              <span class="navbar-logo">
                <img src={logo} alt="Mobirise Website Builder" width="48px" />
              </span>
              <span class="navbar-caption-wrap">
                <Link
                  class="navbar-caption text-black text-primary display-7"
                  to="/"
                >
                  BlockSnakes
                </Link>
              </span>
            </div>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-bs-toggle="collapse"
              data-target="#navbarSupportedContent"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav nav-dropdown" data-app-modern-menu="true">
                <li class="nav-item">
                  <Link
                    class="nav-link link text-black text-primary show display-4"
                    to="/stack"
                    aria-expanded="false"
                  >
                    STAKING
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    smooth
                    to="#aboutus"
                    class="nav-link link text-black text-primary show display-4"
                    aria-expanded="false"
                  >
                    ABOUT US
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    class="nav-link link text-black text-primary display-4"
                    to="#donat-crypto"
                  >
                    DONAT CRYPTO
                  </Link>
                </li>
              </ul>

              <div class="navbar-buttons mbr-section-btn">
                <HashLink class="btn btn-black display-4" to="#presale">
                  PRE-SALE
                </HashLink>

                <HashLink class="btn btn-secondary display-4" to="#freeBST">
                  FREE 20,000 BST
                </HashLink>

                <HashLink class="btn btn-secondary display-4" to="#freeads">
                  APPLY FREE ADS
                </HashLink>
              </div>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
}
