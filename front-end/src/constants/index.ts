import { ORDER_STATUS } from "@definitions/enum";

export const ORDER_STATUS_TEXT = {
    [ORDER_STATUS.CREATED]: "Created",
    [ORDER_STATUS.CONFIRMED]: "Confirmed",
    [ORDER_STATUS.DELIVERED]: "Delivered",
    [ORDER_STATUS.CANCELLED]: "Cancelled",
};

export const ORDER_REFRESH_INTERVAL = 5000;
