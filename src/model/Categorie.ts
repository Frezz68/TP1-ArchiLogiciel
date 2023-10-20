import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import {Tache} from "./Tache";

@Entity()
export class Categorie extends BaseEntity {
  @PrimaryGeneratedColumn()
  idCategorie: number;

  @Column()
  libelleCategorie: string;

  @OneToMany(type => Tache, tache => tache.categorie)
  taches: Tache[];
}
