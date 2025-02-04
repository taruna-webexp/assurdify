"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
import { menus } from "@/components/common/HeaderMenus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElServices, setAnchorElServices] = React.useState(null); // State for services dropdown
  const [isClient, setIsClient] = React.useState(false); // Track client-side render

  React.useEffect(() => {
    setIsClient(true); // Ensures this runs only after client-side hydration
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenServicesMenu = (event) => {
    setAnchorElServices(event.currentTarget); // Open services dropdown
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseServicesMenu = () => {
    setAnchorElServices(null); // Close services dropdown
  };

  // Render null on the server until after hydration
  if (!isClient) {
    return null;
  }

  return (
    <>
      <AppBar className="!bg-transparent pt-2.5 !shadow-none" position="static">
        <Container className="container-fluid header-container">
          <Toolbar disableGutters>
            <Link href="https://www.assuredefi.com/">
              <Image
                src="/assets/logo-a.webp"
                alt="Assure Defi Logo"
                width={165}
                height={60}
                priority
              />
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                className="responsive-nav"
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {menus?.map((page) => (
                  <div key={page.Title}>
                    {page?.children ? (
                      <div>
                        <li>
                          <Button
                            className="dropdown-buttton"
                            onClick={handleOpenServicesMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                          >
                            Services <FontAwesomeIcon icon={faChevronDown} />
                          </Button>
                        </li>
                        <Menu
                          className="dropdown-menu"
                          anchorEl={anchorElServices}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          open={Boolean(anchorElServices)}
                          onClose={handleCloseServicesMenu}
                        >
                          {page?.children?.map((subpage) => (
                            <MenuItem
                              key={subpage.Title}
                              onClick={handleCloseServicesMenu}
                            >
                              <Link href={subpage.path} passHref>
                                <Typography sx={{ textAlign: "center" }}>
                                  {subpage.Title}
                                </Typography>
                              </Link>
                            </MenuItem>
                          ))}
                        </Menu>
                      </div>
                    ) : (
                      <MenuItem key={page.Title} onClick={handleCloseNavMenu}>
                        <Link href={page.path} passHref>
                          <Typography sx={{ textAlign: "center" }}>
                            {page.Title}
                          </Typography>
                        </Link>
                      </MenuItem>
                    )}
                  </div>
                ))}
                <li>
                  <Link
                    href="https://www.assuredefi.com/#get-kyc"
                    passHref
                    className="reponsive-verified-button"
                  >
                    <Button
                      variant="contained"
                      className="kyc-button !rounded-md !text-base !text-white !font-medium !leading-4 gradient-bg"
                    >
                      GET KYC VERIFIED
                    </Button>
                  </Link>
                </li>
              </Menu>
            </Box>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              justifyContent="end"
              className="main-navigation items-center pt-px"
            >
              {menus.map((page) => (
                <div key={page.Title}>
                  {/* Render "Services" as a dropdown menu */}
                  {page.children ? (
                    <>
                      <Button
                        className="dropdown-button"
                        onMouseEnter={handleOpenServicesMenu} // Open menu on hover
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        Services <FontAwesomeIcon icon={faChevronDown} />
                      </Button>
                      <Menu
                        className="dropdown-menu"
                        anchorEl={anchorElServices}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        open={Boolean(anchorElServices)}
                        onClose={handleCloseServicesMenu}
                        MenuListProps={{
                          onMouseLeave: handleCloseServicesMenu, // Close menu when hover ends
                        }}
                      >
                        {page.children.map((subpage) => (
                          <MenuItem
                            key={subpage.Title}
                            onClick={handleCloseServicesMenu}
                          >
                            <Link href={subpage.path} passHref>
                              <Typography sx={{ textAlign: "center" }}>
                                {subpage.Title}
                              </Typography>
                            </Link>
                          </MenuItem>
                        ))}
                      </Menu>
                    </>
                  ) : (
                    <Link href={page.path} passHref>
                      <Button
                        sx={{ my: 2, color: "white", display: "block" }}
                        onClick={handleCloseNavMenu}
                      >
                        {page.Title}
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
              <Link href="https://www.assuredefi.com/#get-kyc">
                <Button
                  variant="contained"
                  className="kyc-button !rounded-md !text-base !text-white !font-medium !leading-4"
                >
                  GET KYC VERIFIED
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Header;
