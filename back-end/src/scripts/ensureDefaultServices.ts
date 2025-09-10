/**
 * Script idempotente para asegurar los servicios base.
 */
import "dotenv/config";
import { sequelize } from "../config/db";
import Service from "../models/Services";

type SeedItem = {
  name: string;
  description: string | null;
  base_price: number;
};

const DEFAULT_SERVICES: SeedItem[] = [
  { name: "Pack", description: "Empaque de pertenencias", base_price: 100.0 },
  {
    name: "Wrap",
    description: "Envoltura/protección de ítems",
    base_price: 80.0,
  },
  { name: "Load", description: "Carga al vehículo", base_price: 120.0 },
  { name: "Unload", description: "Descarga en destino", base_price: 120.0 },
  { name: "Unpack", description: "Desempaque en destino", base_price: 100.0 },
  {
    name: "Home Organization",
    description: "Organización y acomodo en el hogar",
    base_price: 150.0,
  },
];

async function ensureService(item: SeedItem) {
  const existing = await Service.findOne({ where: { name: item.name } });
  if (!existing) {
    await Service.create(item);
    console.log(`Creado: ${item.name} (precio base: ${item.base_price})`);
    return "created";
  } else {
    await existing.update({
      description: item.description,
      base_price: item.base_price,
    });
    console.log(
      `Actualizado: ${item.name} (precio base: ${item.base_price})`
    );
    return "updated";
  }
}

async function main() {
  console.log("Conectando a la BD...");
  await sequelize.authenticate();

  let created = 0;
  let updated = 0;

  for (const item of DEFAULT_SERVICES) {
    const r = await ensureService(item);
    if (r === "created") created++;
    else updated++;
  }

  console.log(`\nListo. Creados: ${created}, Actualizados: ${updated}`);
  await sequelize.close();
}

main().catch(async (err) => {
  console.error("Error en ensureDefaultServices:", err);
  try {
    await sequelize.close();
  } catch {}
  process.exit(1);
});
