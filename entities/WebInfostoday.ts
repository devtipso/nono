import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("web_infostoday", { schema: "auclairm_espaceclient_demo" })
export class WebInfostoday {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_wtoday" })
  refWtoday: number;

  @Column("int", { name: "refinfotoday_wtoday", nullable: true })
  refinfotodayWtoday: number | null;

  @Column("varchar", { name: "ifal_wtoday", nullable: true, length: 10 })
  ifalWtoday: string | null;

  @Column("varchar", { name: "acteurs_wtoday", nullable: true, length: 500 })
  acteursWtoday: string | null;

  @Column("varchar", { name: "profils_wtoday", nullable: true, length: 100 })
  profilsWtoday: string | null;

  @Column("int", { name: "ordre_wtoday", nullable: true })
  ordreWtoday: number | null;

  @Column("varchar", { name: "titre_wtoday", nullable: true, length: 200 })
  titreWtoday: string | null;

  @Column("varchar", { name: "csstitre_wtoday", nullable: true, length: 300 })
  csstitreWtoday: string | null;

  @Column("varchar", { name: "picto_wtoday", nullable: true, length: 300 })
  pictoWtoday: string | null;

  @Column("varchar", { name: "detail_wtoday", nullable: true, length: 500 })
  detailWtoday: string | null;

  @Column("date", { name: "dpublication_wtoday", nullable: true })
  dpublicationWtoday: string | null;

  @Column("date", { name: "dexpiration_wtoday", nullable: true })
  dexpirationWtoday: string | null;

  @Column("varchar", { name: "etat_wtoday", nullable: true, length: 20 })
  etatWtoday: string | null;

  @Column("varchar", { name: "flag_wtoday", nullable: true, length: 1 })
  flagWtoday: string | null;
}
