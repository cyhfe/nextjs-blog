import Button from "@mui/material/Button";
import Layout from "../components/layout";
import { Container } from "../components/styles";

export default function Demo() {
  return (
    <Layout>
      <Container>
        <Button variant="contained">Hello World</Button>
      </Container>
    </Layout>
  );
}
