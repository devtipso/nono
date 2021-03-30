import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("web_progress_colors", { schema: "auclairm_espaceclient_demo" })
export class WebProgressColors {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_acteur" })
  idActeur: number;

  @Column("varchar", { name: "controlleur", length: 20 })
  controlleur: string;

  @Column("int", { name: "to_percent", default: () => "'50'" })
  toPercent: number;

  @Column("varchar", {
    name: "color_hex",
    length: 20,
    default: () => "'w3-green'",
  })
  colorHex: string;
}
