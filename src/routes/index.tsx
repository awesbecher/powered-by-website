
import { mainRoutes } from "./mainRoutes";
import { productRoutes } from "./productRoutes";
import { marketingRoutes } from "./marketingRoutes";
import { demoRoutes } from "./demoRoutes";

// Combine all route groups into a single array
export const routes = [
  ...mainRoutes,
  ...productRoutes,
  ...marketingRoutes,
  ...demoRoutes,
];
