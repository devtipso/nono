import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("web_livraisons_detail", { schema: "auclairm_espaceclient_demo" })
export class WebLivraisonsDetail {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_wdlivraison" })
  refWdlivraison: number;

  @Column("int", { name: "refbl_wdlivraison", nullable: true })
  refblWdlivraison: number | null;

  @Column("date", { name: "dbl_wdlivraison", nullable: true })
  dblWdlivraison: string | null;

  @Column("varchar", {
    name: "designationarticle_wdlivraison",
    nullable: true,
    length: 150,
  })
  designationarticleWdlivraison: string | null;

  @Column("int", { name: "qte_wdlivraison", nullable: true })
  qteWdlivraison: number | null;

  @Column("varchar", { name: "flag_wdlivraison", nullable: true, length: 5 })
  flagWdlivraison: string | null;
}
