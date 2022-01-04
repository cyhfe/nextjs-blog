import Image from 'next/image';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Stack } from '@mui/material';

export default function MultiActionAreaCard({
  title,
  description = [],
  cover,
  github,
  demo,
}) {
  return (
    <Stack alignItems="center" mt={6}>
      <Card sx={{ maxWidth: 960 }}>
        <CardActionArea>
          <Image src={cover}></Image>
          <CardContent>
            {
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
            }
            {description.map((t, index) => (
              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom
                key={index}
              >
                {t}
              </Typography>
            ))}
            {/* <Typography gutterBottom variant="h5" component="div">
              Trello Clone
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              React + Typescript + React DnD实现仿trello的可拖拽看板应用。
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              express + fs模块文件存储实现持久化并提供RESTFUL API
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              context + useReducer进行状态管理。
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              自定义拖拽图层
            </Typography> */}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="large" color="primary" href={github} target="_blank">
            GITHUB
          </Button>
          <Button size="large" color="secondary" href={demo} target="_blank">
            在线演示
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
}
