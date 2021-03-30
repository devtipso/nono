import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("web_profilsdroitscontact", { schema: "auclairm_espaceclient_demo" })
export class WebProfilsdroitscontact {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_wprofildroits" })
  refWprofildroits: number;

  @Column("int", { name: "numdroit_wprofildroits", nullable: true })
  numdroitWprofildroits: number | null;

  @Column("varchar", {
    name: "description_wprofildroits",
    nullable: true,
    length: 100,
  })
  descriptionWprofildroits: string | null;

  @Column("varchar", {
    name: "myauclair_wprofildroits",
    nullable: true,
    length: 1,
  })
  myauclairWprofildroits: string | null;

  @Column("varchar", {
    name: "portabilite_wprofildroits",
    nullable: true,
    length: 1,
  })
  portabiliteWprofildroits: string | null;
}
