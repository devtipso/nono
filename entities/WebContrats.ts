import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("web_contrats", { schema: "auclairm_espaceclient_demo" })
export class WebContrats {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_wcontrat" })
  refWcontrat: number;

  @Column("int", { name: "refcontrat_wcontrat" })
  refcontratWcontrat: number;

  @Column("int", { name: "refacteur_wcontrat", nullable: true })
  refacteurWcontrat: number | null;

  @Column("varchar", { name: "entretien_wcontrat", nullable: true, length: 10 })
  entretienWcontrat: string | null;

  @Column("varchar", { name: "location_wcontrat", nullable: true, length: 10 })
  locationWcontrat: string | null;

  @Column("varchar", { name: "code_wcontrat", nullable: true, length: 50 })
  codeWcontrat: string | null;

  @Column("date", { name: "date_wcontrat", nullable: true })
  dateWcontrat: string | null;

  @Column("date", { name: "datemiseenplace_wcontrat", nullable: true })
  datemiseenplaceWcontrat: string | null;

  @Column("date", { name: "du_wcontrat", nullable: true })
  duWcontrat: string | null;

  @Column("date", { name: "au_wcontrat", nullable: true })
  auWcontrat: string | null;

  @Column("varchar", {
    name: "minicontratpar_wcontrat",
    nullable: true,
    length: 5,
    default: () => "'M'",
  })
  minicontratparWcontrat: string | null;

  @Column("double", {
    name: "htminicontrat_wcontrat",
    nullable: true,
    precision: 22,
  })
  htminicontratWcontrat: number | null;

  @Column("text", { name: "note_wcontrat", nullable: true })
  noteWcontrat: string | null;

  @Column("varchar", { name: "etat_wcontrat", nullable: true, length: 5 })
  etatWcontrat: string | null;

  @Column("varchar", { name: "flag_wcontrat", length: 5 })
  flagWcontrat: string;

  @Column("int", { name: "dureecontratmois_wcontrat" })
  dureecontratmoisWcontrat: number;
}
