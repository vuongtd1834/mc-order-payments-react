declare namespace OrderModel {
    export interface IOrderPayload {
        amount: number;
        username: string;
    }

    export type ICreateOrderPayload = IOrderPayload;

    export type IOrderResponse = {
        id: number;
        amount: number;
        username: string;
        status: number;
        created_at: Date;
        updated_at: Date;
    };

    export interface IUpdateOrderPayload extends IOrderPayload {
        id: number;
    }
}

export { OrderModel };
