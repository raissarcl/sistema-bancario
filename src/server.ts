import 'reflect-metadata';
import "./shared/container";
import "express-async-errors";

import { app } from "./app";

app.listen(3000, () => console.log("Server's running on: http://localhost:3000"));