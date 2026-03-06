import prisma from "../PrismaClient.js";

const isEmail = (email) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const onlyDigits = (v) => String(v || "").replace(/\D/g, "");

async function create(req, res) {
  try {
    const { nome, email, cpf, senha, telefone, buscando, descricao, fotoUrl } =
      req.body;

    if (!nome || typeof nome !== "string" || nome.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Nome obrigatório (mín. 3 caracteres)." });
    }
    if (!email || !isEmail(email)) {
      return res.status(400).json({ error: "Email inválido." });
    }
    if (!cpf || !senha || !buscando) {
      return res
        .status(400)
        .json({ error: "CPF, senha e perfil são obrigatórios." });
    }

    const tel = onlyDigits(telefone);
    if (!tel || tel.length < 10) {
      return res.status(400).json({ error: "Telefone inválido." });
    }

    const existeEmail = await prisma.pessoas.findUnique({ where: { email } });
    if (existeEmail)
      return res.status(409).json({ error: "Email já cadastrado." });

    const existeCpf = await prisma.pessoas.findUnique({ where: { cpf } });
    if (existeCpf) return res.status(409).json({ error: "CPF já cadastrado." });

    const pessoa = await prisma.pessoas.create({
      data: {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        cpf: cpf.trim(),
        senha: senha,
        telefone: tel,
        buscando: buscando.trim(),
        descricao: descricao?.trim() || null,
        fotoUrl: fotoUrl?.trim() || null,
      },
    });

    return res.status(201).json(pessoa);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao criar pessoa.", detail: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha obrigatórios." });
    }

    const pessoa = await prisma.pessoas.findUnique({ where: { email } });
    if (!pessoa || pessoa.senha !== senha) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    return res.status(200).json({
      message: "Login realizado com sucesso",
      id: pessoa.id,
      nome: pessoa.nome,
      fotoUrl: pessoa.fotoUrl,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro no login.", detail: err.message });
  }
}

async function list(req, res) {
  try {
    const { nome, descricao } = req.query;
    const pessoas = await prisma.pessoas.findMany({
      where: {
        ...(nome && { nome: { contains: nome, mode: "insensitive" } }),
        ...(descricao && {
          descricao: { contains: descricao, mode: "insensitive" },
        }),
      },
      include: { conhecimentos: true },
      orderBy: { criado_em: "asc" },
    });
    return res.status(200).json(pessoas);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao listar pessoas.", detail: err.message });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID inválido." });

    const pessoa = await prisma.pessoas.findUnique({ where: { id } });
    if (!pessoa)
      return res.status(404).json({ error: "Pessoa não encontrada." });

    return res.status(200).json(pessoa);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar pessoa.", detail: err.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID inválido." });

    const { nome, email, telefone, descricao, cpf, senha, buscando, fotoUrl } =
      req.body;

    const existe = await prisma.pessoas.findUnique({ where: { id } });
    if (!existe)
      return res.status(404).json({ error: "Pessoa não encontrada." });

    const pessoaAtualizada = await prisma.pessoas.update({
      where: { id },
      data: {
        nome: nome?.trim(),
        email: email?.trim().toLowerCase(),
        cpf: cpf?.trim(),
        senha: senha,
        telefone: telefone ? onlyDigits(telefone) : undefined,
        buscando: buscando?.trim(),
        descricao: descricao?.trim(),
        fotoUrl: fotoUrl?.trim(),
      },
    });
    return res.status(200).json(pessoaAtualizada);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao atualizar pessoa.", detail: err.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID inválido." });

    await prisma.pessoas.delete({ where: { id } });
    return res.status(200).json({ message: "Pessoa removida com sucesso." });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao remover pessoa.", detail: err.message });
  }
}

export default {
  create,
  login,
  list,
  getById,
  update,
  remove,
};
