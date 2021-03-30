import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("param_liste_tailles", { schema: "auclairm_espaceclient_demo" })
export class ParamListeTailles {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_taille" })
  refTaille: number;

  @Column("int", { name: "refgrilletaille_taille", nullable: true })
  refgrilletailleTaille: number | null;

  @Column("int", { name: "ordre_taille", nullable: true })
  ordreTaille: number | null;

  @Column("varchar", { name: "intitule_taille", nullable: true, length: 255 })
  intituleTaille: string | null;

  @Column("varchar", { name: "etat_taille", nullable: true, length: 10 })
  etatTaille: string | null;
}
