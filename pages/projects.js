import Button from "@mui/material/Button";
import Layout from "../components/layout";
import { Container } from "../components/styles";
import Project from "../components/project";
import { css } from "@mui/styled-engine";
import { blueGrey } from "@mui/material/colors";

export default function Demo() {
  return (
    <Layout>
      <Container maxWidth="1200px">
        <Project />
      </Container>
    </Layout>
  );
}
