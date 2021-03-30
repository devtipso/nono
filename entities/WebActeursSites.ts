import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("web_acteurs_sites", { schema: "auclairm_espaceclient_demo" })
export class WebActeursSites {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_wsiteacteur" })
  refWsiteacteur: number;

  @Column("int", { name: "refacteur_wsiteacteur", nullable: true })
  refacteurWsiteacteur: number | null;

  @Column("varchar", { name: "code_wsiteacteur", nullable: true, length: 50 })
  codeWsiteacteur: string | null;

  @Column("varchar", {
    name: "intitule_wsiteacteur",
    nullable: true,
    length: 100,
  })
  intituleWsiteacteur: string | null;

  @Column("varchar", {
    name: "adresse_wsiteacteur",
    nullable: true,
    length: 255,
  })
  adresseWsiteacteur: string | null;

  @Column("varchar", {
    name: "localite_wsiteacteur",
    nullable: true,
    length: 50,
  })
  localiteWsiteacteur: string | null;

  @Column("varchar", { name: "tel_wsiteacteur", nullable: true, length: 50 })
  telWsiteacteur: string | null;

  @Column("varchar", { name: "deporte_wsiteacteur", nullable: true, length: 5 })
  deporteWsiteacteur: string | null;

  @Column("double", {
    name: "coutrajetaller_wsiteacteur",
    nullable: true,
    precision: 22,
  })
  coutrajetallerWsiteacteur: number | null;

  @Column("varchar", {
    name: "livraison_wsiteacteur",
    nullable: true,
    length: 1,
  })
  livraisonWsiteacteur: string | null;

  @Column("varchar", { name: "flag_wsiteacteur", nullable: true, length: 5 })
  flagWsiteacteur: string | null;
}
