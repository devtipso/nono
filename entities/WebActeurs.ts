import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("web_acteurs", { schema: "auclairm_espaceclient_demo" })
export class WebActeurs {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_wacteur" })
  refWacteur: number;

  @Column("int", { name: "refacteur_wacteur", nullable: true })
  refacteurWacteur: number | null;

  @Column("varchar", { name: "code_wacteur", nullable: true, length: 50 })
  codeWacteur: string | null;

  @Column("varchar", { name: "societe_wacteur", nullable: true, length: 100 })
  societeWacteur: string | null;

  @Column("varchar", { name: "adresse1_wacteur", nullable: true, length: 200 })
  adresse1Wacteur: string | null;

  @Column("varchar", { name: "adresse2_wacteur", nullable: true, length: 200 })
  adresse2Wacteur: string | null;

  @Column("varchar", { name: "localite_wacteur", nullable: true, length: 100 })
  localiteWacteur: string | null;

  @Column("varchar", { name: "cp_wacteur", nullable: true, length: 10 })
  cpWacteur: string | null;

  @Column("int", { name: "refpays_wacteur", nullable: true })
  refpaysWacteur: number | null;

  @Column("varchar", { name: "tel_wacteur", nullable: true, length: 20 })
  telWacteur: string | null;

  @Column("varchar", {
    name: "emailsociete_wacteur",
    nullable: true,
    length: 200,
  })
  emailsocieteWacteur: string | null;

  @Column("varchar", { name: "siteweb_wacteur", nullable: true, length: 200 })
  sitewebWacteur: string | null;

  @Column("varchar", { name: "plafond_wacteur", nullable: true, length: 50 })
  plafondWacteur: string | null;

  @Column("varchar", {
    name: "statutjuridique_wacteur",
    nullable: true,
    length: 50,
  })
  statutjuridiqueWacteur: string | null;

  @Column("varchar", { name: "patente_wacteur", nullable: true, length: 11 })
  patenteWacteur: string | null;

  @Column("varchar", { name: "if_wacteur", nullable: true, length: 50 })
  ifWacteur: string | null;

  @Column("varchar", { name: "rc_wacteur", nullable: true, length: 50 })
  rcWacteur: string | null;

  @Column("varchar", { name: "ice_wacteur", nullable: true, length: 50 })
  iceWacteur: string | null;

  @Column("varchar", { name: "flag_wacteur", nullable: true, length: 1 })
  flagWacteur: string | null;
}
