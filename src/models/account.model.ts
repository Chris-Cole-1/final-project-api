import { model, Schema, Document } from "mongoose";
//import uniqueValidator from "mongoose-unique-validator";

export interface Acc extends Document {
    name: string
    password: string
    phone: string
    active: boolean
    vehicle: string
    price: string
    venmo: string
}

const accountSchema: Schema = new Schema({
  name: { type: String, required: true},
  password: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  active: { type: Boolean, required: true },
  vehicle: { type: String, required: true },
  price: { type: Number, required: true },
  venmo: { type: String, required: true },
});

//accountSchema.plugin(uniqueValidator);

export default model<Acc>("Account", accountSchema);