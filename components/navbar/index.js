/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import * as React from "react";
import { useRouter } from "next/router";

import {
  Stack,
  Button,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  MenuIcon,
  styled,
} from "@mui/material";

import Link from "next/link";
import { css } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey, teal } from "@mui/material/colors";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const theme = createTheme({
  palette: {
    primary: {
      dark: blueGrey[900],
      main: blueGrey[500],
      light: blueGrey[300],
    },
  },
});

export default function Navbar() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar position="fixed" color="inherit">
          <Box
            sx={css`
              max-width: 1200px;
              width: 100%;
              margin: 0 auto;
            `}
          >
            <Toolbar
              sx={css`
                display: flex;
                justify-content: space-between;
              `}
            >
              <Box>
                <Link href="/" passHref>
                  <Button>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ color: "primary" }}
                    >
                      {`< />`}
                    </Typography>
                  </Button>
                </Link>
              </Box>
              <Stack spacing={2} direction="row">
                <Link href="/" passHref>
                  <Button
                    color="primary"
                    sx={{
                      color:
                        /^\/posts/.test(pathname) || pathname === "/"
                          ? "primary.dark"
                          : "primary.light",
                    }}
                  >
                    Blog
                  </Button>
                </Link>

                <Link href="/projects" passHref>
                  <Button
                    color="primary"
                    sx={{
                      color:
                        pathname === "/projects"
                          ? "primary.dark"
                          : "primary.light",
                    }}
                  >
                    Projects
                  </Button>
                </Link>
              </Stack>
            </Toolbar>
          </Box>
        </AppBar>
        <Offset />
      </Box>
    </ThemeProvider>
  );
}
