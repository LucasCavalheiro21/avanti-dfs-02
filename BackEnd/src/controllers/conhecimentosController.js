import prisma from "../PrismaClient.js";

// criando conhecimentos

async function create(req, res) {
  try {
    const { titulo, descricao, categoria, nivel, pessoa_id } = req.body;

    if (!titulo || typeof titulo !== "string" || titulo.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Título obrigatório (mín. 3 caracteres)." });
    }

    if (!pessoa_id) {
      return res
        .status(400)
        .json({ error: "O ID da pessoa (pessoa_id) é obrigatório." });
    }

    const conhecimento = await prisma.conhecimentos.create({
      data: {
        titulo: titulo.trim(),
        descricao: descricao?.trim() || null,
        categoria: categoria?.trim() || null,
        nivel: nivel?.trim() || null,
        pessoa_id,
      },
    });

    return res.status(201).json(conhecimento);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao criar conhecimento.", detail: err.message });
  }
}

// buscando todos os conhecimentos

async function list(req, res) {
  try {
    const conhecimentos = await prisma.conhecimentos.findMany({
      include: { pessoa: true },
      orderBy: { id: "desc" }, 
    });
    return res.status(200).json(conhecimentos);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao listar conhecimentos.", detail: err.message });
  }
}

// buscando conhecimentos por ID

async function getById(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID inválido." });

    const conhecimento = await prisma.conhecimentos.findUnique({
      where: { id },
      include: { pessoa: true },
    });

    if (!conhecimento) {
      return res.status(404).json({ error: "Conhecimento não encontrado." });
    }

    return res.status(200).json(conhecimento);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar conhecimento.", detail: err.message });
  }
}

// editar conhecimentos

async function update(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID inválido." });

    const { titulo, descricao, categoria, nivel, pessoa_id } = req.body;

    const existe = await prisma.conhecimentos.findUnique({ where: { id } });
    if (!existe) {
      return res.status(404).json({ error: "Conhecimento não encontrado." });
    }

    const conhecimentoAtualizado = await prisma.conhecimentos.update({
      where: { id },
      data: {
        titulo: titulo?.trim(),
        descricao: descricao?.trim(),
        categoria: categoria?.trim(),
        nivel: nivel?.trim(),
        pessoa_id,
      },
    });

    return res.status(200).json(conhecimentoAtualizado);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao atualizar conhecimento.", detail: err.message });
  }
}

// excluir conhecimentos

async function remove(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID inválido." });

    const existe = await prisma.conhecimentos.findUnique({ where: { id } });
    if (!existe) {
      return res.status(404).json({ error: "Conhecimento não encontrado." });
    }

    await prisma.conhecimentos.delete({ where: { id } });

    return res.status(200).json({ message: "Conhecimento removido com sucesso." });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao remover conhecimento.", detail: err.message });
  }
}

export default {
  create,
  list,
  getById,
  update,
  remove,
};