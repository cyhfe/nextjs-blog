import styled from "@emotion/styled";
import { maxWidth } from "@mui/system";

export const Container = styled.div(
  {
    padding: "0 1rem",
    margin: "3rem auto 6rem",
  },
  ({ maxWidth }) => ({
    maxWidth: maxWidth ?? "36rem",
  })
);
