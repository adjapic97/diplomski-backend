import { Request } from "src/requests/entities/request.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { JobPostSkills } from "./job-post-skills.entity";


@Entity()
export class JobPost {

    @PrimaryGeneratedColumn('uuid')
    id: string;




    @Column()
    jobTitle: string;

    @Column()
    jobDescription: string;

    @Column("double")
    priceOfHour: number;

    @Column()
    numberOfHours: number;

    @Column()
    addressOfJob: string;

    @Column({ type: "time" })
    startTime: string;

    @Column()
    fixedPrice: boolean;

    @Column()
    fixedPriceValue: number;

    @Column()
    startDate: Date;

    @Column()
    numberOfPeople: number;

    @Column({
        nullable: false,
        select: true,
        default: false
    })
    spotsFilled: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createTime: string;

    @ManyToOne(() => User, user => user.jobPosts)
    user: User;

    @OneToMany(() => Request, request => request.jobPost)
    requests: Request[];

    @OneToMany(() => JobPostSkills, jobPostSkill => jobPostSkill.skill)
    jobPostSkills: JobPostSkills[];

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];

    @Column({ default: false })
    deleted: boolean;

    @Column({ default: false })
    finished: boolean;

}