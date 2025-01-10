import { FastifyInstance } from "fastify";
import prisma from "../utils/prisma";
import { z } from "zod";

const UnidadeEnum = z.enum(["Kilo", "Litro", "Caixa"]);

const produtoSchema = z.object({
  descricao: z.string(),
  unidade: UnidadeEnum,
  preco: z.number().positive(),
});

const identificadorDoProdutoSchema = z.object({ id: z.string().uuid() });

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

  fastify.get("/:id", async (request, reply) => {
    try {
      console.log("Entrou aqui");
      const idDoProduto = identificadorDoProdutoSchema.parse(request.params);
      console.log(idDoProduto);
      const produto = await prisma.produtos.findFirst({
        where: { id: idDoProduto.id },
      });
      reply.code(200).send(produto);
    } catch (erro) {
      reply
        .code(400)
        .send({ mensagem: "Falha ao obter informações do produto", erro });
    }
  });

  fastify.put("/:id", async (request, reply) => {
    try {
      const idDoProduto = identificadorDoProdutoSchema.parse(request.params);
      const produtoAtualizado = produtoSchema.parse(request.body);

      await prisma.produtos.update({
        where: { id: idDoProduto.id },
        data: produtoAtualizado,
      });
      reply.code(203);
    } catch (erro) {
      reply.code(400).send(erro);
    }
  });
}
