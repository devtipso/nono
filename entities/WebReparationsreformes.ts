import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("web_reparationsreformes", { schema: "auclairm_espaceclient_demo" })
export class WebReparationsreformes {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_webrr" })
  refWebrr: number;

  @Column("int", { name: "refrr_webrr", nullable: true })
  refrrWebrr: number | null;

  @Column("int", { name: "refclient_webrr", nullable: true })
  refclientWebrr: number | null;

  @Column("int", { name: "refcontrat_webrr", nullable: true })
  refcontratWebrr: number | null;

  @Column("int", { name: "num_webrr", nullable: true })
  numWebrr: number | null;

  @Column("varchar", {
    name: "codereparationreforme_webrr",
    nullable: true,
    length: 100,
  })
  codereparationreformeWebrr: string | null;

  @Column("date", { name: "ddemande_webrr", nullable: true })
  ddemandeWebrr: string | null;

  @Column("varchar", {
    name: "originedemande_webrr",
    length: 20,
    default: () => "'MYAUCLAIR'",
  })
  originedemandeWebrr: string;

  @Column("int", { name: "refdemandepar_webrr", nullable: true })
  refdemandeparWebrr: number | null;

  @Column("varchar", { name: "type_webrr", nullable: true, length: 15 })
  typeWebrr: string | null;

  @Column("varchar", { name: "repar_type_webrr", nullable: true, length: 20 })
  reparTypeWebrr: string | null;

  @Column("int", { name: "refserieetiq_webrr", nullable: true })
  refserieetiqWebrr: number | null;

  @Column("varchar", { name: "codebarre_webrr", nullable: true, length: 100 })
  codebarreWebrr: string | null;

  @Column("int", { name: "refporteur_webrr", nullable: true })
  refporteurWebrr: number | null;

  @Column("varchar", { name: "porteur_webrr", nullable: true, length: 100 })
  porteurWebrr: string | null;

  @Column("int", { name: "refarticleprojet_webrr", nullable: true })
  refarticleprojetWebrr: number | null;

  @Column("varchar", {
    name: "photo1_chemin_webrr",
    nullable: true,
    length: 500,
  })
  photo1CheminWebrr: string | null;

  @Column("varchar", {
    name: "photo2_chemin_webrr",
    nullable: true,
    length: 500,
  })
  photo2CheminWebrr: string | null;

  @Column("varchar", { name: "description_webrr", nullable: true, length: 500 })
  descriptionWebrr: string | null;

  @Column("int", { name: "reform_newrefserieetiq_webrr", nullable: true })
  reformNewrefserieetiqWebrr: number | null;

  @Column("date", { name: "dcreation_rr", nullable: true })
  dcreationRr: string | null;

  @Column("varchar", { name: "etat_rr", nullable: true, length: 50 })
  etatRr: string | null;

  @Column("varchar", { name: "flag_webrr", nullable: true, length: 1 })
  flagWebrr: string | null;
}
