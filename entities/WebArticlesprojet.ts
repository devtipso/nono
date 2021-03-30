import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("web_articlesprojet", { schema: "auclairm_espaceclient_demo" })
export class WebArticlesprojet {
  @PrimaryGeneratedColumn({ type: "int", name: "ref_artpweb" })
  refArtpweb: number;

  @Column("int", { name: "refacteur_artpweb", nullable: true })
  refacteurArtpweb: number | null;

  @Column("int", { name: "refcontrat_artpweb", nullable: true })
  refcontratArtpweb: number | null;

  @Column("varchar", { name: "typemvt_artpweb", nullable: true, length: 20 })
  typemvtArtpweb: string | null;

  @Column("int", { name: "reprojet_artpweb", nullable: true })
  reprojetArtpweb: number | null;

  @Column("varchar", { name: "projet_artpweb", nullable: true, length: 100 })
  projetArtpweb: string | null;

  @Column("int", { name: "refsite_artpweb", nullable: true })
  refsiteArtpweb: number | null;

  @Column("varchar", { name: "site_artpweb", nullable: true, length: 100 })
  siteArtpweb: string | null;

  @Column("int", { name: "refdep_artpweb", nullable: true })
  refdepArtpweb: number | null;

  @Column("varchar", {
    name: "departement_artpweb",
    nullable: true,
    length: 100,
  })
  departementArtpweb: string | null;

  @Column("int", { name: "refmetier_artpweb", nullable: true })
  refmetierArtpweb: number | null;

  @Column("varchar", { name: "metier_artpweb", nullable: true, length: 100 })
  metierArtpweb: string | null;

  @Column("int", { name: "reffamniv1_artpweb", nullable: true })
  reffamniv1Artpweb: number | null;

  @Column("varchar", { name: "famniv1_artpweb", nullable: true, length: 100 })
  famniv1Artpweb: string | null;

  @Column("int", { name: "reffamniv2_artpweb", nullable: true })
  reffamniv2Artpweb: number | null;

  @Column("varchar", { name: "famniv2_artpweb", nullable: true, length: 100 })
  famniv2Artpweb: string | null;

  @Column("int", { name: "reffamniv3_artpweb", nullable: true })
  reffamniv3Artpweb: number | null;

  @Column("varchar", { name: "famniv3_artpweb", nullable: true, length: 100 })
  famniv3Artpweb: string | null;

  @Column("int", { name: "refarticle_artpweb", nullable: true })
  refarticleArtpweb: number | null;

  @Column("int", { name: "refarticleprojet_artpweb", nullable: true })
  refarticleprojetArtpweb: number | null;

  @Column("varchar", {
    name: "codearticle_artpweb",
    nullable: true,
    length: 100,
  })
  codearticleArtpweb: string | null;

  @Column("varchar", {
    name: "intitulearticle_artpweb",
    nullable: true,
    length: 100,
  })
  intitulearticleArtpweb: string | null;

  @Column("varchar", { name: "genre_artpweb", nullable: true, length: 100 })
  genreArtpweb: string | null;

  @Column("varchar", {
    name: "abrevcouleurdom_artpweb",
    nullable: true,
    length: 10,
  })
  abrevcouleurdomArtpweb: string | null;

  @Column("varchar", { name: "couleur_artpweb", nullable: true, length: 100 })
  couleurArtpweb: string | null;

  @Column("varchar", { name: "brand_artpweb", nullable: true, length: 100 })
  brandArtpweb: string | null;

  @Column("varchar", {
    name: "specificites_artpweb",
    nullable: true,
    length: 100,
  })
  specificitesArtpweb: string | null;

  @Column("varchar", {
    name: "reglechange_artpweb",
    nullable: true,
    length: 100,
  })
  reglechangeArtpweb: string | null;

  @Column("varchar", { name: "taille_artpweb", nullable: true, length: 20 })
  tailleArtpweb: string | null;

  @Column("int", { name: "qteparporteur_artpweb", nullable: true })
  qteparporteurArtpweb: number | null;

  @Column("int", { name: "qte_artpweb", nullable: true })
  qteArtpweb: number | null;

  @Column("int", { name: "tottrait_artpweb", nullable: true })
  tottraitArtpweb: number | null;

  @Column("int", { name: "totreparation_artpweb", nullable: true })
  totreparationArtpweb: number | null;

  @Column("int", { name: "totreforme_artpweb", nullable: true })
  totreformeArtpweb: number | null;

  @Column("varchar", { name: "flag_artpweb", nullable: true, length: 5 })
  flagArtpweb: string | null;
}
