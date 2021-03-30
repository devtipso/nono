import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("web_receptions", { schema: "auclairm_espaceclient_demo" })
export class WebReceptions {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_wreception" })
  refWreception: number;

  @Column("int", { name: "refbrc_wreception", nullable: true })
  refbrcWreception: number | null;

  @Column("varchar", { name: "codebrc_wreception", nullable: true, length: 50 })
  codebrcWreception: string | null;

  @Column("varchar", { name: "site_wreception", nullable: true, length: 100 })
  siteWreception: string | null;

  @Column("int", { name: "totpieces_wreception", nullable: true })
  totpiecesWreception: number | null;

  @Column("varchar", { name: "etatbrc_wreception", nullable: true, length: 10 })
  etatbrcWreception: string | null;

  @Column("varchar", { name: "flag_wreception", nullable: true, length: 5 })
  flagWreception: string | null;

  @Column("int", { name: "refacteur_wreception", nullable: true })
  refacteurWreception: number | null;

  @Column("date", { name: "dbrc_wreception", nullable: true })
  dbrcWreception: string | null;

  @Column("int", { name: "refsite_wreception", nullable: true })
  refsiteWreception: number | null;
}
