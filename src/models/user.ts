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
        type:DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull:false,
        unique:true,
        field:'unique_id'
    })
    public uniqueId!:string;

    @Column({
        type:DataType.STRING,
        allowNull:true,
        field:'first_name'

    })
    public firstName!:string

    @Column({
        type:DataType.STRING,
        allowNull:true,
        field:'last_name'
    })
    public lastName!:string

    @Column({
        type:DataType.STRING,
        allowNull:true,
        field:'user_name'
    })
    public username!:string

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