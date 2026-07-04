'use client';

import { toast } from "sonner";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";

import { cn } from "@/lib/utils";
import { dzeragir } from "@/config /font";
import sendFeedbackMessageAction from "@/lib/action/sendFeedbackMessageAction";

import { PresenceSchema as schema } from "@/components/sections/presence/schema";
import { FieldGroup, FieldSet } from "@/components/shadcn-ui/field";
import { Radio } from "@/components/ui/form/radio";
import { Text } from "@/components/ui/form/text";
import { Button } from "@/components/shadcn-ui/button";
import {NumericFormat} from "@/components/ui/form/number-input";

export function PresenceSection() {
    const [state, formAction, pending] = useActionState(
        sendFeedbackMessageAction,
        null
    );

    const form = useForm({
        resolver: zodResolver(schema),
        mode: "onTouched",
        defaultValues: {
            attendance: "Այո",
            side: "Հովհաննես",
            name: "",
            count: "",
        },
    });

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success("Շնորհակալություն, Ձեր պատասխանն ընդունվեց 🤍");
            form.reset();
        } else {
            toast.error("Չհաջողվեց ուղարկել, խնդրում ենք փորձել կրկին");
        }
    }, [state, form]);

    const {isValid} = form.formState;

    return (
        <section className="py-10 relative mx-auto min-h-screen w-full max-w-md snap-start overflow-hidden">
            <div className="relative z-10 flex min-h-screen w-full flex-col items-center px-6 py-16 text-center">
                <h2 className={cn(dzeragir.className, "text-3xl text-white")}>
                    Խնդրում ենք հաստատել ներկայությունը
                </h2>

                <div className="mt-6 w-full rounded-lg border border-[#FFF2DF] bg-[#FFF2DF]/50 p-4">
                    <h3 className={cn(dzeragir.className, "text-lg text-[#3A2A1E]")}>
                        Խնդրում ենք հաստատել մասնակցությունը մինչև հուլիսի 30-ը
                    </h3>
                </div>

                <form action={formAction} className="mt-8 w-full">
                    <FieldGroup className="w-full">
                        <FieldSet className="w-full gap-6 rounded-xl border border-[#FFF2DF] p-8 backdrop-blur-sm">
                            <Radio
                                control={form.control}
                                name="attendance"
                                label="Կկարողանա՞ք ներկա լինել"
                                options={[
                                    { value: "Այո", label: "Այո" },
                                    { value: "Ոչ", label: "Ոչ" },
                                ]}
                            />

                            <Radio
                                control={form.control}
                                name="side"
                                label="Ու՞մ կողմից եք"
                                options={[
                                    { value: "Հովհաննես", label: "Հովհաննեսի" },
                                    { value: "Լիանա", label: "Լիանայի" },
                                ]}
                            />

                            <Text
                                inputClassName="border-0 border-b rounded-none"
                                control={form.control}
                                name="name"
                                label="Անուն Ազգանուն"
                                required
                            />

                            <NumericFormat
                                inputClassName="border-0 border-b rounded-none"
                                control={form.control}
                                name="count"
                                label="Հյուրերի քանակ"
                                required
                            />
                        </FieldSet>

                        <div className="flex justify-center pt-4">
                            <Button
                                disabled={!isValid || pending}
                                type="submit"
                                className="h-12 w-full border border-[#FFF2DF] text-[1rem] bg-transparent backdrop-blur-sm"
                            >
                                Ուղարկել
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </div>
        </section>
    );
}