import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("web_passages", { schema: "auclairm_espaceclient_demo" })
export class WebPassages {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_passage" })
  refPassage: number;

  @Column("int", { name: "refacteur_passage", nullable: true })
  refacteurPassage: number | null;

  @Column("int", { name: "refsite_passage", nullable: true })
  refsitePassage: number | null;

  @Column("varchar", { name: "site_passage", nullable: true, length: 20 })
  sitePassage: string | null;

  @Column("varchar", { name: "datetime_passage", nullable: true, length: 20 })
  datetimePassage: string | null;

  @Column("varchar", { name: "heure_passage", nullable: true, length: 20 })
  heurePassage: string | null;

  @Column("varchar", {
    name: "livraison_blanch_passage",
    nullable: true,
    length: 30,
  })
  livraisonBlanchPassage: string | null;

  @Column("varchar", {
    name: "livraison_horsblanch_passage",
    nullable: true,
    length: 30,
  })
  livraisonHorsblanchPassage: string | null;

  @Column("varchar", {
    name: "prochainpassage_passage",
    nullable: true,
    length: 30,
  })
  prochainpassagePassage: string | null;

  @Column("varchar", { name: "link_passage", nullable: true, length: 200 })
  linkPassage: string | null;

  @Column("varchar", { name: "visu_passage", nullable: true, length: 255 })
  visuPassage: string | null;

  @Column("varchar", { name: "flag_passage", nullable: true, length: 5 })
  flagPassage: string | null;
}
