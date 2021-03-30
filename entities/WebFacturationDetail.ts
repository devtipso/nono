import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("web_facturation_detail", { schema: "auclairm_espaceclient_demo" })
export class WebFacturationDetail {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_wdfactbl" })
  refWdfactbl: number;

  @Column("int", { name: "reffact_wdfactbl", nullable: true })
  reffactWdfactbl: number | null;

  @Column("int", { name: "refbl_wdfactbl", nullable: true })
  refblWdfactbl: number | null;

  @Column("varchar", { name: "codebl_wdfactbl", nullable: true, length: 20 })
  codeblWdfactbl: string | null;

  @Column("date", { name: "datebl_wdfactbl", nullable: true })
  dateblWdfactbl: string | null;

  @Column("varchar", { name: "typebl_wdfactbl", nullable: true, length: 100 })
  typeblWdfactbl: string | null;

  @Column("varchar", { name: "flag_wdfactbl", nullable: true, length: 5 })
  flagWdfactbl: string | null;
}
