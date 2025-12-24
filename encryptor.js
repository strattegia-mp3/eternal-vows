import fs from "fs-extra";
import CryptoJS from "crypto-js";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

// Configuração
const SENHA_SECRETA = "0309";
const INPUT_DIR = "./raw_photos";
const OUTPUT_FILE = "./src/data/encrypted_memories.json";
const METADATA_FILE = "./raw_photos/photo_data.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função auxiliar para converter a data em objeto Date
const parseDateString = (dateStr) => {
  if (!dateStr) return new Date(0); // Se não tiver data, joga pro começo

  // Mapa de meses em português
  const monthMap = {
    janeiro: 0,
    fevereiro: 1,
    março: 2,
    marco: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11,
  };

  try {
    const isoDate = new Date(dateStr);
    if (!isNaN(isoDate)) return isoDate;
    const parts = dateStr
      .toLowerCase()
      .match(/(\d{1,2})\s+de\s+([a-zç]+)\s+de\s+(\d{4})/);

    if (parts) {
      const day = parseInt(parts[1]);
      const monthStr = parts[2];
      const year = parseInt(parts[3]);
      const month = monthMap[monthStr];

      if (month !== undefined) {
        return new Date(year, month, day);
      }
    }
    console.warn(
      `⚠️ Não consegui entender a data: "${dateStr}". Colocando no início.`
    );
    return new Date(0);
  } catch (e) {
    return new Date(0);
  }
};

const encryptImages = async () => {
  try {
    // 1. Carrega Metadados
    let metadata = {};
    if (await fs.pathExists(METADATA_FILE)) {
      metadata = await fs.readJson(METADATA_FILE);
      console.log(`📂 photo_data.json carregado!`);
    }

    // 2. Lê a pasta
    const rawFiles = await fs.readdir(INPUT_DIR);

    // 3. PREPARAÇÃO E ORDENAÇÃO
    console.log("📅 Organizando fotos por data...");

    // Cria uma lista de objetos
    const filesToSort = rawFiles
      .filter((file) => file.match(/\.(jpg|jpeg|png|gif|webp)$/i))
      .map((file) => {
        const meta = metadata[file] || {};
        const dateString = meta.date;
        const dateObj = parseDateString(dateString);

        return {
          filename: file,
          dateObj: dateObj,
          originalDateStr: dateString,
        };
      });

    // ORDENAÇÃO
    filesToSort.sort((a, b) => a.dateObj - b.dateObj);

    console.log(
      `📝 Ordem definida: ${filesToSort[0].filename} até ${
        filesToSort[filesToSort.length - 1].filename
      }\n`
    );
    console.log("🔮 Iniciando processamento e criptografia...\n");

    const encryptedData = [];

    // 4. Processamento na ordem correta
    for (const [index, item] of filesToSort.entries()) {
      const file = item.filename;
      const filePath = path.join(INPUT_DIR, file);

      // Processamento de Imagem (Sharp)
      const bitmap = await sharp(filePath)
        .resize(800)
        .jpeg({ quality: 70 })
        .toBuffer();

      // eslint-disable-next-line no-undef
      const base64 = new Buffer.from(bitmap).toString("base64");
      const ext = path.extname(file).toLowerCase();
      const mimeType = ext === ".png" ? "image/png" : "image/jpeg";
      const imageSrc = `data:${mimeType};base64,${base64}`;

      // Recupera metadados
      const meta = metadata[file];

      if (meta) {
        console.log(
          `✅ [${index + 1}/${filesToSort.length}] Processando: ${file} (${
            meta.date
          })`
        );
      } else {
        console.log(
          `⚠️ [${index + 1}/${filesToSort.length}] Sem meta: ${file}`
        );
      }

      const memoryObj = {
        id: index + 1,
        src: imageSrc,
        title: meta?.title || `Memória #${index + 1}`,
        description:
          meta?.description || "Um momento especial guardado no tempo...",
        date: meta?.date || "2025",
      };

      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(memoryObj),
        SENHA_SECRETA
      ).toString();

      encryptedData.push(encrypted);
    }

    await fs.outputJson(OUTPUT_FILE, encryptedData);
    console.log(
      `\n✨ SUCESSO! ${encryptedData.length} memórias ordenadas e criptografadas.`
    );
  } catch (error) {
    console.error("❌ Erro fatal:", error);
  }
};

encryptImages();
