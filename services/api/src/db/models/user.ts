import { prop, modelOptions, getModelForClass } from "@typegoose/typegoose"

@modelOptions({ options: { customName: "User" } })
class User {
    @prop({ type: String, required: true })
    username!: string

    @prop({ type: String, required: true })
    email!: string

    @prop({ type: String, required: true })
    password!: string

    @prop({ type: Boolean, default: false })
    verified?: boolean
}

export const UserModel = getModelForClass(User)
