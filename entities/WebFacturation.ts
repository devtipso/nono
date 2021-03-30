import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("web_facturation", { schema: "auclairm_espaceclient_demo" })
export class WebFacturation {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_wfact" })
  refWfact: number;

  @Column("int", { name: "refacteur_wfact", nullable: true })
  refacteurWfact: number | null;

  @Column("int", { name: "reffact_wfact", nullable: true })
  reffactWfact: number | null;

  @Column("int", { name: "annee_wfact", nullable: true })
  anneeWfact: number | null;

  @Column("date", { name: "date_wfact", nullable: true })
  dateWfact: string | null;

  @Column("varchar", { name: "typefact_wfact", nullable: true, length: 100 })
  typefactWfact: string | null;

  @Column("varchar", { name: "code_wfact", nullable: true, length: 20 })
  codeWfact: string | null;

  @Column("int", { name: "refcontrat_wfact", nullable: true })
  refcontratWfact: number | null;

  @Column("varchar", { name: "ligneun_wfact", nullable: true, length: 200 })
  ligneunWfact: string | null;

  @Column("double", { name: "ttc_wfact", nullable: true, precision: 22 })
  ttcWfact: number | null;

  @Column("date", { name: "decheance_wfact", nullable: true })
  decheanceWfact: string | null;

  @Column("int", { name: "alert_decheance_wfact", default: () => "'10'" })
  alertDecheanceWfact: number;

  @Column("varchar", { name: "listebl_wfact", nullable: true, length: 500 })
  listeblWfact: string | null;

  @Column("varchar", { name: "etat_wfact", nullable: true, length: 10 })
  etatWfact: string | null;

  @Column("varchar", {
    name: "detailencaisse_wfact",
    nullable: true,
    length: 500,
  })
  detailencaisseWfact: string | null;

  @Column("varchar", { name: "flag_wfact", nullable: true, length: 5 })
  flagWfact: string | null;
}
