import React, { Suspense } from "react";
import { BackDropLoading } from "@components/atoms";

export const CustomSuspense: React.FunctionComponent = ({ children }) => {
    return (
        <Suspense fallback={<BackDropLoading open invisible />}>
            {children}
        </Suspense>
    );
};
