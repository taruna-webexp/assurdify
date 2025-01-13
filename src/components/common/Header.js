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
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import { menus } from "@/components/common/HeaderMenus";

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElServices, setAnchorElServices] = React.useState(null); // State for services dropdown

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

    return (
        <AppBar className="!mb-8" position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>

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
                            {menus.map((page) => (
                                <MenuItem key={page.Title} onClick={handleCloseNavMenu}>
                                    <Link href={page.path} passHref>
                                        <Typography sx={{ textAlign: "center" }}>
                                            {page.Title}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {menus.map((page) => (
                            <React.Fragment key={page.Title}>
                                {/* Render "Services" as a dropdown menu */}
                                {page.children ? (
                                    <>
                                        <Button
                                            onClick={handleOpenServicesMenu}
                                            sx={{ my: 2, color: "white", display: "block" }}
                                        >
                                            Services
                                        </Button>
                                        <Menu
                                            anchorEl={anchorElServices}
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "left",
                                            }}
                                            open={Boolean(anchorElServices)}
                                            onClose={handleCloseServicesMenu}
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
                            </React.Fragment>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
