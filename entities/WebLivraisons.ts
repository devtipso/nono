import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("web_livraisons", { schema: "auclairm_espaceclient_demo" })
export class WebLivraisons {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_wlivraison" })
  refWlivraison: number;

  @Column("int", { name: "refbl_wlivraison", nullable: true })
  refblWlivraison: number | null;

  @Column("int", { name: "refclient_wlivraison", nullable: true })
  refclientWlivraison: number | null;

  @Column("varchar", { name: "codebl_wlivraison", nullable: true, length: 20 })
  codeblWlivraison: string | null;

  @Column("int", { name: "refsite_wlivraison", nullable: true })
  refsiteWlivraison: number | null;

  @Column("int", { name: "totoarticlediff_wlivraison", nullable: true })
  totoarticlediffWlivraison: number | null;

  @Column("int", { name: "totpieces_wlivraison", nullable: true })
  totpiecesWlivraison: number | null;

  @Column("varchar", {
    name: "notesbl_wlivraison",
    nullable: true,
    length: 500,
  })
  notesblWlivraison: string | null;

  @Column("varchar", { name: "etatbl_wlivraison", nullable: true, length: 10 })
  etatblWlivraison: string | null;

  @Column("varchar", { name: "flag_wlivraison", nullable: true, length: 5 })
  flagWlivraison: string | null;

  @Column("varchar", { name: "site_wlivraison", length: 100 })
  siteWlivraison: string;

  @Column("date", { name: "datebl_wlivraison", nullable: true })
  dateblWlivraison: string | null;
}
