import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ServiceDocument = Service & Document

@Schema()
export class Service {
    @Prop({required:true})
    title: string;

    @Prop()
    email: string;

    @Prop()
    description: string;

    @Prop({required:true})
    createdAt: Date
}

export const ServiceSchema = SchemaFactory.createForClass(Service);