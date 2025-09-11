import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import yaml from "yamljs";
import path from "path";
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mini Learning Platform API",
      version: "1.0.0",
      description: "API documentation for Mini Learning Platform",
    },
    servers: [
      {
        url: "http://localhost:3000/api", 
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Swagger יחפש תיעוד ב־routes
};

const swaggerSpec = swaggerJsdoc(options);





export const setupSwagger = (app: Express) => {
  try {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('✅ Swagger docs available at /api-docs');
  } catch (error) {
    console.log('⚠️ Swagger setup failed:', error);
  }
};
