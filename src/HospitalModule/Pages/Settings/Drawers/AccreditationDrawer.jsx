
import React, { useEffect, useState } from "react";
import GeneralDrawer from "@/components/GeneralDrawer/GeneralDrawer";
import InputWithMeta from "@/components/GeneralDrawer/InputWithMeta";
import RichTextBox from "@/components/GeneralDrawer/RichTextBox";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";

/**
 * AccreditationDrawer — Adapted from AddPublicationDrawer
 */
export default function AccreditationDrawer({ open, onClose, onSave, mode = "add", initial = {} }) {
    const [title, setTitle] = useState("");
    const [issuer, setIssuer] = useState("");
    const [date, setDate] = useState("");
    const [url, setUrl] = useState("");
    const [desc, setDesc] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        if (!open) return;
        // Map initial values, preferring "accreditation" terminology where applicable
        setTitle(initial?.title || initial?.name || "");
        setIssuer(initial?.issuer || initial?.publisher || "");
        setDate(initial?.date || (initial?.issueDate ? initial.issueDate.split("T")[0] : ""));
        setUrl(initial?.url || "");
        setDesc(initial?.desc || initial?.description || "");
        setShowCalendar(false);
    }, [open, initial]);

    const canSave = Boolean(title && issuer && date);

    const save = () => {
        if (!canSave) return;
        onSave?.({ title, issuer, date, url, desc });
        onClose?.();
    };

    return (
        <GeneralDrawer
            isOpen={open}
            onClose={onClose}
            title={mode === "edit" ? "Edit Accreditations" : "Add Accreditations"}
            primaryActionLabel="Save"
            onPrimaryAction={save}
            primaryActionDisabled={!canSave}
            width={600}
        >
            <div className="flex flex-col gap-4">
                <InputWithMeta
                    label="Title"
                    requiredDot
                    value={title}
                    onChange={setTitle}
                    placeholder="Enter Title"
                />
                <InputWithMeta
                    label="Publication / Publisher"
                    requiredDot
                    value={issuer}
                    onChange={setIssuer}
                    placeholder="Enter Publication"
                />

                {/* Date with calendar icon and dropdown */}
                <div className="relative">
                    <InputWithMeta
                        label="Accreditations Date"
                        requiredDot
                        value={date}
                        onChange={setDate}
                        placeholder="Select Date"
                        RightIcon='/Doctor_module/settings/calendar.png'
                        onIconClick={() => setShowCalendar((v) => !v)}
                        dropdownOpen={showCalendar}
                        onRequestClose={() => setShowCalendar(false)}
                        readonlyWhenIcon={true}
                    />
                    {showCalendar && (
                        <div className="shadcn-calendar-dropdown absolute right-1 top-full z-[10000] mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl p-2">
                            <ShadcnCalendar
                                mode="single"
                                selected={date ? new Date(date) : undefined}
                                onSelect={(d) => {
                                    if (!d) return;
                                    const yyyy = d.getFullYear();
                                    const mm = String(d.getMonth() + 1).padStart(2, "0");
                                    const dd = String(d.getDate()).padStart(2, "0");
                                    setDate(`${yyyy}-${mm}-${dd}`);
                                    setShowCalendar(false);
                                }}
                            />
                        </div>
                    )}
                </div>

                <InputWithMeta
                    label="Accreditations URL"
                    value={url}
                    onChange={setUrl}
                    placeholder="Paste Publication URL"
                />

                <RichTextBox
                    label="Description"
                    value={desc}
                    onChange={(v) => setDesc(v.slice(0, 1600))}
                    placeholder="List your Duties, Highlights and Achievements"
                    showCounter={true}
                    maxLength={1600}
                />
            </div>
        </GeneralDrawer>
    );
}
