import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("web_mouvements", { schema: "auclairm_espaceclient_demo" })
export class WebMouvements {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_wmvt" })
  refWmvt: number;

  @Column("int", { name: "refmvt_wmvt", nullable: true })
  refmvtWmvt: number | null;

  @Column("int", {
    name: "refacteur_wmvt",
    nullable: true,
    default: () => "'1'",
  })
  refacteurWmvt: number | null;

  @Column("int", { name: "refcontrat_wmvt", nullable: true })
  refcontratWmvt: number | null;

  @Column("int", { name: "refsite_wmvt", nullable: true })
  refsiteWmvt: number | null;

  @Column("int", { name: "refdep_wmvt", nullable: true })
  refdepWmvt: number | null;

  @Column("varchar", { name: "gtype_wmvt", nullable: true, length: 5 })
  gtypeWmvt: string | null;

  @Column("varchar", { name: "type_wmvt", nullable: true, length: 8 })
  typeWmvt: string | null;

  @Column("int", {
    name: "refpiece_wmvt",
    nullable: true,
    default: () => "'0'",
  })
  refpieceWmvt: number | null;

  @Column("varchar", {
    name: "intitulepiece_wmvt",
    nullable: true,
    length: 100,
  })
  intitulepieceWmvt: string | null;

  @Column("date", { name: "dpiece_wmvt", nullable: true })
  dpieceWmvt: string | null;

  @Column("varchar", { name: "refporteur_wmvt", nullable: true, length: 100 })
  refporteurWmvt: string | null;

  @Column("int", { name: "refserieetiq_wmvt", nullable: true })
  refserieetiqWmvt: number | null;

  @Column("varchar", { name: "cbarre_wmvt", nullable: true, length: 50 })
  cbarreWmvt: string | null;

  @Column("int", { name: "refarticlep_wmvt", nullable: true })
  refarticlepWmvt: number | null;

  @Column("varchar", {
    name: "designarticlep_wmvt",
    nullable: true,
    length: 100,
  })
  designarticlepWmvt: string | null;

  @Column("varchar", { name: "intitulecond_wmvt", nullable: true, length: 50 })
  intitulecondWmvt: string | null;

  @Column("int", { name: "nbrepiecesparcond_wmvt", nullable: true })
  nbrepiecesparcondWmvt: number | null;

  @Column("int", { name: "qtecond_wmvt", nullable: true })
  qtecondWmvt: number | null;

  @Column("varchar", { name: "note_wmvt", nullable: true, length: 200 })
  noteWmvt: string | null;

  @Column("varchar", { name: "flag_wmvt", nullable: true, length: 10 })
  flagWmvt: string | null;
}
