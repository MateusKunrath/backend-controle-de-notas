import { FastifyInstance } from "fastify";
import prisma from "../utils/prisma";
import { z } from "zod";

const UnidadeEnum = z.enum(["Kilo", "Litro", "Caixa"]);

const produtoSchema = z.object({
  descricao: z.string(),
  unidade: UnidadeEnum,
  preco: z.number().positive(),
});

export async function rotasDeProdutos(fastify: FastifyInstance) {
  fastify.get("/", async (_, reply) => {
    const produtos = await prisma.produtos.findMany();
    reply.status(200).send(produtos);
  });

  fastify.post("/", async (request, reply) => {
    try {
      const novoProduto = produtoSchema.parse(request.body);
      const produto = await prisma.produtos.create({ data: novoProduto });
      reply.code(201).send(produto);
    } catch (erro) {
      reply.code(400).send({ mensagem: "Erro ao adicionar produto", erro });
    }
  });
}
