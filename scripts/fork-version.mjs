#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));

function git(args) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    // O changelog da base já ultrapassa o limite padrão de 1 MB do Node.
    maxBuffer: 16 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function requireAncestor(ancestor, descendant) {
  const result = spawnSync("git", ["merge-base", "--is-ancestor", ancestor, descendant], {
    cwd: root,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    throw new Error(`Referência ausente ou fora da história deste checkout: ${ancestor}`);
  }
}

try {
  if (process.argv.slice(2).some((arg) => arg !== "--json")) {
    throw new Error("Uso: node scripts/fork-version.mjs [--json]");
  }
  const document = readFileSync(new URL("../version.md", import.meta.url), "utf8");
  const block = document.match(/```json\s*\r?\n([\s\S]*?)\r?\n```/u);
  if (!block) throw new Error("version.md precisa conter o bloco JSON de identificação.");
  const metadata = JSON.parse(block[1]);
  for (const field of ["forkVersion", "upstreamVersion"]) {
    if (typeof metadata?.[field] !== "string" || !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/u.test(metadata[field])) {
      throw new Error(`Versão inválida em version.md: ${field}`);
    }
  }
  for (const field of ["upstreamCommit", "upstreamReleaseCommit"]) {
    if (!/^[a-f0-9]{40}$/u.test(metadata[field] ?? "")) {
      throw new Error(`Commit inválido em version.md: ${field}`);
    }
  }
  if (!/^[a-z0-9-]+\/[a-z0-9_.-]+$/iu.test(metadata.forkRepository ?? "")) {
    throw new Error("Repositório do fork inválido em version.md.");
  }
  const checkoutCommit = git(["rev-parse", "HEAD"]);
  requireAncestor(metadata.upstreamReleaseCommit, metadata.upstreamCommit);
  requireAncestor(metadata.upstreamCommit, checkoutCommit);
  const changelog = git(["show", `${metadata.upstreamCommit}:CHANGELOG.md`]);
  if (changelog.match(/^## \[(\d+\.\d+\.\d+)\]/mu)?.[1] !== metadata.upstreamVersion) {
    throw new Error("A versão do upstream não corresponde ao changelog da base registrada.");
  }
  const commitsAfterRelease = Number(git([
    "rev-list", "--count", `${metadata.upstreamReleaseCommit}..${metadata.upstreamCommit}`,
  ]));
  const owner = metadata.forkRepository.split("/")[0];
  const identifier = `${metadata.upstreamVersion}+${owner}.${metadata.forkVersion}.upstream.${metadata.upstreamCommit.slice(0, 9)}`;
  const dirty = git(["status", "--porcelain=v1"]).length > 0;
  const result = { ...metadata, commitsAfterRelease, identifier, checkoutCommit, dirty };
  if (process.argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } else {
    process.stdout.write([
      `Deskcomm (release de referência): ${metadata.upstreamVersion}`,
      `Base upstream: ${metadata.upstreamCommit} (+${commitsAfterRelease} commits após a release)`,
      `Modificações do fork: ${metadata.forkVersion}`,
      `Identificador: ${identifier}`,
      `Commit do checkout: ${checkoutCommit}`,
      `Alterações locais: ${dirty ? "sim; não integram a versão publicada" : "nenhuma"}`,
      "",
    ].join("\n"));
  }
} catch (error) {
  process.stderr.write(`Não foi possível identificar a versão: ${error.message}\n`);
  process.exitCode = 1;
}
