import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate, Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// 导入 AuthContext
import { AuthContext } from "../../contexts/AuthContext";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  // 从 AuthContext 获取认证状态和登出函数
  const { auth, logoutUser } = useContext(AuthContext);
  console.log('SiteHeader - Auth Status:', auth.isAuthenticated);

  // 定义公共菜单选项
  const menuOptions = [
    { label: "Home", path: "/home" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/upcoming" }, 
    { label: "Trending", path: "/trending" },  
    { label: "Popular", path: "/popular" },  
  ];

  // 定义认证后显示的菜单选项
  const authMenuOptions = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Logout", path: "/logout" },
  ];

  // 处理菜单选项的选择
  const handleMenuSelect = (pageURL) => {
    console.log('SiteHeader - Menu selected:', pageURL);
    if (pageURL === "/logout") {
      logoutUser(); // 调用登出函数
      navigate("/login");
    } else {
      navigate(pageURL, { replace: true });
    }
    setAnchorEl(null); 
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" component={Link} to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
                {auth.isAuthenticated ? (
                  authMenuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))
                ) : (
                  <>
                    <MenuItem onClick={() => handleMenuSelect("/login")}>
                      Login
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuSelect("/register")}>
                      Register
                    </MenuItem>
                  </>
                )}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  component={Link}
                  to={opt.path}
                >
                  {opt.label}
                </Button>
              ))}
              {auth.isAuthenticated ? (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/dashboard"
                  >
                    Dashboard
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleMenuSelect("/logout")}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/register"
                  >
                    Register
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;