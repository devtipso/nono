import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("param_liste_metiers", { schema: "auclairm_espaceclient_demo" })
export class ParamListeMetiers {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_metier" })
  refMetier: number;

  @Column("varchar", { name: "intitule_metier", nullable: true, length: 50 })
  intituleMetier: string | null;
}
