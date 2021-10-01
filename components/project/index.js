import Image from "next/image";
import trelloImg from "../../public/images/trello-clone.png";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Stack } from "@mui/material";

export default function MultiActionAreaCard() {
  return (
    <Stack alignItems="center">
      <Card sx={{ maxWidth: 960 }}>
        <CardActionArea>
          <Image src={trelloImg}></Image>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
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
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="large"
            color="primary"
            href="https://github.com/cyhfe/trello-clone.git"
            target="_blank"
          >
            GITHUB
          </Button>
          <Button size="large" color="secondary">
            在线DEMO
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
}
