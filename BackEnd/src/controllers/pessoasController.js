import { PrismaClient } from "@prisma/client";
import prisma from "../PrismaClient.js";

const prisma = new PrismaClient();

const isEmail = (email) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const onlyDigits = (v) => String(v || "").replace(/\D/g, "");

async function create(req, res) {
  try {
    const { nome, email, telefone, descricao } = req.body;

    if (!nome || typeof nome !== "string" || nome.trim().length < 3) {
      return res.status(400).json({ error: "Nome obrigatório (mín. 3 caracteres)." });
    }

    if (!email || !isEmail(email)) {
      return res.status(400).json({ error: "Email inválido." });
    }

    const tel = onlyDigits(telefone);
    if (!tel || tel.length < 10) {
      return res.status(400).json({ error: "Telefone inválido." });
    }

    const existe = await prisma.pessoas.findUnique({ where: { email } });
    if (existe) return res.status(409).json({ error: "Email já cadastrado." });

    const pessoa = await prisma.pessoas.create({
      data: {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        telefone: tel,
        descricao: descricao?.trim() || null,
      },
    });

    return res.status(201).json(pessoa);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao criar pessoa.", detail: err.message });
  }
}

async function list(req, res) {
  try {
    const pessoas = await prisma.pessoas.findMany({
      orderBy: { criado_em: "desc" },
    });
    return res.status(200).json(pessoas);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao listar pessoas.", detail: err.message });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID inválido." });

    const pessoa = await prisma.pessoas.findUnique({ where: { id } });
    if (!pessoa) return res.status(404).json({ error: "Pessoa não encontrada." });

    return res.status(200).json(pessoa);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar pessoa.", detail: err.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID inválido." });

    const { nome, email, telefone, descricao } = req.body;

    const existe = await prisma.pessoas.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ error: "Pessoa não encontrada." });

    const pessoaAtualizada = await prisma.pessoas.update({
      where: { id },
      data: {
        nome: nome?.trim(),
        email: email?.trim().toLowerCase(),
        telefone: telefone ? onlyDigits(telefone) : undefined,
        descricao: descricao?.trim(),
      },
    });

    return res.status(200).json(pessoaAtualizada);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao atualizar pessoa.", detail: err.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID inválido." });

    await prisma.pessoas.delete({ where: { id } });

    return res.status(200).json({ message: "Pessoa removida com sucesso." });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao remover pessoa.", detail: err.message });
  }
}

export default {
  create,
  list,
  getById,
  update,
  remove,
};

