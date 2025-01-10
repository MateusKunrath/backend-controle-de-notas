import fastifyCors from "@fastify/cors";
import fastifyEnv from "@fastify/env";
import fastifyRoutes from "@fastify/routes";
import Fastify from "fastify";
import { rotasDeProdutos } from "./routes/produtos";

const fastify = Fastify({ logger: true });

const envSchema = {
  type: "object",
  required: ["DATABASE_URL", "PORT"],
  properties: {
    DATABASE_URL: { type: "string" },
    PORT: { type: "number", default: 3000 },
  },
};

fastify.register(fastifyEnv, {
  schema: envSchema,
  dotenv: true,
});

fastify.register(fastifyCors);
fastify.register(fastifyRoutes);

fastify.register(rotasDeProdutos, { prefix: "/produtos" });

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await fastify.listen({ port });
    fastify.log.info(`Servidor rodando em http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
