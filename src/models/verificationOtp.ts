import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'tbl_verification_otps',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})
class VerificationOtp extends Model {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    })
    public id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    public email!: string;

    @Column({
        type: DataType.STRING(6),
        allowNull: false
    })
    public otp!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    public expires_at!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    public created_at!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    public updated_at!: Date;
}

export default VerificationOtp;