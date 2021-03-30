import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("web_acteurs_sites_departements", {
  schema: "auclairm_espaceclient_demo",
})
export class WebActeursSitesDepartements {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_wdepsite" })
  refWdepsite: number;

  @Column("int", { name: "refacteur_wdepsite", nullable: true })
  refacteurWdepsite: number | null;

  @Column("int", { name: "refsite_wdepsite", nullable: true })
  refsiteWdepsite: number | null;

  @Column("int", { name: "ordre_wdepsite", nullable: true })
  ordreWdepsite: number | null;

  @Column("varchar", { name: "intitule_wdepsite", nullable: true, length: 100 })
  intituleWdepsite: string | null;

  @Column("varchar", { name: "abrev_wdepsite", nullable: true, length: 8 })
  abrevWdepsite: string | null;

  @Column("varchar", { name: "flag_wdepsite", nullable: true, length: 3 })
  flagWdepsite: string | null;
}
