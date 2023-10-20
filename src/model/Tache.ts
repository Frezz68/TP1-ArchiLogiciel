import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, ManyToOne} from "typeorm";
import {Categorie} from "./Categorie";

@Entity()
export class Tache extends BaseEntity {
  @PrimaryGeneratedColumn()
  idTache: number;

  @Column()
  titreTache : string;

  @Column({ nullable: true })
  description: string;

  @Column()
  dateEcheance : Date;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(type => Categorie, category => category.taches)
  @JoinColumn({ name: "idCategorie" }) // Spécifiez le nom de la colonne de clé étrangère
  categorie: Categorie;



}
