import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import keys from "lodash/keys";
import { Button, Box } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Input, Panel, InputNumber } from "@components/atoms";
import { OrderModel } from "@interfaces";
import { OrderStatus } from "@components/molecules";

type ICreateOrEdit = {
    onSubmit: (data: OrderModel.ICreateOrderPayload) => void;
    data?: OrderModel.IOrderResponse;
    mode?: "add" | "edit";
};

const orderSchema = yup.object().shape({
    amount: yup.number().required(),
    username: yup.string().required(),
});

const CreateOrEditOrder: React.FunctionComponent<ICreateOrEdit> = (
    props,
): JSX.Element => {
    const history = useHistory();
    const { onSubmit, data, mode } = props;

    const formik = useFormik({
        initialValues: {
            amount: undefined,
            username: "",
        },
        validationSchema: orderSchema,
        onSubmit: (val) => {
            onSubmit(val);
        },
    });

    useEffect(() => {
        if (!isEmpty(data)) {
            keys(data)?.forEach((key) => {
                formik.setFieldValue(key, data[key]);
            });
        }
    }, [data]);

    const handleGoBack = () => {
        history.goBack();
    };

    return (
        <>
            <Button
                color="primary"
                variant="contained"
                startIcon={<ArrowBackIcon />}
                style={{ alignSelf: "flex-start", marginBottom: "16px" }}
                onClick={handleGoBack}
            >
                Go Back
            </Button>
            <form onSubmit={formik.handleSubmit}>
                <Panel
                    title={
                        mode === "add"
                            ? "Create Order Page"
                            : "Update Order Page"
                    }
                >
                    <InputNumber
                        autoFocus
                        type="number"
                        label="Amount"
                        name="amount"
                        placeholder="Input amount"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.amount &&
                            Boolean(formik.errors.amount)
                        }
                        helperText={
                            formik.touched.amount && formik.errors.amount
                        }
                    />
                    <Input
                        label="User Name"
                        name="username"
                        placeholder="Input User Name"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.username &&
                            Boolean(formik.errors.username)
                        }
                        helperText={
                            formik.touched.username && formik.errors.username
                        }
                    />
                    {mode === "edit" && (
                        <div>
                            Status: <OrderStatus status={data?.status} />
                        </div>
                    )}
                    <Box display="flex" justifyContent="flex-end" marginTop={2}>
                        <Button
                            color="default"
                            variant="contained"
                            type="reset"
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            style={{ marginLeft: "8px" }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Panel>
            </form>
        </>
    );
};

export default CreateOrEditOrder;
