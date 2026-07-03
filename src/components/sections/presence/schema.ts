"use client";
import * as z from "zod/mini";

export const PresenceSchema = z.object({
    attendance: z.string(),
    side: z.string(),
    name: z.string()
        .check(z.minLength(1, "Այս դաշտը պարտադիր է")),
    count: z.string()
        .check(z.minLength(1, "Այս դաշտը պարտադիր է"))
});