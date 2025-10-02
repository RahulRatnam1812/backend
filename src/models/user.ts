// Socket 

import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName:'tbl_users',
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at'
})

class User extends Model{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    })
    public id!:number;

    @Column({
        type:DataType.STRING,
        allowNull:true
    })
    public first_name!:string

    @Column({
        type:DataType.STRING,
        allowNull:true
    })
    public last_name!:string

    @Column({
        type:DataType.STRING,
        allowNull:true
    })
    public user_name!:string

    @Column({
        type:DataType.STRING,
        allowNull:true
    })
    public password!:string

    @Column({
        type:DataType.DATE,
        allowNull:false
    })
    public created_at!:Date

    @Column({
        type:DataType.DATE,
        allowNull:false
    })
    public updated_at!:Date

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    public email!:string
}

export default User;