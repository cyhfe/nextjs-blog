import Button from '@mui/material/Button';
import Layout from '../components/layout';
import { Container } from '../components/styles';
import Project from '../components/project';
import { css } from '@mui/styled-engine';
import { blueGrey } from '@mui/material/colors';
import { projects } from './api/projects';

export default function Demo() {
  return (
    <Layout>
      <Container maxWidth="1200px">
        {projects.map(({ title, description, cover, github, demo, id }) => {
          return (
            <Project
              title={title}
              description={description}
              cover={cover}
              github={github}
              demo={demo}
              key={id}
            />
          );
        })}
      </Container>
    </Layout>
  );
}
